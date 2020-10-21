import { makeStyles, Button, Theme, Typography, Card, CardContent, Grid, CardActions } from "@material-ui/core";
import * as React from "react";

export const buildStateColours = {
	failed: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
	errored: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
	passed: "linear-gradient(45deg, #61b047 30%, #00ca99 90%)",
	running: "linear-gradient(45deg, #fede6b 30%, #8bfe6b 90%)",
	expired: "linear-gradient(45deg, #6b8bfe 30%, #de6bfe 90%)",
	canceled: "linear-gradient(45deg, #ad495e 30%, #ad9749 90%)",
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
	passed: 'outlined'
}

const colorByState: any = {
	errored: 'secondary',
	failed: 'secondary',
	passed: 'primary'
}

export function BranchBuild({module, branch, build: {id, state}}: Props) {
	const classes = useStyles({state});
	return <Button 
		href={`https://travis-ci.org/github/${module}/builds/${id}`} 
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
			textDecoration: 'none'
		}
	},
}));
