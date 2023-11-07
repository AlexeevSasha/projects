import styled from "astroturf/react";
import { Button } from "common/components/Button";
import Link from "next/link";
import { useState } from "react";
import { CategoryT } from "../interfaces/category";
import { CategoryCardSmall } from "./CategoryCardSmall";

type Props = {
  categoriesList: CategoryT[];
  withButtonShowMore?: boolean;
};

export const MobileMenuOfCategories = ({ categoriesList, withButtonShowMore }: Props) => {
  const [isShowAll, setIsShowAll] = useState(!withButtonShowMore);
  const toggleShowAll = () => setIsShowAll((prev) => !prev);

  return (
    <>
      <Content>
        {categoriesList.slice(0, isShowAll ? categoriesList.length : 4).map((el) => (
          <Link key={el.id} href={`/catalog/${el.id}`}>
            <CategoryCardSmall {...el} />
          </Link>
        ))}
      </Content>
      {withButtonShowMore ? (
        <div onClick={toggleShowAll} style={{ padding: "16px" }}>
          <CustomButton typeBtn={"lightBlue"}>
            {isShowAll ? "Скрыть" : "Посмотреть"} все категории
          </CustomButton>
        </div>
      ) : null}
    </>
  );
};

const Content = styled.div`
  & > div:last-child {
    border: none;
    margin: 0;
  }
`;

const CustomButton = styled(Button)`
  width: 100%;
  padding: 15px 0;
`;
