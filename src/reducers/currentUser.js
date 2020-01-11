import * as types from '../actions/types';

export default function currentUser(state = {}, action) {
  if (action.type === types.CURRENT_USER) return action.payload
  else return state
}