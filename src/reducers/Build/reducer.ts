import { BuildAction, BuildActions, BuildDataPayload } from "../../actions/build";
import { BranchData, BuildData, BuildState} from "../../model";
import createReducer from "../createReducer";
import { initialState } from "./initalState";

/**
 * Create an artificial state of expired for builds that haven't run in more than 30 days.
 * @param data
 */
function markExpiredBuild(data: BranchData): BranchData {
  if (!data || data.state !== 'passed') {
	  return data;
  }

  const buildDate = new Date(data.started_at);
  const now = new Date();
  const expiry = new Date();
  expiry.setDate(now.getDate() - 30);

  return (buildDate < expiry) ? {...data, state: 'expired'} : data;
}

function postProcess(data: BuildData) {
	return Object.keys(data)
		.map(module => ({
			branches: data[module],
			name: module,
		}))
		.map(({branches, ...data}) => {
			for (const key in branches) {
				branches[key] = markExpiredBuild(branches[key]);
			}
			return {branches, ...data};
		})
}

export const builds = createReducer<BuildState>(initialState, {
	[BuildActions.LOADING_BUILDS]() {
		return initialState;
	},
	[BuildActions.BUILD_LOADED](state: BuildState, action: BuildAction) {
    const {json, lastModified} = action.payload as BuildDataPayload;
		return {
			...state,
			modules: postProcess(json),
			lastModified,
			loading: false
		};
	}
});
