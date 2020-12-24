import { MergeupAction, MergeupActions, MergeupDataPayload } from "../actions/mergeups";
import { MergeupState} from "../model";
import createReducer from "./createReducer";

/**
 * Inital state of the Build State
 */
export const initialState: MergeupState = {
	mergeups: [],
	loading: true
};


export const mergeups = createReducer<MergeupState>(initialState, {
	[MergeupActions.LOADING]() {
		return initialState;
	},
	[MergeupActions.LOADED](state: MergeupState, action: MergeupAction) {
		const {json, lastModified} = action.payload as MergeupDataPayload;
		return {
			...state,
			mergeups: json,
			lastModified: lastModified,
			loading: false
		};
	}
});
