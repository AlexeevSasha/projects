import styled from "astroturf/react";
import { ListOfCategoryButtons } from "../../../common/components/listOfCategoryButtons/ListOfCategoryButtons";
import { abbreviationAlphabet } from "../utils/alphabetArray";
import { LetterAlphabet } from "./LetterAlphabet";
import { useResize } from "../../../common/hooks/useResize";
import { useState } from "react";
import { AlphabetT } from "../interfaces/metaCatalogue";
import { AlphabetLink } from "./AlphabetLink";
import { CategoryButtonT } from "../../../common/interfaces/categoryButton";

type Props = {
  category: CategoryButtonT[];
};

export const AlphabeticalLink = ({ category }: Props) => {
  const { width } = useResize();
  const [activeAlphabet, setActiveAlphabet] = useState<AlphabetT>("ru");

  return (
    <Container>
      <Title>Поиск по алфавиту</Title>
      {category?.length ? <ListOfCategoryButtons categoriesList={category} bg={"blue"} /> : null}
      <ContainerContent>
        {width > 768 ? (
          <>
            <ContainerAlphabet>
              <AlphabetLink type={"ru"} />
            </ContainerAlphabet>
            <ContainerAlphabet>
              <AlphabetLink type={"en"} />
            </ContainerAlphabet>
            <ContainerAlphabet>
              <AlphabetLink type={"number"} />
            </ContainerAlphabet>
          </>
        ) : (
          <ContainerAlphabet>
            <AlphabetLink type={activeAlphabet} />
            {Object.entries(abbreviationAlphabet).map(([key, value]) =>
              key !== activeAlphabet ? (
                <LetterAbbreviation onClick={() => setActiveAlphabet(key as AlphabetT)} key={value}>
                  {value}
                </LetterAbbreviation>
              ) : null
            )}
          </ContainerAlphabet>
        )}
      </ContainerContent>
    </Container>
  );
};

const Container = styled.div`
  @import "variables";

  display: grid;
  grid-template-columns: minmax(300px, 1fr);
  grid-row-gap: 20px;
  color: $black;

  @include respond-to(small) {
    grid-row-gap: 12px;
  }
`;

const Title = styled.div`
  @import "variables";

  font-weight: 600;
  font-size: 24px;
  line-height: 137%;
  margin: 0;

  @include respond-to(small) {
    font-size: 18px;
  }
`;

const LetterAbbreviation = styled(LetterAlphabet)`
  width: 74px;
  border-radius: 28px;
`;

const ContainerContent = styled.div`
  @import "variables";

  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 8px;
`;

const ContainerAlphabet = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 4px;
`;
