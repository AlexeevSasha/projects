import { theme } from "common/styles/theme";
import { DiseaseCardEpicrisisAction } from "module/diseaseCardEpicrisis/diseaseCardEpicrisisAction";
import { selectFilter } from "module/diseaseCardEpicrisis/diseaseCardEpicrisisSelector";
import moment from "moment";
import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconCross } from "common/components/Icon/IconCross";
import styled from "styled-components";
import { IconContainerFloatingmes } from "common/components/Table/UIcomponent/UIcomponent";

export const BlockFilterInfo: FC = () => {
  const dispatch = useDispatch();
  const { date, dateType } = useSelector(selectFilter);

  const handleReset = () => dispatch(DiseaseCardEpicrisisAction.resetFilter());

  return (
    <Container id={"filter_medical_care_case"}>
      <div style={{ flex: 1, textAlign: "center" }}>
        Отобраны случаи за {dateType ? moment(date).format("MMMM YYYY") : "весь период"}
      </div>
      {!!dateType && (
        <Reset id={"clear_filter"} onClick={handleReset}>
          <IconContainerFloatingmes title="Очистить фильтр">
            <IconCross color={theme.colors.green} hideFloatingmes />
          </IconContainerFloatingmes>
        </Reset>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid ${theme.colors.gray};
  margin-top: 2px;
  padding: 7px 10px;
  font-weight: bold;
  background: ${theme.colors.white};
`;

const Reset = styled.div`
  position: absolute;
  right: 10px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 2px;
  cursor: pointer;
  color: ${theme.colors.green};
`;
