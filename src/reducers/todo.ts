import { AddCircleTwoTone } from "@material-ui/icons";
import { BranchData, BranchList, BuildAction, BuildActions, BuildData, BuildDataPayload, BuildState, BuildStateType, FilterType, SetTermPayload } from "../model";
import createReducer from "./createReducer";


const initialState: BuildState = {
	modules: [],
	loading: true,
	raw: {},
	filter: 'latestStable',
	term: ''
};

const statePriority: BuildStateType[][] = [
	['errored', 'failed'], 
	['canceled'], 
	['expired'], 
	['running', 'created', 'started'], 
	['passed']
];

function sort(a: BuildStateType, b: BuildStateType) {
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


function branchStateReduce(accumulator:BuildStateType, {state}:BranchData) {
  return sort(accumulator, state) > 0 ? state : accumulator;
}

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

function postProcess(data: BuildData, filter: FilterType, term: string) {
	return Object.keys(data)
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
		.sort((a, b) => sort(a.state, b.state));
}

export const build = createReducer<BuildState>(initialState, {
	[BuildActions.LOADING_BUILDS](state: BuildState) {
		return initialState;
	},
	[BuildActions.BUILD_LOADED](state: BuildState, action: BuildAction) {
		const {json, lastModified} = <BuildDataPayload> action.payload;
		return {
			...state,
			modules: postProcess(json, state.filter, state.term),
			lastModified: lastModified,
			loading: false,
			raw: json
		};
	},
	[BuildActions.TOGGLE_FILTER]({filter, ...state}: BuildState) {
		const nextFilter = filter === 'latestStable' ? 'all' : 'latestStable';
		return {
			...state,
			modules: postProcess(state.raw, nextFilter, state.term),
			filter: nextFilter
		};
	},
	[BuildActions.SET_TERM](state: BuildState, action: BuildAction) {
		state.triggerSearchTimeout && clearTimeout(state.triggerSearchTimeout);
		
		const {term, triggerSearchTimeout} = <SetTermPayload> action.payload;
		return {
			...state,
			term,
			triggerSearchTimeout
		};
	},
	[BuildActions.TRIGGER_SEARCH](state: BuildState) {
		return {
			...state,
			modules: postProcess(state.raw, state.filter, state.term),
		};
	},
});
