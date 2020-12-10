import { BranchData, BranchList, BuildAction, BuildActions, BuildData, BuildDataPayload, BuildState, BuildStateType, FilterType, SetTermPayload, Module, SetCatPayload, CategoryFilterType } from "../model";
import createReducer from "./createReducer";
import { data as ssModuleData } from "silverstripe-cms-meta";


const initialState: BuildState = {
	modules: [],
	loading: true,
	raw: {},
	filter: 'latestStable',
	term: '',
	categoryFilters: ['core', 'nonmodule', 'supported', 'unsupported'],
	stats: {
		'passed': 0,
		'errored': 0,
		'failed': 0,
		'running': 0,
		'expired': 0,
		'canceled': 0,
		'created': 0,
		'started': 0
	}
};

const statePriority: BuildStateType[][] = [
	['errored', 'failed'],
	['canceled'],
	['expired'],
	['running', 'created', 'started'],
	['passed']
];

/**
 * Sort states with the least desirable one showing up first.
 * @param a
 * @param b
 */
function sortByState(a: BuildStateType, b: BuildStateType) {
	if (a === b) {
		return 0;
	}

	for (const stateGroups of statePriority) {
		if (stateGroups.indexOf(a) > -1) {
			return -1;
		}
		if (stateGroups.indexOf(b) > -1) {
			return 1;
		}
	}

	return 0;
}

/**
 * Sort module by build state and then by name.
 * @param a
 * @param b
 */
function sortModule(a: Module, b: Module) {
	if (a === b) {
		return 0;
	}
	const stateSort = sortByState(a.state, b.state);
	return stateSort !== 0 ? stateSort : a.name.localeCompare(b.name);
}

/**
 * Filter out branches that are not the latest. Branches that will be returned are:
 * - master/main
 * - the next minor release branch
 * - the last two patch release branch
 * @param branches
 * @param mod
 */
function moduleBranchFilter(branches: BranchList, mod: string): BranchList {
	let nextBranches: {
		nextMajor ?: string,
		nextMinor ?: string,
		nextPatch ?: string,
		previousPatch ?: string,
	} = { }

	const keys = Object.keys(branches);


	if (keys.indexOf('master') > -1) {
		nextBranches.nextMajor = 'master';
	} else if (keys.indexOf('main') > -1) {
		nextBranches.nextMajor = 'main';
	}

	const nextMinor = keys.filter(key => key.match(/^\d+$/))
		.map(key => parseInt(key))
		.reduce((a,b) => Math.max(a,b), 0);

	if (nextMinor) {
		nextBranches.nextMinor = nextMinor.toString();
		const patches = keys
			.filter(key => key.match(new RegExp(`^${nextMinor}\\.\\d+$`)))
			.map(key => {
				return key.replace(`${nextMinor}.`, '').trim()
			})
			.map(key => parseInt(key)).sort()
			.slice(-2)
			.map(subVersion => `${nextMinor}.${subVersion}`);

		if (patches.length === 2) {
			nextBranches.nextPatch = patches[1];
			nextBranches.previousPatch = patches[0];
		} else if (patches.length === 1) {
			nextBranches.nextPatch = patches[0];
		}
	}


	return Object.values(nextBranches).reduce((nextBranches, key) => {
		return key === undefined ?
			nextBranches :
			{...nextBranches, [key]: branches[key]}
	}, {});
}

/**
 * Given a list of branches, find the worst "state". (e.g "Running" is worst than "Passing" and "Failed" is worst than "running")
 * This is use to attach a state to a given module.
 * @param accumulator
 * @param param1
 */
function branchStateReduce(accumulator:BuildStateType, {state}:BranchData) {
  return sortByState(accumulator, state) > 0 ? state : accumulator;
}

/**
 * Create an artificial state of expired for bulids that haven't run in more than 30 days.
 * @param data
 */
function markExpiredBuild(data: BranchData): BranchData {
  if (!data || data.state !== 'passed') {
	  return data;
  }

  const buildDate = new Date(data.started_at);
  const now = new Date();
  const expiry = new Date();
  expiry.setDate(now.getDate() - 30);

  return (buildDate < expiry) ? {...data, state: 'expired'} : data;
}

function filterModule(moduleName:string, categoryFilters: CategoryFilterType[]) {
	if (categoryFilters.length === 4) {
		return true;
	}
	
	const moduleMetaDada = ssModuleData.find((meta) => meta.repo === moduleName );
	return moduleMetaDada ? (
		(categoryFilters.indexOf('core') > -1 && moduleMetaDada.core ) ||
		(categoryFilters.indexOf('supported') > -1 && moduleMetaDada.supported ) ||
		(categoryFilters.indexOf('unsupported') > -1 && !moduleMetaDada.supported )
	) : categoryFilters.indexOf('nonmodule') > -1;
}

function postProcess(data: BuildData, {filter, term, categoryFilters}: BuildState) {
	return Object.keys(data)
		.filter((module) => filterModule(module, categoryFilters))
		.map(module => ({
			branches: data[module],
			name: module,
		}))
		.filter(({name}) => (name.indexOf(term) !== -1))
		.map(({branches, ...data}) => ({
			branches: filter === 'latestStable' ? moduleBranchFilter(branches, data.name) : branches,
			...data
		}))
		.map(({branches, ...data}) => {
			for (const key in branches) {
				branches[key] = markExpiredBuild(branches[key]);
			}
			return {branches, ...data};
		})
		.map(data => ({...data, state: Object.values(data.branches).reduce(branchStateReduce, 'passed')}))
		.sort((a, b) => sortModule(a, b));
}

/**
 * Count builds by state type
 * @param bulidState 
 */
function countBuildStateType(bulidState: BuildState): BuildState {
	const initStats = {
		'passed': 0,
		'errored': 0,
		'failed': 0,
		'running': 0,
		'expired': 0,
		'canceled': 0,
		'created': 0,
		'started': 0
	};
	
	const stats = bulidState.modules.reduce((accumulator, module) => {
		Object.values(module.branches).forEach(branch => accumulator[branch.state]++);
		return accumulator;
	}, initStats);

	return {...bulidState, stats};
}

 const reducer = createReducer<BuildState>(initialState, {
	[BuildActions.LOADING_BUILDS]() {
		return initialState;
	},
	[BuildActions.BUILD_LOADED](state: BuildState, action: BuildAction) {
		const {json, lastModified} = action.payload as BuildDataPayload;
		return {
			...state,
			modules: postProcess(json, state),
			lastModified: lastModified,
			loading: false,
			raw: json
		};
	},
	[BuildActions.TOGGLE_FILTER]({filter, ...state}: BuildState) {
		const nextFilter: FilterType = filter === 'latestStable' ? 'all' : 'latestStable';
		const next = {
			...state,
			filter: nextFilter
		};
		return {...next, modules: postProcess(state.raw, next)};
	},
	[BuildActions.SET_TERM](state: BuildState, action: BuildAction) {
		state.triggerSearchTimeout && clearTimeout(state.triggerSearchTimeout);

		const {term, triggerSearchTimeout} =  action.payload as SetTermPayload;
		return {
			...state,
			term: term.toLocaleLowerCase(),
			triggerSearchTimeout
		};
	},
	[BuildActions.TRIGGER_SEARCH](state: BuildState) {
		return {
			...state,
			modules: postProcess(state.raw, state),
		};
	},
	[BuildActions.SET_CATEGORY_FILTER](state: BuildState, action: BuildAction) {
		const {categoryFilters} = action.payload as SetCatPayload;
		const next = {...state, categoryFilters}

		return {...next, modules: postProcess(state.raw, next)};
	}
});

export const build = (state: BuildState | undefined, action: any) => countBuildStateType(reducer(state, action));