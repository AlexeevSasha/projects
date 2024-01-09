import React from "react";
import styled from "styled-components";
import { theme } from "../../../assets/theme/theme";
import { IMetaTags } from "../../../components/baseMeta/baseMeta";
import { ContainerContent } from "../../../components/containers/containerContent";
import { ContainerHorizontalScroll } from "../../../components/containers/containerHorizontalScroll";
import { GetLayout } from "../../../components/layout/getLayout";
import { NavMenu } from "../../../components/navMenu/navMenu";
import { academyMenuItems } from "../about/menuList/menuList";
import { AcademyBanners } from "../academyBanners";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { useRouter } from "next/router";
import { PageProps } from "../../../../pages/_app";

type Props = PageProps & {
  title: string;
  metaTags: IMetaTags;
  previewImg?: string;
};

export const AcademyLayout = (page: JSX.Element, props: Props) => {
  const { locale = "ru" } = useRouter();

  return GetLayout(
    <>
      <AcademyBanners previewImg={getLocalValue(props.previewImg, locale)} title={getLocalValue(props.title, locale)} />
      <ContainerContent>
        <ContainerHorizontalScroll>
          <Menu menuList={academyMenuItems} noTheme />
        </ContainerHorizontalScroll>
      </ContainerContent>

      {page}
    </>,
    props
  );
};

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
