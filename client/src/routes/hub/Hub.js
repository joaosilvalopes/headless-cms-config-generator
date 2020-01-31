import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import SideMenu from '../../components/side-menu';

function Hub({ history }) {
	const loggedIn = useSelector(state => state.user.loggedIn);

	useEffect(() => {
		if (!loggedIn) {
			history.push('/');
		}
	}, [loggedIn]);

	return <SideMenu />;
}

export default Hub;
