import React from 'react';
import ChevronRight from 'mdi-material-ui/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	listItemIcon: {
		color: theme.palette.primary.main,
		minWidth: 0
	},
	chevron: {},
	itemText: {
		color: theme.palette.primary.main,
		fontWeight: '500'
	}
});

function AppItem({ classes, name }) {
	return (
		<ListItem button>
			<ListItemText>
				<span className={classes.itemText}>{name}</span>
			</ListItemText>
			<ListItemIcon className={classes.listItemIcon}>
				<ChevronRight className={classes.chevron} />
			</ListItemIcon>
		</ListItem>
	);
}

export default withStyles(styles)(AppItem);
