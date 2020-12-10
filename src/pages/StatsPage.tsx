import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";
import { Doughnut } from 'react-chartjs-2';
import { buildStateColours } from '../components/BranchBuild';
import { BuildStateType } from "../model";

const labels: BuildStateType[] = [
	'failed',
	'canceled',
	'expired',
	'running',
	'passed'
];

const backgroundColor = labels.map(state => buildStateColours[state]);

function buildData(stats: {[state in BuildStateType]: number}) {
	return {
		labels,
		datasets: [{
			data: labels.map(label => stats[label]),
			backgroundColor
		}]
	};
}


export function StatsPage() {
	const classes = useStyles();
	const {stats, loading} = useSelector((state: RootState) => state.build);

	return loading ? <CircularProgress /> : 	
	(
		<div className={classes.root}>
			<Doughnut data={buildData(stats)} legend={false}  />
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
