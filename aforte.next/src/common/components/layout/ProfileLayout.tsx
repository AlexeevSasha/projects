import styled from "astroturf/react";
import React, { ReactNode } from "react";
import { Header } from "../header/Header";
import { Footer } from "../footer/Footer";
import { PageProps } from "pages/_app";
import { BaseMeta } from "../baseMeta/baseMeta";
import { Breadcrumbs } from "../Breadcrumbs";
import { Profile } from "modules/profile/components/Profile";
import { ContainerArticle } from "../Container";
import { useRouter } from "next/router";

type Props = PageProps & {
  children?: ReactNode;
};

export const ProfileLayout = ({ children, ...props }: Props) => {
  const router = useRouter();
  return props.isEmpty ? (
    <>
      <BaseMeta metaTags={props.initialData.metaTags} />
      <Header />
      <CustomContainer>
        <Container>
          <ProfileWrapper>
            <CustomSection>{children}</CustomSection>
          </ProfileWrapper>
        </Container>
      </CustomContainer>
      <Footer />
    </>
  ) : (
    <>
      <BaseMeta metaTags={props.initialData.metaTags} />
      <Header />
      <CustomContainer>
        <Container>
          <BreadcrumbsWrapper
            breadcrumbsView={
              router.pathname === "/profile" || router.pathname.includes("/profile/orders/")
            }
          >
            <Breadcrumbs
              breadcrumbs={[
                { title: "Главная", link: "/" },
                { title: "Личный кабинет", link: "/profile" },
              ]}
            />
          </BreadcrumbsWrapper>
          <ProfileWrapper>
            <ProfileMenu>
              <Profile.ProfileAside user={props.user} />
            </ProfileMenu>
            <CustomSection>{children}</CustomSection>
          </ProfileWrapper>
        </Container>
      </CustomContainer>
      <Footer />
    </>
  );
};

export const getProfileLayout = (page: JSX.Element, props: PageProps) => (
  <ProfileLayout {...props}>{page}</ProfileLayout>
);

const Container = styled("main")`
  position: relative;
`;

const BreadcrumbsWrapper = styled.div<{ breadcrumbsView?: boolean }>`
  @import "variables";
  margin: 19px 0px 19px 0px;
  div {
    margin: 0;
  }
  @include respond-to(small) {
    margin: 11px 0px 7px 0px;
    &.breadcrumbsView {
      display: none;
    }
  }
`;

const CustomContainer = styled(ContainerArticle)`
  width: 100%;
`;

const ProfileMenu = styled.aside`
  @import "variables";
  min-width: 376px;
  margin-right: 20px;

  @media (max-width: 1250px) {
    min-width: 230px;
  }

  @include respond-to(small) {
    display: none;
  }
`;

const ProfileWrapper = styled.section`
  display: flex;
`;

const CustomSection = styled(ProfileWrapper)`
  @import "variables";
  min-width: 200px;
  width: 100%;
  flex-direction: column;
  /* @include respond-to(small) {
    flex-direction: column-reverse;
  } */
`;
