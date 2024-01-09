import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { dictionaryClinrecPompSelector } from "../../../../../module/dictionaryClinrecPomp/dictionaryClinrecPompSelector";
import { GraphBlock } from "./GraphBlock";
import { IconArrow } from "../../../../../common/components/Icon/IconArrow";
import { IconContainer } from "../../../../../common/components/Table/UIcomponent/UIcomponent";
import { IsOpenCardContext } from "common/components/Container/DiseaseCardLayout";
import { IPompResponse } from "../../../../../common/interfaces/IPompResponse";
import { styled } from "../../../../../common/styles/styled";
import { theme } from "../../../../../common/styles/theme";
import { useSelector } from "react-redux";

interface IProps {
  id: string;
  pomp: IPompResponse;
  showIconOpenBlock?: boolean;
}
export const PompBlock = (props: IProps) => {
  const { trigger } = useContext(IsOpenCardContext);
  const { profiles } = useSelector(dictionaryClinrecPompSelector);
  const [open, setOpen] = useState<boolean>(false);
  const [openedGraphsIds, setOpenedGraphsIds] = useState<string[]>([]);

  useEffect(() => {
    if (!open) {
      openedGraphsIds.map((item) => trigger(item));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, openedGraphsIds]);

  return (
    <ClinrecBlockContainer key={props.id} id={props.id}>
      <TitleContainer open={open} child={!!props.pomp?.graphs?.length} onClick={() => setOpen(!open)}>
        <div>
          <PompName>{props.pomp.name}</PompName>
          <LeftContainer>
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

              <InfoColumn width={"210px"}>
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
              <InfoColumn width={"230px"}>
                <span>
                  <RowTitle>Последняя редакция:</RowTitle>
                  <RowValue>
                    {props.pomp.pompUpdated ? moment(props.pomp.pompUpdated).format("DD.MM.YYYY") : "Н/Д"}
                  </RowValue>
                </span>
              </InfoColumn>
            </PompInfo>
          </LeftContainer>
        </div>

        <IconContainer id={`pomp_${props.id}`}>
          <IconArrow rotate={open ? "" : "270deg"} />
        </IconContainer>
      </TitleContainer>
      {open ? (
        <>
          {props.pomp.graphs.map((graph, index) => (
            <GraphBlock
              key={index}
              id={`${props.id}_graphBlock_${graph.idGraph}`}
              graph={graph}
              first={index === 0}
              setOpenedGraphsIds={setOpenedGraphsIds}
            />
          ))}{" "}
        </>
      ) : null}
    </ClinrecBlockContainer>
  );
};

const ClinrecBlockContainer = styled.div`
  justify-content: space-between;
  background: ${theme.colors.lightGray};
  display: flex;
  flex-direction: column;
  padding: 10px 5px;
  border: 1px solid ${theme.colors.gray};
`;
const TitleContainer = styled.div<{ open: boolean; child: boolean }>`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ open, child }) => (open && child ? "15px" : "0")};
`;
const LeftContainer = styled.div`
  width: 100%;
  display: flex;
`;
const PompInfo = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const InfoColumn = styled.div<{ width?: string }>`
  width: ${({ width }) => (width ? width : "200px")};

  display: flex;
  flex-direction: column;

  span {
    &:first-child span {
      margin-bottom: 8px;
    }
    display: inline-flex;
  }
  margin-right: 10px;
`;

const RowTitle = styled.span`
  font-weight: bold;
  align-items: baseline;
`;
const RowValue = styled.span`
  margin-left: 2px;
  align-items: end;
`;

const PompName = styled.div`
  word-break: break-word;
  font-weight: 600;
  margin-bottom: 15px;
`;
