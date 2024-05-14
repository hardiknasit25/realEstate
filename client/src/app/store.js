import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import userReducer from './users/UserSlice'
import residencyReducer from './Residencies/ResidencySlice'
import storage from 'redux-persist/lib/storage'
import persistStore from 'redux-persist/es/persistStore'

const rootReducer = combineReducers({ user: userReducer, residency: residencyReducer})
const persistConfig = {
  key: 'root',
  storage,
  version: 1 
}

const persistedReducer = persistReducer(persistConfig,rootReducer)

export const store = configureStore({
  reducer: persistedReducer 

})

export const persistor = persistStore(store)