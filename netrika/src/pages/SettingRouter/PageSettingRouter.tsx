import React, { FormEvent, useCallback, useEffect, useState } from "react";
import { MetaTags } from "react-meta-tags";
import { useDispatch, useSelector } from "react-redux";
import { IconLoading } from "common/components/Icon/IconLoading";
import { ru } from "common/lang/ru";
import { ButtonCreateElem } from "common/ui/Button/ButtonCreateElem";
import { Container, ContainerWithFooter, StatementData } from "common/components/Container/Container";
import { Footer } from "common/components/Footer";
import { TableHead } from "common/components/Table/TableHead";
import { IconContainerFloatingmes, Tbody, Td, Tr } from "common/components/Table/UIcomponent/UIcomponent";
import { SettingRouterThunk } from "../../module/settingRouter/settingRouterThunk";
import { selectRouterRegistry } from "../../module/settingRouter/settingRouterSelector";
import { IconEdit } from "../../common/components/Icon/IconEdit";
import styled from "styled-components";
import { Input } from "../../common/ui/Input/Input";
import { Button } from "../Proposal/components/ScreenProposal/DrawerConstructorSettings/SettingsButtons";
import { SettingRouterApiRequest } from "../../api/settingRouterApiRequest";
import { ModalSettingRouter } from "./components/ModalSettingRouter";
import { RouterRegistryRequestDto } from "../../common/interfaces/router/RouterRegistryRequest.g";
import { errorPopup } from "../../common/helpers/toast/error";
import { successPopup } from "../../common/helpers/toast/success";
import { TextArea } from "../../common/ui/Input/TextArea";
import { theme } from "../../common/styles/theme";
import { AppSettings } from "../../common/constants/appSettings";
import { ModalDeleteWIthIcon } from "../../common/components/Modal/ModalDeleteWIthIcon";
import { modal } from "../../common/helpers/event/modalEvent";
import { Title } from "../../common/ui/Title/Title";

const tableHead = [
  { name: "Название регистра", value: "name" },
  { name: "Внешний регистр (адрес)", value: "baseUrl" },
  { name: "Внутренний регистр (ИД)", value: "idInternal" },
  { name: "OID внешней системы", value: "systemOid" },
];

export const PageSettingRouter: React.FC = () => {
  const dispatch = useDispatch();
  const { version, routerRegistryList, loading } = useSelector(selectRouterRegistry);

  const [idPat, setIdPat] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [showResult, setShowResult] = useState("");
  const [registerErrors, setRegisterErrors] = useState<{ idPat: boolean; diagnosis: boolean }>({
    idPat: false,
    diagnosis: false,
  });

  useEffect(() => {
    dispatch(SettingRouterThunk.getVersion());
    dispatch(SettingRouterThunk.getAllRegisters());
  }, [dispatch]);

  const deleteRegister = useCallback(
    async (id: number) => {
      await dispatch(SettingRouterThunk.deleteRegister([id]));
      dispatch(SettingRouterThunk.getAllRegisters());
    },
    [dispatch]
  );

  const onCheckRegister = async (event: FormEvent) => {
    event.preventDefault();
    await setShowResult("");
    setRegisterErrors({ diagnosis: !diagnosis, idPat: !idPat });
    if (diagnosis && idPat) {
      try {
        const result = await new SettingRouterApiRequest(AppSettings.get("REACT_APP_ROOT_FOLDER")).routerRegisterInfo({
          idPat: [idPat],
          diagnosis: [diagnosis],
        });
        await navigator.clipboard?.writeText(result[0]?.url);
        successPopup("Результат проверки получен");
        setShowResult(result[0]?.url);
      } catch (error) {
        const messageError = await error?.text();
        await navigator.clipboard?.writeText(messageError);
        setShowResult(messageError);
        errorPopup(messageError);
      }
    }
  };

  const openModalRouter = (fieldDefault?: RouterRegistryRequestDto) => {
    modal.open(
      <ModalSettingRouter
        fieldDefault={fieldDefault}
        updateTable={() => dispatch(SettingRouterThunk.getAllRegisters())}
      />
    );
  };

  return (
    <ContainerWithFooter>
      <MetaTags>
        <title>Роутер</title>
      </MetaTags>
      <Container>
        <StatementData>
          <Title id={"dictionary_title"}>Настройка регистрового роутера {version.version}</Title>
        </StatementData>
        <StyledStatementData>
          <Title style={{ fontSize: 22 }} level={2} id={"dictionary_title"}>
            Тестирование настройки регистра
          </Title>
          <FormContainer onSubmit={onCheckRegister}>
            <InputContainer width={"25%"}>
              <Input
                label={"Локальный идентификатор пациента"}
                isRequired
                fullWidth
                value={idPat}
                error={registerErrors.idPat}
                name={"idPat"}
                onChange={(value) => {
                  setIdPat(value.target.value);
                  setRegisterErrors({ ...registerErrors, idPat: false });
                }}
              />
            </InputContainer>
            <InputContainer width={"15%"}>
              <Input
                label={"Диагноз пациента"}
                isRequired
                fullWidth
                name={"diagnosis"}
                error={registerErrors.diagnosis}
                value={diagnosis}
                onChange={(value) => {
                  setDiagnosis(value.target.value);
                  setRegisterErrors({ ...registerErrors, diagnosis: false });
                }}
              />
            </InputContainer>
            <Button type={"submit"}>Проверить</Button>
            <InputContainer width={"50%"}>
              <TextArea label={"Результат проверки"} style={{ height: 37 }} value={showResult} disabled />
            </InputContainer>
          </FormContainer>
        </StyledStatementData>
        <StatementData>
          <Title id={"table_title"}>Настроенные регистры</Title>
        </StatementData>
        <StatementData>
          <ButtonCreateElem onClick={() => openModalRouter()} text={"Добавить регистр"} />
        </StatementData>

        <StatementData />
        {loading ? (
          <IconLoading />
        ) : routerRegistryList && routerRegistryList.length > 0 ? (
          <TableHead tableHead={tableHead} control={true}>
            <Tbody>
              {routerRegistryList.map((elem) => (
                <Tr key={`row_${elem.id}`} id={`row_${elem.id}`}>
                  <Td id={`column_name_${elem.id}`}>{elem.name}</Td>
                  <Td id={`column_baseUrl_${elem.id}`}>{elem.baseUrl}</Td>
                  <Td id={`column_idInternal_${elem.id}`}>{elem.idInternal}</Td>
                  <Td id={`column_updated_${elem.id}`}>{elem.systemOid}</Td>
                  <Td id={`column_control_${elem.id}`}>
                    <div style={{ display: "flex" }}>
                      <IconContainerFloatingmes
                        id={`edit_${elem.id}`}
                        title={ru.floatingmes.edit}
                        onClick={() => openModalRouter(elem)}
                      >
                        <IconEdit />
                      </IconContainerFloatingmes>
                      <ModalDeleteWIthIcon
                        modalTitle={"Подтвердите удаление записи регистра"}
                        id={`delete_${elem.id}`}
                        onDelete={() => deleteRegister(Number(elem.id))}
                      />
                    </div>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </TableHead>
        ) : (
          <h1 id={"result_not_found"}>{ru.resultNotFound}</h1>
        )}
      </Container>

      <Footer />
    </ContainerWithFooter>
  );
};

const StyledStatementData = styled.div`
  border: 1px solid ${theme.colors.green};
  border-radius: 10px;
  padding: 15px 25px;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const InputContainer = styled.div<{ width: string }>`
  width: ${(props) => props.width};
  display: flex;
  flex-direction: column;
`;

const FormContainer = styled.form`
  margin-top: 20px;
  display: flex;
  align-items: flex-end;

  * {
    margin-right: 15px;
  }
`;
