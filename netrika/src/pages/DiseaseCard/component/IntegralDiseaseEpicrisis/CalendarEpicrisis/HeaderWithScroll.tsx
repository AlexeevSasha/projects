import moment from "moment";
import React, { useCallback, useMemo } from "react";
import { IconArrow } from "../../../../../common/components/Icon/IconArrow";
import { theme } from "../../../../../common/styles/theme";
import styled from "styled-components";

interface IProps {
  onUpdateMonth?: (value: number) => void;
  onUpdateYear?: (value: number) => void;
  month?: moment.Moment;
  title?: string;
  onClose: () => void;
}

export const HeaderWithScroll: React.FC<IProps> = ({ month, title, onUpdateMonth, onUpdateYear, ...props }) => {
  const renderTitle = useMemo(() => {
    let leftTitle = "";
    let rightTitle = "";

    if (month != null) {
      leftTitle = month.clone().format("MMMM");
      rightTitle = month.clone().format("YYYY");
    } else if (title != null) {
      leftTitle = title;
    }

    return { leftTitle, rightTitle };
  }, [month, title]);

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
      <Close id={"go_to_year_calendar"} onClick={props.onClose}>
        Вернуться
      </Close>

      <Block>
        <IconContainerReverse onClick={() => setMonth("prev")}>
          <IconArrow rotate={"-90deg"} color={theme.colors.hightBlue} width={"12px"} height={"8px"} />
        </IconContainerReverse>
        <Title>{renderTitle.leftTitle}</Title>
        <IconContainer onClick={() => setMonth("next")}>
          <IconArrow rotate={"-90deg"} color={theme.colors.hightBlue} width={"12px"} height={"8px"} />
        </IconContainer>

        <IconContainerReverse onClick={() => setYear("prev")}>
          <IconArrow rotate={"-90deg"} color={theme.colors.hightBlue} width={"12px"} height={"8px"} />
        </IconContainerReverse>
        <Title>{renderTitle.rightTitle}</Title>
        <IconContainer onClick={() => setYear("next")}>
          <IconArrow rotate={"-90deg"} color={theme.colors.hightBlue} width={"12px"} height={"8px"} />
        </IconContainer>
      </Block>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex: 1;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  max-height: 60px;
  border-radius: 4px 4px 0 0;
  background-color: white;
`;

const Close = styled.div`
  line-height: 130%;
  color: ${theme.colors.green};
  cursor: pointer;
`;

const Block = styled.div`
  display: flex;
`;

const Title = styled.h3`
  font-weight: normal;
  color: #808080;
  text-transform: capitalize;
  padding: 0 20px;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 10px;
`;

const IconContainerReverse = styled(IconContainer as any)`
  transform: rotate(180deg);
`;
