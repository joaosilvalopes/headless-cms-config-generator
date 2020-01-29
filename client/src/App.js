import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';

import Header from './components/header';
import SettingsCube from './components/settings-cube/SettingsCube';

import theme from './theme';

const styles = theme => ({
	main: {
		marginTop: theme.headerHeight,
		minHeight: `calc(100vh - ${theme.headerHeight})`,
		display: 'flex'
	}
});

function App({ classes }) {
	return (
		<Router>
			<CssBaseline />
			<Header />
			<main className={classes.main}>
				<SettingsCube />
			</main>
		</Router>
	);
}

const withThemeProvider = theme => Component => props => (
	<MuiThemeProvider theme={theme}>{<Component {...props} />}</MuiThemeProvider>
);

export default withThemeProvider(theme)(withStyles(styles)(App));
