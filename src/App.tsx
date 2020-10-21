// prettier-ignore
import { AppBar, Badge, Divider, Drawer as DrawerMui, Hidden, IconButton, List, ListItem, ListItemIcon, ListItemText, ListSubheader, Toolbar, Typography, useMediaQuery } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import HomeIcon from "@material-ui/icons/Home";
import GitHub from "@material-ui/icons/GitHub";
import UpdateIcon from '@material-ui/icons/Update';
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { useSelector } from "react-redux";
import { Route, BrowserRouter } from "react-router-dom";
import { history } from "./configureStore";
import { HomePage } from "./pages";
import { RootState } from "./reducers/index";
import { withRoot } from "./withRoot";
import { useActions } from "./actions";
import * as ReduxActions from "./actions/todo";
import { BuildStateType } from "./model";
import { buildStateColours } from './components/BranchBuild';

function Routes() {
	const classes = useStyles();

	return (
		<div className={classes.content}>
			<Route exact={true} path="/" component={HomePage} />
			<Route exact={true} path="/home" component={HomePage} />
		</div>
	);
}

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

function Drawer(props: {  }) {
	const classes = useStyles();
	const lastModified = useSelector((state: RootState) => state.build.lastModified);
	const ago = lastModified ? 
	    `Fetched ${Math.round(((new Date()).getTime() - lastModified.getTime()) / 1000 / 60)} min ago` :
		'';

	return (
		<div className={classes.drawerList}>
			<div className={classes.drawerHeader} />
			<Divider />
			<List>
				<ListItem button onClick={() => history.push("/")}>
					<ListItemIcon>
						<HomeIcon />
					</ListItemIcon>
					<ListItemText primary="Home" />
				</ListItem>
				<ListItem component="a" button href="https://github.com/maxime-rainville/travis-dashboard/">
					<ListItemIcon>
						<GitHub />
					</ListItemIcon>
					<ListItemText primary="View Source" />
				</ListItem>
				<ListItem component="a" button href="https://travis-ci.org/github/maxime-rainville/travis-dashboard/branches">
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

function App() {
	const todoActions = useActions(ReduxActions);
	React.useEffect( () => {
		todoActions.initBuildData();
	}, []);

	const classes = useStyles();
	const [mobileOpen, setMobileOpen] = React.useState(true);
	// const state = useSelector((state: RootState) => state);

	const isMobile = useMediaQuery((theme: Theme) =>
		theme.breakpoints.down("sm")
	);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	return (
		<BrowserRouter basename={process.env.PUBLIC_URL}>
			<div className={classes.root}>
				<div className={classes.appFrame}>
					<AppBar className={classes.appBar}>
						<Toolbar>
							<IconButton
								color="inherit"
								aria-label="open drawer"
								onClick={handleDrawerToggle}
								className={classes.navIconHide}
							>
								<MenuIcon />
							</IconButton>
							<Typography
								variant="h6"
								color="inherit"
								noWrap={isMobile}
							>
								Silverstripe CMS Build dashboard
							</Typography>
						</Toolbar>
					</AppBar>
					<Hidden mdUp>
						<DrawerMui
							variant="temporary"
							anchor={"left"}
							open={mobileOpen}
							classes={{
								paper: classes.drawerPaper,
							}}
							onClose={handleDrawerToggle}
							ModalProps={{
								keepMounted: true, // Better open performance on mobile.
							}}
						>
							<Drawer />
						</DrawerMui>
					</Hidden>
					<Hidden smDown>
						<DrawerMui
							variant="permanent"
							open
							classes={{
								paper: classes.drawerPaper,
							}}
						>
							<Drawer />
						</DrawerMui>
					</Hidden>
					<Routes />
				</div>
			</div>
		</BrowserRouter>
	);
}

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) => ({
	root: {
		width: "100%",
		height: "100%",
		zIndex: 1,
		overflow: "hidden",
	},
	appFrame: {
		position: "relative",
		display: "flex",
		width: "100%",
		height: "100%",
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		position: "absolute",
	},
	navIconHide: {
		[theme.breakpoints.up("md")]: {
			display: "none",
		},
	},
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
	drawerList: {
		minHeight: '100%',
		display: 'flex',
		flexDirection: 'column'
	},
	drawerSpacer: {
		flexGrow: 1
	},
	content: {
		backgroundColor: theme.palette.background.default,
		overflow: 'scroll',
		width: "100%",
		height: "calc(100% - 56px)",
		marginTop: 56,
		[theme.breakpoints.up("sm")]: {
			height: "calc(100% - 64px)",
			marginTop: 64,
		},
	},
}));

export default withRoot(App);
