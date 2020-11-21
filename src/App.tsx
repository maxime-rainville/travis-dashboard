// prettier-ignore
import { AppBar, Drawer as DrawerMui, Hidden, IconButton, Toolbar, Typography, useMediaQuery } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { withRoot } from "./withRoot";
import { useActions } from "./actions";
import * as ReduxActions from "./actions/build";
import { Drawer } from './components/Drawer';
import { BuildForm} from "./components/Form/BuildForm";

import { Routes } from './Routes';


function App() {
	const todoActions = useActions(ReduxActions);
	React.useEffect( () => {
		todoActions.initBuildData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
								className={classes.appTitle}
							>
								Silverstripe CMS Squad dashboard
							</Typography>
							<BuildForm className={classes.appForm} />
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
	appTitle: {
		flexGrow: .7
	},
	appForm: {
		flexGrow: .3
	},
	navIconHide: {
		[theme.breakpoints.up("md")]: {
			display: "none",
		},
	},
	drawerPaper: {
	    width: 250,
        backgroundColor: theme.palette.background.default,
        [theme.breakpoints.up("md")]: {
                width: drawerWidth,
                position: "relative",
                height: "100%",
        },
},
}));

export default withRoot(App);
