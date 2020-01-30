import React, { useEffect } from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import LoginButton from '../../components/login-button';
import RegisterButton from '../../components/register-button';
import SettingsCube from '../../components/settings-cube';

const styles = {
	buttonGroup: {
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		marginTop: '4rem'
	},
	loginButton: {
		marginRight: '2rem'
	},
	button: {
		width: '12rem'
	}
};

function Home({ classes, history }) {
	useEffect(() => {
		if (localStorage.getItem('auth')) {
			history.push('/hub');
		}
	}, []);

	return (
		<>
			<SettingsCube />
			<div className={classes.buttonGroup}>
				<LoginButton
					onLogin={() => history.push('/hub')}
					className={classNames(classes.loginButton, classes.button)}
				/>
				<RegisterButton className={classes.button} />
			</div>
		</>
	);
}

export default withStyles(styles)(Home);
