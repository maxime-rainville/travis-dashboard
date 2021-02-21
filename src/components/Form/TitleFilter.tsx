import { TextField } from "@material-ui/core";
import * as React from "react";
import { useSelector } from "react-redux";
import { useActions } from "../../actions";
import * as ReduxActions from "../../actions/filter";
import { RootState } from "../../reducers";


interface Props {
	className?: string
}

export function TitleFilter({className}: Props) {
	const {setTerm} = useActions(ReduxActions);
	const {partialTerm} = useSelector((state: RootState) => state.filters);
	return (
		<TextField
      label="Filter by name" variant="filled" color="secondary"
      onChange={event => setTerm(event.target.value)} className={className} value={partialTerm}
      style={{maxWidth: '100%'}} />
	);
}
