import { BranchData, BuildAction, BuildActions, BuildData, BuildState, BuildStateType } from "../model";
import createReducer from "./createReducer";


const initialState = {
	modules: [],
	loading: true,
	lastModifed: undefined
};

const statePriority: BuildStateType[] = [
	'errored','failed', 'running', 'passed'
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

function postProcess(data: BuildData) {
	return Object.keys(data)
		.map(module => ({
			branches: data[module],
			name: module,
			state: Object.values(data[module]).reduce(branchStateReduce, 'passed')
		})).sort((a, b) => sort(a.state, b.state));
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
