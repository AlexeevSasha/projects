import { getPharmacies, getPharmaciesFavourites, getPharmaciesStory } from "api/pharmaciesApi";
import styled from "astroturf/react";
import { getPharmaciesLayout } from "common/components/layout/PharmaciesLayout";
import { PharmaciesDetailInfo } from "common/components/pharmacies/PharmacieDetailInfo";
import { PharmaciesMapPlacemark } from "common/components/pharmacies/PharmacieMapPlacemark";
import { PharmaciesMapRoute } from "common/components/pharmacies/PharmaciesMapRoute";
import { GetServerSideProps } from "next";
import { useState } from "react";
import { getInitialData } from "common/hooks/useInitialData";

export default function PharmacieInfoPage() {
  const [userLocation, setUserLocation] = useState<number[]>([]);

  return (
    <CustomContainer>
      {userLocation.length ? (
        <MobileMapWrapper>
          <PharmaciesMapRoute userLocation={userLocation} />
        </MobileMapWrapper>
      ) : (
        <MobileMapWrapper>
          <PharmaciesMapPlacemark />
        </MobileMapWrapper>
      )}
      <PharmaciesSearchConteiner>
        <PharmaciesDetailInfo setUserLocation={setUserLocation} />
      </PharmaciesSearchConteiner>
    </CustomContainer>
  );
}

PharmacieInfoPage.getLayout = getPharmaciesLayout;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { metaTags = {}, ...initialData } = await getInitialData({ pathname: "/profile/pharmacies" });
    const [pharmacies, favourites, story] = await Promise.allSettled([
      getPharmacies(),
      getPharmaciesFavourites(),
      getPharmaciesStory(),
    ]);
    return {
      props: {
        pharmacies: pharmacies.status === "fulfilled" ? pharmacies.value.data.items : [],
        favourites: favourites.status === "fulfilled" ? favourites.value : [],
        story: story.status === "fulfilled" ? story.value : [],
        initialData: { metaTags, ...initialData },
      },
    };
  } catch {
    return { props: {} };
  }
};

const CustomContainer = styled.div`
  @import "variables";
  width: 100%;
  height: 845px;
  margin: -30px 0;
  position: relative;
  overflow: hidden;
  [class*="ymaps-2"][class*="-ground-pane"] {
    filter: url("data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\'><filter id=\\'grayscale\\'><feColorMatrix type=\\'matrix\\' values=\\'0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0\\'/></filter></svg>#grayscale");
    /* Firefox 3.5+ */
    -webkit-filter: grayscale(100%);
    /* Chrome 19+ & Safari 6+ */
  }
  @include respond-to(small) {
    overflow: inherit;
  }
`;

const MobileMapWrapper = styled.div`
  @import "variables";
  width: 100%;
  height: 845px;
  @include respond-to(small) {
    display: block;
    width: 100%;
    height: 300px;
    margin: -35px 0;
    [class*="ymaps-2"][class*="-ground-pane"] {
      filter: url("data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\'><filter id=\\'grayscale\\'><feColorMatrix type=\\'matrix\\' values=\\'0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0\\'/></filter></svg>#grayscale");
      /* Firefox 3.5+ */
      -webkit-filter: grayscale(100%);
      /* Chrome 19+ & Safari 6+ */
    }
  }
`;

const PharmaciesSearchConteiner = styled.div`
  @import "variables";
  position: absolute;
  left: 28px;
  top: 60px;
  @include respond-to(small) {
    position: inherit;
    left: 0;
    top: 0;
  }
`;
