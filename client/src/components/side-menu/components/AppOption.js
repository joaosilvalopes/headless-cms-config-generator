import React, { useState } from 'react';
import ChevronRight from 'mdi-material-ui/ChevronRight';
import ChevronDown from 'mdi-material-ui/ChevronDown';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
	chevron: {
		color: theme.palette.primary.main
	},
	itemText: {
		color: theme.palette.primary.main,
		fontWeight: '500'
	}
});

function AppOption({ classes }) {
	const [open, setOpen] = useState(false);

	return (
		<ListItem button onClick={() => setOpen(open => !open)}>
			<ListItemIcon className={classes.chevron}>
				{open ? <ChevronRight /> : <ChevronDown />}
			</ListItemIcon>
			<ListItemText>
				<span className={classes.itemText}>Apps</span>
			</ListItemText>
		</ListItem>
	);
}

export default withStyles(styles)(AppOption);
