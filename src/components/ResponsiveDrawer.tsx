// prettier-ignore
import { Drawer, Hidden, IconButton } from "@material-ui/core";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Theme, useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import CloseIcon from "@material-ui/icons/Close";

interface Props {
  children: React.ReactNode,
  mobileOpen: boolean,
  setMobileOpen: ((mobileOpen: boolean) => void)
}

export function ResponsiveDrawer({children, mobileOpen, setMobileOpen}: Props) {
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const toggle = () => setMobileOpen(!mobileOpen);

  return (
    <nav className={""}>
      <Drawer
        variant={isDesktop ? "permanent" : "temporary"}
        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
        open={isDesktop || mobileOpen}
        onClose={() => setMobileOpen(false)}
        classes={{
          paper: "",
        }}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        <IconButton onClick={toggle} className={""}>
          <CloseIcon/>
        </IconButton>
        {children}
      </Drawer>
      </nav>
  );
}
const useStyles = makeStyles((theme: Theme) => ({
	// drawerHeader: { ...theme.mixins.toolbar },
	// drawerPaper: {
	// 	width: 250,
	// 	backgroundColor: theme.palette.background.default,
	// 	[theme.breakpoints.up("md")]: {
	// 		width: drawerWidth,
	// 		position: "relative",
	// 		height: "100%",
	// 	},
	// },
	// root: {
	// 	minHeight: '100%',
	// 	display: 'flex',
	// 	flexDirection: 'column'
	// },
	// drawerSpacer: {
	// 	flexGrow: 1
	// },
}));
