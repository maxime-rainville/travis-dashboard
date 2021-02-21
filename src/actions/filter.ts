import { ActionType } from "../reducers/ActionTypes";
import { CategoryFilterType } from "../reducers/filters";

export interface SetTermPayload {
  term: string,
  triggerSearchTimeout: NodeJS.Timeout
}

export interface SetCatPayload {
  categoryFilters: CategoryFilterType[]
}

export enum Actions {
  LOADING_BUILDS = "LOADING_BUILDS",
  BUILD_LOADED = "BUILD_LOADED",
  TOGGLE_FILTER = "TOGGLE_FILTER",
  SET_TERM = "SET_TERM",
  TRIGGER_SEARCH = "TRIGGER_SEARCH",
  SET_CATEGORY_FILTER = "SET_CATEGORY_FILTER",
  CLEAR_FILTERS = "CLEAR_FILTERS",
  TOGGLE_DIALOG = "TOGGLE_DIALOG",
}

export type Action =
  | ActionType<typeof Actions.TOGGLE_FILTER, undefined>
  | ActionType<typeof Actions.SET_TERM, SetTermPayload>
  | ActionType<typeof Actions.TRIGGER_SEARCH, undefined>
  | ActionType<typeof Actions.SET_CATEGORY_FILTER, SetCatPayload>
  | ActionType<typeof Actions.TOGGLE_DIALOG, undefined>
  | ActionType<typeof Actions.CLEAR_FILTERS, undefined>
;

export function toggleFilter() {
	return {type: Actions.TOGGLE_FILTER}
}

export function toggleDialog() {
	return {type: Actions.TOGGLE_DIALOG}
}

export function clearFilters() {
	return {type: Actions.CLEAR_FILTERS}
}

type dispatchCallback = (action: Action) => void;

export function setTerm(term: string) {
	return (dispatch: dispatchCallback) => {
		const triggerSearchTimeout = setTimeout(() => {
			dispatch({type: Actions.TRIGGER_SEARCH, payload: undefined});
		}, 500)

		dispatch({
			type: Actions.SET_TERM,
			payload:{
				term,
				triggerSearchTimeout
			}
		});
	}
}

export function setCategoryFilter(categoryFilters: CategoryFilterType[]) {
	return {type: Actions.SET_CATEGORY_FILTER, payload: {categoryFilters}}
}
