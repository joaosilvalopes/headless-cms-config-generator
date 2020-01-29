import React from 'react';
import classNames from 'classnames';
import { Link as RouterLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

const styles = {
	wrapper: {
		textDecoration: 'none',
		color: 'inherit'
	}
};

function Link({ classes, className, children, ...rest }) {
	return (
		<RouterLink className={classNames(classes.wrapper, className)} {...rest}>
			{children}
		</RouterLink>
	);
}

export default withStyles(styles)(Link);
