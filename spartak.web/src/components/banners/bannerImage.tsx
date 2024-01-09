import { ImageProps } from "next/image";
import styled from "styled-components";
import { BannerEntity } from "../../api/dto/Banner";
import { theme } from "../../assets/theme/theme";
import { NextImage } from "../../ui/nextImage/nextImage";

type IProps = Partial<ImageProps> & {
  alt: string;
  src?: string;
  imgList: BannerEntity["BannerImages"];
};

export const BannerImage = ({ imgList, alt, ...props }: IProps) => {
  return (
    <>
      <ContainerDesktop>
        <NextImage layout="fill" {...props} src={imgList.Default} alt={alt} />
      </ContainerDesktop>
      <ContainerTablet>
        <NextImage layout="fill" {...props} src={imgList.Tablet ?? imgList.Default} alt={alt} />
      </ContainerTablet>
      <ContainerMobile>
        <NextImage layout="fill" {...props} src={imgList.MobileSite ?? imgList.Default} alt={alt} />
      </ContainerMobile>
    </>
  );
};

const ContainerDesktop = styled.div`
  width: 100%;
  height: 100%;
  @media (max-width: ${theme.rubberSize.desktop}) {
    display: none;
  }
`;

const ContainerTablet = styled.div`
  display: none;
  width: 100%;
  height: 100%;

  @media (max-width: ${theme.rubberSize.desktop}) {
    display: block;
  }

  @media (max-width: ${theme.rubberSize.tablet}) {
    display: none;
  }
`;

const ContainerMobile = styled.div`
  display: none;
  width: 100%;
  height: 100%;

  @media (max-width: ${theme.rubberSize.tablet}) {
    display: block;
  }
`;
