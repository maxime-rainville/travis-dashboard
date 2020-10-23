import { makeStyles, Button, Theme, Typography, Card, CardContent, Grid, CardActions, FormGroup, Switch, FormControlLabel, TextField } from "@material-ui/core";
import * as React from "react";
import { useSelector } from "react-redux";
import { useActions } from "../actions";
import * as ReduxActions from "../actions/todo";
import { RootState } from "../reducers";

export function BuildForm() {
	const {toggleFilter, setTerm} = useActions(ReduxActions);
	const {filter} = useSelector((state: RootState) => state.build);
	const classes = useStyles();
	return (
		<FormGroup row>
			<TextField label="Filter by name" onChange={event => setTerm(event.target.value)} />
			<FormControlLabel
				control={<Switch checked={filter === 'latestStable'} onChange={toggleFilter} />} 
				label="Latest stable only"/>
		</FormGroup>
	);
}

const useStyles = makeStyles(({
	branchBtn: props => {
		return {
			margin: '0 8px 8px 0',
			flexGrow: 1,
			textDecoration: 'none'
		}
	},
}));
