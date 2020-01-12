import { put } from 'redux-saga/effects'
import * as types from '../actions/types';

export default function* workerSaga({data}) {
  try {
    yield put({ type: types.DATA_STORAGE, payload: data });
  } catch (e) {
    console.log(e)
  }
}