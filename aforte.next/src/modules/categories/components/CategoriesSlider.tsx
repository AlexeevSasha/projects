import styled from "astroturf/react";
import { CustomSwiper } from "../../slider/components/CustomSwiper";
import React from "react";
import { CategoryT } from "../interfaces/category";
import { CategoryCardSmall } from "./CategoryCardSmall";
import { CategoryCardBig } from "./CategoryCardBig";
import Link from "next/link";
import { MobileMenuOfCategories } from "./MobileMenuOfCategories";

type Props = {
  categoriesList: CategoryT[];
  type: "sm" | "md" | "lg";
};

export const CategoriesSwiper = ({ categoriesList, type }: Props) => {
  switch (type) {
    // Карусель категорий с картинкой и заголовком в линию (пример на странице каталога)
    case "sm": {
      return (
        <>
          <ContainerSwiper>
            <CustomSwiper
              sliderSettings={{ padding: true, desktopSB: 12 }}
              arrowSettings={{ size: "sm" }}
              items={categoriesList}
              id={"category-slider"}
            >
              {(param) => (
                <Link href={`/catalog/${param.id}`}>
                  <CategoryCardSmall style={{ width: 322 }} {...param} />
                </Link>
              )}
            </CustomSwiper>
          </ContainerSwiper>
          <ContainerMobile>
            <MobileMenuOfCategories categoriesList={categoriesList} withButtonShowMore />
          </ContainerMobile>
        </>
      );
    }
    // Карусель категорий с картинкой и текстом в столбик (пример на главной странице)
    case "md": {
      return (
        <>
          <ContainerSwiper>
            <CustomSwiper
              sliderSettings={{ padding: true, desktopSB: 12, mobileSB: 0 }}
              items={categoriesList}
              id={"category-slider"}
            >
              {(param) => (
                <Link href={`/catalog/${param.id}`}>
                  <CategoryCardBig style={{ width: 256 }} {...param} />
                </Link>
              )}
            </CustomSwiper>
          </ContainerSwiper>
          <ContainerMobile>
            {categoriesList.map((el) => (
              <Link key={el.id} href={`/catalog/${el.id}`}>
                <CategoryCardSmall {...el} />
              </Link>
            ))}
          </ContainerMobile>
        </>
      );
    }
    default: {
      console.log("нет карусели для категории с типом: ", type);
      return null;
    }
  }
};

export const ContainerSwiper = styled.div`
  @import "variables";

  @include respond-to(small) {
    display: none;
  }
`;

const ContainerMobile = styled.div`
  @import "variables";

  display: none;
  background: $white;
  border-radius: 28px;
  @include respond-to(small) {
    display: block;
  }
  & > div:last-child {
    border: none;
    margin: 0;
  }
`;
