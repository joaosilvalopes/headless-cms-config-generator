import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function Hub({ history }) {
	const loggedIn = useSelector(state => state.user.loggedIn);

	useEffect(() => {
		if (!loggedIn) {
			history.push('/');
		}
	}, [loggedIn]);

	return 'Logged in';
}

export default Hub;
