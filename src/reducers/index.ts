import { History } from "history";
import { combineReducers } from "redux";
import { BuildState } from "../model";
import { builds } from "./Build/reducer";
import { filters, FilterState } from "./filters";
import { favourites, FavouriteState } from "./favourites";

export interface RootState {
  builds: BuildState
  filters: FilterState
  favourites: FavouriteState
}

export default (history: History) =>
	combineReducers({
    builds,
    filters,
    favourites
	});
