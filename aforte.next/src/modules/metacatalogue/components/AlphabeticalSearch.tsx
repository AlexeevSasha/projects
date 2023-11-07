import styled from "astroturf/react";
import { ListOfCategoryButtons } from "../../../common/components/listOfCategoryButtons/ListOfCategoryButtons";
import { Alphabet } from "./Alphabet";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { InputStyle } from "../../../common/components/inputs/Input";
import { abbreviationAlphabet, getKeyValueAlphabet } from "../utils/alphabetArray";
import { LetterAlphabet } from "./LetterAlphabet";
import { useResize } from "../../../common/hooks/useResize";
import { AlphabetT } from "../interfaces/metaCatalogue";
import { useDebounce } from "../../../common/hooks/useDebounce";
import { useRouter } from "next/router";
import { CategoryButtonT } from "../../../common/interfaces/categoryButton";
import { IconSearch } from "../../../common/components/icons/IconSearch";

type Props = {
  category: CategoryButtonT[];
};

export const AlphabeticalSearch = ({ category }: Props) => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const [activeLetter, setActiveLetter] = useState(
    getKeyValueAlphabet(router.query.content as string)?.letter || ""
  );
  const [activeAlphabet, setActiveAlphabet] = useState<AlphabetT>(
    getKeyValueAlphabet(router.query.content as string)?.alphabet || "ru"
  );

  const text = useDebounce(search, 300);
  const { width } = useResize();

  useEffect(() => {
    const search = getKeyValueAlphabet(text);
    search.letter && setActiveLetter(search.letter);
    search.alphabet && setActiveAlphabet(search.alphabet);
  }, [text]);

  const onClickActiveAlphabet = useCallback((key: string) => {
    setActiveLetter("");
    setActiveAlphabet(key as AlphabetT);
  }, []);

  const onClickActiveLetter = useCallback(
    (value: string) => {
      setActiveLetter(value);
      search && setSearch("");
    },
    [search]
  );

  return (
    <Container>
      {category?.length ? <ListOfCategoryButtons categoriesList={category} bg={"blue"} /> : null}
      <ContainerContent>
        {width > 768 ? (
          <>
            <ContainerAlphabet>
              <Alphabet type={"ru"} setActiveLetter={onClickActiveLetter} active={activeLetter} />
            </ContainerAlphabet>
            <ContainerAlphabet>
              <Alphabet type={"en"} setActiveLetter={onClickActiveLetter} active={activeLetter} />
            </ContainerAlphabet>
            <ContainerAlphabet>
              <Alphabet
                type={"number"}
                setActiveLetter={onClickActiveLetter}
                active={activeLetter}
              />
            </ContainerAlphabet>
          </>
        ) : (
          <ContainerAlphabet>
            <Alphabet
              type={activeAlphabet}
              setActiveLetter={onClickActiveLetter}
              active={activeLetter}
            />
            {Object.entries(abbreviationAlphabet).map(([key, value]) =>
              key !== activeAlphabet ? (
                <LetterAbbreviation onClick={() => onClickActiveAlphabet(key)} key={value}>
                  {value}
                </LetterAbbreviation>
              ) : null
            )}
          </ContainerAlphabet>
        )}
      </ContainerContent>
      <InputContainer>
        <ContainerIcon>
          <IconSearch />
        </ContainerIcon>
        <CustomInput
          value={search}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          type={"search"}
          placeholder={"Найти лекарство"}
        />
      </InputContainer>
    </Container>
  );
};

const LetterAbbreviation = styled(LetterAlphabet)`
  width: 74px;
  border-radius: 28px;
`;

const Container = styled.div`
  @import "variables";

  display: grid;
  grid-template-columns: minmax(300px, 1fr);
  grid-row-gap: 16px;

  color: $black;
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

const InputContainer = styled.div`
  position: relative;
`;

const ContainerIcon = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 14px;
  display: flex;
`;

const CustomInput = styled(InputStyle)`
  @import "variables";

  padding: 14px 14px 14px 45px;
  border: none;

  /* Chrome, Firefox, Opera, Safari 10.1+ */
  &::placeholder {
    color: $blue-1;
    opacity: 1; /* Firefox */
  }

  /* Internet Explorer 10-11 */
  &:-ms-input-placeholder {
    color: $blue-1;
  }

  /* Microsoft Edge */
  &::-ms-input-placeholder {
    color: $blue-1;
  }

  @include respond-to(small) {
    padding: 11px 45px;
  }
`;
