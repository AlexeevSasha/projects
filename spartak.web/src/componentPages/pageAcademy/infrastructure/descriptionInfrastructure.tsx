import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { theme } from "../../../assets/theme/theme";
import { NextImage } from "../../../ui/nextImage/nextImage";
import { IAcademyInfrastructure } from "../../../api/dto/IAcademyInfrastructure";

interface IProps {
  description: IAcademyInfrastructure["description"];
}

export const DescriptionInfrastructure = ({ description }: IProps) => {
  const { locale = "ru" } = useRouter();

  return (
    <div>
      <SecondaryTitle>{getLocalValue(description.title, locale)}</SecondaryTitle>
      <div>
        {description.imgWithWysiwygInline.map(({ img, description }, i) => (
          <Container key={i}>
            {img ? (
              <>
                <ImgContainer>
                  <NextImage src={img} />
                </ImgContainer>
                <Spacer />
              </>
            ) : null}

            <RightBlock dangerouslySetInnerHTML={{ __html: getLocalValue(description, locale) }} />
          </Container>
        ))}
      </div>
    </div>
  );
};

const SecondaryTitle = styled.h2`
  margin: 0 0 3.33vw;
  font-size: 3.23vw;
  font-weight: 700;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 5.22vw;
    margin: 0;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 8.53vw;
  }
`;

const ImgContainer = styled.div`
  width: 34.9vw;
  height: 20.8vw;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: -0.05vw;
    bottom: -0.05vw;
    background: ${({ theme }) => theme.gradients.field_none};
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 100%;
    height: 56vw;

    &::after {
      background: linear-gradient(180deg, rgba(13, 17, 22, 0) 0.77%, #0d1116 95.31%);
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: 54.66vw;
  }
`;

const Container = styled.div`
  display: flex;
  margin-bottom: 4.16vw;

  &:nth-child(2n) {
    flex-direction: row-reverse;

    ${ImgContainer}::after {
      @media screen and (min-width: ${theme.rubberSize.desktop}) {
        transform: rotate(-180deg);
      }
    }
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    display: block;
    margin-top: 10.43vw;
  }
`;

const Spacer = styled.div`
  width: 6.5625vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 100%;
    height: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: 6.4vw;
  }
`;

const RightBlock = styled.div`
  flex: 1;
  strong {
    font-weight: 700;
    font-size: 2.08vw;
    margin: 0 0 0.625vw;

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      font-size: 5.21vw;
      margin: 0 0 1.56vw;
    }

    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      font-size: 6.4vw;
      margin: 0 0 3.2vw;
    }

    p {
      margin: 0;
      font-size: 0.9375vw;

      @media screen and (max-width: ${theme.rubberSize.desktop}) {
        font-size: 2.34vw;
      }

      @media screen and (max-width: ${theme.rubberSize.tablet}) {
        font-size: 4.26vw;
      }
    }
  }
`;
