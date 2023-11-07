import { Articles } from "./Articles";
import styled from "astroturf/react";
import { Pagination } from "../../../common/components/Pagination";
import { Button } from "../../../common/components/Button";
import { ArticleT } from "../interfaces/article";

type Props = {
  articles: ArticleT[];
};

export const ArticlesGrid = ({ articles }: Props) => {
  return (
    <div>
      <ContainerContent>
        {articles.map((el) => (
          <Articles.ArticleCard key={el.id} {...el} />
        ))}
      </ContainerContent>
      <Pagination total={6} onChange={() => {}} />
      <CustomButton typeBtn={"blue"}>Больше статей</CustomButton>
    </div>
  );
};

const ContainerContent = styled.div`
  @import "variables";

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 24px;
  margin-bottom: 24px;
  height: 100%;

  @include respond-to(small) {
    grid-template-columns: repeat(2, minmax(160px, 1fr));
    grid-column-gap: 8px;
    grid-row-gap: 12px;
  }
`;

const CustomButton = styled(Button)`
  @import "variables";

  width: 100%;
  padding: 17px;
  display: none;

  @include respond-to(small) {
    display: block;
  }
`;
