import { Action, Actions } from "../actions/favourite";
import createReducer from "./createReducer";


export type FavouriteState = string[];

const initialState: FavouriteState = [];


export const favourites = createReducer<FavouriteState>(initialState, {
	[Actions.INIT_FAV](state: FavouriteState, action: Action) {
    return action.payload || [];
	},
});
