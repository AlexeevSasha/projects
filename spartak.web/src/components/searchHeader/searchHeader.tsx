import { useRouter } from "next/router";
import { ChangeEvent, KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { lang } from "../../../public/locales/lang";
import { Close } from "../../assets/icon/close";
import { IconMagnifyingGlass } from "../../assets/icon/iconMagnifyingGlass";
import { theme } from "../../assets/theme/theme";

interface IProps {
  opened: boolean;
  close: () => void;
}

export const SearchHeader = ({ opened, close }: IProps) => {
  const { locale, push } = useRouter();
  const localContext = useMemo(() => lang[locale ?? "ru"], [locale]);
  const [inputText, setInputText] = useState("");

  const clickSearch = () => {
    if (!inputText) return;
    push({ pathname: "/search", query: { search: inputText } });
    setInputText("");
    close();
  };

  const ref = useRef<null | HTMLInputElement>(null);

  const onKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      clickSearch();
    }
  };

  useEffect(() => ref.current?.focus());

  opened &&
    window.addEventListener("scroll", () => {
      close();
    });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  return (
    <Container opened={opened}>
      <InputResultsContainer>
        <InputBlock onClick={() => ref.current?.focus()}>
          <SearchInput
            onInput={handleChange}
            onKeyDown={onKeydown}
            onChange={handleChange}
            ref={ref}
            placeholder={`${localContext.header.placeholder.searchinSite}...`}
            type="search"
          />

          <Close
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
          />
        </InputBlock>
      </InputResultsContainer>

      <RedBlock onClick={() => clickSearch()}>
        <IconMagnifyingGlass />
      </RedBlock>
    </Container>
  );
};

const Container = styled.div<{ opened: boolean }>`
  display: ${({ opened }) => (opened ? "flex" : "none")};
  font-family: "FCSM Text", sans-serif;
  position: absolute;
  top: ${({ opened }) => (opened ? 0 : -100)};
  right: 0;
  width: 86.1vw;
  height: 100%;
  background: ${({ theme }) => theme.colors.black_whiteGray};
  box-sizing: border-box;
  border-left: 0.05vw solid ${theme.colors.grayDark};

  svg {
    width: 1.67vw;
    height: 1.67vw;
  }
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    display: none;
  }
`;

const InputResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: inherit;
  width: 95%;
`;

const InputBlock = styled.div`
  display: flex;
  align-items: center;
  padding: 1.88vw 2.08vw;
  height: inherit;
  justify-content: space-between;

  svg {
    cursor: pointer;
    path {
      stroke: ${({ theme }) => theme.colors.white_black};
    }
  }

  svg:hover {
    path {
      stroke: ${theme.colors.red};
    }
  }
`;

const RedBlock = styled.div`
  background: ${theme.colors.red};
  display: flex;
  justify-content: center;
  cursor: pointer;
  align-items: center;
  width: 6.5%;
`;

const SearchInput = styled.input`
  height: 100%;
  width: 100%;
  background: transparent;
  color: ${({ theme }) => theme.colors.gray_black};
  font-family: "FCSM Text", sans-serif;
  font-weight: 500;
  font-size: 1.25vw;
  border: none;
  &:active,
  &:hover,
  &:focus {
    outline: 0;
    outline-offset: 0;
  }
`;
