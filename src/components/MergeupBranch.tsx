import { makeStyles, Button } from "@material-ui/core";
import * as React from "react";
import { Comparaison } from "../model";
import { buildStateColours } from "./BranchBuild";
import classnames from "classnames";

interface Props extends Comparaison {
	repo: string
}

export function MergeupBranch({repo, head, base, ahead_by}: Props) {

  const classes = useStyles();
  const upToDate = ahead_by === 0;
  const status = upToDate ? 'up-to-date' : `ahead by ${ahead_by} commit${ahead_by > 1 ? 's' : ''}`;

	return (
    <Button
		  href={`https://github.com/${repo}/compare/${base}...${head}`}
      className={classnames(classes.root, {[classes.expired]: !upToDate})}
      variant={upToDate ? "outlined" : undefined}>
        <span className={classes.range}>{base}...{head}</span>
        <span>{status}</span>
    </Button>
  );
}

const useStyles = makeStyles(({
	root: {
    margin: '0 8px 8px 0',
    flexGrow: 1,
    textDecoration: 'none',
    width: '100%'
  },
  expired: {
    background: buildStateColours.expired,
    "&:hover": {
      background: buildStateColours.expired,
    }
  },
  range: {
    flexGrow: 1,
    textAlign: 'left'
  }
}));
