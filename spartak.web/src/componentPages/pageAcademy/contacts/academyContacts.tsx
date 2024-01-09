import React from "react";
import styled from "styled-components";
import { theme } from "../../../assets/theme/theme";
import { useRouter } from "next/router";
import { DropdownList } from "../../../components/dropdownList/dropdownList";
import { YandexMap } from "../../pageStadium/howToGet/yandexMap";
import { ContactAcademyItem } from "./contactAcademyItem";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { IAcademyBlocks } from "../../../api/dto/IAcademyContacts";

interface IProps {
  dataJSON: IAcademyBlocks[];
}

export const HowToMoveAcademy = ({ dataJSON }: IProps) => {
  const { locale = "ru" } = useRouter();

  return (
    <Container>
      {dataJSON.map((item, index) => (
        <React.Fragment key={index}>
          <ColumnBlock>
            <ContactAcademyItem contactsData={item} />
          </ColumnBlock>

          <MapContainer>
            <YandexMap hasPointerContainer coordinates={item.coordinates} />
          </MapContainer>

          <Content>
            {item.info?.map((el, index) => (
              <DropdownList key={`it${index}`} title={getLocalValue(el.title, locale)} defaultState={!index}>
                <InformationBlock>{getLocalValue(el.description, locale)}</InformationBlock>
              </DropdownList>
            ))}
          </Content>
        </React.Fragment>
      ))}
    </Container>
  );
};
const Container = styled.div`
  padding-bottom: 2.08vw;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding-bottom: 5.22vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding-bottom: 6.4vw;
  }
`;

const Content = styled.div`
  padding: 0 8.75vw 2.92vw;
  color: ${({ theme }) => theme.colors.white_black};
  font-family: "FSM Text", sans-serif;

  & nav {
    column-gap: 2vw;
    overflow: auto;
    white-space: nowrap;
  }
  section:first-of-type {
    padding-top: 0.47vw;
    margin: 0;
  }
  section > div:first-of-type {
    padding-top: 3.02vw;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 0 3.13vw 5.22vw;

    section:first-of-type {
      padding-top: 3.13vw;
      margin: 0;
    }
    section > div:first-of-type {
      padding-top: 0;
    }
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 0 4.27vw 14.93vw;

    section {
      margin-top: 10.67vw;
    }
    section:first-of-type {
      padding-top: 10.67vw;
      margin: 0;
    }
    section > div:first-of-type {
      padding-top: 0;
    }
  }
`;

const InformationBlock = styled.div`
  font-size: 1.25vw;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.white_black};
  background: ${({ theme }) => theme.colors.blackLight_whiteGray};
  box-sizing: border-box;
  padding: 1.25vw 2.08vw;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.35vw;
    line-height: 3.65vw;
    padding: 3.13vw 5.22vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.73vw;
    line-height: 4.8vw;
    padding: 4.27vw;
  }
`;

const MapContainer = styled.div`
  width: 100vw;

  article:first-of-type {
    height: 31.25vw;

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      height: 78.1vw;
    }

    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      height: 80vw;
    }
  }
`;

const ColumnBlock = styled(Content)`
  display: flex;
  flex-direction: column;
  padding-bottom: 2.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding-bottom: 5.22vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding-bottom: 6.4vw;
  }
`;
