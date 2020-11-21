import { makeStyles, FormGroup, Switch, FormControlLabel, TextField } from "@material-ui/core";
import * as React from "react";
import { useSelector } from "react-redux";
import { useActions } from "../../actions";
import * as ReduxActions from "../../actions/build";
import { RootState } from "../../reducers";
import { CategoryFilter } from "./CategoryFilter";

interface Props {
	className?: string
}

export function BuildForm({className}: Props) {
	const {toggleFilter, setTerm} = useActions(ReduxActions);
	const {filter} = useSelector((state: RootState) => state.build);
	const classes = useStyles();
	return (
		<FormGroup row className={`${className} ${classes.root}`}>
			<TextField 
				label="Filter by name" variant="filled" color="secondary"
				onChange={event => setTerm(event.target.value)} className={classes.term} />
			<CategoryFilter />
			<FormControlLabel
				control={<Switch checked={filter === 'latestStable'} onChange={toggleFilter} />} 
				label="Latest only" color="secondary"/>
		</FormGroup>
	);
}

const useStyles = makeStyles(({
	term: {
		flexGrow: 1
	},
	root: {
	}

}));
