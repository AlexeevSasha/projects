import { useRouter } from "next/router";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { IParkingDto } from "../../../api/dto/IParkingDto";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { IconTicket } from "../../../assets/icon/iconTicket";
import { theme } from "../../../assets/theme/theme";
import { ContainerContent } from "../../../components/containers/containerContent";
import { showHours } from "../../../helpers/showHours";
import { RestyledCustomButton } from "./componentRowMatchInfo/columnButton";

interface IProps {
  parking?: IParkingDto;
  buttonText?: string;
}

export const ParkingRow = ({ parking, buttonText }: IProps) => {
  const { locale = "ru" } = useRouter();

  return (
    <ContainerTableMatch>
      <Row typeMatch="new" key={parking?.Id}>
        <>
          <MatchName>{getLocalValue(parking?.FullName, locale)}</MatchName>

          <ColumnTur>
            <TexDate>{parking?.EventStart && showHours(parking?.EventStart, locale)}</TexDate>
            <TextTur>{parking?.TotalTickets && lang[locale].table.freePlace(parking?.TotalTickets)}</TextTur>
          </ColumnTur>
          <ButtonBlock>
            <RestyledCustomButton
              type={"red"}
              withGap
              onClick={(e) => {
                e.stopPropagation();
                location.assign(`${process.env.NEXT_PUBLIC_TICKETS_URL}/view-available-zones/${parking?.EventId}`);
              }}
            >
              <IconTicket />
              <span>{buttonText ? buttonText : lang[locale].button.buy}</span>
            </RestyledCustomButton>
          </ButtonBlock>
        </>
      </Row>
    </ContainerTableMatch>
  );
};

const ContainerTableMatch = styled(ContainerContent)`
  flex-direction: column;
  justify-content: center;
  // margin: 4.43vw auto;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    // margin: 6.16vw auto 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    // margin: 12.8vw auto 6.4vw;
  }
`;

const Row = styled.div<{ typeMatch: "old" | "new" }>`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-column-gap: 0.83vw;
  background: ${({ theme }) => theme.colors.blackLight_whiteGray};
  margin-bottom: 0.42vw;
  align-items: center;
  padding: 1.72vw 2.34vw;
  font-family: "FCSM Text", sans-serif;
  font-weight: 500;
  position: relative;
  box-sizing: border-box;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: 1fr 1fr;
    grid-row-gap: 2.09vw;

    padding: 4.17vw 5.22vw;
    margin-bottom: 2.09vw;

    article > section > div:nth-of-type(2) > span > div {
      display: none;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-template-columns: ${({ typeMatch }) => (typeMatch === "old" ? "1fr 1fr" : "1fr")};
    grid-row-gap: 4.27vw;

    padding: 8vw 4.27vw 4.27vw;
    margin-bottom: 3.73vw;
  }
`;

const ColumnTur = styled.div`
  display: flex;
  flex-direction: column;

  font-size: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.73vw;
  }
`;

const TexDate = styled.p`
  font-size: 1.25vw;
  margin: 0 0 0.42vw 0;
  color: ${(props) => props.theme.colors.white_black};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.35vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
  }
`;

const TextTur = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.gray_grayDark1};
  font-size: 0.94vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.35vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.8vw;
  }
`;

const MatchName = styled.p<{ highlight?: boolean }>`
  margin: 0;
  color: ${(props) => props.theme.colors.white_black};
  font-size: 1.25vw;

  grid-column-start: 1;
  grid-column-end: 3;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 6.4vw;
  }
`;

const ButtonBlock = styled.div`
  width: fit-content;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    display: flex;
    justify-content: end;
    width: 100%;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 6.4vw;
  }
`;
