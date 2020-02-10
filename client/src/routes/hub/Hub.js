import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';

import NewApp from './routes/new-app';
import { actions as appActions } from '../../redux/redux-app';
import SideMenu from '../../components/side-menu';

const styles = ({ drawerWidth }) => ({
	div: {
		marginLeft: drawerWidth,
		flex: 1
	}
});

function Hub({ history, classes }) {
	const loggedIn = useSelector(state => state.user.loggedIn);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!loggedIn) {
			history.push('/');
		} else {
			dispatch(appActions.load());
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
