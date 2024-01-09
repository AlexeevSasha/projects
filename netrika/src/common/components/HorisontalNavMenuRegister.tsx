import { theme } from "common/styles/theme";
import React, { useEffect, useState } from "react";
import { MetaTags } from "react-meta-tags";
import { Link, useLocation } from "react-router-dom";
import { styled } from "../styles/styled";
import { IconShevron } from "./Icon/IconShevron";
import { BreadCrumbs } from "../ui/BreadCrumbs/BreadCrumbs";
import { Title } from "../ui/Title/Title";

export interface IHorisontMenu {
  name: string;
  url: string;
  index: number;
}

interface IProps {
  links: IHorisontMenu[];
  title?: boolean;
  breadcrumbs?: string;
  sectionName?: string;
}

export const HorisontalNavMenuRegister: React.FC<IProps> = React.memo(
  ({ links, title, breadcrumbs, sectionName = "Регистры" }) => {
    const location = useLocation();
    const [link, updateLink] = useState(-1);

    useEffect(() => {
      links.map((item, index) => {
        if (location.pathname.indexOf(item.url) >= 0) {
          updateLink(index + 1);
        }
        return null;
      });
    }, [links, link, location.pathname]);

    return (
      <Container>
        {breadcrumbs && (
          <MenuBreadCrumbs>
            <MenuText>
              <BreadCrumbs
                elem={[
                  { name: `${sectionName}`, link: "../" },
                  { name: breadcrumbs ? breadcrumbs : "", link: "" },
                ]}
                id={"name_register"}
              />
            </MenuText>
          </MenuBreadCrumbs>
        )}
        {title && (
          <MenuTitleContainer>
            <MetaTags>
              <title>{links?.filter((item) => location.pathname?.indexOf(item.url) >= 0)?.[0]?.name}</title>
            </MetaTags>
            <Title id={"name_page"}>
              {links?.filter((item) => location.pathname?.indexOf(item.url) >= 0)?.[0]?.name +
                " (" +
                links?.filter((item) => location.pathname?.indexOf(item.url) >= 0)?.[0]?.index +
                "/" +
                links?.length +
                ")"}
            </Title>
            <MenuButtonContainer>
              <Link id={"preview"} to={link !== -1 ? (link === 1 ? "#" : "./" + links[link - 2].url) : ""}>
                <MenuButton active={link !== 1}>
                  <IconShevron rotate={"180deg"} color={link === 1 ? theme.colors.green : theme.colors.white} />
                </MenuButton>
              </Link>
              <Link id={"next"} to={link !== -1 ? (link === links.length ? "#" : "./" + links[link].url) : ""}>
                <MenuButton active={link !== links.length}>
                  <IconShevron rotate={"0"} color={link === links.length ? theme.colors.green : theme.colors.white} />
                </MenuButton>
              </Link>
            </MenuButtonContainer>
          </MenuTitleContainer>
        )}
        <LinkContainer>
          {links.map((item, index) => {
            return (
              <CustomLink to={"./" + item.url} key={index} id={"link_" + item.url}>
                <MenuLine active={location.pathname.indexOf(item.url) >= 0} />
                <TextContainer> {item.name}</TextContainer>
              </CustomLink>
            );
          })}
        </LinkContainer>
      </Container>
    );
  }
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const LinkContainer = styled.div`
  display: flex;
`;
const TextContainer = styled.div`
  margin: 8px 14px 0;
  font-size: 13px;
`;

const CustomLink = styled(Link)`
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 19px;
  text-align: center;
  letter-spacing: 0.0025em;
  color: ${theme.colors.hightBlue};
  text-decoration: none;

  width: fit-content;
  position: relative;
  margin: 0 1px;
  padding-top: 11px;

  :nth-child(1) {
    svg {
      position: absolute;
      left: 10px;
      bottom: 38%;
    }
  }
  :nth-child(3) {
    svg {
      position: absolute;
      right: 10px;
      bottom: 38%;
    }
  }
`;

const MenuLine = styled.div<{ active?: boolean }>`
  background: ${(props) => (props.active ? theme.colors.green : theme.colors.lightGreen)};
  width: 100%;
  height: 5px;
  box-shadow: ${(props) => (props.active ? `0 4px 4px ${theme.colors.lightGreen}` : "")};
  border-radius: 1px;
  top: 0;
`;

const MenuBreadCrumbs = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 15px 65px 15px 0;
`;

const MenuText = styled.div`
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

const MenuTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  a {
    padding-top: 0;
  }
`;

const MenuButtonContainer = styled.div`
  display: flex;

  #preview {
    margin: 0 20px;
  }
  #next {
    margin: 0 20px;
  }
`;

const MenuButton = styled.div<{ active: boolean }>`
  background: ${(props) => (props.active ? theme.colors.green : theme.colors.white)};
  border: 1px solid ${theme.colors.green};
  box-sizing: border-box;
  border-radius: 50%;
  font-weight: 600;
  line-height: 19px;
  text-align: center;

  width: 40px;
  height: 40px;

  padding: 10px 0;
  position: relative;
  cursor: pointer;
`;
