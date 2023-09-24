import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import { budgetApi } from '@/services/budgetService';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(budgetApi.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
