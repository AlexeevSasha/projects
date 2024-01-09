import { theme } from "common/styles/theme";
import { RegisterGeneralInfoAction } from "module/registerGeneralInfo/registerGeneralInfoAction";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { IconLoading } from "common/components/Icon/IconLoading";
import { CheckBox } from "common/ui/Input/CheckBox";
import { Container, ContainerWithFooter } from "common/components/Container/Container";
import { IControlTable, TableBody } from "common/components/Table/TableBody";
import { TableHead } from "common/components/Table/TableHead";
import { orderStatusMap } from "../../common/helpers/orderStatusMap";
import { styled } from "../../common/styles/styled";
import {
  registerDownloadFileSelector,
  registerGeneralInfoSelector,
} from "../../module/registerGeneralInfo/registerGeneralInfoSelector";
import { RegisterGeneralInfoThunk } from "../../module/registerGeneralInfo/registerGeneralInfoThunk";
import { registerNameSelector } from "../../module/registerName/registerNameSelector";
import { Footer } from "../../common/components/Footer";
import { HorisontalNavMenuRegister } from "../../common/components/HorisontalNavMenuRegister";
import { DownloadFileContainer } from "./PageRegisterCheckList";
import { useRegisterNavigation } from "./hooks/useRegisterNavigation";
import { IconContainerFloatingmes, ItemLink } from "../../common/components/Table/UIcomponent/UIcomponent";
import { IconInfo } from "../../common/components/Icon/IconInfo";
import { RegisterCriterionThunk } from "../../module/registerCriterion/registerCriterionThunk";
import { authorizationSelector } from "../../module/authorization/authorizationSelector";
import { registerCriterionSelector } from "../../module/registerCriterion/registerCriterionSelector";
import { UserRolesEnum } from "../../common/interfaces/user/UserRolesEnum";
import { BlockAccessDenied } from "../../common/components/Container/BlockAccessDenied";
import { ViewFilters } from "./component/RegisterCriterion/ViewFilters";
import { AppSettings } from "../../common/constants/appSettings";
import { TextAreaStyle } from "../../common/ui/Input/styles/textAreaStyles";
import { ButtonStyles } from "../../common/ui/Button/styles/ButtonStyles";
import { drawer } from "../../common/helpers/event/modalEvent";

const tableHead = [
  { name: "Описание вложения", value: "description" },
  { name: "Название файла", value: "name" },
];

export const PageRegisterGeneralInfo = () => {
  const { registerId } = useParams<{ registerId: string }>();
  const dispatch = useDispatch();
  const history = useHistory();

  const state = useSelector(registerGeneralInfoSelector);
  const stateRegisterName = useSelector(registerNameSelector);
  const [checkBoxState, setCheckBoxState] = useState(state.dataRegister.isArchive);
  const { downloadFile, loadingFile } = useSelector(registerDownloadFileSelector);
  const { login } = useSelector(authorizationSelector);
  const { loading, criterionText } = useSelector(registerCriterionSelector);

  useEffect(() => {
    dispatch(RegisterGeneralInfoThunk.getDoc(+registerId));
    dispatch(RegisterGeneralInfoThunk.getRegister(+registerId));
    dispatch(RegisterGeneralInfoThunk.getRegisterName(+registerId));
    dispatch(RegisterCriterionThunk.getCriterionFind());
    dispatch(RegisterCriterionThunk.getCriterionFilters(+registerId));
    dispatch(RegisterCriterionThunk.getCriterionText(+registerId));

    return () => {
      dispatch(
        RegisterGeneralInfoAction.getFile.done({
          params: null,
          result: { isFile: false, file: undefined, name: "" },
        })
      );
    };
  }, [dispatch, registerId]);

  const handleButtonClick = useCallback(() => {
    dispatch(RegisterGeneralInfoThunk.sendRegisterToUpdate(+registerId));
  }, [registerId, dispatch]);

  const handleCheck = useCallback(() => {
    dispatch(RegisterGeneralInfoThunk.setInfoRegister(+registerId));
  }, [registerId, dispatch]);

  useEffect(() => {
    setCheckBoxState(state.dataRegister.isArchive);
  }, [state.dataRegister.isArchive]);

  const clickDownloadFile = useCallback(
    (id?: string, name?: string) => {
      dispatch(RegisterGeneralInfoThunk.downloadFile(Number(id), name));
    },
    [dispatch]
  );

  useEffect(() => {
    if (downloadFile.file) {
      saveAs(downloadFile.file, downloadFile.name || "без названия");
    }
  }, [downloadFile]);

  const openDrawerFilters = useCallback(() => {
    drawer.open(<ViewFilters />);
  }, []);

  return (
    <ContainerWithFooter>
      <HorisontalNavMenuRegister
        links={useRegisterNavigation()}
        title={true}
        breadcrumbs={stateRegisterName.registerName}
      />
      <Container>
        <StatementData>
          <div>
            <Title id={"title"}>Данные заявления</Title>
            <Row>
              Наименование регистра: <span id={"register_name"}>{state.dataRegister.name}</span>
            </Row>
            <Row>
              Группа регистра:<span id={"register_group"}>{state.dataRegister.groupName}</span>
            </Row>
            <Row>
              ID Заявки:
              <IconContainerFloatingmes
                noMarg
                position={"right"}
                title={"Перейти в заявку"}
                id={"id_proposal"}
                onClick={() =>
                  history.push(
                    `${AppSettings.get("REACT_APP_ROOT_FOLDER")}/proposal/${state.dataRegister.orderId}/info`
                  )
                }
              >
                <ItemLink>{state.dataRegister.orderId}</ItemLink>
              </IconContainerFloatingmes>
            </Row>
            <Row>
              ID Регистра:
              <IconContainerFloatingmes
                noMarg
                position={"right"}
                title={"Перейти к контрольным списку"}
                id={"id_register"}
                onClick={() =>
                  window.open(
                    `${AppSettings.get("REACT_APP_ROOT_FOLDER")}/register/${state.dataRegister.id}/checklist`,
                    "_blank"
                  )
                }
              >
                <ItemLink>{state.dataRegister.id}</ItemLink>
              </IconContainerFloatingmes>
            </Row>
            <Row>
              Статус регистра:
              <StatusRow id={"status_register"}>
                {state.dataRegister.registerStatusName}
                {state.dataRegister?.registerStatusDescription && (
                  <IconContainerFloatingmes
                    title={state.dataRegister.registerStatusDescription}
                    id={"info_vitrina_input"}
                    position={"right"}
                  >
                    <IconInfo />
                  </IconContainerFloatingmes>
                )}
              </StatusRow>
            </Row>
            <Row>
              Статус заявки:
              <span id={"status_proposal"}>{orderStatusMap.get(state.dataRegister.orderStatus)}</span>
            </Row>
            <Row>
              Дата создания:
              <span id={"create_data"}>{moment(state.dataRegister.createdAt).format("DD MMMM YYYY")}</span>
            </Row>
            <Row>
              Заявитель:<span id={"user"}>{state.dataRegister.userName}</span>
            </Row>
            <Row>
              Обозначение в базе данных:<span id={"name_bd"}>{state.dataRegister.tableName}</span>
            </Row>
            <Row>
              <CheckBox check={checkBoxState} onCheck={handleCheck} checkId={0}>
                Регистр в архиве
              </CheckBox>
            </Row>
            <Row>
              <Button disabled={checkBoxState} onClick={handleButtonClick} id={"update_register"}>
                Обновить регистр
              </Button>
            </Row>
          </div>
          <CriterionBlock>
            {loading ? (
              <IconLoading />
            ) : login === UserRolesEnum.RegistryOrgCurator || login === UserRolesEnum.RegistryDiseaseKurator ? (
              <BlockAccessDenied />
            ) : (
              <>
                <ButtonBlock>
                  <NewBtn id={"open_modal"} onClick={openDrawerFilters}>
                    Открыть критерии включения
                  </NewBtn>
                </ButtonBlock>
                <Container>
                  <TextArea
                    id={"input_description"}
                    placeholder={"Описание критериев"}
                    disabled
                    defaultValue={criterionText.criteriaDescription}
                    maxLength={5000}
                  />
                </Container>
              </>
            )}
          </CriterionBlock>
        </StatementData>

        <BlockAddFile>
          <Title>Вложенные файлы</Title>
        </BlockAddFile>
        <TableHead numbering disableScroll tableHead={tableHead} control={true}>
          <TableBody
            numbering
            tableHead={tableHead}
            tableBody={state.dataDoc}
            control={[{ name: "download", onClick: clickDownloadFile, value: "id" }] as IControlTable[]}
          />
        </TableHead>
      </Container>
      <Footer />

      {loadingFile ? (
        <DownloadFileContainer>
          <IconLoading />
        </DownloadFileContainer>
      ) : null}
    </ContainerWithFooter>
  );
};

const Title = styled.h2`
  color: ${theme.colors.black};
  margin-bottom: 20px;
`;

const StatementData = styled.div`
  justify-content: space-between;
  display: flex;
  margin-top: 30px;
`;

const Row = styled.div`
  font-weight: 600;
  color: #878990;
  display: grid;
  grid-template-columns: 280px auto;
  padding: 5px 0;

  span {
    color: ${theme.colors.black};
  }
`;

const BlockAddFile = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin: 20px 0;
`;

const Button = styled(ButtonStyles)`
  background: ${theme.colors.green};
  color: ${theme.colors.white};
  padding: 10px 50px;

  :hover {
    opacity: 0.9;
  }

  ${({ disabled }) =>
    disabled &&
    `
       cursor: default;
       background: ${theme.colors.gray};
       pointer-events: none;
    `}
`;
const NewBtn = styled(ButtonStyles)`
  background: ${theme.colors.white};
  color: ${theme.colors.green};
  padding: 10px 50px;

  :hover {
    opacity: 0.9;
  }
`;
const StatusRow = styled.div`
  display: flex;
  color: ${theme.colors.black};
`;

const CriterionBlock = styled.div`
  width: 60%;
  margin-left: 20px;
`;

const ButtonBlock = styled.div`
  display: flex;
  margin: 0 0 20px 0;
`;

const TextArea = styled(TextAreaStyle)`
  height: 100%;
  max-height: 90%;
  resize: vertical;

  ::placeholder {
    font-weight: 600;
  }
`;
