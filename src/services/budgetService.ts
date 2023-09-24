import { baseUrl, entityID } from '@/config/const';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const budgetApi = createApi({
  reducerPath: 'budgetApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    fetchBudgetList: builder.query({
      query: () => ({
        url: `/v1/outlay-rows/entity/${entityID}/row/list`,
      }),
    }),
    createBudgetRow: builder.mutation({
      query: (row) => ({
        url: `/v1/outlay-rows/entity/${entityID}/row/create`,
        method: 'POST',
        body: row,
      }),
    }),
    updateBudgetRow: builder.mutation({
      query: (row) => ({
        url: `/v1/outlay-rows/entity/${entityID}/row/${JSON.parse(
          row.id,
        )}/update`,
        method: 'POST',
        body: row,
      }),
    }),
    deleteBudgetRow: builder.mutation({
      query: (rowId) => ({
        url: `/v1/outlay-rows/entity/${entityID}/row/${rowId}/delete`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useFetchBudgetListQuery,
  useCreateBudgetRowMutation,
  useUpdateBudgetRowMutation,
  useDeleteBudgetRowMutation,
} = budgetApi;
