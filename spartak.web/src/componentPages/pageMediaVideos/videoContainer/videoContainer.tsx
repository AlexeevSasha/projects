import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { ICategory } from "../../../api/dto/ICategory";
import { IMediaShort } from "../../../api/dto/IMedia";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { theme } from "../../../assets/theme/theme";
import { ContainerContent } from "../../../components/containers/containerContent";
import { MediaList } from "../../../../src/components/mediaList";
interface IProps {
  categoryInfo?: ICategory;
  clickPlayVideo?: (value: IMediaShort) => void;
  defaultUrl: string;
}

export const VideoContainer = (props: IProps) => {
  const { locale = "ru" } = useRouter();
  return (
    <StyledContainer>
      {props.categoryInfo && <LayoutTitle>{getLocalValue(props.categoryInfo?.CategoryName, locale)}</LayoutTitle>}
      <MediaList section="Site" mediaType="Video" hideBanner />
    </StyledContainer>
  );
};

const StyledContainer = styled(ContainerContent)`
  flex-direction: column;
`;

const LayoutTitle = styled.h1`
  font-size: 3.75vw;
  line-height: 1;
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  margin: 0;
  color: ${({ theme }) => theme.colors.white_black};
  width: 100%;
  text-align: left;
  padding-bottom: 3.33vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 6.78vw;
    padding-bottom: 3.26vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 8.53vw;
    padding-bottom: 4.27vw;
  }
`;
