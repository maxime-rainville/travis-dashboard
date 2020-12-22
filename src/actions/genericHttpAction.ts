export interface DataPayload<T> {
  json: T
  lastModified: Date
}

export type ActionType<t,p> = {
  type: t
  payload: p
}

interface reduxAction {
	type: string,
	payload?: any
}

type dispatchCallback = (action: reduxAction) => void;

/**
 * Generate a generic redux action to fetch a JSON file
 * @param url
 * @param loadingActionType
 * @param loadedActionType
 */
export function genericHttpAction(url: string, loadingActionType: string, loadedActionType: string) {
  return () => (
    (dispatch: dispatchCallback) => {
      dispatch({type: loadingActionType});

      fetch(process.env.PUBLIC_URL + `/${url}.json`, {method: 'GET'})
        .then((response) => response.json().then((data) => ({
        json: data,
        lastModified:
          response.headers.has('last-modified') ?
          new Date(response.headers.get('last-modified') as string) :
          undefined
          })))
        .then(data => dispatch({type: loadedActionType, payload: data}));

    }
  );
}
