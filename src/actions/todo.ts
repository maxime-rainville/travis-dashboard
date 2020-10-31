import { BuildActions, CategoryFilterType } from "../model";

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
				new Date(<string>response.headers.get('last-modified')) : 
				undefined
		  	})))
		  .then(data => dispatch({type: BuildActions.BUILD_LOADED, payload: data}));
		
	}
}

export function toggleFilter() {
	return {type: BuildActions.TOGGLE_FILTER}
}

export function setTerm(term: string) {
	return (dispatch: dispatchCallback) => {
		const triggerSearchTimeout = setTimeout(() => {
			dispatch({type: BuildActions.TRIGGER_SEARCH});
		}, 500)

		dispatch({
			type: BuildActions.SET_TERM, 
			payload:{
				term,
				triggerSearchTimeout
			}
		});
	}
}

export function setCategoryFilter(categoryFilters: CategoryFilterType[]) {
	return {type: BuildActions.SET_CATEGORY_FILTER, payload: {categoryFilters}}
}