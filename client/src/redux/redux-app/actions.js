import * as actionTypes from './actionTypes';
import sdk from '../../sdk';

export const create = payload => async dispatch => {
	await sdk.post('/app', payload);

	dispatch({
		type: actionTypes.CREATE,
		payload
	});
};

export const load = () => async dispatch => {
	const payload = await sdk.get('/app');

	dispatch({
		type: actionTypes.LOAD,
		payload
	});
};
