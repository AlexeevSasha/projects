import { useRouter } from "next/router";
import styled from "styled-components";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { theme } from "../../../assets/theme/theme";
import { NextImage } from "../../../ui/nextImage/nextImage";
import { formatDate } from "../../../assets/constants/date";

interface IProps {
  veteran: any;
}
export const SmallCardOfVeteran = (props: IProps) => {
  const { locale = "ru" } = useRouter();

  return (
    <ContainerCard>
      <ImageContainer>
        <NextImage alt={getLocalValue(props.veteran.fullName, locale)} src={props.veteran.photo} />
      </ImageContainer>
      <div>
        <Name>{getLocalValue(props.veteran.fullName, locale)} ({formatDate(props.veteran.birthDate, "dd.MM.yyyy", "ru")})</Name>
        <Position>{getLocalValue(props.veteran.position, locale)}</Position>
      </div>
      <Description dangerouslySetInnerHTML={{ __html: getLocalValue(props.veteran.description, locale) }} />
    </ContainerCard>
  );
};

const ContainerCard = styled.div`
  font-family: "FCSM Text", sans-serif;
  padding: 0 2.08vw 2.08vw;
  width: 100%;
  box-sizing: border-box;

  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 1.25vw;
  border: 1px solid ${theme.colors.grayDark};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: 1fr 1.37fr;
    padding: 3.13vw 5.22vw 5.22vw;
    grid-column-gap: 3.13vw;
    grid-row-gap: 3.13vw;
    align-items: center;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-template-columns: 1fr;
    grid-row-gap: 6.4vw;
    padding: 4.27vw 6.4vw 6.4vw;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  height: 20.26vw;
  margin: 2.76vw -2.08vw 0;

  :before {
    background: ${({ theme }) => theme.gradients.player_playerRed};
    top: -2.76vw;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9;
    position: absolute;
    content: " ";
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    height: 29.2vw;
    margin: 3.65vw 0 0;

    :before {
      top: -3.65vw;
    }
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-row-end: 1;
    height: 67.73vw;
    margin-top: 8.53vw;
    :before {
      top: -8.53vw;
    }
  }
`;

const Name = styled.div`
  font-weight: 700;
  font-size: 1.67vw;
  color: ${({ theme }) => theme.colors.white_black};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 4.17vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 6.4vw;
    font-weight: 500;
  }
`;

const Position = styled.div`
  font-weight: 500;
  font-size: 1.25vw;
  color: ${({ theme }) => theme.colors.gray_grayDark1};
  margin-top: 0.42vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 3.13vw;
    margin-top: 1.04vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
    margin-top: 3.13vw;
  }
`;

const Description = styled.div`
  font-weight: 500;
  font-size: 1.25vw;
  color: ${({ theme }) => theme.colors.white_black};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-column-start: 1;
    grid-column-end: 3;
    font-size: 3.13vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-column-end: 1;
    font-size: 4.27vw;
  }
`;
