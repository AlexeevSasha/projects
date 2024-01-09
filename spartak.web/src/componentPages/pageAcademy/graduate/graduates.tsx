import { useRouter } from "next/router";
import React, { Fragment, memo } from "react";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { GraduateEntity } from "../../../api/dto/Graduate";
import { GraduateSectionEntity } from "../../../api/dto/GraduateSecion";
import { formatDate } from "../../../assets/constants/date";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { theme } from "../../../assets/theme/theme";
import { ContainerContent } from "../../../components/containers/containerContent";
import { NextImage } from "../../../ui/nextImage/nextImage";
import { CustomButton } from "../../../components/buttons/customButton";
import { IconArrowRight } from "../../../assets/icon/iconArrowRight";
import { NoData } from "../../../components/noData/noData";
import { NextLink } from "../../../components/nextLink/nextLink";
import { AcademyBanners } from "../academyBanners";

interface IProps {
  graduates: GraduateEntity[];
  section: GraduateSectionEntity;
}

type ByYear = Record<string, GraduateEntity[]>;

export const Graduates = memo(({ graduates, section }: IProps) => {
  const { locale = "ru", push } = useRouter();

  const showTeamCol = graduates.some(({ Team }) => !!Team);

  const graduatesByYear = graduates.reduce((acc: ByYear, item: GraduateEntity) => {
    const key = formatDate(item.Birthday, "yyyy", locale);
    return { ...acc, [key]: [...(acc[key] || []), item] };
  }, {});

  return (
    <>
      <AcademyBanners title={lang[locale].academy.title.graduate} />

      <Container>
        <BackButton type="opacity" withGap onClick={() => push("/academy/graduate")}>
          <IconArrowRight rotate="180deg" />

          {lang[locale].graduate.goBack}
        </BackButton>

        <SectionName>{getLocalValue(section?.FullName, locale)}</SectionName>

        {graduates.length ? (
          <Content>
            <Col>
              {Object.entries(graduatesByYear).map(([key, items]) => (
                <Fragment key={key}>
                  <TabelName>{`${key} ${lang[locale].graduate.yearOfBirth}`}</TabelName>

                  <Tabel>
                    <TableHead showTeamCol={showTeamCol}>
                      <div>{lang[locale].graduate.player}</div>

                      <div>{lang[locale].graduate.dateOfBirth}</div>

                      {showTeamCol && <div>{lang[locale].graduate.team}</div>}
                    </TableHead>

                    {items.map(({ Id, FullName, Birthday, Team, GraduateUrl }) => {
                      const [secondName, firstName, patronimc] = getLocalValue(FullName, locale).split(" ");

                      return (
                        <TableRow key={Id} showTeamCol={showTeamCol}>
                          {GraduateUrl ? (
                            <NextLink url={GraduateUrl} rel="nofollow">
                              <span>
                                <SecondName>{secondName}</SecondName> {firstName} {patronimc}
                              </span>
                            </NextLink>
                          ) : (
                            <>
                              <span>
                                <SecondName>{secondName}</SecondName> {firstName} {patronimc}
                              </span>
                            </>
                          )}

                          <div>
                            <MobileHead>{lang[locale].graduate.dateOfBirth}</MobileHead>

                            <div>{formatDate(Birthday, "dd.MM.yyyy", locale)}</div>
                          </div>

                          {showTeamCol && (
                            <div>
                              <MobileHead>{lang[locale].graduate.team}</MobileHead>

                              <div>{getLocalValue(Team, locale)}</div>
                            </div>
                          )}
                        </TableRow>
                      );
                    })}
                  </Tabel>
                </Fragment>
              ))}
            </Col>

            <Col desktop>
              <SectionImage><NextImage src={section.ImageTeamUrl} /></SectionImage>
            </Col>
          </Content>
        ) : (
          <NoData message={lang[locale].academy.emptyScreen.noData.NoGraduates} />
        )}
      </Container>
    </>
  );
});

const Container = styled(ContainerContent)`
  display: block;
  color: ${({ theme }) => theme.colors.white_black};
`;

const SectionName = styled.h2`
  font-size: 2.7vw;
  font-weight: 700;
  margin: 2.08vw 0;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 6.78vw;
    margin: 5.21vw 0;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 10.66vw;
    margin: 6.4vw 0;
  }
`;

const TabelName = styled.div`
  font-weight: 700;
  font-size: 1.66vw;
  margin-bottom: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 4.17vw;
    margin-bottom: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 6.4vw;
    margin-bottom: 2.13vw;
    font-weight: 500;
  }
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  font-size: 0.83vw;
  margin-bottom: 6.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.08vw;
    margin-bottom: 10.43vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.2vw;
    margin-bottom: 10.66vw;
  }
`;

const Col = styled.div<{ desktop?: boolean }>`
  width: 40.625vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 100%;
    display: ${({ desktop }) => desktop && "none"};
  }
`;

const Tabel = styled.div`
  color: ${theme.colors.white};
  margin-bottom: 2.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-bottom: 5.21vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-bottom: 10.66vw;
  }
`;

const SectionImage = styled.div`
  width: 100%;
  height: 40.625vw;
  position: relative;
  margin-top: 3.4375vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    display: none;
  }

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: ${({ theme }) => theme.gradients.graduate};
  }
`;

const MobileHead = styled.div`
  display: none;
  text-transform: uppercase;
  color: ${theme.colors.grayDark};
  font-size: 3.2vw;
  margin-bottom: 1vw;

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    display: block;
  }
`;

const TableHead = styled.div<{ showTeamCol?: boolean }>`
  display: grid;
  grid: 2.8125vw / 3fr 1.5fr ${({ showTeamCol }) => (showTeamCol ? "1.2fr" : "")};
  align-items: center;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gray_white};
  background: ${({ theme }) => theme.colors.blackLight_grayDark1};
  padding: 0 1.25vw;
  font-weight: 700;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-rows: 7vw;
    padding: 0 2.08vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    display: none;
  }

  & > *:not(:first-child) {
    text-align: center;
  }
`;

const TableRow = styled.div<{ showTeamCol?: boolean }>`
  display: grid;
  grid: 2.8125vw / 3fr 1.5fr ${({ showTeamCol }) => (showTeamCol ? "1.2fr" : "")};
  align-items: center;
  padding: 0 1.25vw;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grayDark_gray1};
  background: ${({ theme }) => theme.colors.none_whiteGray};
  color: ${({ theme }) => theme.colors.white_black};

  a {
    text-decoration: none;
    cursor: pointer;
  }

  & > *:not(:first-child) {
    text-align: center;
  }

  & > *:first-child {
    color: ${theme.colors.red};
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-rows: 7vw;
    padding: 0 2.08vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    display: flex;
    padding: 3.2vw 0;
    flex-flow: row wrap;

    & > *:first-child {
      width: 100%;
      margin-bottom: 2.13vw;
    }

    & > *:nth-child(2) {
      width: 37.33vw;
    }

    & > *:not(:first-child) {
      text-align: left;
    }
  }
`;

const BackButton = styled(CustomButton)`
  width: fit-content;
  padding-top: 0;
  padding-bottom: 0;
  height: 2.08vw;
  margin-top: 2.08vw;
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.white_gray1};
  border-color: ${({ theme }) => theme.colors.white_gray1};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    height: 5.21vw;
    margin-top: 5.21vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: 10.66vw;
    margin-top: 6.4vw;
  }

  & > svg > path {
    stroke: ${({ theme }) => theme.colors.white_gray1};
  }
`;

const SecondName = styled.span`
  text-transform: uppercase;
`;
