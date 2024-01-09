import React, { MouseEvent, useCallback, useContext, useEffect, useState } from "react";
import { styled } from "../../../../common/styles/styled";
import { theme } from "../../../../common/styles/theme";
import { ContainerShow } from "../../../Proposal/components/DiseaseInfo/styles";
import { IconGroupHide } from "../../../../common/components/Icon/IconGroupHide";
import { IconGroupShow } from "../../../../common/components/Icon/IconGroupShow";
import { CriterionExecuteResultEnum } from "../../../../common/interfaces/CriterionExecuteResultEnum";
import { IconSuccessViolation } from "../../../../common/components/Icon/IconSuccessViolation";
import { IconUnknownViolation } from "../../../../common/components/Icon/IconUnknownViolation";
import { IconErrorViolation } from "../../../../common/components/Icon/IconErrorViolation";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { IClinrecQualityCriterion } from "../../../../common/interfaces/clinrec/IClinrecQualityCriterion";
import { IOrderQualityCriterionCurrentItem } from "../../../../common/interfaces/order/IOrderQualityCriterionLIstItem";
import { FlexContainer } from "../../../../common/ui/FlexContainer";
import moment from "moment";
import { IconContainer, IconContainerFloatingmes } from "../../../../common/components/Table/UIcomponent/UIcomponent";
import { ru } from "../../../../common/lang/ru";
import { ProposalQualityRequirementsAction } from "../../../../module/proposalQualityRequirements/proposalQualityRequirementsAction";
import { IconEdit } from "../../../../common/components/Icon/IconEdit";
import { ActivityBlock } from "./ActivityBlock";
import { IDictionaryPompActivity, IDictionaryState } from "../../../../common/interfaces/dictionary/IDictionaryPomp";
import { DictionaryClinrecPompThunk } from "../../../../module/dictionaryClinrecPomp/dictionaryClinrecPompThunk";
import { IconLoading } from "../../../../common/components/Icon/IconLoading";
import { IconEye } from "../../../../common/components/Icon/IconEye";
import { IconArrow } from "../../../../common/components/Icon/IconArrow";
import { UserRolesEnum } from "../../../../common/interfaces/user/UserRolesEnum";
import { authorizationSelector } from "../../../../module/authorization/authorizationSelector";
import { customPompContext } from "./PompBlock";
import { IDictionaryClinrecActivity } from "../../../../common/interfaces/dictionary/IDictionaryClinrec";
import { ModalPompActivity } from "./Modals/ModalPompActivity";
import { StatementData } from "../../../../common/components/Container/Container";
import { ButtonCreateElem } from "../../../../common/ui/Button/ButtonCreateElem";
import { ModalDeleteWIthIcon } from "../../../../common/components/Modal/ModalDeleteWIthIcon";
import { modal } from "../../../../common/helpers/event/modalEvent";
import { getTitleModal } from "../../../../common/helpers/getTitle";

interface IProps {
  access: boolean;
  pompId: number;
  graphId: number;
  stageCode: string;
  id: string;
  state: IDictionaryState;
  openModal: (thesis: IDictionaryState, type: "edit" | "view") => void;
}

export const StateBlock = (props: IProps) => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { login } = useSelector(authorizationSelector);

  const [qualityCriterionItem, setQualityCriterionItem] = useState<
    IClinrecQualityCriterion | IOrderQualityCriterionCurrentItem
  >();
  const { showEdit } = useContext(customPompContext);
  const [open, setOpen] = useState<boolean>(false);
  const [openDescription, setOpenDescription] = useState<boolean>(false);

  useEffect(() => {
    if (props.state.qualityCriterion) setQualityCriterionItem(props.state.qualityCriterion);
  }, [props.state.qualityCriterion]);

  const clickOpen = useCallback(
    async (event: MouseEvent<HTMLElement>, type: "edit" | "view") => {
      event.preventDefault();
      event.stopPropagation();
      if (!open && !Array.isArray(props.state.activities)) {
        await dispatch(
          DictionaryClinrecPompThunk.getDictionaryPompsActivity(
            props.pompId,
            props.graphId,
            props.stageCode,
            props.state.idState
          )
        );
      }
      props.openModal(
        {
          ...props.state,
        },
        type
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch, open, props.pompId, props.graphId, props.stageCode, props.state]
  );

  const onDelete = useCallback(async () => {
    await dispatch(
      DictionaryClinrecPompThunk.deletePompState(props.pompId, props.graphId, props.stageCode, props.state.idState)
    );
  }, [dispatch, props.pompId, props.graphId, props.stageCode, props.state.idState]);

  const openModalPompActivity = (type: "add" | "edit" | "view", activity?: IDictionaryClinrecActivity) => {
    modal.open(
      <ModalPompActivity
        currentActivity={activity}
        stageCode={props.stageCode}
        idPomp={props.pompId}
        idPompGraph={props.graphId}
        idPompState={props.state.idState}
        disabled={type === "view"}
        title={getTitleModal(type, "activity")}
      />
    );
  };

  return (
    <StateContent key={props.id}>
      <StateHeader>
        {props.state.qualityCriterion?.status && (
          <StateStatus>
            {props.state.qualityCriterion?.status === CriterionExecuteResultEnum.MetRequirement && (
              <IconSuccessViolation />
            )}
            {props.state.qualityCriterion?.status === CriterionExecuteResultEnum.NotEnoughDataRequirement && (
              <IconUnknownViolation />
            )}
            {props.state.qualityCriterion?.status === CriterionExecuteResultEnum.NotMetRequirement && (
              <IconErrorViolation />
            )}
          </StateStatus>
        )}
        {open ? (
          <ContainerShow id={`close_thesis_${props.id}`} onClick={() => setOpen(false)}>
            <IconGroupHide />
          </ContainerShow>
        ) : (
          <ContainerShow
            id={`open_thesis_${props.id}`}
            onClick={() => {
              if (!Array.isArray(props.state.activities)) {
                dispatch(
                  DictionaryClinrecPompThunk.getDictionaryPompsActivity(
                    props.pompId,
                    props.graphId,
                    props.stageCode,
                    props.state.idState
                  )
                );
              }
              setOpen(true);
            }}
          >
            <IconGroupShow />
          </ContainerShow>
        )}
        <StateTitleContainer style={{ justifyContent: "space-between", width: "100%" }}>
          <TitleContainer>
            <span>
              <StateTitle>Номер: </StateTitle> {props.state.idState}
            </span>
            {props.state?.triggerPoints && (
              <span style={{ maxWidth: "100%" }}>
                <StateTitle>Тригерная точка:</StateTitle>
                <span>
                  {!!props.state?.triggerPoints?.length
                    ? props.state?.triggerPoints?.map((item) => item.description).join(", ")
                    : "—"}
                </span>
              </span>
            )}
          </TitleContainer>

          <IconContainer>
            {showEdit ? (
              <>
                <IconContainerFloatingmes
                  title={ru.floatingmes.edit}
                  onClick={(e: MouseEvent<HTMLElement>) => clickOpen(e, "edit")}
                >
                  <IconEdit />
                </IconContainerFloatingmes>
                <ModalDeleteWIthIcon onDelete={onDelete} />
              </>
            ) : !(login === UserRolesEnum.RegistryAdmin || login === UserRolesEnum.RegistrySuperUsr) ? (
              <IconContainerFloatingmes
                title={ru.floatingmes.view}
                onClick={(e: MouseEvent<HTMLElement>) => clickOpen(e, "view")}
              >
                <IconEye />
              </IconContainerFloatingmes>
            ) : (
              <IconContainerFloatingmes
                title={ru.floatingmes.view}
                onClick={(e: MouseEvent<HTMLElement>) => clickOpen(e, "view")}
              >
                <IconEye />
              </IconContainerFloatingmes>
            )}
          </IconContainer>
        </StateTitleContainer>
      </StateHeader>
      <StateTitleContainer style={{ marginLeft: "55px" }}>
        <StateTitle>Наименование подэтапа:</StateTitle> {props.state.stateName}
      </StateTitleContainer>
      <StateTitleContainer style={{ marginLeft: "55px" }}>
        <StateTitle>Предыдущий подэтап:</StateTitle>{" "}
        <LinkState>
          {!!props.state.fromState.length ? props.state.fromState.map((s) => s.associatedStateId).join(", ") : " - "}{" "}
        </LinkState>
        <StateTitle>Следующий подэтап:</StateTitle>{" "}
        <LinkState>
          {!!props.state.toState.length ? props.state.toState.map((s) => s.associatedStateId).join(", ") : " - "}
        </LinkState>
      </StateTitleContainer>
      <StateTitleContainer style={{ marginLeft: "32px" }}>
        {props.state.description && (
          <CustomDescriptionContent status={null}>
            <DescriptionHeader
              onClick={() => setOpenDescription(!openDescription)}
              style={{ justifyContent: "space-between" }}
            >
              <DescriptionTitleContainer>
                <RowTitle>Описание</RowTitle>
              </DescriptionTitleContainer>

              <IconContainer id={`card_${props.id}_control`}>
                <IconArrow rotate={openDescription ? "" : "270deg"} />
              </IconContainer>
            </DescriptionHeader>
            {openDescription && <>{props.state.description}</>}
          </CustomDescriptionContent>
        )}{" "}
      </StateTitleContainer>

      {qualityCriterionItem && (
        <FlexContainer direction={"row"} justify={"space-between"}>
          <QualityCriterionItem id={"column_baseUrl"}>{qualityCriterionItem.name}</QualityCriterionItem>
          <QualityCriterionItem id={"column_idInternal"}>{qualityCriterionItem.description}</QualityCriterionItem>
          {qualityCriterionItem.updatedAt && (
            <QualityCriterionItem id={"column_systemOid"}>
              {moment(qualityCriterionItem.updatedAt).format("DD MMMM YYYY")}
            </QualityCriterionItem>
          )}
          <IconContainer>
            <IconContainerFloatingmes
              title={ru.floatingmes.edit}
              onClick={() => {
                dispatch(
                  ProposalQualityRequirementsAction.fullItem.done({
                    params: null,
                    result: { ...qualityCriterionItem, orderId: +id },
                  })
                );
              }}
            >
              <IconEdit />
            </IconContainerFloatingmes>
          </IconContainer>
        </FlexContainer>
      )}

      {open && <StatementData style={{ marginLeft: "52px", marginBottom: "10px" }}>Вмешательства:</StatementData>}

      {props.access && (login === UserRolesEnum.RegistryAdmin || login === UserRolesEnum.RegistrySuperUsr) && open && (
        <StatementData style={{ marginLeft: "52px", marginBottom: "10px" }}>
          <ButtonCreateElem
            onClick={() => {
              openModalPompActivity("add");
            }}
            text={"Добавить вмешательство"}
          />
        </StatementData>
      )}

      {open ? (
        Array.isArray(props.state.activities) ? (
          props.state?.activities?.map((item, index) => (
            <ActivityBlock
              idPomp={props.pompId}
              stageCode={props.stageCode}
              idGraph={props.graphId}
              stateId={props.state.idState}
              key={id + "activityBlock_" + item.id}
              activity={item}
              id={id + "activityBlock_" + item.id}
              first={index === 0}
              openModal={(activity: IDictionaryPompActivity, type: "edit" | "view") => {
                openModalPompActivity(type, activity);
              }}
            />
          ))
        ) : (
          <IconLoading />
        )
      ) : null}
    </StateContent>
  );
};

const StateContent = styled.div`
  background: ${theme.colors.white};
  margin: 0 24px 24px 48px;
  display: flex;
  flex-direction: column;
  transition: height 1s ease-in-out;
`;
const StateHeader = styled.div`
  position: relative;
  display: flex;
`;

const StateTitleContainer = styled.div`
  display: flex;
  margin-left: 15px;
`;
const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  padding: 0 10px 0 20px;
`;

const StateTitle = styled.span`
  font-weight: bold;
`;

const StateStatus = styled.div<{ first?: boolean; showIconOpenBlock?: boolean }>`
  position: absolute;
  z-index: 2;
  background: white;
  border-right: none;
  border-top: none;
  bottom: -2px;
  left: -24px;
`;

const LinkState = styled.span`
  cursor: pointer;
  color: ${theme.colors.blue};
`;
const QualityCriterionItem = styled.p`
  margin: 0 8px;
`;
const CustomDescriptionContent = styled.div<{ status?: CriterionExecuteResultEnum | null }>`
  width: 100%;
  margin-left: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
  background: ${theme.colors.white};
  padding: 8px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  border: 1px solid
    ${({ status }) =>
      status === CriterionExecuteResultEnum.MetRequirement
        ? `${theme.colors.green}`
        : status === CriterionExecuteResultEnum.NotMetRequirement
        ? `${theme.colors.lightRed}`
        : `${theme.colors.gray}`};
`;

const DescriptionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: pointer;

  .icon-container {
    margin: 0;
    justify-content: center;
    padding-right: 18px;
  }
`;
const RowTitle = styled.span`
  margin-right: 5px;
  color: ${theme.colors.hightBlue};
`;
const DescriptionTitleContainer = styled.div`
  display: flex;
  cursor: pointer;
`;
