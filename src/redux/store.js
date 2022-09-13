import { applyMiddleware, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import rootReducer from './reducer'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ["auth"]
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

let store = createStore(persistedReducer, applyMiddleware(thunk, logger))
let persistor = persistStore(store)

export {
  store,
  persistor
}