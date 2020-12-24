import { makeStyles, Button } from "@material-ui/core";
import * as React from "react";
import {BuildStateType} from "../model/build";

export const buildStateColours: { [state in BuildStateType]: string } = {
	failed: "#FE6B8B",
	errored: "#FE6B8B",
	passed: "#61b047",
	running: "#fede6b",
	created: "#fede6b",
	started: "#fede6b",
	expired: "#6b8bfe",
	canceled: "#ad495e",
};

interface Props {
	module: string,
	branch: string,
	build: {
		id: number,
		state: string
	}
}

const variantByState: any = {
	errored: 'contained',
	failed: 'contained',
	passed: 'outlined',
	created:  'contained',
	started:  'contained',
	running:  'contained',
}

export function BranchBuild({module, branch, build: {id, state}}: Props) {
	const classes = useStyles({state});
	return <Button
		href={`https://travis-ci.com/github/${module}/builds/${id}`}
		variant={variantByState[state]}
className={classes.branchBtn}>{branch}</Button>;
}

const styledBy = (property: string, props: any, mapping: any): string =>
	mapping[props[property]];

const useStyles = makeStyles(({
	branchBtn: props => {
		const background = styledBy('state', props, buildStateColours)
		return {
			margin: '0 8px 8px 0',
			flexGrow: 1,
			background,
			textDecoration: 'none',
			'&:hover': { background }
		}
	},
}));
