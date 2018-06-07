import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import createSagaMiddleware from 'redux-saga'
import {all} from 'redux-saga/effects'

import {userReducer, watcherUserLogin} from './user'

const saga = createSagaMiddleware()

const composeEnhancers =
  typeof window === 'object'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose

export const reducers = combineReducers({
  user: userReducer,
})
const store = createStore(reducers, composeEnhancers(applyMiddleware(saga)))

function* rootSaga() {
  yield all([
    watcherUserLogin(),
  ])
}

saga.run(rootSaga)

export default store
