import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';

import AppOption from './components/AppOption';

import styles from './SideMenu.css';

function SideMenu({ classes }) {
	return (
		<Drawer
			className={classes.drawer}
			variant="permanent"
			classes={{
				paper: classes.drawerPaper
			}}
		>
			<List>
				<AppOption />
			</List>
		</Drawer>
	);
}

export default withStyles(styles)(SideMenu);
