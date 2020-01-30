import React from 'react';
import classNames from 'classnames';
import { Provider as AlertProvider, transitions, positions } from 'react-alert';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';

import AlertTemplate from './components/alert-template';
import Header from './components/header';
import RegisterButton from './components/register-button';
import SettingsCube from './components/settings-cube';

import theme from './theme';

const styles = theme => ({
	main: {
		marginTop: theme.headerHeight,
		minHeight: `calc(100vh - ${theme.headerHeight})`,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center'
	},
	buttonGroup: {
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		marginTop: '4rem'
	},
	loginButton: {
		marginRight: '2rem'
	},
	button: {
		width: '12rem'
	}
});

const options = {
	position: positions.BOTTOM_CENTER,
	transition: transitions.FADE
};

function App({ classes }) {
	return (
		<AlertProvider template={AlertTemplate} {...options}>
			<Router>
				<CssBaseline />
				<Header />
				<main className={classes.main}>
					<SettingsCube />
					<div className={classes.buttonGroup}>
						<Button
							size="large"
							className={classNames(classes.loginButton, classes.button)}
							variant="outlined"
							color="primary"
						>
							Login
						</Button>
						<RegisterButton className={classes.button} />
					</div>
				</main>
			</Router>
		</AlertProvider>
	);
}

const withThemeProvider = theme => Component => props => (
	<MuiThemeProvider theme={theme}>{<Component {...props} />}</MuiThemeProvider>
);

export default withThemeProvider(theme)(withStyles(styles)(App));
