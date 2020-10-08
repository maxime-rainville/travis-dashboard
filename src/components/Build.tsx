import { makeStyles, Button, Theme, Typography, Card, CardContent, Grid, CardActions } from "@material-ui/core";
import { NoEncryption } from "@material-ui/icons";
import * as React from "react";
import { Module } from "../model";
import { BranchBuild } from './BranchBuild';

const variantByState: any = {
	errored: 'contained',
	failed: 'contained',
	passed: 'outlined'
}

export function Build({name, branches, state}: Module) {
	const classes = useStyles({state});

	return (
		<Grid item xs={6} sm={4} md={3}>
			<a href={`https://travis-ci.org/github/${name}/branches`} style={{textDecoration: 'none'}}>
				<Card className={classes.box}>
					<CardContent>
						<Typography gutterBottom variant="h6" component="h2">
							{name}
						</Typography>
						<Typography variant="body2" color="textSecondary" component="p">
							
						</Typography>
						{ state !== 'passed' && <div className={classes.cardActions}>
							{Object.keys(branches).map(branch => <BranchBuild module={name} branch={branch} key={branch} build={branches[branch]} />)}
						</div>}
					</CardContent>
				</Card>
			</a>
		</Grid>
	);
}

const styledBy = (property: string, props: any, mapping: any): string =>
	mapping[props[property]];
const useStyles = makeStyles((theme: Theme) => ({
	box: (props: any) => ({
		borderRadius: 8,
		textDecoration: 'none',
		background: props['state'] === 'passed' ? "linear-gradient(45deg, #61b047 30%, #00ca99 90%)" : undefined
	}),

	text: {
		color: "white",
	},

	branchBtn: {
		margin: '0 8px 8px 0',
		flexGrow: 1
	},

	cardActions: {
		flexWrap: 'wrap',
		display: 'flex'
	}
}));
