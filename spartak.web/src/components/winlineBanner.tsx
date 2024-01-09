import { useContext } from "react";
import styled from "styled-components";
import { getDaysLeft } from "../../src/assets/constants/date";
import { freebetLink, winlineUtm } from "../../src/assets/constants/freebetLink";
import { theme } from "../assets/theme/theme";
import { NextLink } from "../components/nextLink/nextLink";
import { DataContext } from "../core/dataProvider";
import { BannerImage } from "./banners/bannerImage";

interface IWinlineBannerProps {
  matchDate: string;
  eventUrl?: string;
}
export const WinlineBunner = (props: IWinlineBannerProps) => {
  const { data: { banners = {} } = {} } = useContext(DataContext);
  const in1Day = (banners["Web.Main.In1Day.DownFuture"] || [])[0];
  const in5Days = (banners["Web.Main.In5Days.DownFuture"] || [])[0];

  if (!props.matchDate) return <></>;
  const daysLeft = getDaysLeft(props.matchDate);

  return daysLeft <= 1 && in1Day?.BannerImages.Default ? (
    <ContainerWinlineButton>
      <NextLink url={props.eventUrl + winlineUtm}>
        <BannerImage imgList={in1Day?.BannerImages} alt="winline" objectFit="cover" />
      </NextLink>
    </ContainerWinlineButton>
  ) : daysLeft <= 5 && in5Days?.BannerImages.Default ? (
    <ContainerWinlineButton>
      <NextLink url={freebetLink}>
        <BannerImage imgList={in5Days?.BannerImages} alt="winline" objectFit="cover" />
      </NextLink>
    </ContainerWinlineButton>
  ) : (
    <></>
  );
};
const ContainerWinlineButton = styled.div`
  width: 100%;
  height: 2.71vw;
  position: relative;
  display: flex;
  justify-content: center;
  overflow: hidden;
  a {
    width: 100%;
    display: flex;
    align-items: center;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    overflow: hidden;
    width: 100%;
    height: 6.78vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: 10.67vw;
  }
`;
