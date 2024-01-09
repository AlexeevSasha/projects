import React, { useCallback, useContext, useState } from "react";
import { ContainerShow } from "../../../Proposal/components/DiseaseInfo/styles";
import { styled } from "../../../../common/styles/styled";
import { theme } from "../../../../common/styles/theme";
import { IconGroupHide } from "../../../../common/components/Icon/IconGroupHide";
import { IconGroupShow } from "../../../../common/components/Icon/IconGroupShow";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { GraphBlock } from "./GraphBlock";
import { ru } from "../../../../common/lang/ru";
import { IconContainer, IconContainerFloatingmes } from "../../../../common/components/Table/UIcomponent/UIcomponent";
import { ICustomGraph, IDictionaryPomp } from "../../../../common/interfaces/dictionary/IDictionaryPomp";
import { IconLoading } from "../../../../common/components/Icon/IconLoading";
import { DictionaryClinrecPompThunk } from "../../../../module/dictionaryClinrecPomp/dictionaryClinrecPompThunk";
import { authorizationSelector } from "../../../../module/authorization/authorizationSelector";
import { UserRolesEnum } from "../../../../common/interfaces/user/UserRolesEnum";
import { curretClinrecContext } from "../../PageDictionaryClinrecPomp";
import { IconEdit } from "../../../../common/components/Icon/IconEdit";
import { StatementData } from "../../../../common/components/Container/Container";
import { ButtonCreateElem } from "../../../../common/ui/Button/ButtonCreateElem";
import { ModalDictionaryGraph } from "./Modals/ModalDictionaryGraph";
import { IconEye } from "../../../../common/components/Icon/IconEye";
import { dictionaryClinrecPompSelector } from "../../../../module/dictionaryClinrecPomp/dictionaryClinrecPompSelector";
import { ModalDeleteWIthIcon } from "../../../../common/components/Modal/ModalDeleteWIthIcon";
import { modal } from "../../../../common/helpers/event/modalEvent";
import { getTitleModal } from "../../../../common/helpers/getTitle";

interface IProps {
  id: string;
  pomp: IDictionaryPomp;
  showIconOpenBlock?: boolean;
  index: number;
}

export const customPompContext = React.createContext<{
  showEdit: boolean;
}>({ showEdit: false });
export const PompBlock = (props: IProps) => {
  const dispatch = useDispatch();
  const { profiles } = useSelector(dictionaryClinrecPompSelector);
  const { pageCount } = useContext(curretClinrecContext);
  const { login } = useSelector(authorizationSelector);
  const { setCurrentPomp } = useContext(curretClinrecContext);

  const [open, setOpen] = useState<boolean>(false);

  const onDelete = useCallback(async () => {
    await dispatch(DictionaryClinrecPompThunk.deletePomp(props.pomp.idPomp, pageCount));
  }, [dispatch, props.pomp.idPomp, pageCount]);

  const openModalGraph = (type: "add" | "edit" | "view", graph?: ICustomGraph) => {
    modal.open(
      <ModalDictionaryGraph
        idPomp={props.pomp.idPomp}
        title={getTitleModal(type, "route")}
        disabled={type === "view"}
        currentGraph={graph}
      />
    );
  };

  return (
    <customPompContext.Provider
      value={{
        showEdit:
          props.pomp.isCustom && (login === UserRolesEnum.RegistryAdmin || login === UserRolesEnum.RegistrySuperUsr),
      }}
    >
      <ClinrecBlockContainer key={props.id} id={props.id}>
        <TitleContainer
          open={open}
          child={!!props.pomp?.graphs?.length}
          accesses={
            props.pomp.isCustom && (login === UserRolesEnum.RegistryAdmin || login === UserRolesEnum.RegistrySuperUsr)
          }
        >
          <LeftContainer>
            {props.showIconOpenBlock ? (
              open ? (
                <ContainerShow id={`close_block_${props.pomp.idPomp}`} onClick={() => setOpen(false)}>
                  <IconGroupHide />
                </ContainerShow>
              ) : (
                <ContainerShow
                  id={`open_block_${props.pomp.idPomp}`}
                  onClick={() => {
                    if (!Array.isArray(props.pomp.graphs)) {
                      dispatch(DictionaryClinrecPompThunk.getDictionaryPompsGraph(props.pomp.idPomp));
                    }
                    setOpen(true);
                  }}
                >
                  <IconGroupShow />
                </ContainerShow>
              )
            ) : (
              <ContainerShow />
            )}
            <PompName>{props.pomp.name}</PompName>
          </LeftContainer>
          <PompInfo>
            <InfoColumn width={"170px"}>
              <span>
                <RowTitle>№ </RowTitle>
                <RowValue>{props.pomp.revisionId || "Н/Д"}</RowValue>
              </span>
              <span>
                <RowTitle>Тип:</RowTitle>
                <RowValue>{props.pomp.isCustom ? "Пользовательская" : "Импортированная"}</RowValue>
              </span>
            </InfoColumn>
            <InfoColumn width={"285px"}>
              <span>
                <RowTitle>Профиль:</RowTitle>
                <RowValue>{profiles.find((p) => Number(p.value) === props.pomp.profile)?.label || "Н/Д"}</RowValue>
              </span>
              <span>
                <RowTitle>Статус:</RowTitle>
                <RowValue>{props.pomp?.status || "Н/Д"}</RowValue>
              </span>
            </InfoColumn>

            <InfoColumn>
              <span>
                <RowTitle>Дата утверждения:</RowTitle>
                <RowValue>
                  {" "}
                  {props.pomp.revisionBdate ? moment(props.pomp.revisionBdate).format("DD.MM.YYYY") : "Н/Д"}
                </RowValue>
              </span>
              <span>
                <RowTitle>Утратил силу:</RowTitle>
                <RowValue>
                  {" "}
                  {props.pomp.revisionEdate ? moment(props.pomp.revisionEdate).format("DD.MM.YYYY") : "Н/Д"}
                </RowValue>
              </span>
            </InfoColumn>
            <InfoColumn width={"150px"}>
              <span>
                <RowTitle>Последняя редакция:</RowTitle>
                <RowValue>
                  {props.pomp.pompUpdated ? moment(props.pomp.pompUpdated).format("DD.MM.YYYY") : "Н/Д"}
                </RowValue>
              </span>
            </InfoColumn>
            <InfoColumn width={"64px"}>
              <IconContainer>
                {props.pomp.isCustom &&
                (login === UserRolesEnum.RegistryAdmin || login === UserRolesEnum.RegistrySuperUsr) ? (
                  <>
                    <IconContainerFloatingmes
                      title={ru.floatingmes.edit}
                      onClick={() => setCurrentPomp(props.pomp, false)}
                    >
                      <IconEdit />
                    </IconContainerFloatingmes>
                    <ModalDeleteWIthIcon onDelete={onDelete} />
                  </>
                ) : !(login === UserRolesEnum.RegistryAdmin || login === UserRolesEnum.RegistrySuperUsr) ? (
                  <IconContainerFloatingmes
                    title={ru.floatingmes.view}
                    onClick={() => setCurrentPomp(props.pomp, true)}
                  >
                    <IconEye />
                  </IconContainerFloatingmes>
                ) : (
                  <IconContainerFloatingmes
                    title={ru.floatingmes.view}
                    onClick={() => setCurrentPomp(props.pomp, true)}
                  >
                    <IconEye />
                  </IconContainerFloatingmes>
                )}
              </IconContainer>
            </InfoColumn>
          </PompInfo>
        </TitleContainer>
        {open ? (
          props.pomp.graphs !== null && Array.isArray(props.pomp.graphs) ? (
            <>
              {props.pomp.isCustom &&
                (login === UserRolesEnum.RegistryAdmin || login === UserRolesEnum.RegistrySuperUsr) && (
                  <StatementData style={{ marginLeft: "24px", marginBottom: "10px" }}>
                    <ButtonCreateElem
                      onClick={() => {
                        openModalGraph("add");
                      }}
                      text={"Добавить маршрут"}
                    />
                  </StatementData>
                )}
              {props.pomp?.graphs?.map((item, index) => (
                <GraphBlock
                  access={props.pomp.isCustom}
                  openModal={(graph: ICustomGraph, type: "edit" | "view") => {
                    openModalGraph(type, graph);
                  }}
                  key={props.id + "_graphBlock_" + item.idGraph}
                  id={props.id + "_graphBlock_" + item.idGraph}
                  pompId={props.pomp.idPomp}
                  index={index}
                  graph={item}
                  showIconOpenBlock={true}
                />
              ))}
            </>
          ) : (
            <IconLoading />
          )
        ) : null}
      </ClinrecBlockContainer>
    </customPompContext.Provider>
  );
};

const ClinrecBlockContainer = styled.div`
  justify-content: space-between;
  background: ${theme.colors.lightGray};
  display: flex;
  flex-direction: column;
  padding: 10px 24px;
  border: 1px solid ${theme.colors.gray};
`;
const TitleContainer = styled.div<{ open: boolean; child: boolean; accesses: boolean }>`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ open, child, accesses }) => (open && child && !accesses ? "15px" : "0")};
`;
const PompInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

const InfoColumn = styled.div<{ width?: string }>`
  width: ${({ width }) => (width ? width : "200px")};
  display: flex;
  flex-direction: column;
  padding-right: 5px;

  span {
    display: inline-flex;

    &:first-child span {
      margin-bottom: 8px;
    }
  }
`;

const RowTitle = styled.span`
  max-width: 100px;
  font-weight: bold;
  align-items: baseline;
`;
const RowValue = styled.span`
  margin-left: 2px;
  align-items: end;
`;

const PompName = styled.div`
  font-weight: 600;
  margin-left: 15px;
  align-self: center;
`;

const LeftContainer = styled.div`
  width: 45%;
  display: flex;

  span {
    align-self: center;
  }

  .iconFloatingmes {
    padding-bottom: 5px;
  }
`;
