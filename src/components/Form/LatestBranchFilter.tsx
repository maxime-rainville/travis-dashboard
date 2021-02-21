import { Switch, FormControlLabel } from "@material-ui/core";
import * as React from "react";
import { useSelector } from "react-redux";
import { useActions } from "../../actions";
import * as ReduxActions from "../../actions/filter";
import { RootState } from "../../reducers";


interface Props {
	className?: string
}

export function LatestBranchFilter({className}: Props) {
	const {toggleFilter} = useActions(ReduxActions);
	const {filter} = useSelector((state: RootState) => state.filters);

  return (
		<FormControlLabel
      control={<Switch checked={filter === 'latestStable'} onChange={toggleFilter} />}
      label="Latest only" color="secondary" className={className}/>
	);
}
