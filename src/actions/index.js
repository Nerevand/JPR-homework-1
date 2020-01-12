import * as types from './types';

export const onSetData = (payload) => ({
    type: types.SET_DATASTORAGE,
    data: payload
});

export const onSetUser = (payload) => ({
    type: types.SET_USER,
    userData: payload
});

export const onWriteuser = (payload) => ({
    type: types.USER_EXIST,
    data: payload
});

export const onSetLoader = (payload) => ({
    type: types.SET_LOADER,
    loader: payload
});