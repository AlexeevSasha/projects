import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import seodata from "../../public/seo/seoData.json";
import { cmsRepository } from "../../src/api/cmsRepository";
import { IStadiumContacts } from "../../src/api/dto/IStadiumContacts";
import { getLocalValue } from "../../src/assets/helpers/getLocalValue";
import { theme } from "../../src/assets/theme/theme";
import { StadiumBanner } from "../../src/componentPages/pageStadium/stadiumBanner/stadiumBanner";
import { ContainerContent } from "../../src/components/containers/containerContent";
import { GetLayout } from "../../src/components/layout/getLayout";
import { NoData } from "../../src/components/noData/noData";

interface IProps {
  contacts?: IStadiumContacts;
}

export default function Contacts(props: IProps) {
  const { locale = "ru" } = useRouter();

  return (
    <>
      <StadiumBanner
        title={getLocalValue(props.contacts?.mainInfo.title, locale)}
        banner={getLocalValue(props.contacts?.mainInfo.previewImg, locale) || "/images/stadium/about/banner_v1.0.0.png"}
      />

      {props.contacts ? (
        props.contacts?.stadiumContacts?.map((elem) => (
          <StyledContainer key={getLocalValue(elem.title, locale)}>
            <InfoBlock>
              <ContactTitle>{getLocalValue(elem.title, locale)}</ContactTitle>
              <ContactDescription>{getLocalValue(elem.titleDescription, locale)}</ContactDescription>
            </InfoBlock>

            <InfoBlock>
              <ContactTitle>{getLocalValue(elem.info, locale)}</ContactTitle>
              <ContactDescription>{getLocalValue(elem.infoDescription, locale)}</ContactDescription>
            </InfoBlock>
          </StyledContainer>
        ))
      ) : (
        <NoData />
      )}
    </>
  );
}

Contacts.getLayout = GetLayout;

export const getStaticProps: GetStaticProps = async () => {
  const res = (await cmsRepository.fetchCms({ Type: "stadiumContacts" })).value[0];
  const contacts = res?.JsonData ? JSON.parse(res.JsonData) : null;

  return {
    props: {
      metaTags: contacts?.metaTags || (seodata as Record<string, any>)["/stadium/contacts"] || null,
      contacts,
    },
    revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE_MAX),
  };
};

const StyledContainer = styled(ContainerContent)`
  display: flex;
  flex-direction: row;
  gap: 1.25vw;
  padding: 4.17vw 0 6.88vw;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    display: block;
    padding: 5.22vw 0 5.22vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 10.67vw 0 7.73vw;
  }
`;

const InfoBlock = styled.section`
  width: 100%;
`;

const ContactTitle = styled.p`
  text-transform: uppercase;
  color: ${theme.colors.gray};
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  font-size: 0.83vw;
  border-bottom: 0.05vw solid ${({ theme }) => theme.colors.red_black};
  padding-bottom: 0.83vw;
  margin: 0;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.09vw;
    padding-bottom: 2.09vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
    padding-bottom: 4.27vw;
  }
`;

const ContactDescription = styled.p`
  padding-top: 1.25vw;
  color: ${({ theme }) => theme.colors.white_black};
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  font-size: 2.08vw;
  margin: 0;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 4.17vw;
    padding: 2.61vw 0 5.22vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 8.53vw;
    padding: 6.4vw 0 9.33vw;
  }
`;
