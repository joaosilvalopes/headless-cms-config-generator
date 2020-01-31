import * as actionTypes from './actionsTypes';

export const login = user => ({
	type: actionTypes.LOGIN,
	payload: { user }
});

export const logout = () => ({
	type: actionTypes.LOGOUT
});
