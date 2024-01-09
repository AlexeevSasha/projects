import { useContext, useMemo } from "react";
import styled from "styled-components";
import { BannerEntity, BannersResponse } from "../../api/dto/Banner";
import { DataContext } from "../../core/dataProvider";
import { BannerImage } from "../banners/bannerImage";
import { NextLink } from "../nextLink/nextLink";
import { ReactSwiper } from "./ReactSwiper";

type Props = {
  locationKey: keyof BannersResponse<BannerEntity>;
  staticBanner?: BannerEntity[];
};

export const BannerSwiper = ({ locationKey, staticBanner }: Props) => {
  const { data: { banners = {} } = {} } = useContext(DataContext);
  const itemsList = useMemo(() => {
    const bannerList = (banners[locationKey] || []).filter((elem) => elem.BannerImages.Default);

    return staticBanner ? [...staticBanner, ...bannerList] : bannerList;
  }, [staticBanner]);

  // staticBanner && itemsList.unshift(staticBanner);

  return itemsList.length ? (
    <ReactSwiper<BannerEntity>
      className="banner-slider"
      slidesPerView={"auto"}
      itemsList={itemsList}
      render={({ Url, Id, BannerImages = { Default: "" } }) => (
        <NextLinkStyled
          url={Url}
          target={Url.toLocaleLowerCase().startsWith("http") ? "_blank" : "_self"}
          ariaLabel={`winline banner ${Id}`}
        >
          <ImgContainer>
            <BannerImage imgList={BannerImages} alt="winline banner" />
          </ImgContainer>
        </NextLinkStyled>
      )}
      loop={true}
      autoplay={
        itemsList.length > 1
          ? {
              delay: 5000,
              disableOnInteraction: false,
            }
          : false
      }
    />
  ) : null;
};

const ImgContainer = styled.div`
  cursor: pointer;
  height: 100%;
`;
const NextLinkStyled = styled(NextLink)`
  height: 100%;
  width: 100%;
`;
