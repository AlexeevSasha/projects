import { theme } from "common/styles/theme";
import React from "react";
import { styled } from "../../styles/styled";
import { IconSearch } from "../../components/Icon/IconSearch";
import { InputStyle } from "./styles/inputStyles";
import { IInput } from "./interface/IInput";

interface IProps extends IInput {
  styleContainer?: React.CSSProperties;
}

export const InputSearch: React.FC<IProps> = ({ id, styleContainer, ...attr }) => {
  return (
    <InputContainer style={styleContainer}>
      <CustomInput
        id={id ? id : "search"}
        placeholder={"Полнотекстовый поиск по таблице"}
        width={attr.width || 350}
        {...attr}
      />
      <IconSearchStyle>
        <IconSearch />
      </IconSearchStyle>
    </InputContainer>
  );
};

const InputContainer = styled.div<{ error?: boolean }>`
  display: flex;
  background: ${theme.colors.white};
  align-items: center;
  border-radius: 4px;
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.03);
  position: relative;
`;

const IconSearchStyle = styled.span`
  padding-top: 4px;
  padding-left: 5px;
  position: absolute;
`;

const CustomInput = styled(InputStyle)`
  padding-left: 25px;

  &:focus + ${IconSearchStyle} {
    svg {
      path {
        fill: ${theme.colors.green};
      }
    }
  }

  & ~ ${IconSearchStyle} {
    svg {
      path {
        fill: ${(props) => (props.error ? theme.colors.lightRed : theme.colors.gray)};
      }
    }
  }
`;
