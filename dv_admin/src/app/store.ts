import { ThunkAction, Action, createStore, applyMiddleware } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import { logger } from 'redux-logger';
import rootReducers from '../redux/reduce';

const persistConfig = {
  key: "root",
  storage,
  whitelist: ['auth']
};
const persistedReducer = persistReducer(persistConfig, rootReducers);

const sagaMiddleware = createSagaMiddleware();
const middleware = [];
middleware.push(sagaMiddleware);
middleware.push(logger);

export const store = createStore(
  persistedReducer,
  applyMiddleware(...middleware)
);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
