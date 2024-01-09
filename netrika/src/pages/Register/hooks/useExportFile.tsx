import { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  selectControlList,
  selectDownloadCsv,
  selectDownloadXls,
  selectXlsPatientCase,
} from "../../../module/registerCheckList/registerCheckListSelector";
import { RegisterExportFileEnum } from "../interfaces/RegisterExportFileEnum";
import { ICustomBaseSelect } from "../../../common/interfaces/ISelect";

export const useExportFile = (activeList: number, exportFileWatch: ICustomBaseSelect) => {
  const controlList = useSelector(selectControlList);
  const { queryLoadingXls, isDownloadXls } = useSelector(selectDownloadXls);
  const { queryLoadingXlsPatientCase } = useSelector(selectXlsPatientCase);
  const { queryLoadingCsv } = useSelector(selectDownloadCsv);

  const options = useMemo(() => {
    const option = [];
    if (!isDownloadXls) return [];

    option.push({
      label: "Список пациентов c текущими настройками (.xlsx)",
      value: RegisterExportFileEnum.PATIENT_LIST_WITH_SETTINGS_XLSX,
    });
    option.push({
      label: "Список пациентов c текущими настройками (.csv)",
      value: RegisterExportFileEnum.PATIENT_LIST_WITH_SETTINGS_CSV,
    });

    if (controlList.find((item) => item.id === activeList)?.searchType) {
      option.push({ label: "Список пациентов со СМО (.xlsx)", value: RegisterExportFileEnum.PATIENT_LIST_WITH_CMO });
    }
    return option;
  }, [isDownloadXls, controlList, activeList]);

  const loading = useMemo(() => {
    const loadingXls = !!queryLoadingXls?.find((i) => i === activeList);
    const loadingCsv = !!queryLoadingCsv?.find((i) => i === activeList);
    const loadingXlsPatientCase = !!queryLoadingXlsPatientCase?.find((i) => i === activeList);

    if (exportFileWatch?.value === RegisterExportFileEnum.PATIENT_LIST_WITH_SETTINGS_XLSX && loadingXls) return true;
    if (exportFileWatch?.value === RegisterExportFileEnum.PATIENT_LIST_WITH_SETTINGS_CSV && loadingCsv) return true;
    return exportFileWatch?.value === RegisterExportFileEnum.PATIENT_LIST_WITH_CMO && loadingXlsPatientCase;
  }, [queryLoadingXls, queryLoadingXlsPatientCase, exportFileWatch, activeList, queryLoadingCsv]);

  return { options, loading };
};
