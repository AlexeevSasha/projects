import { useRouter } from "next/router";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { ITournamentTable } from "../../../api/dto/ITournamentTable";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { theme } from "../../../assets/theme/theme";
import { ContainerContent } from "../../../components/containers/containerContent";
import { ContainerHorizontalScroll } from "../../../components/containers/containerHorizontalScroll";
import { checkImgFunk } from "../../../helpers/checkImgFunk";
import { NextImage } from "../../../ui/nextImage/nextImage";

interface IProps {
  tournamentTable: ITournamentTable[];
  teamId?: string;
}

export const MatchStandings = (props: IProps) => {
  const { locale = "ru" } = useRouter();

  return (
    <CustomContainer>
      <GroupName>{props.tournamentTable[0]?.GroupName}</GroupName>

      <ContainerHorizontalScroll>
        <Table>
          <colgroup>
            <col span={1} style={{ width: "auto" }} />
            <col span={1} style={{ width: "auto" }} />
            <Col span={1} />
            <Col span={1} />
            <Col span={1} />
            <Col span={1} />
            <Col span={1} />
            <Col span={1} />
          </colgroup>
          <THead>
            <tr>
              <ThNumber />
              <Th style={{ textAlign: "start", width: "auto" }}>{lang[locale].table.header.team}</Th>
              <Th>{lang[locale].table.header.matches}</Th>
              <Th>{lang[locale].table.header.victories}</Th>
              <Th>{lang[locale].table.header.draws}</Th>
              <Th>{lang[locale].table.header.defeat}</Th>
              <Th>{lang[locale].table.header.balls}</Th>
              <Th>{lang[locale].table.header.glasses}</Th>
            </tr>
          </THead>
          <tbody>
            {props.tournamentTable.map((elem, index) => (
              <Tr key={elem.Team?.Id} active={props.teamId === elem.Team?.Id}>
                <TdBold active={props.teamId === elem.Team?.Id} style={{ textAlign: "center" }}>
                  {index + 1}
                </TdBold>
                <TdBold active={props.teamId === elem.Team?.Id}>
                  <TextWithImg>
                    <ContainerImage>
                      {checkImgFunk(elem.Team?.Logo) ? (
                        <NextImage src={elem.Team?.Logo || ""} alt={elem.Team?.Id} />
                      ) : null}
                    </ContainerImage>
                    {getLocalValue(elem.Team?.Name, locale)}
                  </TextWithImg>
                </TdBold>
                <Td>{elem.Total}</Td>
                <Td>{elem.Won}</Td>
                <Td>{elem.Draw}</Td>
                <Td>{elem.Lost}</Td>
                <Td>{elem.Goals}</Td>
                <Td>{elem.Points}</Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </ContainerHorizontalScroll>
    </CustomContainer>
  );
};

const CustomContainer = styled(ContainerContent)`
  margin-bottom: 5.21vw;
  margin-top: 4.17vw;
  display: block;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-bottom: 5.22vw;
    margin-top: 0;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-bottom: 6.4vw;
  }
`;

const GroupName = styled.div`
  color: ${({ theme }) => theme.colors.white_black};
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  margin-bottom: 1.5vw;
  font-size: 2vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-bottom: 1.5vw;
    font-size: 2.35vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-bottom: 2vw;
    font-size: 3.73vw;
  }
`;

const Table = styled.table`
  border-spacing: 0;
  border-collapse: collapse;
  width: 100%;

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    min-width: 200vw;
  }
`;

const Col = styled.col`
  width: 7%;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 10%;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 10%;
  }
`;

const THead = styled.thead`
  background-color: ${({ theme }) => theme.colors.blackLight_red};
  color: ${({ theme }) => theme.colors.gray_white};
`;

const Th = styled.th`
  font-family: "FCSM Text", sans-serif;
  text-transform: uppercase;
  font-size: 0.83vw;
  padding: 1.67vw 0;
  width: 110px;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.56vw;
    padding: 2.09vw 0;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.2vw;
    padding: 4.27vw 0;
  }
`;

const ThNumber = styled(Th)`
  width: 5.21vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 4.56vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 9.07vw;
  }
`;

const Tr = styled.tr<{ active?: boolean }>`
  border-bottom: 0.05vw solid ${({ theme }) => theme.colors.grayDark_gray1};
  background-color: ${(props) => (props.active ? `${theme.colors.red}20` : props.theme.colors.none_whiteGray)};

  & > td {
    ${({ active, theme }) => (active ? `color: ${theme.colors.none_red}; font-weight: bold` : "")}
  }
`;

const TdBold = styled.td<{ active?: boolean }>`
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  color: ${(props) => (props.active ? props.theme.colors.white_red : props.theme.colors.gray_grayDark1)};
  font-size: 1.67vw;
  padding: 0.83vw 0;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.35vw;
    padding: 2.09vw 0;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.73vw;
    padding: 4.27vw 0;
  }
`;

const TextWithImg = styled.span`
  display: flex;
  align-items: center;
`;

const ContainerImage = styled.div`
  width: 3.49vw;
  height: 3.49vw;
  margin-right: 2.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 3.13vw;
    height: 3.13vw;
    margin-right: 1.96vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 5.22vw;
    height: 5.22vw;
    margin-right: 2.67vw;
  }
`;

const Td = styled.td`
  font-family: "FCSM Text", sans-serif;
  color: ${({ theme }) => theme.colors.white_black};
  width: fit-content;
  font-size: 1.25vw;
  padding: 1.67vw 0;
  text-align: center;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.35vw;
    padding: 2.09vw 0;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.73vw;
    padding: 4.27vw 0;
  }
`;
