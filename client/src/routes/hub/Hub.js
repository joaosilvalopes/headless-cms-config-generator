import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import NewApp from './routes/new-app';
import SideMenu from '../../components/side-menu';

const styles = ({ drawerWidth }) => ({
	div: {
		marginLeft: drawerWidth,
		flex: 1
	}
});

function Hub({ history, classes }) {
	const loggedIn = useSelector(state => state.user.loggedIn);

	useEffect(() => {
		if (!loggedIn) {
			history.push('/');
		}
	}, [loggedIn]);

	return (
		<>
			<SideMenu />
			<div className={classes.div}>
				<Route path="/hub/new-app" component={NewApp} />
			</div>
		</>
	);
}

export default withStyles(styles)(Hub);
