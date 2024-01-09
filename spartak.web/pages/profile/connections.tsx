import { GetServerSideProps } from "next";
import React from "react";
import seodata from "../../public/seo/seoData.json";
import { PageConnections } from "../../src/componentPages/pageProfile/pageConnections/pageConnections";
import { getProfileLayout } from "../../src/componentPages/pageProfile/profileLayout";

export default function Connections() {
  return <PageConnections />;
}

Connections.getLayout = getProfileLayout;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader("Cache-Control", "private, no-cache, no-store, max-age=0, must-revalidate");
  return {
    props: {
      metaTags: (seodata as Record<string, any>)["/profile/connections"] || null,
    },
  };
};
