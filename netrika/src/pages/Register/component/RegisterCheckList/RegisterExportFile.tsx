import React, { useCallback } from "react";
import { Button } from "../../../../common/ui/Button/Button";
import { useDispatch } from "react-redux";
import { CustomSelect } from "../../../../common/ui/Select/CustomSelect";
import styled from "styled-components";
import { Controller, useForm } from "react-hook-form";
import { RegisterCheckListThunk } from "../../../../module/registerCheckList/registerCheckListThunk";
import { saveAs } from "file-saver";
import { ICustomBaseSelect } from "../../../../common/interfaces/ISelect";
import { useExportFile } from "../../hooks/useExportFile";
import { RegisterExportFileEnum } from "../../interfaces/RegisterExportFileEnum";

interface IProps {
  controlListName: string;
  filterSearchText: string;
  activeList: number;
}

export const RegisterExportFile = ({ controlListName, filterSearchText, activeList }: IProps) => {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    watch,
    formState: { isDirty },
  } = useForm<{ exportFile: ICustomBaseSelect }>();

  const exportFileWatch = watch("exportFile");

  const { options, loading } = useExportFile(activeList, exportFileWatch);

  const onSubmit = useCallback(
    (data: { exportFile: ICustomBaseSelect }) => {
      const { exportFile } = data;
      const filename = `${controlListName}` || "без названия";
      switch (exportFile.value) {
        case RegisterExportFileEnum.PATIENT_LIST_WITH_SETTINGS_XLSX:
          dispatch(
            RegisterCheckListThunk.downloadXls(activeList, filterSearchText, (file: Blob) =>
              saveAs(file, filename + ".xlsx")
            )
          );
          break;
        case RegisterExportFileEnum.PATIENT_LIST_WITH_SETTINGS_CSV:
          dispatch(
            RegisterCheckListThunk.downloadCsv(activeList, filterSearchText, (file: Blob) =>
              saveAs(file, filename + ".csv")
            )
          );
          break;
        case RegisterExportFileEnum.PATIENT_LIST_WITH_CMO:
          dispatch(
            RegisterCheckListThunk.downloadXlsPatientCase(activeList, (file: Blob) => saveAs(file, filename + ".xlsx"))
          );
          break;
      }
    },
    [filterSearchText, activeList, controlListName, dispatch]
  );

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="exportFile"
        control={control}
        render={({ onChange, value }) => {
          return (
            <CustomSelect
              styleContainer={{ flex: 1 }}
              htmlID={"export-file"}
              SelectValue={value}
              options={options}
              onChange={(val) => onChange(val)}
            />
          );
        }}
      />
      <Button isLoading={loading} type={"submit"} disabled={!isDirty} style={{ padding: "8px 20px" }}>
        Экспортировать
      </Button>
    </Container>
  );
};

const Container = styled.form`
  display: flex;
  align-items: center;
  gap: 20px;
  max-width: 600px;
  min-width: 400px;
  width: 100%;
`;
