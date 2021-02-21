import { makeStyles, FormGroup, useMediaQuery, Theme, IconButton } from "@material-ui/core";
import * as React from "react";
import { CategoryFilter } from "./CategoryFilter";
import FilterListIcon from '@material-ui/icons/FilterList';
import { TitleFilter } from "./TitleFilter";
import { LatestBranchFilter } from "./LatestBranchFilter";
import { FormDialog } from "./FormDialog";
import * as ReduxActions from "../../actions/filter";
import { useActions } from "../../actions";

interface Props {
	className?: string
}

export function BuildForm({className}: Props) {
	const classes = useStyles();
  const {toggleDialog} = useActions(ReduxActions);
  const useModal = useMediaQuery((theme: Theme) =>
  theme.breakpoints.down("md")
  );
	return (
    <React.Fragment>
      <FormGroup row className={`${className} ${classes.root}`}>
        <TitleFilter className={classes.term} />
        {!useModal && <CategoryFilter className={classes.cat} /> }
        {!useModal &&  <LatestBranchFilter /> }
        {useModal && <IconButton aria-label="Advanced search filter" onClick={toggleDialog}><FilterListIcon /></IconButton> }
      </FormGroup>
      <FormDialog />
    </React.Fragment>
	);
}

const useStyles = makeStyles((theme: Theme) => ({
	term: {
		flexGrow: 1,
    [theme.breakpoints.up("lg")]: {
			flexGrow: .7,
		},
  },
  cat: {
    flexGrow: .3,
    width: 250
  },
	root: {
	}

}));
