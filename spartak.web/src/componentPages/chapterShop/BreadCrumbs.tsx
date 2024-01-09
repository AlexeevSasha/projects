import React, { useMemo } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { lang } from "../../../public/locales/lang";
import { IconArrowDown } from "../../assets/icon/iconArrowDown";
import { theme } from "../../assets/theme/theme";
import Link from "next/link";

interface IProps {
  items: Array<{ label: string; link?: string }>;
}

export const BreadCrumbs = ({ items }: IProps) => {
  const { locale } = useRouter();
  const localContext = useMemo(() => lang[locale ?? "ru"], [locale]);

  return (
    <Titles>
      {items.map((item, index) => {
        return (
          <React.Fragment key={item.label + index}>
            {index !== 0 && <IconArrowDown />}
            {item.link && index !== items.length - 1 ? (
              <Link prefetch={false} href={item.link}>
                <a>
                  <Span>{localContext.matches.breadCrumbs[item.label] || item.label}</Span>
                </a>
              </Link>
            ) : (
              <Span lastItem>{localContext.matches.breadCrumbs[item.label] || item.label}</Span>
            )}
          </React.Fragment>
        );
      })}
    </Titles>
  );
};

const Titles = styled.div`
  display: flex;
  column-gap: 0.73vw;
  font-size: 0.73vw;
  font-weight: 500;
  align-items: center;
  font-family: "FCSM Text", sans-serif;
  color: ${({ theme }) => theme.colors.white_black};
  a {
    text-decoration: none;
  }
  & svg {
    transform: rotate(-90deg);

    & > path {
      stroke: ${({ theme }) => theme.colors.white_black};
    }
  }
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.83vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.73vw;
  }
`;

const Span = styled.span<{ lastItem?: boolean }>`
  color: ${({ lastItem, theme }) => (lastItem ? theme.colors.gray_grayDark1 : theme.colors.white_black)};
  &:hover {
    color: ${({ lastItem }) => !lastItem && theme.colors.red};
  }
  &:first-letter {
    text-transform: capitalize;
  }
`;
