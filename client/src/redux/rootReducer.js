import { combineReducers } from 'redux';

import user from './redux-user';
import app from './redux-app';

export default combineReducers({
	user,
	app
});
