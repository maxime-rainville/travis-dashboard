import { CssBaseline } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import * as React from "react";

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
	palette: {
		primary: {
			light: "#e5e5e5",
			main: "#727272",
			dark: "#363839",
			contrastText: "#fff",
		},
		secondary: {
			light: "#005AE1",
			main: "#0F3287",
			dark: "#051E2D",
			contrastText: "#fff",
		},
		type: 'dark'
	},
});

export function withRoot(Component: any) {
	function WithRoot(props: object) {
		// MuiThemeProvider makes the theme available down the React tree
		// thanks to React context.
		return (
			<ThemeProvider theme={theme}>
				{/* Reboot kickstart an elegant, consistent, and simple baseline to build upon. */}
				<CssBaseline />
				<Component {...props} />
			</ThemeProvider>
		);
	}

	return WithRoot;
}
