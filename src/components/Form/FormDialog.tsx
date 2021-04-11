import { makeStyles, FormGroup, Theme, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@material-ui/core";
import * as React from "react";
import { CategoryFilter } from "./CategoryFilter";
import { TitleFilter } from "./TitleFilter";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";
import * as ReduxActions from "../../actions/filter";
import { useActions } from "../../actions";
import { ReleaseLineFilter } from "./ReleaseLineFilter";

interface Props {
	className?: string
}

export function FormDialog({className}: Props) {
	const classes = useStyles();
  const {dialogOpen} = useSelector((state: RootState) => state.filters);
  const {toggleDialog, clearFilters} = useActions(ReduxActions);
  return (
		<Dialog open={dialogOpen} onClose={toggleDialog} fullWidth aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Advanced Filters</DialogTitle>
      <DialogContent>
        <FormGroup>
          <TitleFilter className={classes.term} />
          <CategoryFilter className={classes.cat} />
          <ReleaseLineFilter />
        </FormGroup>
      </DialogContent>
      <DialogActions>
          <Button onClick={toggleDialog}>
            Done
          </Button>
          <Button onClick={clearFilters} color="primary">
            Clear
          </Button>
        </DialogActions>
    </Dialog>
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
    flexGrow: .3
  },
	root: {

	}

}));
