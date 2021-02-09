import { UnreleaseActions } from "../actions/unrelease";
import { compareReducer } from "./compare";

export const unreleases = compareReducer(UnreleaseActions.LOADING, UnreleaseActions.LOADED);
