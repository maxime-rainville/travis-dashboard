import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { BuildAction } from "./build";
import { Action as FilterAction} from './filter';
import { Action as FavouriteAction} from './favourite';

export function useActions(actions: any, deps?: any): any {
	const dispatch = useDispatch();
	return useMemo(
		() => {
			if (Array.isArray(actions)) {
				return actions.map(a => bindActionCreators(a, dispatch));
			}
			return bindActionCreators(actions, dispatch);
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		deps ? [dispatch, ...deps] : deps
	);
}

export type Action =
  | BuildAction
  | FilterAction
  | FavouriteAction
;
