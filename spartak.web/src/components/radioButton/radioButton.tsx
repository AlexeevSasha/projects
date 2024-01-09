import styled from "styled-components";
import { theme } from "../../assets/theme/theme";
import { RadioIcon } from "../../assets/icon/radioIcon";

interface IProps {
  checked: boolean;
  value: string;
  label: string | JSX.Element;
  onChange: (value: string) => void;
}

export const RadioButton = (props: IProps) => {
  return (
    <RadioLabel>
      <RadioInput
        checked={props.checked}
        value={props.value}
        onChange={() => props.onChange(props.value)}
        type="radio"
      />
      <RadioIcon selected={props.checked} />
      <span>{props.label}</span>
    </RadioLabel>
  );
};

const RadioInput = styled.input`
  display: none;
`;

const RadioLabel = styled.label`
  display: grid;
  grid-template-columns: 1vw 1fr;
  align-items: center;
  font-family: "Roboto", sans-serif;
  color: ${(props) => props.theme.colors.white_black};
  cursor: pointer;
  font-size: 0.83vw;
  line-height: 1.2em;

  & > span {
    padding: 0 0.5vw;
  }

  & > svg {
    font-size: 1vw;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.08vw;
    grid-template-columns: 3.13vw 1fr;

    & > span {
      padding: 0 1.5vw;
    }

    & > svg {
      font-size: 3.13vw;
    }
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.26vw;
    grid-template-columns: 6.4vw 1fr;

    & > span {
      padding: 0 3vw;
    }

    & > svg {
      font-size: 6.4vw;
    }
  }
`;
