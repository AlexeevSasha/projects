import React, { useCallback, useEffect, useMemo, useState } from "react";
import { IconContainerFloatingmes, Tbody, Td, Tr } from "../../../common/components/Table/UIcomponent/UIcomponent";
import { TableHead } from "../../../common/components/Table/TableHead";
import { Input } from "../../../common/ui/Input/Input";
import { StatementData } from "../../../common/components/Container/Container";
import { ButtonCreateElem } from "../../../common/ui/Button/ButtonCreateElem";
import { BorderGreen } from "../../DiseaseCard/style/BorderGreen";
import styled from "styled-components";
import { IconSave } from "../../../common/components/Icon/IconSave";
import { IconEdit } from "../../../common/components/Icon/IconEdit";
import { RouterRegistryRequestDto } from "../../../common/interfaces/router/RouterRegistryRequest.g";
import { ru } from "../../../common/lang/ru";
import { useDispatch, useSelector } from "react-redux";
import { selectRouterRegistry } from "../../../module/settingRouter/settingRouterSelector";
import { SettingRouterThunk } from "../../../module/settingRouter/settingRouterThunk";
import { IRouterDiagnosis } from "../../../common/interfaces/router/IRouterDiagnosis";
import { SettingRouterAction } from "../../../module/settingRouter/settingRouterAction";
import { IconLoading } from "../../../common/components/Icon/IconLoading";
import { DiagnoseInput } from "./DiagnoseInput";
import { errorPopup } from "../../../common/helpers/toast/error";
import { Button } from "../../../common/ui/Button/Button";
import { ModalContainer } from "../../../common/components/Popup/components/ModalContainer";
import { modal } from "../../../common/helpers/event/modalEvent";

interface IProps {
  updateTable: () => void;
  fieldDefault?: RouterRegistryRequestDto;
}

const tableHead = [
  { name: "Название регистра", value: "name" },
  { name: "Внешний регистр (адрес)", value: "baseUrl" },
  { name: "Внутренний регистр (ИД)", value: "idInternal" },
  { name: "OID внешней системы", value: "systemOid" },
];
// TODO  переписать на hook-form
export const ModalSettingRouter: React.FC<IProps> = (props) => {
  const dispatch = useDispatch();
  const { routerDiagnosisList, loadingRouterDiagnosisList } = useSelector(selectRouterRegistry);

  const [isDisabledRegister, setIsDisabledRegister] = useState<boolean>(() => !!props.fieldDefault);
  const [baseUrl, setBaseUrl] = useState<string>(props.fieldDefault?.baseUrl || "");
  const [idInternal, setIdInternal] = useState<string | number>(props.fieldDefault?.idInternal || "");
  const [systemOid, setSystemOid] = useState<string | number>(props.fieldDefault?.systemOid || "");
  const [name, setName] = useState<string>(props.fieldDefault?.name || "");
  const [currentRegister, setCurrentRegister] = useState<RouterRegistryRequestDto>({} as RouterRegistryRequestDto);
  const [newDiagnose, setNewDiagnose] = useState<IRouterDiagnosis[]>([] as IRouterDiagnosis[]);

  useEffect(() => {
    setNewDiagnose(routerDiagnosisList);
  }, [routerDiagnosisList]);

  const closeModal = useCallback(() => {
    modal.close();
  }, []);

  useEffect(() => {
    if (props.fieldDefault) {
      setCurrentRegister(props.fieldDefault);
    }
    if (currentRegister && currentRegister.id) {
      dispatch(SettingRouterThunk.getAllDiagnosis(currentRegister.id));
    }
  }, [props.fieldDefault, currentRegister.id, setCurrentRegister, currentRegister, dispatch]);

  const clickSaveRegister = async () => {
    if (currentRegister.id) {
      dispatch(
        SettingRouterThunk.updateRegisters(
          {
            id: currentRegister.id,
            name: name,
            systemOid: systemOid ? String(systemOid) : null,
            idInternal: idInternal ? Number(idInternal) : null,
            baseUrl: baseUrl || null,
          },
          (value) => {
            setCurrentRegister(value);
            props.updateTable();
          },
          () => setIsDisabledRegister(true)
        )
      );
    } else {
      if (currentRegister) {
        dispatch(
          SettingRouterThunk.createRegisters(
            {
              name: name,
              systemOid: systemOid ? String(systemOid) : null,
              idInternal: idInternal ? Number(idInternal) : null,
              baseUrl: baseUrl || null,
            },
            (value) => {
              setCurrentRegister(value);
              props.updateTable();
            },
            () => setIsDisabledRegister(true)
          )
        );
      }
    }
  };

  const updateDiagnoseList = (indexDiagnose: number, diagnose: IRouterDiagnosis) => {
    setNewDiagnose(newDiagnose.map((item, index) => (indexDiagnose === index ? diagnose : item)));
  };
  const addToDiagnoseList = () => {
    setNewDiagnose(newDiagnose.concat({ id: undefined, codeDiagnosis: "", idRegistry: props.fieldDefault?.id || 0 }));
  };
  const changeDiagnoseList = async (index: number, value: string, item: IRouterDiagnosis, callback: () => void) => {
    if (value.length === 0) {
      errorPopup("Название диагноза не должно быть пустым.");
    } else if (item.id) {
      dispatch(
        SettingRouterThunk.updateDiagnose(
          { ...item, codeDiagnosis: value, idRegistry: Number(currentRegister.id) },
          index,
          updateDiagnoseList,
          callback
        )
      );
    } else {
      dispatch(
        SettingRouterThunk.createDiagnose(
          { ...item, codeDiagnosis: value, idRegistry: Number(currentRegister.id) },
          index,
          updateDiagnoseList,
          callback
        )
      );
    }
  };
  const deleteDiagnose = async (delIndex: number, item: IRouterDiagnosis) => {
    const delArr = newDiagnose.filter((item, index) => delIndex !== index);
    if (item.id) {
      dispatch(SettingRouterThunk.deleteDiagnose([item.id], () => setNewDiagnose(delArr)));
      setNewDiagnose(delArr);
    } else {
      setNewDiagnose(delArr);
    }
  };

  const DiagnosisListing = useMemo(
    () => (
      <>
        {loadingRouterDiagnosisList ? (
          <IconLoading />
        ) : (
          <>
            {newDiagnose.length > 0 && (
              <BorderGreen style={{ paddingBottom: "12px", marginTop: 10 }}>
                {newDiagnose.map((item, index) => (
                  <DiagnoseBlock key={index}>
                    <DiagnoseInput
                      name={`diagnose_${index}`}
                      index={index}
                      item={item}
                      defaultValue={item.codeDiagnosis}
                      clickDelete={deleteDiagnose}
                      clickSave={changeDiagnoseList}
                    />
                  </DiagnoseBlock>
                ))}
              </BorderGreen>
            )}
          </>
        )}
      </>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [newDiagnose, loadingRouterDiagnosisList]
  );

  return (
    <ModalContainer
      footer={
        <ButtonContainer>
          <Button style={{ padding: "10px 65px" }} color={"primary"} id={"button_close"} onClick={closeModal}>
            Закрыть
          </Button>
        </ButtonContainer>
      }
      width={1000}
      title={" Настройки регистра"}
      callbackAfterClose={() => {
        dispatch(SettingRouterAction.routerDiagnosisList.done({ result: [] as IRouterDiagnosis[] }));
      }}
    >
      <TableHead tableHead={tableHead} control={true}>
        <Tbody>
          <Tr>
            <Td id={"column_name"}>
              <Input disabled={isDisabledRegister} value={name} onChange={(value) => setName(value.target.value)} />
            </Td>
            <Td id={"column_baseUrl"}>
              <Input
                disabled={isDisabledRegister}
                value={baseUrl}
                onChange={(value) => setBaseUrl(value.target.value)}
              />
            </Td>
            <Td id={"column_idInternal"}>
              <Input
                disabled={isDisabledRegister}
                value={idInternal}
                onChange={(value) => setIdInternal(value.target.value)}
              />
            </Td>
            <Td id={"column_systemOid"}>
              <Input
                disabled={isDisabledRegister}
                value={systemOid}
                onChange={(value) => setSystemOid(value.target.value)}
              />
            </Td>
            <Td id={"column_control"}>
              <IconContainer>
                <IconContainerFloatingmes
                  title={ru.floatingmes.edit}
                  onClick={() => setIsDisabledRegister(!isDisabledRegister)}
                >
                  <IconEdit />
                </IconContainerFloatingmes>
                {!isDisabledRegister && (
                  <IconContainerFloatingmes title={ru.floatingmes.save} onClick={clickSaveRegister}>
                    <IconSave />
                  </IconContainerFloatingmes>
                )}
              </IconContainer>
            </Td>
          </Tr>
        </Tbody>
      </TableHead>
      {currentRegister?.id && (
        <>
          <StatementData>
            <ButtonCreateElem onClick={addToDiagnoseList} text={"Добавить диагноз"} />
          </StatementData>
          {DiagnosisListing}
        </>
      )}
    </ModalContainer>
  );
};

const DiagnoseBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const IconContainer = styled.div`
  align-items: center;
  display: flex;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
`;
