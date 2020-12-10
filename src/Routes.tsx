// prettier-ignore
import { Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { HomePage, StatsPage } from "./pages";

export function Routes() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Switch>
				<Route exact path="/" component={HomePage} />
				<Route path="/home" component={HomePage} />
				<Route path="/stats" component={StatsPage} />
			</Switch>
		</div>
	);
}

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		backgroundColor: theme.palette.background.default,
		overflow: 'auto',
		width: "100%",
		height: "calc(100% - 56px)",
		marginTop: 56,
		[theme.breakpoints.up("sm")]: {
			height: "calc(100% - 64px)",
			marginTop: 64,
		},
	},
}));
