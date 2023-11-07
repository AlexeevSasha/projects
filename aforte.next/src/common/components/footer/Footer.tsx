import { Container } from "../Container";
import styled from "astroturf/react";
import { FooterDesktop } from "./FooterDesktop";
import { FooterMobile } from "./FooterMobile";
import { RecentlyViewed } from "./RecentlyViewed";

export const Footer = () => {
  return (
    <div>
      <RecentlyViewed />
      <ContainerFooter>
        <ContainerCustom>
          <FooterDesktop />
          <FooterMobile />
        </ContainerCustom>
      </ContainerFooter>
    </div>
  );
};

const ContainerCustom = styled(Container)`
  @media (max-width: 1440px) {
    padding: 0;
  }
`;

const ContainerFooter = styled.footer`
  @import "variables";

  position: relative;
  z-index: 2;
  width: 100%;
  background-color: $white;
  border-radius: 48px 48px 0 0;
  padding: 60px 40px;

  @media (max-width: 1440px) {
    padding: 60px 28px;
  }

  @include respond-to(small) {
    background-color: transparent;
    padding: 24px 12px 0;
  }
`;
