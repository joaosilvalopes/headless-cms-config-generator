import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import cn from 'classnames';
import ChevronRight from 'mdi-material-ui/ChevronRight';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Collapse from '@material-ui/core/Collapse';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core';

import AppItem from './AppItem';

const styles = theme => ({
	listItemIcon: {
		color: theme.palette.primary.main
	},
	chevron: {
		transition: 'transform 0.25s ease-in-out'
	},
	open: {
		transform: 'rotate(90deg)'
	},
	itemText: {
		color: theme.palette.primary.main,
		fontWeight: '500'
	},
	list: {
		padding: '0',
		'& > *': {
			paddingLeft: '7rem'
		}
	},
	newAppButton: {
		borderRadius: '2rem'
	}
});

function AppOption({ classes }) {
	const [open, setOpen] = useState(false);
	const history = useHistory();
	const apps = useSelector(state => Object.values(state.app));

	return (
		<>
			<ListItem button onClick={() => setOpen(open => !open)}>
				<ListItemIcon className={classes.listItemIcon}>
					<ChevronRight
						className={cn(classes.chevron, { [classes.open]: open })}
					/>
				</ListItemIcon>
				<ListItemText>
					<span className={classes.itemText}>Apps</span>
				</ListItemText>
			</ListItem>
			<Collapse in={open} unmountOnExit>
				<List className={classes.list}>
					{apps.map(app => (
						<AppItem key={app.name} {...app} />
					))}
					<ListItem>
						<Button
							className={classes.newAppButton}
							variant="outlined"
							color="primary"
							onClick={() => history.push('/hub/new-app')}
						>
							New App
						</Button>
					</ListItem>
				</List>
			</Collapse>
		</>
	);
}

export default withStyles(styles)(AppOption);
