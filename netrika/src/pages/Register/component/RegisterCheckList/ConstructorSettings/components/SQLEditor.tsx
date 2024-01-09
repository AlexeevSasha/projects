import { RegisterSettingsCheckListAction } from "module/registerSettingsCheckList/registerSettingsCheckListAction";
import { selectSearchSQL } from "module/registerSettingsCheckList/registerSettingsCheckListSelector";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CodeEdit } from "../../../../../../common/ui/CodeEdit";

export const SQLEditor = () => {
  const searchSql = useSelector(selectSearchSQL);
  const dispatch = useDispatch();

  const inputSearchSql = (value: string) => {
    dispatch(RegisterSettingsCheckListAction.updateSearchSql(value));
  };

  return (
    <CodeEdit language={"sql"} defaultValue={searchSql || ""} placeholder={"SQL Code*"} onChange={inputSearchSql} />
  );
};
