import * as types from '../actions/types';

export default function currentUser(state = false, action) {
  if (action.type === types.LOADER) return action.payload
  else return state
}