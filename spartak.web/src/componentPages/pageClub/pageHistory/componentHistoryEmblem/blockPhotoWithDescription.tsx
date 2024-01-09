import styled from "styled-components";
import { theme } from "../../../../assets/theme/theme";
import { DescriptionFromCMS } from "../../../../ui/descriptionFromCMS/descriptionFromCMS";
import { NextImage } from "../../../../ui/nextImage/nextImage";

interface IProps {
  positionPhoto: "left" | "right";
  title?: string;
  description?: string;
  photo?: string;
}

export const BlockPhotoWithDescription = (props: IProps) => {
  return props?.title ? (
    <Container>
      <TitleDescriptionBlock>
        <DescriptionTitle>{props?.title}</DescriptionTitle>
        <DescriptionFromCMS dangerouslySetInnerHTML={{ __html: props.description || "" }} />
      </TitleDescriptionBlock>
      {props.photo ? <PhotoContainer><NextImage src={props.photo} alt={props.title} /></PhotoContainer> : null}
    </Container>
  ) : (
    <></>
  );
};

const Container = styled.section`
  box-sizing: border-box;
  border: ${({ theme }) => `0.05vw solid ${theme.colors.grayDark_gray1}`};
  display: flex;
  width: inherit;

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    flex-direction: column;
  }
`;

const TitleDescriptionBlock = styled.div`
  box-sizing: border-box;
  width: 60%;
  padding: 3.33vw;
  margin: 0;
  border-right: ${({ theme }) => `0.05vw solid ${theme.colors.grayDark_gray1}`};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 3.13vw;
    width: 60%;
    border-left: 0;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 4.27vw;
    width: inherit;
    border-bottom: 0.27vw solid ${theme.colors.grayDark};
    border-right: 0;
  }
`;

const DescriptionTitle = styled.span`
  display: block;
  margin: 0;
  font-size: 1.67vw;
  color: ${({ theme }) => theme.colors.white_black};
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  padding-bottom: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-family: "FCSM Text", sans-serif;
    font-size: 3.13vw;
    font-weight: 500;
    padding-bottom: 2.09vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 6.4vw;
    padding-bottom: 4.27vw;
  }
`;

const PhotoContainer = styled.div`
  box-sizing: border-box;
  padding: 3.33vw;
  display: block;
  width: 40%;
  height: auto;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 40%;
    padding: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 4.27vw;
    width: inherit;
  }
`;
