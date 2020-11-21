import { History } from "history";
import { combineReducers } from "redux";
import { BuildState } from "../model";
import * as todoReducer from "./build";

export interface RootState {
	build: BuildState;
}

export default (history: History) =>
	combineReducers({
		...todoReducer,
	});
