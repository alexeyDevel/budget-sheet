import { createSlice } from '@reduxjs/toolkit';
import { IBudgetRow } from '@/models/IBudgetRow';

interface BudgetState {
  budgetList: IBudgetRow[];
}

const initialState: BudgetState = {
  budgetList: [],
};

const BudgetSlice = createSlice({
  name: 'budget',
  initialState,
  reducers: {
    setBudgetList: (state, action) => {
      state.budgetList = action.payload;
    },
    addBudgetRow: (state, action) => {
      const { parentId, newRow } = action.payload;
      const addToRow = (
        rows: IBudgetRow[],
        parentId: number | null,
        newRow: IBudgetRow,
      ) => {
        return rows.map((row) => {
          if (row.id === parentId) {
            row.child = [...(row.child || []), newRow];
          } else if (row.child && row.child.length > 0) {
            row.child = addToRow(row.child, parentId, newRow);
          }
          return row;
        });
      };
      if (parentId === null) {
        state.budgetList.push(newRow);
      } else {
        state.budgetList = addToRow(state.budgetList, parentId, newRow);
      }
    },
    removeBudgetRow: (state, action) => {
      const { rowId } = action.payload;
      const removeRow = (rows: IBudgetRow[], rowId: number) => {
        return rows.filter((row) => {
          if (row.id === rowId) {
            return false;
          } else if (row.child && row.child.length > 0) {
            row.child = removeRow(row.child, rowId);
          }
          return true;
        });
      };
      state.budgetList = removeRow(state.budgetList, rowId);
    },
    updateBudgetRow: (state, action) => {
      const { rowId, updatedRow } = action.payload;
      const updateRow = (
        rows: IBudgetRow[],
        rowId: number,
        updatedRow: IBudgetRow,
      ) => {
        return rows.map((row) => {
          if (row.id === rowId) {
            return { ...row, ...updatedRow };
          } else if (row.child && row.child.length > 0) {
            row.child = updateRow(row.child, rowId, updatedRow);
          }
          return row;
        });
      };
      state.budgetList = updateRow(state.budgetList, rowId, updatedRow);
    },
  },
});

export const { setBudgetList, addBudgetRow, removeBudgetRow, updateBudgetRow } =
  BudgetSlice.actions;
export default BudgetSlice.reducer;
