import { Grid, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { useSelector } from "react-redux";
import { Build } from "../components";
import { RootState } from "../reducers";

export function HomePage() {
	const classes = useStyles();
	const {modules, loading} = useSelector((state: RootState) => state.build);

	return loading || !modules ? <CircularProgress /> : 	
	(
		<div className={classes.root}>
			<Grid className={classes.centerContainer} container direction="row" justify="center" alignItems="stretch" spacing={3}> 
				{modules.map( ({name, ...props}) => <Build key={name} name={name} {...props} />)}
			</Grid>
		</div>
	);
}

const useStyles = makeStyles({
	root: {
		textAlign: "center",
		paddingTop: 20,
		paddingLeft: 15,
		paddingRight: 15,
	},

	centerContainer: {
		// flex: 1,
		// height: "90%",
		// display: "flex",
		// alignItems: "center",
		// justifyContent: "center",
		// flexDirection: "column",
	},

	button: {
		marginTop: 20,
	},
});
