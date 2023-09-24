import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TBudgetTableProps } from './CascadeTable.types';
import { IBudgetRow } from '@/models/IBudgetRow';
import CascadeTableRow from './components/CascadeTableRow';
import clsx from 'clsx';
import style from './CascadeTable.style.module.scss';

export default function CascadeTable({ rows }: TBudgetTableProps) {
  const renderRows = (
    data: IBudgetRow[],
    level: number,
    parentId: number | null,
  ) => {
    return data.map((row) => (
      <CascadeTableRow
        key={row.id}
        row={row}
        level={level}
        parentId={parentId}
      />
    ));
  };

  const renderRecursiveRows = (
    data: IBudgetRow[],
    level: number,
    parentId: number | null,
  ) => {
    return data.map((row) => (
      <React.Fragment key={row.id}>
        {renderRows([row], level, parentId)}
        {row.child &&
          renderRecursiveRows(row.child, level + 1, row.id ? row.id : null)}
      </React.Fragment>
    ));
  };

  return (
    <TableContainer className={style.tableContainer}>
      <Table
        stickyHeader
        aria-label="sticky table"
        className={style.cascadeTable}
      >
        <TableHead className={style.cascadeTable_head}>
          <TableRow className={style.cascadeTable_headRow}>
            <TableCell
              className={clsx(
                style.cascadeTable_headCell,
                style.cascadeTable_headCell_level,
              )}
            >
              Уровень
            </TableCell>
            <TableCell className={style.cascadeTable_headCell}>
              Наименование работ
            </TableCell>
            <TableCell className={style.cascadeTable_headCell}>
              Основная з/п
            </TableCell>
            <TableCell className={style.cascadeTable_headCell}>
              Оборудование
            </TableCell>
            <TableCell className={style.cascadeTable_headCell}>
              Накладные расходы
            </TableCell>
            <TableCell className={style.cascadeTable_headCell}>
              Сметная прибыль
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody className={style.cascadeTable_body}>
          {renderRecursiveRows(rows, 0, null)}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
