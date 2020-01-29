import React from 'react';
import SettingsIcon from 'mdi-material-ui/Settings';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import Link from '../link';
import styles from './Header.css';

function Header({ classes }) {
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
		</AppBar>
	);
}

export default withStyles(styles)(Header);
