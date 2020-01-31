import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import { actions } from '../../redux/redux-user';

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
	const dispatch = useDispatch();

	useEffect(() => {
		const userJSON = localStorage.getItem('auth');

		if (userJSON) {
			dispatch(actions.login(JSON.parse(userJSON)));
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
