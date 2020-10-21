import { BranchData, BuildAction, BuildActions, BuildData, BuildState, BuildStateType } from "../model";
import createReducer from "./createReducer";


const initialState = {
	modules: [],
	loading: true,
	lastModifed: undefined
};

const statePriority: BuildStateType[] = [
	'errored', 'failed', 'canceled', 'expired', 'running', 'passed'
];

function sort(a: BuildStateType, b: BuildStateType) {
	if (a === b) {
		return 0;
	}

	for (const state of statePriority) {
		if (a === state) {
			return -1;
		}
		if (b === state) {
			return 1;
		}
	}

	return 0;
}


function branchStateReduce(accumulator:BuildStateType, {state}:BranchData) {
  return sort(accumulator, state) > 0 ? state : accumulator;
}

function markExpiredBuild(data: BranchData): BranchData {
  if (data.state !== 'passed') {
	  return data;
  }

  const buildDate = new Date(data.started_at);
  const now = new Date();
  const expiry = new Date();
  expiry.setDate(now.getDate() - 30);

  return (buildDate < expiry) ? {...data, state: 'expired'} : data;
}

function postProcess(data: BuildData) {
	return Object.keys(data)
		.map(module => ({
			branches: data[module],
			name: module,
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
	[BuildActions.LOADING_BUILDS](state: BuildState, action: BuildAction) {
		return initialState;
	},
	[BuildActions.BUILD_LOADED](state: BuildState, action: BuildAction) {
		return {
			modules: action.payload ? postProcess(action.payload.json) : [],
			lastModified: action.payload ? action.payload.lastModified : undefined,
			loading: false
		};
	},
});
