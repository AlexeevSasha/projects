import React from "react";
import { IconButtonMove } from "../../../../common/components/Icon/IconButtonMove";
import { styled } from "../../../../common/styles/styled";
import { theme } from "../../../../common/styles/theme";

interface IProps {
  moveTop?: () => void;
  moveBottom?: () => void;
  disableTop?: boolean;
  disableBottom?: boolean;
}

export const MoveElement: React.FC<IProps> = (props) => {
  return (
    <Container>
      <Block onClick={props.disableBottom ? undefined : props.moveBottom}>
        <IconButtonMove color={props.disableBottom ? theme.colors.hightBlue : undefined} />
      </Block>
      <Block onClick={props.disableTop ? undefined : props.moveTop}>
        <IconButtonMove rotate={{ transform: "rotate(180deg)" }} color={props.disableTop ? "#607890" : undefined} />
      </Block>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
`;

const Block = styled.div`
  margin-right: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;
