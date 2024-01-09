import React, { useMemo, useRef, useState } from "react";
import { INavMenuList } from "../header/component/getMenuItems";
import styled, { css } from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import { lang } from "../../../public/locales/lang";
import { theme } from "../../assets/theme/theme";
import { useWindowSize } from "../../core/hooks/UseWindowSize";

interface IProps {
  menuItems: INavMenuList[];
  label: string;
}

export const DropDownTabMenu = ({ menuItems, label }: IProps) => {
  const [isShowList, setShowList] = useState(false);
  const { locale, pathname, query, asPath } = useRouter();
  const localContext = useMemo(() => lang[locale ?? "ru"], [locale]);
  const ref = useRef<HTMLDivElement>(null);
  //X, Y, ClientX
  const [pageCoord, setPageCoord] = useState<[number, number, Pick<DOMRect, "width" | "left" | "height" | "right">]>([
    0,
    0,
    {
      left: 0,
      width: 0,
      height: 0,
      right: 0,
    },
  ]);
  const size = useWindowSize();
  const onClickContainer = (e: any) => {
    ref.current?.focus();

    setPageCoord([
      e.target.offsetLeft,
      e.target.offsetTop + e.target.getBoundingClientRect().height,
      e.target.getBoundingClientRect(),
    ]);
    setShowList(!isShowList);
  };
  const childLabels = Array.from(menuItems, ({ label }) => label);

  return (
    <Container
      onBlur={(event: any) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setShowList(false);
        }
      }}
      ref={ref}
      tabIndex={-1}
      onClick={(e) => onClickContainer(e)}
      active={childLabels.some((item) => asPath.includes(item))}
    >
      {label}
      <Links
        onBlur={() => {
          setShowList(false);
        }}
        screenSize={size}
        onClick={(e) => e.stopPropagation()}
        isShowList={isShowList}
        coordinates={pageCoord}
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
              active={pathname.includes(elem.label) || !!Object.values(query).find((team) => team === elem.label)}
            >
              {localContext.header.navList[`${elem.label}`]}
            </CustomLink>
          </Link>
        ))}
      </Links>
    </Container>
  );
};

const Container = styled.div<{ active: boolean }>`
  color: ${(props) => (props.active ? theme.colors.white : theme.colors.gray)};
  background-color: ${(props) => (props.active ? theme.colors.blackLight : "initial")};
  width: 100%;
  font-family: "FCSM Text", sans-serif;
  font-size: 0.73vw;
  text-transform: uppercase;
  padding: 0.63vw;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    color: ${theme.colors.white};
    background-color: ${theme.colors.blackOpacity};
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.83vw;
    padding: 1.56vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 100%;
    font-size: 4.8vw;
    padding: 1.47vw 4.27vw;
    justify-content: flex-start;
  }
`;

const Links = styled.div<{
  isShowList: boolean;
  coordinates: [number, number, Pick<DOMRect, "left" | "width" | "height" | "right">];
  screenSize: { width?: number; height?: number };
}>`
  background-color: ${theme.colors.black};
  transition: ${({ isShowList }) => (isShowList ? " 0.5s ease" : "none")};
  position: absolute;
  display: ${({ isShowList }) => (isShowList ? "flex" : "none")};
  z-index: 999;
  box-sizing: border-box;
  flex-direction: column;
  width: 14.58vw;
  ${({ screenSize, coordinates }) => {
    const SpaceBetweenRightandClientX = (screenSize.width || 0) - coordinates[2].left;
    if (SpaceBetweenRightandClientX >= (14.58 * (screenSize.width || 0)) / 100) {
      return css`
        left: ${coordinates[0] - (coordinates[0] - coordinates[2].left)}px;
        top: ${coordinates[1]}px;
      `;
    } else {
      return css`
        left: ${coordinates[2].left + coordinates[2].width - (14.58 * (screenSize.width || 0)) / 100}px;
        top: ${coordinates[1]}px;
      `;
    }
  }};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    transition: none;
    ${({ screenSize, coordinates }) => {
      const SpaceBetweenRightandClientX = (screenSize.width || 0) - coordinates[2].left;
      if (SpaceBetweenRightandClientX >= (36.51 * (screenSize.width || 0)) / 100) {
        return css`
          width: 36.51vw;
          left: ${coordinates[0] - (coordinates[0] - coordinates[2].left)}px;
          top: ${coordinates[1]}px;
        `;
      } else {
        return css`
          width: ${(screenSize.width || 0) -
          (coordinates[2].left + coordinates[2].width - (36.51 * (screenSize.width || 0)) / 100)}px;
          left: ${coordinates[2].left + coordinates[2].width - (36.51 * (screenSize.width || 0)) / 100}px;
          top: ${coordinates[1] + 2}px;
        `;
      }
    }};
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    left: 0;
    width: 100vw;
    top: ${({ coordinates }) => coordinates[1] + "px"};
  }
`;

const CustomLink = styled.a<{ active: boolean }>`
  font-family: "FCSM Text", sans-serif;
  width: fit-content;
  font-size: 0.83vw;
  font-weight: 500;
  text-transform: none;
  color: ${theme.colors.white};
  padding: 0.83vw 1.67vw;
  cursor: pointer;
  text-decoration: none;
  white-space: pre-line;
  color: ${(props) => (props.active ? theme.colors.red : theme.colors.white)};

  &:hover {
    color: ${theme.colors.red};
  }
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.09vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.8vw;
    padding: 1.07vw 4.27vw;
  }
`;
