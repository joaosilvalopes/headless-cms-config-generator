import * as actionTypes from './actionTypes';
import * as actions from './actions';

const initialState = {};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.CREATE:
			return {
				...state,
				[action.payload.slug]: action.payload
			};
		case actionTypes.LOAD:
			return action.payload;
		default:
			return state;
	}
};

export { actions };
export default reducer;
