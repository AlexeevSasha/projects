import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { theme } from "../../../assets/theme/theme";

export const PublicOffer = () => {
  const { locale = "ru" } = useRouter();

  return (
    <Container>
      <StyledH1>{lang[locale].academy.publicOffer.title}</StyledH1>

      <MainPoint>{lang[locale].academy.publicOffer.privateInstitution}</MainPoint>
      <br />

      <span>{lang[locale].academy.publicOffer.recipient}</span>
      <br />

      <MainPoint>{lang[locale].academy.publicOffer.individualOrLegal}</MainPoint>
      <SubPoint>{lang[locale].academy.publicOffer.donor}</SubPoint>
      <br />

      <MainPoint> {lang[locale].academy.publicOffer.point1.title}</MainPoint>
      <SubPoint>{lang[locale].academy.publicOffer.point1.subPoint1}</SubPoint>
      <SubPoint> {lang[locale].academy.publicOffer.point1.subPoint2}</SubPoint>
      <br />

      <MainPoint> {lang[locale].academy.publicOffer.point2.title}</MainPoint>
      <SubPoint>{lang[locale].academy.publicOffer.point2.subPoint1}</SubPoint>
      <SubPoint>{lang[locale].academy.publicOffer.point2.subPoint2}</SubPoint>
      <br />

      <MainPoint>{lang[locale].academy.publicOffer.point3.title}</MainPoint>
      <SubPoint>{lang[locale].academy.publicOffer.point3.subPoint1}</SubPoint>
      <SubPoint>{lang[locale].academy.publicOffer.point3.subPoint2}</SubPoint>
      <br />

      <MainPoint>{lang[locale].academy.publicOffer.point4.title}</MainPoint>
      <SubPoint>{lang[locale].academy.publicOffer.point4.subPoint1}</SubPoint>
      <SubPoint> {lang[locale].academy.publicOffer.point4.subPoint2}</SubPoint>
      <SubPoint> {lang[locale].academy.publicOffer.point4.subPoint3}</SubPoint>
      <SubPoint> {lang[locale].academy.publicOffer.point4.subPoint4}</SubPoint>
      <SubPoint> {lang[locale].academy.publicOffer.point4.subPoint5}</SubPoint>
      <SubPoint> {lang[locale].academy.publicOffer.point4.subPoint6}</SubPoint>
    </Container>
  );
};

const Container = styled.div`
  font-family: "FCSM Text", sans-serif;
  color: ${theme.colors.black};
  font-weight: 500;
  display: flex;
  flex-flow: column;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 100%;
  }
`;

const StyledH1 = styled.h1`
  margin: 0;
  text-align: center;
  padding-bottom: 0.83vw;
  font-size: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding-bottom: 2.09vw;
    font-size: 3.13vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding-bottom: 4.27vw;
    font-size: 6.4vw;
  }
`;

const MainPoint = styled.p`
  margin: 0;
  font-size: 0.94vw;
  line-height: 1.46vw;
  font-weight: 500;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.35vw;
    line-height: 3.65vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.8vw;
    line-height: 7.47vw;
  }
`;

const SubPoint = styled.p`
  margin: 0;
`;
