import { styled } from "common/styles/styled";
import { theme } from "common/styles/theme";
import React from "react";
import { Link } from "react-router-dom";
import { IconArrow } from "../../components/Icon/IconArrow";

interface IProps {
  elem: { link: string; name: string }[];
  id?: string;
}

export const BreadCrumbs = React.memo(({ elem, id = "" }: IProps) => {
  return (
    <MenuText>
      {elem.map((item, index) => {
        if (index === elem.length - 1) {
          return (
            <span key={index} id={id}>
              {item.name}
            </span>
          );
        }
        return (
          <BreadCrumbsLink key={index} to={item.link}>
            {item.name} <IconArrow rotate={"-90deg"} color={theme.colors.hightGray} />
          </BreadCrumbsLink>
        );
      })}
    </MenuText>
  );
});

export const MenuText = styled.div`
  font-weight: 600;
  letter-spacing: 0.005em;
  color: ${theme.colors.black};
  display: flex;
  align-items: center;

  span {
    color: ${theme.colors.hightBlue};
    font-weight: normal;
  }

  svg {
    margin: 0 16px;
  }
`;

const BreadCrumbsLink = styled(Link)`
  color: ${theme.colors.black};
  text-decoration: none;
  display: flex;
  align-items: center;
`;
