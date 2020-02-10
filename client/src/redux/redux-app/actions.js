import * as actionTypes from './actionTypes';
import sdk from '../../sdk';

export const create = payload => async dispatch => {
	await sdk.post('/app', payload);

	dispatch({
		type: actionTypes.CREATE,
		payload
	});
};
