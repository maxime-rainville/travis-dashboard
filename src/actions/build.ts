import { BuildData } from "../model";

export interface BuildDataPayload {
  json: BuildData
  lastModified: Date
}

export type BuildActionType<t,p> = {
  type: t
  payload: p
}

export enum BuildActions {
  LOADING_BUILDS = "LOADING_BUILDS",
  BUILD_LOADED = "BUILD_LOADED"
}

export type BuildAction =
  | BuildActionType<typeof BuildActions.LOADING_BUILDS, void>
  | BuildActionType<typeof BuildActions.BUILD_LOADED, BuildDataPayload>
;

interface reduxAction {
	type: string,
	payload?: any
}

type dispatchCallback = (action: reduxAction) => void;

export function initBuildData() {
	return (dispatch: dispatchCallback) => {
		dispatch({type: BuildActions.LOADING_BUILDS});

		fetch(process.env.PUBLIC_URL + '/buildData.json', {method: 'GET'})
		  .then((response) => response.json().then((data) => ({
			json: data,
			lastModified:
				response.headers.has('last-modified') ?
				new Date(response.headers.get('last-modified') as string) :
				undefined
		  	})))
		  .then(data => dispatch({type: BuildActions.BUILD_LOADED, payload: data}));

	}
}
