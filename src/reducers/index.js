import { combineReducers } from "redux";

import currentUser from './currentUser';
import loader from './loader';

export default combineReducers({
    currentUser,
    loader
});