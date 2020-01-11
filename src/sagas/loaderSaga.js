import { put, call } from 'redux-saga/effects';

import * as types from '../actions/types';

const requestToServer = (payload) => {
    return payload;
}

export default function* workerLoaderSaga({ loader }) {
    try {
        const data = yield call(requestToServer, loader);
        yield put({ type: types.LOADER, payload: data });
    } catch (e) {
        console.log(e);
    }
}