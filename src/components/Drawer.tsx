// prettier-ignore
import { Divider, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import HomeIcon from "@material-ui/icons/Home";
import PieChartIcon from '@material-ui/icons/PieChart';
import GitHub from "@material-ui/icons/GitHub";
import UpdateIcon from '@material-ui/icons/Update';
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../reducers/index";
import { BuildStateType } from "../model";
import { buildStateColours } from './BranchBuild';
import { useHistory } from 'react-router-dom';

const states: BuildStateType[] = [
	'failed',
	'canceled',
	'expired',
	'running',
	'passed'
];

const styledBy = (property: string, props: any, mapping: any): string =>
	mapping[props[property]]

const legendStyles = makeStyles({
	legend: props => ({
		background: styledBy('state', props, buildStateColours),
		width: 24,
		height: 24,
		borderRadius: 3
	})
});

export function Drawer(props: {  }) {
	const classes = useStyles();
	const lastModified = useSelector((state: RootState) => state.builds.lastModified);
	const ago = lastModified ?
	    `Fetched ${Math.round(((new Date()).getTime() - lastModified.getTime()) / 1000 / 60)} min ago` :
		'';
	const history = useHistory();

	return (
		<div className={classes.root}>
			<div className={classes.drawerHeader} />
			<Divider />
			<List>
				<ListItem button onClick={() => history.push("/")}>
					<ListItemIcon>
						<HomeIcon />
					</ListItemIcon>
					<ListItemText primary="Builds" />
				</ListItem>
				<ListItem button onClick={() => history.push("/stats")}>
					<ListItemIcon>
						<PieChartIcon />
					</ListItemIcon>
					<ListItemText primary="Stats" />
				</ListItem>
				<ListItem component="a" button href="https://github.com/maxime-rainville/travis-dashboard/">
					<ListItemIcon>
						<GitHub />
					</ListItemIcon>
					<ListItemText primary="View Source" />
				</ListItem>
				<ListItem component="a" button href="https://github.com/maxime-rainville/travis-dashboard/actions?query=workflow%3A%22Build+and+Deploy%22">
					<ListItemIcon>
						<UpdateIcon />
					</ListItemIcon>
					<ListItemText primary="Refresh data" secondary={ago} />
				</ListItem>
			</List>
			<div className={classes.drawerSpacer}></div>
			<List>
				<ListSubheader>Legend</ListSubheader>
				{
					states.map(state => (
						<ListItem key={state}>
							<ListItemIcon>
								<span className={legendStyles({state}).legend}></span>
							</ListItemIcon>
							<ListItemText primary={state} />
						</ListItem>
					))
				}
			</List>
		</div>
	);
}
const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) => ({
	drawerHeader: { ...theme.mixins.toolbar },
	drawerPaper: {
		width: 250,
		backgroundColor: theme.palette.background.default,
		[theme.breakpoints.up("md")]: {
			width: drawerWidth,
			position: "relative",
			height: "100%",
		},
	},
	root: {
		minHeight: '100%',
		display: 'flex',
		flexDirection: 'column'
	},
	drawerSpacer: {
		flexGrow: 1
	},
}));
