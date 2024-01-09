import { useRouter } from "next/router";
import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { IconMagnifyingGlass } from "../../../assets/icon/iconMagnifyingGlass";
import { IconPlus } from "../../../assets/icon/iconPlus";
import { theme } from "../../../assets/theme/theme";

export const SearchInputContainer = () => {
  const { locale = "ru", query, replace } = useRouter();
  const [search, setSearch] = useState(query.search ? `${query.search}` : "");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);

  const handleReplace = () => search && replace({ query: { ...query, search } });

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleReplace();
    }
  };

  useEffect(() => {
    query.search !== search && setSearch(`${query.search}`);
  }, [query.search]);

  return (
    <InputContainer>
      <SearchContainer>
        <SearchInput
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          value={search}
          placeholder={`${lang[locale].header.placeholder.searchinSite}...`}
          type="search"
        />

        <IconContainer>
          <IconPlus onClick={() => setSearch("")} rotate="45deg" />
        </IconContainer>
      </SearchContainer>

      <RedBlock onClick={handleReplace}>
        <IconMagnifyingGlass />
      </RedBlock>
    </InputContainer>
  );
};

const InputContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 5.52vw;
  border: 1px solid ${({ theme }) => theme.colors.grayDark_gray1};
  margin-bottom: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: 1fr 10.43vw;
    margin-bottom: 2.09vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-template-columns: 1fr 16.53vw;
    margin-bottom: 4.27vw;
  }
`;

const RedBlock = styled.div`
  background: ${theme.colors.red};
  display: flex;
  justify-content: center;
  cursor: pointer;
  align-items: center;
  color: ${theme.colors.white};

  svg {
    width: 1.67vw;
    height: 1.67vw;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    svg {
      width: 4.17vw;
      height: 4.17vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    svg {
      width: 6.4vw;
      height: 6.4vw;
    }
  }
`;

const SearchInput = styled.input`
  background: transparent;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white_black};
  font-size: 1.67vw;
  padding: 1.67vw 4.08vw 1.67vw 2.08vw;
  border: none;
  width: 100%;
  box-sizing: border-box;

  &:active,
  &:hover,
  &:focus {
    outline: 0;
    outline-offset: 0;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 3vw 7.01vw 3vw 2.61vw;
    font-size: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 5.33vw 10.2vw 5.33vw 3.2vw;
    font-size: 4.27vw;
  }
`;

const SearchContainer = styled.div`
  position: relative;
`;

const IconContainer = styled.div`
  position: absolute;
  transform: translate(50%, -50%);
  top: 50%;
  right: 2vw;

  & > svg {
    display: block;
    width: 1.67vw;
    height: 1.67vw;

    & > path {
      stroke: ${({ theme }) => theme.colors.white_black};
    }
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    right: 4vw;
    & > svg {
      width: 4.17vw;
      height: 4.17vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    right: 6vw;
    & > svg {
      width: 6.4vw;
      height: 6.4vw;
    }
  }
`;
