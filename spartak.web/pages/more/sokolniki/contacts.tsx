import { GetStaticProps } from "next";
import React from "react";
import seodata from "../../../public/seo/seoData.json";
import { ContactFields } from "../../../src/componentPages/pagesMore/contactsFields/contactFields";
import { GetLayout } from "../../../src/components/layout/getLayout";

export default function Contacts() {
  return <ContactFields />;
}

Contacts.getLayout = GetLayout;

export const getStaticProps: GetStaticProps = async () => ({
  props: {
    metaTags: (seodata as Record<string, any>)["/more/sokolniki/contacts"] || null,
  },
  revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE),
});
