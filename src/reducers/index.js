import account from './account';
import post from './post';

import { combineReducers } from 'redux';

export default combineReducers({
    account,
    post
});