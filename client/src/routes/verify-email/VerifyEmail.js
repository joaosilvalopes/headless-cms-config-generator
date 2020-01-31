import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../../redux/redux-user';
import sdk from '../../sdk';
import { useAlert } from 'react-alert';

function VerifyEmail(props) {
	const dispatch = useDispatch();
	const alert = useAlert();
	const verify = async () => {
		try {
			const user = await sdk.post('/verify-email', {
				token: props.match.params.token
			});

			localStorage.setItem('auth', JSON.stringify(user));
			dispatch(actions.login(user));
			props.history.push('/hub');

			alert.success('Account verified successfully');
		} catch {
			alert.error('Invalid token');
			props.history.push('/');
		}
	};

	useEffect(() => {
		verify();
	}, []);

	return '';
}

export default VerifyEmail;
