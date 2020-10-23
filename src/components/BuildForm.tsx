import { makeStyles, Button, Theme, Typography, Card, CardContent, Grid, CardActions, FormGroup, Switch, FormControlLabel, TextField } from "@material-ui/core";
import * as React from "react";
import { useSelector } from "react-redux";
import { useActions } from "../actions";
import * as ReduxActions from "../actions/todo";
import { RootState } from "../reducers";

interface Props {
	className: string
}

export function BuildForm({className}: Props) {
	const {toggleFilter, setTerm} = useActions(ReduxActions);
	const {filter} = useSelector((state: RootState) => state.build);
	const classes = useStyles();
	return (
		<FormGroup row className={className}>
			<TextField label="Filter by name" onChange={event => setTerm(event.target.value)} className={classes.term} />
			<FormControlLabel
				control={<Switch checked={filter === 'latestStable'} onChange={toggleFilter} />} 
				label="Latest stable only"/>
		</FormGroup>
	);
}

const useStyles = makeStyles(({
	term: {
		flexGrow: 1
	}
}));
