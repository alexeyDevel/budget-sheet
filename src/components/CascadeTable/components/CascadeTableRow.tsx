import { useEffect, useRef, useState } from 'react';
import { TableRow, TableCell, ButtonGroup, IconButton } from '@mui/material';
import FileCreateIcon from '@assets/icons/fileEdit.svg';
import TrashIcon from '@assets/icons/trashRed.svg';
import clsx from 'clsx';
import { TBudgetTableRowProps } from './CascadeTableRow.types';
import style from './CascadeTableRow.style.module.scss';
import InputText from '@/components/InputText/InputText';
import { budgetApi } from '@/services/budgetService';
import { IBudgetRow } from '@/models/IBudgetRow';
import { useAppDispatch } from '@/store/hooks';
import {
  addBudgetRow,
  removeBudgetRow,
  updateBudgetRow,
} from '@/store/budgetSlice';
import useOutsideClick from '@/lib/hooks/useOutsideClick';
import { formatNumber } from './CascadeTableRow.service';

const calculateLeftPaddingTh = (level: number) => `${16 + level * 21}px`;
const calculateLeftPaddingVector = (level: number) => `${8 + level * 21}px`;
const budgetRow = {
  rowName: '',
  equipmentCosts: 0,
  estimatedProfit: 0,
  parentId: null,
  machineOperatorSalary: 0,
  mainCosts: 0,
  materials: 0,
  mimExploitation: 0,
  overheads: 0,
  salary: 0,
  supportCosts: 0,
  total: 0,
};

export default function CascadeTableRow({
  row,
  level,
  parentId,
}: TBudgetTableRowProps) {
  const dispatch = useAppDispatch();
  const rowRef = useRef<HTMLTableRowElement | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newRow, setNewRow] = useState<IBudgetRow>(budgetRow);
  const [createBudgetRow, { data: newFetchedRow }] =
    budgetApi.useCreateBudgetRowMutation();
  const [deleteBudgetRow, { data: deleteRequestData }] =
    budgetApi.useDeleteBudgetRowMutation();
  const [sendUpdateBudgetRow, { data: updateRequestData }] =
    budgetApi.useUpdateBudgetRowMutation();
  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      await createBudgetRow({ ...newRow, parentId });
      setIsCreating(false);
      setNewRow(budgetRow);
    }
  };
  const handleKeyDownCurrentRow = async (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === 'Enter') {
      await sendUpdateBudgetRow(newRow);
      setIsEditing(false);
      setNewRow(budgetRow);
    }
  };
  const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {
    if (isEditing)
      setNewRow({
        ...row,
        machineOperatorSalary: 0,
        mainCosts: 0,
        materials: 0,
        mimExploitation: 0,
        supportCosts: 0,
        total: 0,
      });
    else setNewRow(budgetRow);
  }, [isEditing]);
  const handleDoubleClick = () => {
    setIsEditing(true);
  };
  const handleCreateRow = () => {
    setIsCreating(true);
  };
  const handleDeleteRow = () => {
    deleteBudgetRow(row.id);
  };
  const handleChangeNewRow = (field: string, value: string | number) => {
    setNewRow((prevNewRow: IBudgetRow) => ({
      ...prevNewRow,
      [field]: value,
    }));
  };
  useEffect(() => {
    if (newFetchedRow) {
      const { current } = newFetchedRow;
      dispatch(addBudgetRow({ parentId, newRow: current }));
    }
    setNewRow(budgetRow);
  }, [newFetchedRow]);
  useEffect(() => {
    if (deleteRequestData) {
      dispatch(removeBudgetRow({ rowId: row.id }));
    }
  }, [deleteRequestData]);
  useEffect(() => {
    if (updateRequestData) {
      dispatch(
        updateBudgetRow({
          rowId: row.id,
          updatedRow: updateRequestData?.current,
        }),
      );
    }
  }, [updateRequestData]);
  useOutsideClick(rowRef, () => {
    setIsEditing(false);
  });

  return (
    <>
      {isCreating && newRow && (
        <TableRow
          className={style.cascadeTable_bodyRow}
          onDoubleClick={handleDoubleClick}
        >
          <TableCell
            style={{ paddingLeft: calculateLeftPaddingTh(level) }}
            component="th"
            scope="row"
            className={level > 0 ? style.levelCell : ''}
          >
            {level > 0 && (
              <>
                <div
                  style={{ left: calculateLeftPaddingVector(level) }}
                  className={style.horizontalLine}
                ></div>
                <div
                  style={{ left: calculateLeftPaddingVector(level) }}
                  className={style.verticalLine}
                ></div>
              </>
            )}
            <ButtonGroup
              variant="text"
              aria-label="text button group"
              className={style.buttonGroup}
            >
              <IconButton
                color="primary"
                aria-label="Edit"
                className={clsx(style.button)}
              >
                <img src={FileCreateIcon} alt="Create" />
              </IconButton>
              <IconButton
                color="primary"
                aria-label="Delete"
                className={clsx(style.btnDel)}
              >
                <img src={TrashIcon} alt="Delete" />
              </IconButton>
            </ButtonGroup>
          </TableCell>
          <TableCell className={style.editCell}>
            <InputText
              value={newRow.rowName}
              onChange={(value) => handleChangeNewRow('rowName', value)}
              type={'text'}
              onKeyDown={handleKeyDown}
            />
          </TableCell>
          <TableCell align="left" className={style.editCell}>
            <InputText
              value={newRow.salary}
              onChange={(value) => handleChangeNewRow('salary', value)}
              type={'number'}
              onKeyDown={handleKeyDown}
            />
          </TableCell>
          <TableCell align="left" className={style.editCell}>
            <InputText
              value={newRow.equipmentCosts}
              onChange={(value) => handleChangeNewRow('equipmentCosts', value)}
              type={'number'}
              onKeyDown={handleKeyDown}
            />
          </TableCell>
          <TableCell align="left" className={style.editCell}>
            <InputText
              value={newRow.overheads}
              onChange={(value) => handleChangeNewRow('overheads', value)}
              type={'number'}
              onKeyDown={handleKeyDown}
            />
          </TableCell>
          <TableCell align="left" className={style.editCell}>
            <InputText
              value={newRow.estimatedProfit}
              onChange={(value) => handleChangeNewRow('estimatedProfit', value)}
              type={'number'}
              onKeyDown={handleKeyDown}
            />
          </TableCell>
        </TableRow>
      )}
      <TableRow
        ref={rowRef}
        className={style.cascadeTable_bodyRow}
        onDoubleClick={handleDoubleClick}
      >
        <TableCell
          style={{ paddingLeft: calculateLeftPaddingTh(level) }}
          component="th"
          scope="row"
          className={level > 0 ? style.levelCell : ''}
        >
          {level > 0 && (
            <>
              <div
                style={{ left: calculateLeftPaddingVector(level) }}
                className={style.horizontalLine}
              ></div>
              <div
                style={{ left: calculateLeftPaddingVector(level) }}
                className={style.verticalLine}
              ></div>
            </>
          )}
          <ButtonGroup
            variant="text"
            aria-label="text button group"
            className={style.buttonGroup}
          >
            <IconButton
              color="primary"
              aria-label="Create"
              className={clsx(style.button)}
              onClick={handleCreateRow}
            >
              <img src={FileCreateIcon} alt="Create" />
            </IconButton>
            {!isEditing && (
              <IconButton
                color="primary"
                aria-label="Delete"
                className={clsx(style.btnDel)}
                onClick={handleDeleteRow}
              >
                <img src={TrashIcon} alt="Delete" />
              </IconButton>
            )}
          </ButtonGroup>
        </TableCell>
        <TableCell className={isEditing ? style.editCell : style.cell}>
          {isEditing ? (
            <InputText
              value={newRow.rowName}
              onChange={(value) => handleChangeNewRow('rowName', value)}
              onKeyDown={handleKeyDownCurrentRow}
            />
          ) : (
            row.rowName
          )}
        </TableCell>
        <TableCell
          align="left"
          className={isEditing ? style.editCell : style.cell}
        >
          {isEditing ? (
            <InputText
              value={newRow.salary}
              onChange={(value) => handleChangeNewRow('salary', value)}
              type={'number'}
              onKeyDown={handleKeyDownCurrentRow}
            />
          ) : (
            formatNumber(row.salary)
          )}
        </TableCell>
        <TableCell
          align="left"
          className={isEditing ? style.editCell : style.cell}
        >
          {isEditing ? (
            <InputText
              value={newRow.equipmentCosts}
              onChange={(value) => handleChangeNewRow('equipmentCosts', value)}
              type={'number'}
              onKeyDown={handleKeyDownCurrentRow}
            />
          ) : (
            formatNumber(row.equipmentCosts)
          )}
        </TableCell>
        <TableCell
          align="left"
          className={isEditing ? style.editCell : style.cell}
        >
          {isEditing ? (
            <InputText
              value={newRow.overheads}
              onChange={(value) => handleChangeNewRow('overheads', value)}
              type={'number'}
              onKeyDown={handleKeyDownCurrentRow}
            />
          ) : (
            formatNumber(row.overheads)
          )}
        </TableCell>
        <TableCell
          align="left"
          className={isEditing ? style.editCell : style.cell}
        >
          {isEditing ? (
            <InputText
              value={newRow.estimatedProfit}
              onChange={(value) => handleChangeNewRow('estimatedProfit', value)}
              onKeyDown={handleKeyDownCurrentRow}
              type={'number'}
            />
          ) : (
            formatNumber(row.estimatedProfit)
          )}
        </TableCell>
      </TableRow>
    </>
  );
}
