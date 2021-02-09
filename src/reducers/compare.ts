import { CompareDataPayload } from "../actions/genericHttpAction";
import { MergeupAction } from "../actions/mergeups";
import { CompareState} from "../model";
import createReducer from "./createReducer";

/**
 * Inital state of the Build State
 */
export const initialState: CompareState = {
	compares: [],
	loading: true
};


export function compareReducer(loadingAction: string, loadedAction: string) {
  return createReducer<CompareState>(initialState, {
    [loadingAction]() {
      return initialState;
    },
    [loadedAction](state: CompareState, action: MergeupAction) {
      const {json, lastModified} = action.payload as CompareDataPayload;
      return {
        ...state,
        compares: json,
        lastModified: lastModified,
        loading: false
      };
    }
  })
}
