import { getPharmacies, getPharmaciesFavourites, getPharmaciesStory } from "api/pharmaciesApi";
import styled from "astroturf/react";
import { AppContext } from "common/components/ContextProvider";
import { getPharmaciesLayout } from "common/components/layout/PharmaciesLayout";
import { PharmacieInfoModal } from "common/components/pharmacies/PharmacieInfoModal";
import { PharmaciesMapObjectManager } from "common/components/pharmacies/PharmaciesMapObjectManager";
import { PharmaciesSeacrch } from "common/components/pharmacies/PharmaciesSeacrch";
import { useResize } from "common/hooks/useResize";
import { ModalNames } from "common/interfaces/modal";
import { PharmaciesT } from "modules/profile/interfaces/pharmacies";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect, useMemo, useState } from "react";
import { Button } from "../../../common/components/Button";
import { getInitialData } from "common/hooks/useInitialData";

type Props = {
  pharmacies: PharmaciesT[];
  favourites: PharmaciesT[];
  story: PharmaciesT[];
};

export default function PharmaciesPage({ pharmacies, favourites, story }: Props) {
  const [btn, setBtn] = useState<"favourites" | "story" | null>(null);
  const [pharmaciesData, setPharmaciesData] = useState<PharmaciesT[]>(pharmacies);
  const [searchFilters, setSearchFilters] = useState<string[]>([]);
  const [objectId, setObjectId] = useState<string>("");
  const { openModal } = useContext(AppContext);

  const { width } = useResize();
  const router = useRouter();

  useEffect(() => {
    if (objectId) {
      if (width > 768) {
        router.push(`pharmacies/${objectId}`);
      } else {
        const clickObject = pharmacies.find((el) => el.id === objectId);
        clickObject &&
          openModal(ModalNames.POPUP_MODAL, {
            children: <PharmacieInfoModal pharmacie={clickObject} />,
          });
      }
    }
  }, [objectId]);

  useEffect(() => {
    if (btn === "favourites") {
      setPharmaciesData(favourites);
    } else if (btn === "story") {
      setPharmaciesData(story);
    } else {
      setPharmaciesData(pharmacies);
    }
  }, [btn]);

  const filterSorting = (filters: string[], pharmacies: PharmaciesT[]) => {
    if (!filters.length) {
      return pharmacies;
    } else {
      const newData = filters.map((elemem) =>
        pharmacies.filter((pharmacie) =>
          pharmacie.address.toUpperCase().includes(elemem.toUpperCase())
        )
      );
      return Array.from(new Map(newData.flat().map((item) => [item["id"], item])).values());
    }
  };

  const searchPharmacies = useMemo(
    () => filterSorting(searchFilters, pharmaciesData),
    [searchFilters, pharmaciesData]
  );

  return (
    <CustomContainer>
      <MobileMapWrapper>
        <PharmaciesMapObjectManager
          pharmacies={searchPharmacies}
          favourites={favourites}
          setObjectId={setObjectId}
        />
      </MobileMapWrapper>
      <PharmaciesSearchConteiner>
        <PharmaciesSeacrch
          pharmacies={searchPharmacies}
          setSearchFilters={setSearchFilters}
          filters={searchFilters}
          btnValue={btn}
          setBtn={setBtn}
        />
      </PharmaciesSearchConteiner>
      <PharmaciesTopFilters>
        <FilterBtn
          active={btn === "favourites"}
          onClick={() => setBtn((prev) => (prev === "favourites" ? null : "favourites"))}
        >
          Мои аптеки ({favourites.length})
        </FilterBtn>
        <FilterBtn
          active={btn === "story"}
          onClick={() => setBtn((prev) => (prev === "story" ? null : "story"))}
        >
          Аптеки из истории заказов ({story.length})
        </FilterBtn>
      </PharmaciesTopFilters>
    </CustomContainer>
  );
}

PharmaciesPage.getLayout = getPharmaciesLayout;

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
  height: 750px;
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
  height: 750px;
  @include respond-to(small) {
    display: block;
    width: 100%;
    height: 310px;
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
const PharmaciesTopFilters = styled.div`
  @import "variables";
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 60px;
  right: 28px;
  @include respond-to(small) {
    justify-content: space-between;
    width: 100%;
    right: 0;
    top: 40px;
  }
`;
const FilterBtn = styled(Button)<{ active: boolean }>`
  @import "variables";
  padding: 12px 20px;
  font-weight: 600;
  font-size: 13px;
  line-height: 137%;
  border-radius: 26px;
  background: $white;
  box-shadow: 4px 4px 12px rgba(69, 98, 138, 0.16);
  &:first-child {
    margin-right: 8px;
  }
  &:hover {
    box-shadow: 0px 4px 16px rgba(19, 51, 103, 0.08);
  }
  &.active {
    background: $blue1;
    color: $white;
    &:hover {
      background: $blue2;
    }
  }
  @include respond-to(small) {
    padding: 9px 14px;
    font-weight: 500;
    line-height: 100%;
    &:first-child {
      margin-right: 0px;
    }
  }
`;
