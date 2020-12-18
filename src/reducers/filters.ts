import { Action, Actions, SetCatPayload, SetTermPayload } from "../actions/filter";
import createReducer from "./createReducer";


export type FilterType = 'all'|'latestStable';
export type CategoryFilterType = 'core'|'supported'|'unsupported'|'nonmodule';

export interface FilterState {
	filter: FilterType,
  term: string,
  partialTerm: string,
	triggerSearchTimeout?: NodeJS.Timeout,
  categoryFilters: CategoryFilterType[],
}

/**
 * Inital state of the Build State
 */
const initialState: FilterState = {
	filter: 'latestStable',
  term: '',
  partialTerm: '',
  categoryFilters: ['core', 'nonmodule', 'supported', 'unsupported'],
};


export const filters = createReducer<FilterState>(initialState, {
	[Actions.TOGGLE_FILTER]({filter, ...state}: FilterState) {
		return {
			...state,
			filter: filter === 'latestStable' ? 'all' : 'latestStable'
		};
	},
	[Actions.SET_TERM](state: FilterState, action: Action) {
		state.triggerSearchTimeout && clearTimeout(state.triggerSearchTimeout);

		const {term, triggerSearchTimeout} =  action.payload as SetTermPayload;
		return {
			...state,
			partialTerm: term.toLocaleLowerCase(),
      triggerSearchTimeout,
		};
	},
	[Actions.TRIGGER_SEARCH](state: FilterState) {
		return {
			...state,
			term: state.partialTerm
		};
	},
	[Actions.SET_CATEGORY_FILTER](state: FilterState, action: Action) {
		const {categoryFilters} = action.payload as SetCatPayload;
		return {...state, categoryFilters};
	}
});
