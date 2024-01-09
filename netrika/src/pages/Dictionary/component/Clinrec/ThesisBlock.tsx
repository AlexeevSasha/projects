import React, { MouseEvent, useCallback, useContext, useEffect, useState } from "react";
import { styled } from "../../../../common/styles/styled";
import { theme } from "../../../../common/styles/theme";
import { IconArrow } from "../../../../common/components/Icon/IconArrow";
import { IconContainer, IconContainerFloatingmes } from "../../../../common/components/Table/UIcomponent/UIcomponent";
import { ContainerShow } from "../../../Proposal/components/DiseaseInfo/styles";
import { IconGroupHide } from "../../../../common/components/Icon/IconGroupHide";
import { IconGroupShow } from "../../../../common/components/Icon/IconGroupShow";
import { CriterionExecuteResultEnum } from "../../../../common/interfaces/CriterionExecuteResultEnum";
import { IconSuccessViolation } from "../../../../common/components/Icon/IconSuccessViolation";
import { IconUnknownViolation } from "../../../../common/components/Icon/IconUnknownViolation";
import { IconErrorViolation } from "../../../../common/components/Icon/IconErrorViolation";
import { ru } from "../../../../common/lang/ru";
import { IconEdit } from "../../../../common/components/Icon/IconEdit";
import { ProposalQualityRequirementsAction } from "../../../../module/proposalQualityRequirements/proposalQualityRequirementsAction";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { FlexContainer } from "../../../../common/ui/FlexContainer";
import { IClinrecQualityCriterion } from "../../../../common/interfaces/clinrec/IClinrecQualityCriterion";
import { IOrderQualityCriterionCurrentItem } from "../../../../common/interfaces/order/IOrderQualityCriterionLIstItem";
import { ActivityBlock } from "./ActivityBlock";
import { css } from "styled-components";
import { IconLoading } from "../../../../common/components/Icon/IconLoading";
import { DictionaryClinrecPompThunk } from "../../../../module/dictionaryClinrecPomp/dictionaryClinrecPompThunk";
import {
  IDictionaryClinrecActivity,
  IDictionaryClinrecThesis,
} from "../../../../common/interfaces/dictionary/IDictionaryClinrec";
import { customClinrecContext } from "./ClinrecBlock";
import { IconEye } from "../../../../common/components/Icon/IconEye";
import { UserRolesEnum } from "../../../../common/interfaces/user/UserRolesEnum";
import { authorizationSelector } from "../../../../module/authorization/authorizationSelector";
import { StatementData } from "../../../../common/components/Container/Container";
import { ButtonCreateElem } from "../../../../common/ui/Button/ButtonCreateElem";
import { ModalClinrecActivity } from "../Modal/ModalClinrecActivity";
import { ModalDeleteWIthIcon } from "../../../../common/components/Modal/ModalDeleteWIthIcon";
import { modal } from "../../../../common/helpers/event/modalEvent";
import { getTitleModal } from "../../../../common/helpers/getTitle";

interface IProps {
  access: boolean;
  id: string;
  clinrecId: number;
  stageCode: string;
  thesis: IDictionaryClinrecThesis;
  openModal: (thesis: IDictionaryClinrecThesis, type: "edit" | "view") => void;
}

export const ThesisBlock = (props: IProps) => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { showEdit } = useContext(customClinrecContext);
  const { login } = useSelector(authorizationSelector);

  const [qualityCriterionItem, setQualityCriterionItem] = useState<
    IClinrecQualityCriterion | IOrderQualityCriterionCurrentItem
  >();
  const [openComment, setOpenComment] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (props.thesis.qualityCriterion) setQualityCriterionItem(props.thesis.qualityCriterion);
  }, [props.thesis.qualityCriterion]);

  const clickOpen = useCallback(
    (event: MouseEvent<HTMLElement>, type: "edit" | "view") => {
      event.preventDefault();
      event.stopPropagation();
      if (!open && !Array.isArray(props.thesis.activities)) {
        dispatch(
          DictionaryClinrecPompThunk.getDictionaryClinrecsActivity(
            props.clinrecId,
            props.stageCode,
            props.thesis.thesisCode
          )
        );
      }
      props.openModal(
        {
          ...props.thesis,
        },
        type
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch, open, props.clinrecId, props.stageCode, props.thesis.thesisCode, props.thesis.activities]
  );

  const onDelete = useCallback(async () => {
    await dispatch(
      DictionaryClinrecPompThunk.deleteClinrecThesis(props.clinrecId, props.stageCode, props.thesis.thesisCode)
    );
  }, [dispatch, props.clinrecId, props.stageCode, props.thesis.thesisCode]);

  const openModalClinrecActivity = useCallback(
    (type: "add" | "edit" | "view", activity?: IDictionaryClinrecActivity) => {
      modal.open(
        <ModalClinrecActivity
          currentActivity={activity}
          stageCode={props.stageCode}
          clinrecId={props.clinrecId}
          disabled={type === "view"}
          thesisClinrecCode={props.thesis.thesisCode}
          title={getTitleModal(type, "activity")}
        />
      );
    },
    [props]
  );

  return (
    <ThesisContent>
      <ThesisHeader>
        {props.thesis.qualityCriterion?.status && (
          <ThesisStatus>
            {props.thesis.qualityCriterion?.status === CriterionExecuteResultEnum.MetRequirement && (
              <IconSuccessViolation />
            )}
            {props.thesis.qualityCriterion?.status === CriterionExecuteResultEnum.NotEnoughDataRequirement && (
              <IconUnknownViolation />
            )}
            {props.thesis.qualityCriterion?.status === CriterionExecuteResultEnum.NotMetRequirement && (
              <IconErrorViolation />
            )}
          </ThesisStatus>
        )}
        {open ? (
          <ContainerShow
            id={`close_thesis_${props.id}`}
            onClick={() => {
              setOpen(!open);
            }}
          >
            <IconGroupHide />
          </ContainerShow>
        ) : (
          <ContainerShow
            id={`open_thesis_${props.id}`}
            onClick={() => {
              if (!Array.isArray(props.thesis.activities)) {
                dispatch(
                  DictionaryClinrecPompThunk.getDictionaryClinrecsActivity(
                    props.clinrecId,
                    props.stageCode,
                    props.thesis.thesisCode
                  )
                );
              }
              setOpen(!open);
            }}
          >
            <IconGroupShow />
          </ContainerShow>
        )}
        <ThesisText open={open}>{props.thesis.thesisText}</ThesisText>

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
      </ThesisHeader>
      {open && qualityCriterionItem && (
        <FlexContainer
          direction={"row"}
          justify={"space-between"}
          style={{
            border: `1px solid ${theme.colors.gray}`,
            borderRadius: "10px",
            margin: "5px 0px",
            padding: "8px",
          }}
        >
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
      {open && (
        <ThesisTitleContainer style={{ margin: "5px", marginLeft: "9px", flexDirection: "column" }}>
          <span>
            <span>
              <RowTitle>Номер:</RowTitle> <RowValue> {props.thesis.number || "—"}</RowValue>
            </span>
            <span>
              <RowTitle>Уровень убедительности:</RowTitle> <RowValue> {props.thesis.convincing || "—"}</RowValue>
            </span>
            <span>
              <RowTitle>Уровень доказательности:</RowTitle> <RowValue> {props.thesis.evidential || "—"}</RowValue>
            </span>
            {props.thesis?.stadia && (
              <span>
                <RowTitle>Стадия опухолевого процесса:</RowTitle> <RowValue> {props.thesis.stadia}</RowValue>
              </span>
            )}
            {props.thesis?.tnm && (
              <span>
                <RowTitle>TNM:</RowTitle> <RowValue> {props.thesis.tnm}</RowValue>
              </span>
            )}
          </span>
          {props.thesis?.triggerPoints && (
            <>
              <span style={{ maxWidth: "100%" }}>
                <RowTitle>Тригерная точка:</RowTitle>
                <RowValue>
                  {!!props.thesis?.triggerPoints?.length
                    ? props.thesis?.triggerPoints?.map((item) => item.description).join(", ")
                    : "—"}
                </RowValue>
              </span>
            </>
          )}
        </ThesisTitleContainer>
      )}
      {open && props.thesis.comment && (
        <CustomThesisContent status={null}>
          <ThesisHeader onClick={() => setOpenComment(!openComment)} style={{ justifyContent: "space-between" }}>
            <ThesisTitleContainer>
              <RowTitle>Комментарий</RowTitle>
            </ThesisTitleContainer>

            <IconContainer id={`card_${props.id}_control`}>
              <IconArrow rotate={openComment ? "" : "270deg"} />
            </IconContainer>
          </ThesisHeader>
          {openComment && <>{props.thesis.comment}</>}
        </CustomThesisContent>
      )}
      {props.access && (login === UserRolesEnum.RegistryAdmin || login === UserRolesEnum.RegistrySuperUsr) && open && (
        <>
          <StatementData style={{ marginLeft: "10px", marginBottom: "10px" }}>
            <RowValue> Вмешательства:</RowValue>
          </StatementData>
          <StatementData style={{ marginLeft: "10px", marginBottom: "10px" }}>
            <ButtonCreateElem
              onClick={() => {
                openModalClinrecActivity("add");
              }}
              text={"Добавить вмешательство"}
            />
          </StatementData>
        </>
      )}

      {open ? (
        Array.isArray(props.thesis.activities) ? (
          props.thesis?.activities?.map((item, index) => (
            <ActivityBlock
              key={props.id + "activityBlock_" + item.id}
              activity={item}
              id={props.id + "activityBlock_" + item.id}
              first={index === 0}
              openModal={(activity: IDictionaryClinrecActivity, type: "edit" | "view") => {
                openModalClinrecActivity(type, activity);
              }}
              stageCode={props.stageCode}
              clinrecId={props.clinrecId}
              thesisClinrecCode={props.thesis.thesisCode}
            />
          ))
        ) : (
          <IconLoading />
        )
      ) : null}

      {/*<ModalClinrecActivity*/}
      {/*  showModal={!!showAddModal}*/}
      {/*  title={*/}
      {/*    showAddModal === "add"*/}
      {/*      ? "Создание вмешательства"*/}
      {/*      : showAddModal === "edit"*/}
      {/*      ? "Редактирование вмешательства"*/}
      {/*      : "Просмотр вмешательства"*/}
      {/*  }*/}
      {/*  currentActivity={currentActivity}*/}
      {/*  close={() => setShowAddModal(null)}*/}
      {/*  stageCode={props.stageCode}*/}
      {/*  clinrecId={props.clinrecId}*/}
      {/*  disabled={showAddModal === "view"}*/}
      {/*  thesisClinrecCode={props.thesis.thesisCode}*/}
      {/*/>*/}
    </ThesisContent>
  );
};

const ThesisContent = styled.div<{ status?: CriterionExecuteResultEnum | null }>`
  margin: 10px 12px 0 55px;
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

const CustomThesisContent = styled.div<{ status?: CriterionExecuteResultEnum | null }>`
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

const ThesisHeader = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: pointer;

  .icon-container {
    margin: 0;
    justify-content: center;
    padding-right: 18px;
  }
`;
const ThesisTitleContainer = styled.div`
  display: flex;
  cursor: pointer;
`;

const ThesisStatus = styled.div<{ first?: boolean; showIconOpenBlock?: boolean }>`
  z-index: 2;
  background: white;
  border-right: none;
  border-top: none;
  bottom: -2px;
  left: -24px;
`;

const QualityCriterionItem = styled.p`
  margin: 0 8px;
`;

const ThesisText = styled.div<{ open: boolean }>`
  margin-left: 5px;
  ${(props) =>
    props.open
      ? css`
          display: flex;
          justify-content: space-between;

          width: 95%;
        `
      : css`
          width: 95%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        `}
`;
const RowTitle = styled.span`
  margin-right: 5px;
  color: ${theme.colors.hightBlue};
`;
const RowValue = styled.span`
  margin-right: 10px;
`;
