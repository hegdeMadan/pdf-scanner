import { combineReducers, createStore } from 'redux';
import { authReducer } from './authReducer';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { RootStateOrAny } from 'react-redux';

const rootReducer = combineReducers({
  authState: authReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2
 };

const persistedReducer = persistReducer<RootStateOrAny>(persistConfig, rootReducer);

export const store = createStore(rootReducer);
export const persistor = persistStore(store);
