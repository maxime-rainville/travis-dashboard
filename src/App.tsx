// prettier-ignore
import { AppBar, IconButton, Toolbar, useMediaQuery, Drawer as DrawerMui } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { withRoot } from "./withRoot";
import { useActions } from "./actions";
import * as BuildActions from "./actions/build";
import * as FavActions from "./actions/favourite";
import { Drawer } from './components/Drawer';
import { BuildForm} from "./components/Form/BuildForm";

import { Routes } from './Routes';


function App() {
  const buildActions = useActions(BuildActions);
  const { initFavourite } = useActions(FavActions);
	React.useEffect( () => {
    buildActions.initBuildData();
    initFavourite();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const classes = useStyles();
	const [mobileOpen, setMobileOpen] = React.useState(false);

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
          <nav>
            <DrawerMui
              variant={isMobile ? "temporary" : "permanent"}
              open={!isMobile || mobileOpen}
              onClose={() => setMobileOpen(false)}
              classes={{
                root: classes.drawerRoot,
                paper: classes.drawerPaper
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {/* <Typography variant="h6">Silverstripe CMS Squad Dashboard</Typography> */}
              <Drawer />
            </DrawerMui>
          </nav>
					<AppBar className={classes.appBar} >
						<Toolbar>
							<IconButton
								color="inherit"
								aria-label="open drawer"
								onClick={handleDrawerToggle}
								className={classes.navIconHide}
							>
								<MenuIcon />
							</IconButton>
							<BuildForm className={classes.appForm} />
						</Toolbar>
					</AppBar>
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
    [theme.breakpoints.up("md")]: {
      width: 'calc(100% - 240px)'
    }
	},
	appForm: {
		flexGrow: 1
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
  drawerRoot: {
    height: "100%",
  }
}));

export default withRoot(App);
