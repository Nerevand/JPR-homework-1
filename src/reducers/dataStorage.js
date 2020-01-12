import * as types from '../actions/types';

const defaultData = JSON.parse(localStorage.getItem('dataStorage'));

export default function dataStorage(state = defaultData, action) {
  if (action.type === types.DATA_STORAGE) {
    localStorage.setItem('dataStorage', JSON.stringify(action.payload))
    return action.payload
  }
  else return state
}