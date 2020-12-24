import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { ResultLoader } from "../components/ResultLoader";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";
import { useSearching } from "../selectors/useSearching";
import { useMergeups } from "../selectors/useMergeups";
import * as MergeupActions from "../actions/mergeups";
import { useActions } from "../actions";
import { Mergeup } from "../components/Mergeup";

export function MergeupPage() {
  const { initMergeupData } = useActions(MergeupActions);
  React.useEffect( initMergeupData, [] );
	const classes = useStyles();
  const isSearching = useSearching();
  const {loading, mergeups} = useMergeups();
  const { favourites } = useSelector(({favourites}: RootState) => ({favourites}));
  const favModules = mergeups.filter(({repo}) => favourites.includes(repo));
  const otherModules = mergeups.filter(({repo}) => !favourites.includes(repo));

	return (
  <ResultLoader loading={loading || isSearching} results={mergeups}>
		<div className={classes.root}>

      {favModules.length > 0 && <Grid className={classes.centerContainer} container direction="row" justify="center" alignItems="stretch" spacing={3}>
				{favModules.map( ({repo, ...props}) => <Mergeup key="repo" repo={repo} {...props} />)}
			</Grid>}

      {otherModules.length > 0 && <Grid className={classes.centerContainer} container direction="row" justify="center" alignItems="stretch" spacing={3}>
				{otherModules.map( ({repo, ...props}) => <Mergeup key="repo" repo={repo} {...props} />)}
			</Grid>}
		</div>
  </ResultLoader>);
}

const useStyles = makeStyles({
	root: {
		textAlign: "center",
		paddingTop: 20,
		paddingLeft: 15,
		paddingRight: 15,
	},

	centerContainer: {
    justifyContent: "flex-start",
    marginBottom: 60
	},

	button: {
		marginTop: 20,
	},
});
