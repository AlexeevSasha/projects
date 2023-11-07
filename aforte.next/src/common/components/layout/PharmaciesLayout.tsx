import styled from "astroturf/react";
import React, { ReactNode } from "react";
import { Header } from "../header/Header";
import { Footer } from "../footer/Footer";
import { PageProps } from "pages/_app";
import { BaseMeta } from "../baseMeta/baseMeta";

type Props = PageProps & {
  children?: ReactNode;
};

export const Layout = ({ children, ...props }: Props) => {
  return (
    <>
      <BaseMeta metaTags={props.initialData.metaTags} />
      <Header />
      <Container>{children}</Container>
      <PharmaciesFooter>
        <Footer />
      </PharmaciesFooter>
    </>
  );
};

export const getPharmaciesLayout = (page: JSX.Element, props: PageProps) => (
  <Layout {...props}>{page}</Layout>
);

const Container = styled("main")`
  position: relative;
`;

const PharmaciesFooter = styled.div`
  @import "variables";
  @include respond-to(small) {
    display: none;
  }
`;
