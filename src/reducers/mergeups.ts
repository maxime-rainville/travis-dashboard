import { MergeupActions } from "../actions/mergeups";
import { compareReducer } from "./compare";

export const mergeups = compareReducer(MergeupActions.LOADING, MergeupActions.LOADED);
