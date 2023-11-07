import { NextImage } from "../NextImage";
import { IconArraySmall } from "../icons/IconArraySmall";
import React, { useMemo, useState } from "react";
import styled from "astroturf/react";
import { CategoryT } from "../../../modules/categories/interfaces/category";
import { ChildrenCategoryMobileT } from "../../interfaces/header";
import { Button } from "../Button";

type Props = {
  categories: CategoryT[];
  handelNextCategory: ({ id, name, parent }: ChildrenCategoryMobileT) => void;
};

export const CatalogListMobileHeader = ({ categories, handelNextCategory }: Props) => {
  const [showAll, setShowAll] = useState(false);

  const renderCatalogList = useMemo(() => {
    setShowAll(categories.length > 8);
    return categories?.map((elem) => (
      <LinkCatalog
        isImage={!elem.parent}
        onClick={() =>
          elem.hasChildren &&
          handelNextCategory({
            id: elem.id,
            name: elem.name,
            parent: elem.parent,
          })
        }
        key={elem.id}
      >
        <ContainerTitle>
          {!elem.parent && (
            <ImageContainer>
              <NextImage src={elem.image} alt={elem.name} />
            </ImageContainer>
          )}
          <span>{elem.name}</span>
        </ContainerTitle>
        {elem.hasChildren ? <IconArraySmall size={"md"} rotate="-90deg" /> : <span />}
      </LinkCatalog>
    ));
  }, [categories]);

  return (
    <ContainerCatalog>
      <Content showAll={showAll}> {renderCatalogList}</Content>
      {showAll ? (
        <CustomButton onClick={() => setShowAll(false)} typeBtn={"lightBlue"}>
          Все товары категории
        </CustomButton>
      ) : null}
    </ContainerCatalog>
  );
};

const Content = styled.div<{ showAll?: boolean }>`
  @import "variables";

  height: fit-content;
  overflow: hidden;

  & > div:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  & > div:first-child {
    padding-top: 0;
  }

  &.showAll {
    & > div:nth-child(n + 9) {
      display: none;
    }
  }
`;

const ContainerCatalog = styled.div`
  @import "variables";

  height: fit-content;
  background: $white;
  border-radius: 28px;
  padding: 20px 16px;
  margin-bottom: 8px;
`;

const ContainerTitle = styled.div`
  display: flex;
  align-items: center;

  & > div {
    margin-right: 10px;
  }
`;

const LinkCatalog = styled.div<{ isImage?: boolean }>`
  @import "variables";

  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 20px 4px 20px;
  grid-column-gap: 56px;
  border-bottom: 1px solid $blue-2;

  font-weight: 600;
  font-size: 14px;

  @include transition();

  &.isImage {
    padding: 10px 4px 10px;
  }
`;

const ImageContainer = styled.div`
  width: 32px;
  height: 32px;
`;

const CustomButton = styled(Button)`
  margin-top: 8px;
  padding: 17px;
  width: 100%;
`;
