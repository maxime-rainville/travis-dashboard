import { History } from "history";
import { combineReducers } from "redux";
import { BuildState, MergeupState } from "../model";
import { builds } from "./Build/reducer";
import { filters, FilterState } from "./filters";
import { mergeups } from "./mergeups";
import { favourites, FavouriteState } from "./favourites";

export interface RootState {
  builds: BuildState
  filters: FilterState
  favourites: FavouriteState,
  mergeups: MergeupState
}

export default (history: History) =>
	combineReducers({
    builds,
    filters,
    favourites,
    mergeups
	});
