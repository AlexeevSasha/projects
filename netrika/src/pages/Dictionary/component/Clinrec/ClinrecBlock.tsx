import React, { useCallback, useContext, useState } from "react";
import { ContainerShow } from "../../../Proposal/components/DiseaseInfo/styles";
import { styled } from "../../../../common/styles/styled";
import { theme } from "../../../../common/styles/theme";
import { IconGroupHide } from "../../../../common/components/Icon/IconGroupHide";
import { IconGroupShow } from "../../../../common/components/Icon/IconGroupShow";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { StageBlock } from "./StageBlock";
import { IconContainer, IconContainerFloatingmes } from "../../../../common/components/Table/UIcomponent/UIcomponent";
import { ru } from "../../../../common/lang/ru";
import { useDrag } from "../../../../common/hooks/useDrag";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import {
  IDictionaryClinrec,
  IDictionaryClinrecStage,
} from "../../../../common/interfaces/dictionary/IDictionaryClinrec";
import { DictionaryClinrecPompThunk } from "../../../../module/dictionaryClinrecPomp/dictionaryClinrecPompThunk";
import { IconLoading } from "../../../../common/components/Icon/IconLoading";
import { authorizationSelector } from "../../../../module/authorization/authorizationSelector";
import { UserRolesEnum } from "../../../../common/interfaces/user/UserRolesEnum";
import { curretClinrecContext } from "../../PageDictionaryClinrecPomp";
import { IconEdit } from "../../../../common/components/Icon/IconEdit";
import { IconEye } from "../../../../common/components/Icon/IconEye";
import { StatementData } from "../../../../common/components/Container/Container";
import { ButtonCreateElem } from "../../../../common/ui/Button/ButtonCreateElem";
import { ModalDictionaryClinrecStage } from "../Modal/ModalDictionaryClinrecPomp/ModalDictionaryClinrecStage/ModalDictionaryClinrecStage";
import { dictionaryClinrecPompSelector } from "../../../../module/dictionaryClinrecPomp/dictionaryClinrecPompSelector";
import { ModalDeleteWIthIcon } from "../../../../common/components/Modal/ModalDeleteWIthIcon";
import { modal } from "../../../../common/helpers/event/modalEvent";
import { getTitleModal } from "../../../../common/helpers/getTitle";

interface IProps {
  id: string;
  clinrec: IDictionaryClinrec;
  showIconOpenBlock?: boolean;
  ItemIndex: number;
}

export const customClinrecContext = React.createContext<{
  showEdit: boolean;
}>({ showEdit: false });

export const ClinrecBlock = (props: IProps) => {
  const dispatch = useDispatch();
  const { login } = useSelector(authorizationSelector);
  const { pageCount } = useContext(curretClinrecContext);
  const { clinrecSelects } = useSelector(dictionaryClinrecPompSelector);
  const { setCurrentClinrec } = useContext(curretClinrecContext);

  const [open, setOpen] = useState<boolean>(false);

  const onSortingStages = useCallback(
    (sortArr: IDictionaryClinrecStage[]) => {
      dispatch(
        DictionaryClinrecPompThunk.sortinClinrecStage(props.clinrec.idClinrec, props.clinrec.idClinrec, sortArr)
      );
    },
    [dispatch, props.clinrec.idClinrec]
  );

  const onDelete = useCallback(async () => {
    await dispatch(DictionaryClinrecPompThunk.deleteClinrec(props.clinrec.idClinrec, pageCount));
  }, [dispatch, props.clinrec.idClinrec, pageCount]);

  const { sortedItems, onDragEnd } = useDrag({
    fields: props.clinrec.stages,
    sortingTable: onSortingStages,
    withoutFixedItem: true,
  });

  const openModalClinrecStage = (type: "add" | "edit" | "view", stage?: IDictionaryClinrecStage) => {
    modal.open(
      <ModalDictionaryClinrecStage
        disabled={type === "view"}
        stagesLength={props?.clinrec?.stages?.length || 0}
        idClinrec={props.clinrec.idClinrec}
        currentStage={stage}
        title={getTitleModal(type, "stage")}
      />
    );
  };

  return (
    <customClinrecContext.Provider
      value={{
        showEdit:
          props.clinrec.isCustom && (login === UserRolesEnum.RegistryAdmin || login === UserRolesEnum.RegistrySuperUsr),
      }}
    >
      <ClinrecBlockContainer key={props.clinrec.idClinrec} id={props.id}>
        <TitleContainer
          open={open}
          child={!!props.clinrec?.stages?.length}
          accesses={
            props.clinrec.isCustom &&
            (login === UserRolesEnum.RegistryAdmin || login === UserRolesEnum.RegistrySuperUsr)
          }
        >
          <LeftContainer>
            {props.showIconOpenBlock ? (
              open ? (
                <ContainerShow id={`close_block_${props.clinrec.idClinrec}`} onClick={() => setOpen(false)}>
                  <IconGroupHide />
                </ContainerShow>
              ) : (
                <ContainerShow
                  id={`open_block_${props.clinrec.idClinrec}`}
                  onClick={() => {
                    if (!Array.isArray(props.clinrec.stages)) {
                      dispatch(DictionaryClinrecPompThunk.getDictionaryClinrecsStage(props.clinrec.idClinrec));
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
            <ClinrecName>{props.clinrec.clinrecName}</ClinrecName>
          </LeftContainer>
          <ClinrecInfo>
            <InfoColumn width={"120px"}>
              <span>
                <RowTitle>№</RowTitle>
                <RowValue>
                  {" "}
                  {props.clinrec.isCustom ? props.clinrec.idRubricatorMz ?? "Н/Д" : props.clinrec.revisionId ?? "Н/Д"}
                </RowValue>
              </span>
              <span>
                <RowTitle>Версия:</RowTitle>
                <RowValue>{props.clinrec.version ?? "Н/Д"}</RowValue>
              </span>
            </InfoColumn>
            <InfoColumn>
              <span>
                <RowTitle style={{ maxWidth: "80px" }}>Возрастная категория:</RowTitle>
                <RowValue>
                  {!!props.clinrec.ageGroup?.length
                    ? props.clinrec.ageGroup?.map((age) => age.description).join(", ")
                    : "Н/Д"}
                </RowValue>{" "}
              </span>
              <span>
                <RowTitle>Тип:</RowTitle>
                <RowValue>{props.clinrec.isCustom ? "Пользовательская" : "Импортированная"}</RowValue>
              </span>
            </InfoColumn>

            <InfoColumn width={"150px"}>
              <span>
                <RowTitle>Год утверждения:</RowTitle>
                <RowValue>
                  {props.clinrec.revisionBdate ? moment(props.clinrec.revisionBdate).format("YYYY") : "Н/Д"}
                </RowValue>
              </span>
              <span>
                <RowTitle>Пересмотр не позднее:</RowTitle>
                <RowValue>
                  {props.clinrec.revisionEdate ? moment(props.clinrec.revisionEdate).format("YYYY") : "Н/Д"}
                </RowValue>
              </span>
            </InfoColumn>
            <InfoColumn width={"285px"}>
              <span>
                <RowTitle>Статус:</RowTitle>
                <RowValue>
                  {clinrecSelects.clinrecStatus?.find((s) => Number(s.value) === props.clinrec.status)?.label || "Н/Д"}
                </RowValue>
              </span>
              <span>
                <RowTitle>Статус применения:</RowTitle>
                <RowValue>
                  {clinrecSelects.clinrecUsageStatus?.find((s) => Number(s.value) === props.clinrec.usageStatus)
                    ?.label || "Н/Д"}
                </RowValue>
              </span>
            </InfoColumn>
            <InfoColumn width={"150px"}>
              <span>
                <RowTitle>Последняя редакция:</RowTitle>
                <RowValue>
                  {props.clinrec.clinrecUpdated ? moment(props.clinrec.clinrecUpdated).format("DD.MM.YYYY") : "Н/Д"}
                </RowValue>
              </span>
            </InfoColumn>
            <InfoColumn width={"64px"}>
              <IconContainer>
                {props.clinrec.isCustom &&
                (login === UserRolesEnum.RegistryAdmin || login === UserRolesEnum.RegistrySuperUsr) ? (
                  <>
                    <IconContainerFloatingmes
                      title={ru.floatingmes.edit}
                      onClick={() => setCurrentClinrec(props.clinrec, false)}
                    >
                      <IconEdit />
                    </IconContainerFloatingmes>
                    <ModalDeleteWIthIcon id={"delete-clinrecBlock"} onDelete={onDelete} />
                  </>
                ) : !(login === UserRolesEnum.RegistryAdmin || login === UserRolesEnum.RegistrySuperUsr) ? (
                  <IconContainerFloatingmes
                    title={ru.floatingmes.view}
                    onClick={() => setCurrentClinrec(props.clinrec, true)}
                  >
                    <IconEye />
                  </IconContainerFloatingmes>
                ) : (
                  <IconContainerFloatingmes
                    title={ru.floatingmes.view}
                    onClick={() => setCurrentClinrec(props.clinrec, true)}
                  >
                    <IconEye />
                  </IconContainerFloatingmes>
                )}
              </IconContainer>
            </InfoColumn>
          </ClinrecInfo>
        </TitleContainer>
        {props.clinrec.isCustom &&
          (login === UserRolesEnum.RegistryAdmin || login === UserRolesEnum.RegistrySuperUsr) &&
          open && (
            <StatementData style={{ marginLeft: "24px", marginBottom: "10px" }}>
              <ButtonCreateElem
                onClick={() => {
                  openModalClinrecStage("add");
                }}
                text={"Добавить этап"}
              />
            </StatementData>
          )}

        {open ? (
          Array.isArray(props.clinrec.stages) ? (
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {sortedItems?.map((item, index) => (
                      <Draggable
                        key={item.stageCode}
                        draggableId={item.stageCode}
                        index={index}
                        isDragDisabled={
                          !(
                            props.clinrec.isCustom &&
                            (login === UserRolesEnum.RegistryAdmin || login === UserRolesEnum.RegistrySuperUsr)
                          )
                        }
                      >
                        {(provided) => (
                          <DragItem ref={provided.innerRef} {...provided.draggableProps}>
                            <StageBlock
                              access={props.clinrec.isCustom}
                              key={props.id + "_stageBlock_" + item.stageCode}
                              clinrecId={props.clinrec.idClinrec}
                              provided={provided}
                              id={props.id + "_stageBlock_" + item.stageCode}
                              stage={item}
                              showIconOpenBlock={true}
                              openModal={(stage: IDictionaryClinrecStage, type: "edit" | "view") => {
                                openModalClinrecStage(type, stage);
                              }}
                            />
                          </DragItem>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          ) : (
            <IconLoading />
          )
        ) : null}
      </ClinrecBlockContainer>
    </customClinrecContext.Provider>
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

const ClinrecInfo = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const InfoColumn = styled.div<{ width?: string }>`
  width: ${({ width }) => (width ? width : "200px")};
  display: flex;
  flex-direction: column;
  padding-right: 5px;
  justify-content: space-between;

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

const ClinrecName = styled.div`
  min-width: 60px;
  word-break: break-word;
  font-weight: 600;
  margin-left: 15px;
  align-self: center;
`;

const LeftContainer = styled.div`
  width: 35%;
  display: flex;

  span {
    align-self: center;
  }

  .iconFloatingmes {
    padding-bottom: 5px;
  }
`;
const DragItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;
