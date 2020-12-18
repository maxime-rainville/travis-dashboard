import { History } from "history";
import { combineReducers } from "redux";
import { BuildState } from "../model";
import { builds } from "./Build/reducer";
import { filters, FilterState } from "./filters";

export interface RootState {
  builds: BuildState;
  filters: FilterState
}

export default (history: History) =>
	combineReducers({
    builds,
    filters
	});
