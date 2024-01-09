import { useRouter } from "next/router";
import styled from "styled-components";
import { IStadiumStaff } from "../../../api/dto/IStadiumStaff";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { IconRedPoint } from "../../../assets/icon/iconRedPoint";
import { theme } from "../../../assets/theme/theme";
import { ContainerContent } from "../../../components/containers/containerContent";
import { NoData } from "../../../components/noData/noData";

interface IProps {
  eventTeamData?: IStadiumStaff;
}

export const SpartakEventTeam = (props: IProps) => {
  const { locale } = useRouter();

  return props.eventTeamData ? (
    <StyledContainer>
      {props.eventTeamData?.staffEventTeam && (
        <EventTeam>
          <BlockTitle>{getLocalValue(props.eventTeamData?.staffEventTeam?.title, locale)}</BlockTitle>

          <BlockDescription>
            <Description
              dangerouslySetInnerHTML={{
                __html: getLocalValue(props.eventTeamData?.staffEventTeam?.firstColumn, locale),
              }}
            />

            <Description
              dangerouslySetInnerHTML={{
                __html: getLocalValue(props.eventTeamData?.staffEventTeam?.secondColumn, locale),
              }}
            />
          </BlockDescription>
        </EventTeam>
      )}

      {props.eventTeamData?.stewardsCategory?.stewards && (
        <StewardCategories>
          <BlockSubtitle>{getLocalValue(props.eventTeamData?.stewardsCategory?.title, locale)}</BlockSubtitle>

          <BlockDescription>
            <Description>{getLocalValue(props.eventTeamData?.stewardsCategory?.description, locale)}</Description>
          </BlockDescription>

          <StewardNames>
            {props.eventTeamData?.stewardsCategory?.stewards?.map((elem, index) => (
              <StewardBlock key={index}>
                <IconRedPoint />
                {getLocalValue(elem, locale)}
              </StewardBlock>
            ))}
          </StewardNames>
        </StewardCategories>
      )}

      <ConditionsContainer>
        <BlockSubtitle>{getLocalValue(props.eventTeamData.partOfTeam.title, locale)}</BlockSubtitle>

        <ConditionsBlock>
          <EntryPoints>
            <PointsContainer>
              <Step>
                <RoundNumber>1</RoundNumber>

                <Point>
                  <NativeLink href="#sendForm">
                    {getLocalValue(props.eventTeamData.partOfTeam.step1, locale)}
                  </NativeLink>
                </Point>
              </Step>

              <HorizontalLine />

              <Step>
                <RoundNumber>2</RoundNumber>
                <Point>{getLocalValue(props.eventTeamData.partOfTeam.step2, locale)}</Point>
              </Step>

              <HorizontalLine />

              <Step>
                <RoundNumber>3</RoundNumber>
                <Point>{getLocalValue(props.eventTeamData.partOfTeam.step3, locale)}</Point>
              </Step>
            </PointsContainer>
          </EntryPoints>

          <Subparagraph>{getLocalValue(props.eventTeamData.partOfTeam.description, locale)}</Subparagraph>
        </ConditionsBlock>
      </ConditionsContainer>
    </StyledContainer>
  ) : (
    <NoData />
  );
};

const StyledContainer = styled(ContainerContent)`
  color: ${({ theme }) => theme.colors.white_black};
  font-family: "FCSM Text", sans-serif;
  flex-direction: column;
`;

const EventTeam = styled.section`
  width: 100%;
  padding: 4.17vw 0;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 10.43vw 0;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 10.67vw 0;
  }
`;

const BlockTitle = styled.h2`
  margin: 0;
  padding-bottom: 1.25vw;
  font-size: 2.08vw;
  font-weight: bold;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding-bottom: 3.13vw;
    font-size: 4.17vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding-bottom: 4.27vw;
    font-size: 8.53vw;
  }
`;

const BlockDescription = styled.div`
  p {
    margin: 0;
  }

  line-height: 1.46vw;
  display: flex;
  gap: 1.6vw;
  font-size: 0.94vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    flex-direction: column;
    font-size: 2.35vw;
    line-height: 3.65vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.73vw;
    line-height: 5.87vw;
  }
`;

const Description = styled.div<{ roboto?: boolean }>`
  display: block;
  flex-direction: column;
  width: 50%;
  color: ${({ theme }) => theme.colors.grayLight_grayDark};
  font-family: ${(props) => (props.roboto ? "Roboto" : "FCSM Text")}, sans-serif;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 100%;
  }
`;

const StewardCategories = styled.section`
  width: 100%;
`;

const BlockSubtitle = styled.p`
  font-size: 1.67vw;
  margin: 0;
  padding-bottom: 1.24vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 3.13vw;
    padding-bottom: 3.13vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
    padding-bottom: 4.27vw;
  }
`;

const StewardNames = styled.p`
  display: grid;
  margin: 0;
  padding: 2.08vw 0 4.17vw;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 3.13vw 0 10.43vw;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(4, 1fr);
    gap: 3.13vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 4.27vw 0 10.67vw;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(6, 1fr);
    gap: 2.13vw;
  }
`;

const StewardBlock = styled.span`
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 0.6vw;
  background: ${({ theme }) => theme.colors.blackLight_white1};
  padding: 0 1.25vw;
  font-size: 0.94vw;
  font-weight: 500;

  svg {
    padding: 1.25vw 0;
    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      padding: 3.13vw 0;
    }
    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      padding: 4.27vw 0;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.35vw;
    padding: 0 3.13vw;
    gap: 1.56vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
    padding: 0 6.4vw;
    gap: 3.2vw;
  }
`;

const ConditionsContainer = styled.section`
  display: block;
  width: 100%;
  justify-content: left;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    flex-direction: column;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
  }
`;

const ConditionsBlock = styled.div`
  width: 54.58vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    display: flex;
    padding-bottom: 6.26vw;
    width: 100%;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    flex-direction: column;
    padding-bottom: 0;
  }
`;

const EntryPoints = styled.p`
  margin: 0;
  background: ${({ theme }) => theme.colors.blackLight_white1};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 100%;
  }
`;

const PointsContainer = styled.p`
  margin: 0.83vw 0 1.25vw;
  padding: 1.25vw 2.92vw;
  display: flex;
  gap: 0.83vw;
  align-items: center;
  justify-content: space-between;
  white-space: nowrap;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    flex-direction: column;
    justify-content: left;
    align-items: flex-start;
    row-gap: 5vw;
    padding: 4.17vw 3.13vw;
    margin: 0;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    row-gap: 8vw;
  }
`;

const Step = styled.span`
  display: flex;
  align-items: center;
  gap: 0.83vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
  }
`;

const HorizontalLine = styled.span`
  display: block;
  width: 2.6vw;
  background: ${theme.colors.gray};
  border: 0.05vw solid ${theme.colors.gray};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    transform: rotate(90deg);
    width: 3.6vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 7.6vw;
  }
`;

const RoundNumber = styled.span`
  display: flex;
  font-size: 0.94vw;
  justify-content: center;
  align-items: center;
  width: 1.56vw;
  height: 1.56vw;
  color: ${theme.colors.gray};
  border: 0.05vw solid ${theme.colors.gray};
  border-radius: 50%;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 3.91vw;
    height: 3.91vw;
    font-size: 2.35vw;
    margin-right: 2.09vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 8vw;
    height: 8vw;
    font-size: 4.8vw;
    margin-right: 4.27vw;
  }
`;

const Point = styled.span`
  font-size: 0.83vw;
  text-transform: uppercase;
  font-weight: 500;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.83vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.73vw;
  }
`;

const Subparagraph = styled.span`
  display: flex;
  font-size: 0.83vw;
  min-width: 54.58vw;
  margin: 0;
  color: ${({ theme }) => theme.colors.grayLight_grayDark};
  font-family: Roboto, sans-serif;
  padding-bottom: 2.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.09vw;
    padding: 0 0 5.22vw 3.13vw;
    min-width: 50%;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.73vw;
    padding: 4.27vw 0 0;
  }
`;

const NativeLink = styled.a`
  cursor: pointer;
  text-decoration: none;
  color: ${theme.colors.red};
  text-transform: uppercase;
  font-weight: 500;
`;
