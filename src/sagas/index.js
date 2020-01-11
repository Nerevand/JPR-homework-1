import { takeLatest } from 'redux-saga/effects';

import * as types from '../actions/types';

import workerLoaderSaga from './loaderSaga';
import workerUser from './setUser';
import workerUserSaga from './userSaga';

export default function* watcherSaga() {
    yield takeLatest(types.SET_USER, workerUserSaga);
    yield takeLatest(types.USER_EXIST, workerUser);
    yield takeLatest(types.SET_LOADER, workerLoaderSaga);
}