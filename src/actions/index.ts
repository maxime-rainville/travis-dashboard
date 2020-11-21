import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

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
