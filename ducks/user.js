import axios from 'axios'
import Router from 'next/router'
import {takeLatest} from 'redux-saga'
import {call, put} from 'redux-saga/effects'

import * as request from '../core/request'
import {createReducer, createAction, createActionType} from '../core/helper'

// assign namespace to constant creator
const create = createActionType('user')

export const USER_LOGIN = create('USER_LOGIN')
export const USER_LOGIN_WAITING = create('USER_LOGIN_WAITING')
export const USER_LOGIN_ERROR = create('USER_LOGIN_ERROR')
export const USER_LOGIN_SUCCESS = create('USER_LOGIN_SUCCESS')
export const USER_LOGIN_WITH_TOKEN = create('USER_LOGIN_WITH_TOKEN')

// create actions
export const userLogin = createAction(USER_LOGIN)
export const userLoginWaiting = createAction(USER_LOGIN_WAITING)
export const userLoginWithToken = createAction(USER_LOGIN_WITH_TOKEN)

// initial state
const initial = {
  isUserLogin: false,
  isWaiting: false,
  userProfile: {},
}

// workers sagas
// user login by facebook verification code
function* userLoginAsync(action) {
  try {
    const response = yield call(axios.get, `/api/auth/facebook?code=${action.payload}`)
    if (response.data.success) {
      yield put({type: USER_LOGIN_SUCCESS, payload: response.data.payload})
    } else {
      yield put({type: USER_LOGIN_ERROR})
    }
  } catch (e) {
    yield put({type: USER_LOGIN_ERROR})
  }
}

// user login using access token
function* userLoginTokenAsync(action) {
  const response = yield call(request.withToken, `/api/auth/token`, {})
  if (response.success) {
    yield put({type: USER_LOGIN_SUCCESS, payload: response.payload})
  } else {
    yield put({type: USER_LOGIN_ERROR})
  }
}

// watcher sagas
export function* watcherUserLogin() {
  yield takeLatest(USER_LOGIN, userLoginAsync)
  yield takeLatest(USER_LOGIN_WITH_TOKEN, userLoginTokenAsync)
}

export const userReducer = createReducer(initial, state => ({
  [USER_LOGIN_WAITING]: () => {
    return {
      ...state,
      isWaiting: true,
    }
  },
  [USER_LOGIN_ERROR]: () => {
    Router.push('/')
    localStorage.removeItem('token')
    return {
      ...state,
      isWaiting: false,
    }
  },
  [USER_LOGIN_SUCCESS]: profile => {
    Router.push('/')
    localStorage.setItem('token', profile.token)
    return {
      ...state,
      isWaiting: false,
      isUserLogin: true,
      userProfile: profile,
    }
  }
}))
