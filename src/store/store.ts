import { configureStore } from '@reduxjs/toolkit';
import { emptySplitApi } from './emptyApi';
import themeReducer from './themeSlice';
import apiConfigReducer from './apiConfigSlice';

export const store = configureStore({
  reducer: {
    [emptySplitApi.reducerPath]: emptySplitApi.reducer,
    theme: themeReducer,
    apiConfig: apiConfigReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(emptySplitApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
