import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { Build } from "../components";
import { ResultLoader } from "../components/ResultLoader";
import { useBuilds } from "../selectors/useBuilds";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";

export function HomePage() {
	const classes = useStyles();
  const {modules, loading} = useBuilds();
  const favourites = useSelector((state: RootState) => state.favourites);
  const favModules = modules.filter(({name}) => favourites.includes(name));
  const otherModules = modules.filter(({name}) => !favourites.includes(name));

	return (
  <ResultLoader loading={loading} results={modules}>
		<div className={classes.root}>

      {favModules.length > 0 && <Grid className={classes.centerContainer} container direction="row" justify="center" alignItems="stretch" spacing={3}>
				{favModules.map( ({name, ...props}) => <Build key={name} name={name} {...props} />)}
			</Grid>}

      {otherModules.length > 0 && <Grid className={classes.centerContainer} container direction="row" justify="center" alignItems="stretch" spacing={3}>
				{otherModules.map( ({name, ...props}) => <Build key={name} name={name} {...props} />)}
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
