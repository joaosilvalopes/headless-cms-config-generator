import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SettingsIcon from 'mdi-material-ui/Settings';
import LogoutIcon from 'mdi-material-ui/Logout';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import Link from '../link';
import styles from './Header.css';
import { actions } from '../../redux/redux-user';

function Header({ classes }) {
	const loggedIn = useSelector(state => state.user.loggedIn);
	const dispatch = useDispatch();

	const logout = () => {
		dispatch(actions.logout());
		localStorage.removeItem('auth');
	};

	return (
		<AppBar position="fixed" className={classes.appBar}>
			<Toolbar>
				<Link to="/">
					<Typography
						className={classes.title}
						variant="h5"
						color="inherit"
						noWrap
					>
						<SettingsIcon className={classes.icon} /> CMS Config Generator
					</Typography>
				</Link>
			</Toolbar>
			{loggedIn && (
				<Button className={classes.logoutButton} onClick={logout}>
					logout <LogoutIcon className={classes.logoutIcon} />
				</Button>
			)}
		</AppBar>
	);
}

export default withStyles(styles)(Header);
