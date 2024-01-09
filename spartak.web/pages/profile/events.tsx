import { GetServerSideProps } from "next";
import React from "react";
import seodata from "../../public/seo/seoData.json";
import { getProfileLayout } from "../../src/componentPages/pageProfile/profileLayout";
import { EventsPage } from "../../src/componentPages/pagesEvents/events";

export default function Events() {
  return <EventsPage />;
}

Events.getLayout = getProfileLayout;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader("Cache-Control", "private, no-cache, no-store, max-age=0, must-revalidate");
  return {
    props: {
      title: (seodata as Record<string, any>)["/profile/events"].h1 || null,
      metaTags: (seodata as Record<string, any>)["/profile/events"] || null,
    },
  };
};
