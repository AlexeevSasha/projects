import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { IMediaShort } from "../../../api/dto/IMedia";
import { theme } from "../../../assets/theme/theme";
import { CardVideo } from "../../../components/cardVideo/cardVideo";
import { ClickPlayVideo } from "../../../components/clickPlayVideo/clickPlayVideo";

interface IProps {
  videosList?: IMediaShort[];
  defaultUrl?: string;
}

export const VideoAside = (props: IProps) => {
  const { locale } = useRouter();
  const t = useMemo(() => lang[locale ?? "ru"], [locale]);
  const [showModal, setShowModal] = useState<IMediaShort | undefined>();
  return (
    <Aside>
      <Title>{t.pageVideos.anotherVideos}</Title>
      {props?.videosList && props.videosList?.length > 0 ? (
        <StyledCardNews>
          {props.videosList?.map((elem, index) => (
            <CardVideo
              key={index}
              videoInfo={elem}
              defaultUrl={props.defaultUrl ?? "/media/videos/"}
              clickPlay={setShowModal}
            />
          ))}
          {showModal ? <ClickPlayVideo showModal={showModal} setShowModal={setShowModal} /> : null}
        </StyledCardNews>
      ) : (
        <></>
      )}
    </Aside>
  );
};

const Aside = styled.aside`
  display: grid;
  grid-template-rows: 1fr;
  gap: 2.08vw;
  position: relative;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: 1fr;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
  }
`;

const Title = styled.p`
  color: ${({ theme }) => theme.colors.white_black};
  margin: 0;
  padding-top: 1.04vw;
  font-size: 2.08vw;
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 6.78vw;
    padding-top: 0;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 8.53vw;
  }
`;

const StyledCardNews = styled.div`
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  gap: 2.08vw;
  a {
    width: 26.67vw;
  }

  &::-webkit-scrollbar-track-piece {
    background-color: ${({ theme }) => theme.colors.blackLight_whiteGray};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.grayDark_gray1};
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-rows: 1fr;
    grid-template-columns: repeat(3, 45.63vw);
    position: relative;
    overflow: auto;
    gap: 3.26vw;
    padding-bottom: 2.09vw;

    a {
      width: 45.37vw;
      height: auto;
    }

    ::-webkit-scrollbar {
      height: 0.52vw !important;
    }
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-template-columns: repeat(3, 93.33vw);
    padding-bottom: 4.27vw;
    gap: 4.27vw;

    a {
      width: 91.47vw;
    }

    ::-webkit-scrollbar {
      height: 1.07vw !important;
    }
  }
`;
