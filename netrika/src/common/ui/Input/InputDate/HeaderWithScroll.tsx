import moment from "moment";
import React, { useCallback, useMemo } from "react";
import { styled } from "../../../styles/styled";
import { IconArrow } from "../../../components/Icon/IconArrow";
import { theme } from "../../../styles/theme";

interface IProps {
  onUpdateMonth?: (value: number) => void;
  onUpdateYear?: (value: number) => void;
  month?: moment.Moment;
  currentDay?: moment.Moment;
  title?: string;
}

export const HeaderWithScroll: React.FC<IProps> = ({ month, currentDay, title, onUpdateMonth, onUpdateYear }) => {
  const renderTitle = useMemo(() => {
    let leftTitle = "";
    let rightTitle = "";

    if (month != null && currentDay != null) {
      leftTitle = month.clone().format("MMMM");
      rightTitle = month.clone().format("YYYY");
    } else if (title != null) {
      leftTitle = title;
    }

    return { leftTitle, rightTitle };
  }, [currentDay, month, title]);

  const setMonth = useCallback(
    (type: "next" | "prev") => {
      const value = type === "next" ? 1 : -1;
      onUpdateMonth && onUpdateMonth(value);
    },
    [onUpdateMonth]
  );

  const setYear = useCallback(
    (type: "next" | "prev") => {
      const value = type === "next" ? 1 : -1;
      onUpdateYear && onUpdateYear(value);
    },
    [onUpdateYear]
  );

  return (
    <Container>
      <IconContainerReverse onClick={() => setMonth("prev")} id={"calendar_prev_month"}>
        <IconArrow rotate={"-90deg"} color={theme.colors.hightBlue} width={"12px"} height={"8px"} />
      </IconContainerReverse>
      <Title id={"calendar_month"}>{renderTitle.leftTitle}</Title>
      <IconContainer onClick={() => setMonth("next")} id={"calendar_next_month"}>
        <IconArrow rotate={"-90deg"} color={theme.colors.hightBlue} width={"12px"} height={"8px"} />
      </IconContainer>

      <IconContainerReverse onClick={() => setYear("prev")} id={"calendar_prev_year"}>
        <IconArrow rotate={"-90deg"} color={theme.colors.hightBlue} width={"12px"} height={"8px"} />
      </IconContainerReverse>
      <Title id={"calendar_year"}>{renderTitle.rightTitle}</Title>
      <IconContainer onClick={() => setYear("next")} id={"calendar_next_year"}>
        <IconArrow rotate={"-90deg"} color={theme.colors.hightBlue} width={"12px"} height={"8px"} />
      </IconContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex: 1;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0 0;
  max-height: 60px;
  border-radius: 4px 4px 0 0;
  background-color: white;
`;

const Title = styled.span`
  font-size: 12px;
  color: #808080;
  text-transform: capitalize;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 10px;
`;

const IconContainerReverse = styled(IconContainer)`
  transform: rotate(180deg);
`;
