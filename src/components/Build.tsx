import { makeStyles, Theme } from "@material-ui/core";
import * as React from "react";
import { Module } from "../model";
import { BranchBuild, buildStateColours } from './BranchBuild';
import { ModuleCard } from "./ModuleCard";

export function Build({name, branches, state}: Module) {
  const classes = useStyles({state});

  if (Object.keys(branches).length === 0) {
    return null;
  }

	return (
		<ModuleCard name={name} url={`https://travis-ci.com/github/${name}/branches`} className={classes.box}>
      <div className={classes.cardActions}>
				{Object.keys(branches).map(branch => <BranchBuild module={name} branch={branch} key={branch} build={branches[branch]} />)}
				</div>
    </ModuleCard>
	);
}

const useStyles = makeStyles((theme: Theme) => ({
	box: (props: any) => ({
		background: props['state'] === 'passed' ? buildStateColours.passed : undefined
	}),

	branchBtn: {
		margin: '0 8px 8px 0',
		flexGrow: 1
	},

	cardActions: {
		flexWrap: 'wrap',
		display: 'flex'
  },
}));
