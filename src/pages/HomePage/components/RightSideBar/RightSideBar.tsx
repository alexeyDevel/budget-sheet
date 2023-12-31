import { useEffect } from "react";
import { budgetApi } from "@/services/budgetService";
import CascadeTable from "@/components/CascadeTable/CascadeTable";
import style from "./RightSideBar.style.module.scss";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setBudgetList } from "@/store/BudgetSlice";
import { CircularProgress } from "@mui/material";


export default function RightSideBar() {
  const dispatch = useAppDispatch();
  const { budgetList } = useAppSelector((state) => state.budget);
  const { data: responseData, isLoading, error } = budgetApi.useFetchBudgetListQuery("");
  useEffect(() => {
    dispatch(setBudgetList(responseData))
  }, [dispatch, responseData]);
  return (
    <div className={style.rightSideBar}>
      {error ? (
        <>Ошибка при отправке запроса</>
      ) : isLoading ? (
        <CircularProgress disableShrink />
      ) : budgetList?.length > 0 && (
        <>
          <div className={style.rightSideBar__header}>
            Строительно-монтажные работы
          </div>
          <div className={style.tableWrapper}>
            <CascadeTable rows={budgetList}/>
          </div>
        </>
      )}
    </div>
  );
}
