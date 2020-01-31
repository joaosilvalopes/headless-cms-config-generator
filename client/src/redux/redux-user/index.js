import * as actionTypes from './actionsTypes';
import * as actions from './actions';

const initialState = {
	loggedIn: false
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.LOGIN:
			return {
				...action.payload.user,
				loggedIn: true
			};
		case actionTypes.LOGOUT:
			return initialState;
		default:
			return state;
	}
};

export { actions };
export default reducer;
