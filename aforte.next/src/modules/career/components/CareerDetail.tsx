import styled from "astroturf/react";
import { IconCalendar } from "common/components/icons/IconCalendar";
import { IconEye } from "common/components/icons/IconEye";
import Link from "next/link";
import { VacancyDetailT } from "../interfaces/vacancyDetail";

type Props = {
  vacancyDetail: VacancyDetailT;
};

export const CareerDetail = ({ vacancyDetail }: Props) => {
  return (
    <Container>
      <LinkBlock>
        <CustomLink href={"/career"}>К списку всех вакансий</CustomLink>
      </LinkBlock>
      <VacancyTitle>{vacancyDetail.title}</VacancyTitle>
      <InfoBlock>
        <InfoItem>
          <IconCalendar />
          <InfoText>{vacancyDetail.date}</InfoText>
        </InfoItem>
        <InfoItem>
          <IconEye />
          <InfoText>{vacancyDetail.views}</InfoText>
        </InfoItem>
      </InfoBlock>
      <VacancyDescription>{vacancyDetail.description}</VacancyDescription>
      <CustomBtn href="#resume">Откликнуться</CustomBtn>
      <VacancyDetailRow>
        <VacancyDeteilTitle>Что нужно делать:</VacancyDeteilTitle>
        <List>
          {vacancyDetail.responsibilities.map((element, index) => (
            <Item key={index}>
              <span>{element}</span>
            </Item>
          ))}
        </List>
      </VacancyDetailRow>
      <VacancyDetailRow>
        <VacancyDeteilTitle>Условия:</VacancyDeteilTitle>
        <List>
          {vacancyDetail.terms.map((element, index) => (
            <Item key={index}>
              <span>{element}</span>
            </Item>
          ))}
        </List>
      </VacancyDetailRow>
      <TagBlock>
        <Tag>{vacancyDetail.city}</Tag>
        <Tag>{vacancyDetail.type}</Tag>
      </TagBlock>
    </Container>
  );
};

const Container = styled.div`
  @import "variables";
  width: 100%;
  background: $white;
  border-radius: 40px;
  padding: 31px 40px;
  display: flex;
  flex-direction: column;
  @include respond-to(small) {
    padding: 19px 20px;
  }
`;

const LinkBlock = styled.div`
  display: flex;
  flex-direction: row;
`;

const CustomLink = styled(Link)`
  @import "variables";
  font-weight: 500;
  font-size: 13px;
  line-height: 137%;
  color: $blue1;
`;

const VacancyTitle = styled.h1`
  @import "variables";
  margin: 7px 0 0 0;
  font-weight: 600;
  font-size: 28px;
  line-height: 137%;
  @include respond-to(small) {
    font-size: 20px;
  }
`;

const InfoBlock = styled.div`
  @import "variables";
  display: flex;
  flex-direction: row;
  margin-top: 16px;
  div:first-child {
    margin-right: 16px;
    svg {
      width: 20px;
      height: 20px;
      path {
        fill: #d9d9d9;
        stroke: #d9d9d9;
      }
    }
  }
  @include respond-to(small) {
    margin-top: 8px;
  }
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
`;

const InfoText = styled.span`
  font-weight: 500;
  font-size: 14px;
  line-height: 126%;
  opacity: 0.4;
  margin-left: 8px;
`;

const VacancyDescription = styled.span`
  @import "variables";
  font-weight: 400;
  font-size: 14px;
  line-height: 26px;
  margin-top: 16px;
  @include respond-to(small) {
    line-height: 160%;
  }
`;

const CustomBtn = styled.a`
  @import "variables";
  padding: 16px 47px;
  margin-top: 16px;
  font-weight: 600;
  font-size: 14px;
  line-height: 137%;
  background: $blue1;
  border-radius: 16px;
  width: fit-content;
  color: $white;
  &:hover {
    background: $blue2;
  }
  @include respond-to(small) {
    padding: 17px 0;
    width: 100%;
    text-align: center;
  }
`;

const VacancyDetailRow = styled.div`
  @import "variables";
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  @include respond-to(small) {
    margin-top: 28px;
  }
`;

const VacancyDeteilTitle = styled.span`
  @import "variables";
  font-weight: 600;
  font-size: 18px;
  line-height: 137%;
  @include respond-to(small) {
    font-size: 16px;
  }
`;

const List = styled.ul`
  @import "variables";
  margin: 20px 0 0 18px;
  padding: 0;
  @include respond-to(small) {
    margin: 16px 0 0 18px;
  }
`;

const Item = styled.li`
  @import "variables";
  font-weight: 400;
  font-size: 14px;
  color: $greenMain;
  span {
    color: $black;
  }
  line-height: 26px;
  @include respond-to(small) {
    line-height: 160%;
  }
`;

const TagBlock = styled.div`
  @import "variables";
  display: flex;
  flex-direction: row;
  margin-top: 40px;
  div:last-child {
    margin-right: 0;
  }
  @include respond-to(small) {
    margin-top: 28px;
  }
`;

const Tag = styled.div`
  @import "variables";
  padding: 8px 16px;
  width: fit-content;
  background: $BG;
  border-radius: 10px;
  font-weight: 500;
  font-size: 14px;
  line-height: 137%;
  margin-right: 8px;
`;
