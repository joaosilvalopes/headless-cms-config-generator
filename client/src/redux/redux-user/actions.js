import * as actionTypes from './actionTypes';

export const login = user => ({
	type: actionTypes.LOGIN,
	payload: { user }
});

export const logout = () => ({
	type: actionTypes.LOGOUT
});
