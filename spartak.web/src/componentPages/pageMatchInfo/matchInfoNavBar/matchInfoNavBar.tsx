import { useRouter } from "next/router";
import styled from "styled-components";
import { theme } from "../../../assets/theme/theme";
import { ContainerContent } from "../../../components/containers/containerContent";
import { ContainerHorizontalScroll } from "../../../components/containers/containerHorizontalScroll";
import { NavMenu } from "../../../components/navMenu/navMenu";
import { CustomSelect } from "../../../components/select/select";

interface IProps {
  hideSelect?: boolean;
}

export const MatchInfoNavBar = (props: IProps) => {
  return (
    <NavMenuContainer>
      <ContainerHorizontalScroll>
        <Menu menuList={menuItems(useRouter().query.id)} noTheme />
      </ContainerHorizontalScroll>

      {props.hideSelect ? null : (
        <GroupSelect>
          <ContainerSelect>
            <CustomSelect
              id="MatchInfoNavBar"
              onSelect={() => {}}
              options={[
                { label: "Матч", value: "match" },
                { label: "1 Тайм", value: "firstTime" },
                { label: "2 Тайм", value: "secondTime" },
              ]}
            />
          </ContainerSelect>
        </GroupSelect>
      )}
    </NavMenuContainer>
  );
};

const menuItems = (id?: string | string[]) => [
  { label: "matches/.+/broadcast", link: `/matches/${id}/broadcast` },
  { label: "matches/.+/compositions", link: `/matches/${id}/compositions` },
  { label: "matches/.+/statistic", link: `/matches/${id}/statistic` },
  { label: "matches/.+/news", link: `/matches/${id}/news` },
  { label: "matches/.+/videos", link: `/matches/${id}/videos` },
  { label: "matches/.+/gallery", link: `/matches/${id}/gallery` },
];

const NavMenuContainer = styled(ContainerContent)`
  margin-bottom: 2.08vw;
  z-index: 9;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    flex-direction: column;
    margin-bottom: 0;
  }
`;

const Menu = styled(NavMenu)`
  margin-top: 2.08vw;

  & a {
    color: ${({ theme }) => theme.colors.white_black};

    &:hover {
      border-bottom-color: ${theme.colors.red};
    }
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-top: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-top: 6.4vw;
  }
`;

const GroupSelect = styled.div`
  display: flex;
  justify-content: flex-end;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 100%;
    margin-top: 3.13vw;
    margin-bottom: 5.22vw;
  }
`;

const ContainerSelect = styled.div`
  width: 12.71vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 50%;
  }
`;
