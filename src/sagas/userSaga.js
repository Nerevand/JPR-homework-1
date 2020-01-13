import { put, call } from 'redux-saga/effects'
import * as types from '../actions/types';

const requestToServer = ({ mail, password }) => {
  const userStorage = JSON.parse(localStorage.getItem('dataStorage'));
  const user = userStorage.filter(el => el.mail === mail && el.password === password)[0];
  return user;
}

export default function* workerSaga({ userData }) {
  const { mail, password, handleError, handleSuccess } = userData;
  try {
    const data = yield call(requestToServer, { mail, password });
    if (data) {
      setTimeout(() => {
        localStorage.removeItem('user');
        localStorage.setItem('user', JSON.stringify(data))
        handleSuccess ? handleSuccess() : (() => {})()
      }, 1500);
    }
    yield put({ type: types.CURRENT_USER, payload: data });
  } catch (e) {
    setTimeout(() => {
      handleError();
    }, 1500);
  }
}