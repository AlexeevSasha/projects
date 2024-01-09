import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "../../../assets/theme/theme";
import { BlockTriplePhoto } from "../../../components/blockTriplePhoto/blockTriplePhoto";
import { ContainerContent } from "../../../components/containers/containerContent";
import { GallerySwiper } from "../../../components/reactSwiper/gallerySwiper";

type Props = {
  images: string[];
};

export const ImagesView = ({ images }: Props) => {
  const [sliderIsVisible, setSliderIsVisible] = useState<number>();

  return (
    <Container>
      {images?.reduce((blocks: JSX.Element[], image, i, arr) => {
        if (i % 3 === 0) {
          const block = (
            <PhotoContainer key={i}>
              <BlockTriplePhoto
                first={image}
                second={arr[i + 1]}
                main={arr[i + 2]}
                onClick={setSliderIsVisible}
                number={i}
              />
            </PhotoContainer>
          );
          return [...blocks, block];
        }

        return blocks;
      }, [])}

      {sliderIsVisible !== undefined && (
        <GallerySwiper
          clickClose={() => setSliderIsVisible(undefined)}
          photoList={images}
          initialSlide={sliderIsVisible}
        />
      )}
    </Container>
  );
};
const PhotoContainer = styled.div`
  margin-bottom: 0.21vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-bottom: 0.52vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-bottom: 1.07vw;
  }
`;

const Container = styled(ContainerContent)`
  display: block;
  margin-bottom: 5.2vw;

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-bottom: 8.5vw;
  }

  div:nth-of-type(even) > section {
    direction: rtl;
  }
`;
