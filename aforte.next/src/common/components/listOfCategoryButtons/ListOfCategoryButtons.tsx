import { CustomSwiper } from "../../../modules/slider/components/CustomSwiper";
import { ButtonOfCategory } from "./ButtonOfCategory";
import { CategoryButtonT } from "../../interfaces/categoryButton";

type Props = {
  categoriesList: CategoryButtonT[];
  bg?: "blue";
};

export const ListOfCategoryButtons = ({ categoriesList, bg }: Props) => {
  return (
    <CustomSwiper<CategoryButtonT>
      sliderSettings={{ desktopSB: 8, mobileSB: 8 }}
      arrowSettings={{ hidden: true }}
      id={"article-tags"}
      items={categoriesList}
    >
      {(param) => <ButtonOfCategory bg={bg} {...param} />}
    </CustomSwiper>
  );
};
