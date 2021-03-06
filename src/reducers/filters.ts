import { Action, Actions, SetCatPayload, SetFilterPayload, SetTermPayload } from "../actions/filter";
import createReducer from "./createReducer";

export type CategoryFilterType = 'core'|'supported'|'unsupported'|'nonmodule';

export interface FilterState {
	filter: string,
  term: string,
  partialTerm: string,
	triggerSearchTimeout?: NodeJS.Timeout,
  categoryFilters: CategoryFilterType[],
  dialogOpen: boolean
}

/**
 * Inital state of the Build State
 */
const initialState: FilterState = {
	filter: 'latestStable',
  term: '',
  partialTerm: '',
  categoryFilters: ['core', 'nonmodule', 'supported', 'unsupported'],
  dialogOpen: false
};


export const filters = createReducer<FilterState>(initialState, {
	[Actions.SET_FILTER](state: FilterState, action: Action) {
    console.dir(action)
    const {filter} = action.payload as SetFilterPayload;
		return {
			...state,
			filter
		};
	},
  [Actions.TOGGLE_DIALOG]({dialogOpen, ...state}: FilterState) {
		return {
			...state,
			dialogOpen: !dialogOpen
		};
	},
  [Actions.CLEAR_FILTERS]() {
		return initialState;
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
