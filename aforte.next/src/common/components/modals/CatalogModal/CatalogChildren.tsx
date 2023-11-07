import { IconArraySmall } from "../../icons/IconArraySmall";
import React, { useState } from "react";
import styled from "astroturf/react";
import { CategoryT } from "../../../../modules/categories/interfaces/category";

type Props = {
  id: string;
  position: number;
  activeCategory: { id: string; title: string }[];
  getCategories: (id: string, inx: number, name: string) => void;
  categories: { [p: string]: CategoryT[] };
};

export const CatalogChildren = ({
  id,
  getCategories,
  activeCategory,
  position,
  categories,
}: Props) => {
  const [showAll, setShowAll] = useState(categories[id].length > 8);

  return (
    <ChildrenCategories showAll={showAll}>
      <Title>{activeCategory[position]?.title}</Title>
      {categories[id]?.map((elem) => {
        const active = !!activeCategory.find((el) => el.id === elem.id);
        return (
          <LinkChildren
            key={elem.id}
            active={active}
            onClick={() => {
              elem.hasChildren && getCategories(elem.id, position, elem.name);
            }}
          >
            <span>{elem.name}</span>
            {elem.hasChildren ? <IconArraySmall size={"md"} rotate="-90deg" /> : <span />}
          </LinkChildren>
        );
      })}
      {showAll ? <More onClick={() => setShowAll(false)}>Все товары категории</More> : null}
    </ChildrenCategories>
  );
};

const ChildrenCategories = styled.div<{ showAll: boolean }>`
  @import "variables";

  @include transition();

  display: flex;
  flex-direction: column;
  height: 600px;
  overflow-y: auto;
  border-left: 1px solid $blue-2;
  margin: 0 20px;
  padding: 0 24px 20px 24px;

  &.showAll {
    & > div:nth-child(n + 10) {
      display: none;
    }
  }
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 18px;
  margin: 0 0 16px 0;
`;

const LinkChildren = styled.div<{ active?: boolean }>`
  @import "variables";

  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 10px 0;
  margin-bottom: 4px;
  grid-column-gap: 56px;

  font-weight: 600;
  font-size: 14px;
  @include transition();

  svg {
    opacity: 0;
  }

  &.active {
    pointer-events: none;
    color: $blue1;
    svg {
      opacity: 1;
    }
  }

  &:hover {
    svg {
      opacity: 1;
    }
    color: $blue1;
  }
`;

const More = styled.button`
  @import "variables";

  text-align: left;
  padding: 0;
  cursor: pointer;
  color: $blue1;
  background: transparent;
  border: none;
  margin-top: 20px;
  width: 100%;
  font-weight: 600;
  font-size: 14px;
  line-height: 137%;
`;
