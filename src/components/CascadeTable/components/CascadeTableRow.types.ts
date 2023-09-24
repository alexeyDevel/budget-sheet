import { IBudgetRow } from '@/models/IBudgetRow';

export type TBudgetTableRowProps = {
  row: IBudgetRow;
  level: number;
  parentId: number | null;
};
