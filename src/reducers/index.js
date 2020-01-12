import { combineReducers } from "redux";

import currentUser from './currentUser';
import loader from './loader';
import dataStorage from './dataStorage';

export default combineReducers({
    dataStorage,
    currentUser,
    loader
});