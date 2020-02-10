import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { Provider as AlertProvider, transitions, positions } from 'react-alert';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';

import Home from './routes/home';
import AlertTemplate from './components/alert-template';
import Header from './components/header';

import theme from './theme';
import store from './redux/store';

const styles = theme => ({
	main: {
		marginTop: theme.headerHeight,
		minHeight: `calc(100vh - ${theme.headerHeight})`,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center'
	}
});

const options = {
	position: positions.BOTTOM_CENTER,
	transition: transitions.FADE,
	containerStyle: {
		zIndex: 2
	}
};

const routes = ['/verify-email/:token', '/hub/'].map(path => ({
	path,
	component: React.lazy(() =>
		import(`./routes${path.slice(0, path.lastIndexOf('/'))}`)
	)
}));

function App({ classes }) {
	return (
		<Provider store={store}>
			<AlertProvider template={AlertTemplate} {...options}>
				<CssBaseline />
				<Router>
					<Header />
					<main className={classes.main}>
						<Suspense fallback={null}>
							<Route exact path="/" component={Home} />
							{routes.map(props => (
								<Route key={props.path} {...props} />
							))}
						</Suspense>
					</main>
				</Router>
			</AlertProvider>
		</Provider>
	);
}

const withThemeProvider = theme => Component => props => (
	<MuiThemeProvider theme={theme}>{<Component {...props} />}</MuiThemeProvider>
);

export default withThemeProvider(theme)(withStyles(styles)(App));
