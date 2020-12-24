import { makeStyles, Theme } from "@material-ui/core";
import * as React from "react";
import { CompareEntry } from "../model";
import { MergeupBranch } from "./MergeupBranch";
import { ModuleCard } from "./ModuleCard";

export function Mergeup({repo, compares}: CompareEntry) {
  const classes = useStyles({});
	return (
		<ModuleCard name={repo} url={`https://github.com/${repo}`} className={classes.box}>
      { <div className={classes.cardActions}>
          {compares.map((compare) => <MergeupBranch key={compare.base} repo={repo} {...compare}/>)}
				</div>}
    </ModuleCard>
	);
}

const useStyles = makeStyles((theme: Theme) => ({
	box: (props: any) => ({

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
