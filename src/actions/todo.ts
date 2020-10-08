import { BuildActions } from "../model";

interface reduxAction {
	type: string,
	payload?: any
}

type dispatchCallback = (action: reduxAction) => void;

export function initBuildData() {
	return (dispatch: dispatchCallback) => {
		dispatch({type: BuildActions.LOADING_BUILDS});

		fetch(process.env.PUBLIC_URL + '/buildData.json', {method: 'GET'})
		  .then((response) => response.json())
		  .then(data => dispatch({type: BuildActions.BUILD_LOADED, payload: data}));
		
	}
}
