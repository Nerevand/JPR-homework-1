import { put } from 'redux-saga/effects'
import * as types from '../actions/types';

export default function* workerSaga({ data }) {
  try {
    yield put({ type: types.CURRENT_USER, payload: data });
  } catch (e) {
    console.log(e)
  }
}