import { useSelector } from "react-redux";
import { dictionaryDisplayFieldSelector } from "../../../../../../module/dictionaryDisplayField/dictionaryDisplayFieldSelector";
import { useMemo } from "react";
import { ICustomSelect } from "../../../../../../common/interfaces/ISelect";

export const useOptionsSelector = () => {
  const { bizObjectsList, attributesList, dictionariesList, tableFieldList, tableFieldListLoading } = useSelector(
    dictionaryDisplayFieldSelector
  );
  const attributesProps = useMemo(() => {
    return attributesList.length > 0
      ? attributesList.map((item) => ({ value: item.id, label: item.description } as ICustomSelect))
      : [];
  }, [attributesList]);

  const objProps = useMemo(() => {
    return bizObjectsList.length > 0 ? bizObjectsList.map((item) => ({ value: item.id, label: item.name })) : [];
  }, [bizObjectsList]);

  const dictionaryProps = useMemo(() => {
    return dictionariesList.length > 0
      ? dictionariesList.map((item) => ({ value: item.code, label: item.description }))
      : [];
  }, [dictionariesList]);

  const tableFieldProps = useMemo(() => {
    return tableFieldList.length > 0
      ? tableFieldList.map((item) => ({ value: item.tableField, label: item.tableField }))
      : [];
  }, [tableFieldList]);

  return { attributesProps, objProps, dictionaryProps, tableFieldProps, tableFieldListLoading };
};
