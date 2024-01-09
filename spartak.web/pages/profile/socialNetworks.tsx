import { GetServerSideProps } from "next";
import React from "react";
import seodata from "../../public/seo/seoData.json";
import { PageSocialNetworks } from "../../src/componentPages/pageProfile/pageSocialNetworks/pageSocialNetworks";
import { getProfileLayout } from "../../src/componentPages/pageProfile/profileLayout";

export default function SocialNetworks() {
  return <PageSocialNetworks />;
}

SocialNetworks.getLayout = getProfileLayout;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader("Cache-Control", "private, no-cache, no-store, max-age=0, must-revalidate");
  return {
    props: {
      metaTags: (seodata as Record<string, any>)["/profile/socialNetworks"] || null,
    },
  };
};
