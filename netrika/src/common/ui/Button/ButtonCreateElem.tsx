import { styled } from "common/styles/styled";
import { theme } from "common/styles/theme";
import React, { ButtonHTMLAttributes } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  customId?: number;
}

export const ButtonCreateElem = (props: IProps) => {
  const customId = props.customId ? `open_modal_${props.customId}` : "open_modal";

  return (
    <ButtonContainer onClick={props.onClick} id={customId}>
      <PlusIcon>+</PlusIcon>
      {props.text}
    </ButtonContainer>
  );
};

const PlusIcon = styled.div`
  display: inline-block;
  background: ${theme.colors.green};
  color: ${theme.colors.white};
  padding: 0 6px;
  border-radius: 2px;
  margin-right: 12px;
  transition: all 0.3s ease-in-out;
`;

const ButtonContainer = styled.button`
  padding: 0;
  cursor: pointer;
  letter-spacing: 0.005em;
  color: ${theme.colors.hightBlue};
  background: none;
  border: none;
  outline: none;
  transition: all 0.3s ease-in-out;

  &:hover {
    opacity: 0.8;

    & > ${PlusIcon} {
      transform: scale(1.1);
    }
  }
`;
