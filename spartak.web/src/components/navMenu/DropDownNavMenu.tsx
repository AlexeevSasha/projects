import React, { useMemo, useRef, useState } from "react";
import { INavMenuList } from "../header/component/getMenuItems";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import { lang } from "../../../public/locales/lang";
import { theme } from "../../assets/theme/theme";
import { IconArrowDown } from "../../assets/icon/iconArrowDown";

interface IProps {
  menuItems: INavMenuList[];
  active: boolean;
  label: string;
}

export const DropDownNavMenu = ({ menuItems, active, label }: IProps) => {
  const [isShowList, setShowList] = useState(false);
  const { locale, pathname, query } = useRouter();
  const localContext = useMemo(() => lang[locale ?? "ru"], [locale]);
  const ref = useRef<HTMLDivElement>(null);

  const onClickContainer = () => {
    ref.current?.focus();
    setShowList(!isShowList);
  };

  return (
    <Container
      onBlur={() => setTimeout(() => setShowList(false), 100)}
      ref={ref}
      tabIndex={-1}
      onClick={onClickContainer}
      active={active}
    >
      {label}
      <IconArrowDown />
      <Links
        onClick={(e) => {
          e.preventDefault();
        }}
        isShowList={isShowList}
        countList={menuItems.length}
      >
        {menuItems.map((elem, index) => (
          <Link
            prefetch={false}
            href={{
              pathname: elem.link,
            }}
            key={`${elem.link}_${index}`}
            passHref
            as={elem.link}
            locale={locale}
          >
            <CustomLink
              onClick={(e) => elem.link?.includes("http") && e.stopPropagation()}
              active={pathname.includes(elem.label) || !!Object.values(query).find((team) => team === elem.label)}
              // target={elem.link?.includes("http") ? "_blank" : "_self"}
            >
              {localContext.header.navList[`${elem.label}`]}
            </CustomLink>
          </Link>
        ))}
      </Links>
    </Container>
  );
};

const Links = styled.div<{ isShowList: boolean; countList: number }>`
  --item-height: 2.6vw;
  width: max-content;
  background-color: ${(props) => props.theme.colors.black_white};
  transition: 0.5s ease;
  position: absolute;
  top: 2.6vw;
  z-index: 20;
  left: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: ${({ isShowList, countList }) => (isShowList ? `calc(var(--item-height) * ${countList})` : "0")};
`;

const Container = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  column-gap: 0.57vw;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  font-family: "FCSM Text", sans-serif;
  font-size: 0.73vw;
  text-transform: uppercase;
  padding: 0 1.67vw;
  height: 100%;
  min-height: 2.6vw;
  box-shadow: ${({ active, theme }) => (active ? "inset 0 -0.16vw 0 " + theme.colors.red_white : "")};
  text-decoration: none;

  &:hover {
    box-shadow: ${(props) => `inset 0 -0.16vw 0 ${props.theme.colors.red_white}`};
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 2.09vw 4.17vw;
    font-size: 1.83vw;
    justify-content: space-between;
    box-shadow: ${({ active, theme }) => (active ? "inset 0 -0.52vw 0" + theme.colors.red_white : "")};

    &:hover {
      box-shadow: ${(props) => `inset 0 -0.52vw 0 ${props.theme.colors.red_white}`};
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 3.2vw 3.2vw;
    font-size: 3.2vw;
    box-shadow: ${({ active, theme }) => (active ? "inset 0 -1.07vw 0" + theme.colors.red_white : "")};

    &:hover {
      box-shadow: ${(props) => `inset 0 -1.07vw 0 ${props.theme.colors.red_white}`};
    }
  }
`;

const CustomLink = styled.a<{ active: boolean }>`
  font-family: "FCSM Text", sans-serif;
  width: max-content;
  font-size: 0.73vw;
  font-weight: 500;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.white_black};
  padding: 0.83vw 1.67vw;
  cursor: pointer;
  word-spacing: 0.2vw;
  box-shadow: ${({ active }) => (active ? "inset 0.21vw 0 0 " + theme.colors.red : "")};
  text-decoration: none;

  &:hover {
    box-shadow: inset 0.21vw 0 0 ${theme.colors.red};
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    white-space: initial;
  }
`;
