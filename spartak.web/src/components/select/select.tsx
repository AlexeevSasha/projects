import { useRouter } from "next/router";
import ReactSelect, { createFilter, Props as SelectProps } from "react-select";
import styled from "styled-components";
import { lang } from "../../../public/locales/lang";
import { CaretDown } from "../../assets/icon/caretDown";
import { theme } from "../../assets/theme/theme";

export type SelectOption = {
  value: string;
  label: JSX.Element | string;
};

type Props = SelectProps & {
  value?: SelectOption | null;
  onSelect?: (value: SelectOption | null) => void;
  options?: SelectOption[];
  id?: string;
  label?: string | JSX.Element;
  required?: boolean;
  className?: string;
  error?: string;
  lightStyle?: boolean;
};

export const CustomSelect = ({
  onSelect,
  onChange,
  id,
  required,
  label,
  className,
  lightStyle,
  error,
  placeholder = "",
  components,
  ...props
}: Props) => {
  const { locale = "ru" } = useRouter();

  return (
    <Container className={className}>
      <Label>
        {label} {required && " *"}
      </Label>

      <Select
        classNamePrefix="react-select"
        onChange={(opt, meta) => {
          onChange?.((opt as SelectOption).value, meta);
          onSelect?.(opt as SelectOption);
        }}
        isSearchable={false}
        instanceId={id}
        lightStyle={lightStyle}
        filterOption={createFilter({ ignoreAccents: false })}
        components={{
          DropdownIndicator: () => <DropdownIcon lightstyle={lightStyle ? "true" : "false"} />,
          ...components,
        }}
        error={!!error}
        placeholder={placeholder}
        noOptionsMessage={() => lang[locale].common.noOptions}
        {...props}
      />

      {error && <Error>{error}</Error>}
    </Container>
  );
};

const Select = styled(ReactSelect)<{ lightStyle?: boolean; error?: boolean }>`
  & > .react-select__control {
    font-size: 0.83vw;
    min-height: unset;
    height: 2.5vw;
    border: 0.05vw solid;
    border-color: ${({ error, lightStyle }) => theme.colors[error ? "red" : lightStyle ? "grayLight" : "grayDark"]};
    background-color: ${({ lightStyle }) => theme.colors[lightStyle ? "grayLightest" : "blackLight"]};
    color: ${({ lightStyle }) => theme.colors[lightStyle ? "black" : "white"]};
    border-radius: 0;
    box-shadow: none;

    &:hover {
      border-color: ${({ error, lightStyle }) => theme.colors[error ? "red" : lightStyle ? "grayLight" : "grayDark"]};
    }

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      border-width: 0.2vw;
      height: 6.25vw;
      font-size: 2.09vw;
    }

    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      height: 12.8vw;
      font-size: 4.27vw;
    }
  }

  & .react-select__single-value {
    color: ${({ lightStyle }) => theme.colors[lightStyle ? "black" : "white"]};
  }

  & .react-select__indicator-separator {
    display: none;
  }

  & .react-select__menu {
    border: 0.05vw solid;
    border-color: ${({ error, lightStyle }) => theme.colors[error ? "red" : lightStyle ? "grayLight" : "grayDark"]};
    background: ${({ lightStyle }) => theme.colors[lightStyle ? "grayLightest" : "blackLight"]};
    color: ${({ lightStyle }) => theme.colors[lightStyle ? "black" : "white"]};
    font-size: 0.83vw;
    border-radius: 0;
    min-width: 100%;
    width: max-content;

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      font-size: 2.09vw;
    }

    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      font-size: 4.27vw;
      width: auto;
    }

    & ::-webkit-scrollbar-track {
      background-color: transparent;
    }

    & ::-webkit-scrollbar-track-piece {
      background-color: transparent;
    }
  }

  & .react-select__option {
    padding: 0 0.83vw;
    display: flex;
    align-items: center;
    height: 1.5625vw;

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      height: 3.9113vw;
      padding: 0 2.08vw;
    }

    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      height: auto; //8vw;
      min-height: 8vw;
      padding: 0 4.26vw;
    }

    &:hover,
    &.react-select__option--is-focused {
      background: ${theme.colors.redOpacity};
    }

    &.react-select__option--is-selected {
      background: ${({ lightStyle }) => theme.colors[lightStyle ? "redOpacity" : "red"]};
      color: ${({ lightStyle }) => theme.colors[lightStyle ? "black" : "white"]};
    }
  }

  & .react-select__input-container {
    color: ${({ lightStyle }) => theme.colors[lightStyle ? "black" : "white"]};
  }

  & .react-virtualized-menu-placeholder {
    font-family: "Roboto", sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: ${theme.colors.gray};
  }

  & .react-select__value-container {
    padding: 0.1vw 0.42vw 0.1vw 0.83vw;

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      padding-left: 2.09vw;
    }

    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      padding-left: 4.27vw;
    }
  }
`;

const Container = styled.label`
  display: block;
  width: 100%;
`;

const DropdownIcon = styled(CaretDown)<{ lightstyle: string }>`
  color: ${({ lightstyle: lightStyle }) => theme.colors[lightStyle === "true" ? "grayDark1" : "gray"]};
  font-size: 1.64vw;
  margin-right: 0.4vw;
  cursor: pointer;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 4.1vw;
    margin-right: 1.56vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 8.3vw;
    margin-right: 2.13vw;
  }
`;

const Error = styled.div`
  font-family: "Roboto", sans-serif;
  color: ${theme.colors.red};
  font-size: 0.73vw;
  margin-bottom: -1.05vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.82vw;
    margin-bottom: -2.61vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.73vw;
    margin-bottom: -5.33vw;
  }
`;

const Label = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.83vw;
  line-height: 1.24vw;
  color: ${theme.colors.grayDark};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.08vw;
    line-height: 2.6vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.26vw;
    line-height: 5.33vw;
  }
`;
