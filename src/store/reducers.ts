import { combineReducers } from 'redux';
import { budgetApi } from '@/services/budgetService';
import BudgetSlice from './BudgetSlice';

const rootReducer = combineReducers({
  budget: BudgetSlice,
  [budgetApi.reducerPath]: budgetApi.reducer,
});

export default rootReducer;
