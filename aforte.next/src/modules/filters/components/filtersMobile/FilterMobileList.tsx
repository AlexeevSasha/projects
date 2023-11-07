import { MultiFilterT } from "../../interfaces/filters";
import { ChangeEvent, useMemo, useState } from "react";
import { getSearchArray } from "../../utils/getSearchArray";
import { Input } from "../../../../common/components/inputs/Input";
import { Checkbox } from "../../../../common/components/inputs/Checkbox";
import styled from "astroturf/react";
import { Button } from "../../../../common/components/Button";
import { getParamArray } from "../../utils/getParamArray";
import { useRouter } from "next/router";

type Props = {
  filters: MultiFilterT[];
  alias: string;
  id: string;
  onClick: () => void;
};

export const FilterMobileList = ({ filters, id, onClick, alias }: Props) => {
  const router = useRouter();

  const valuesFilter: string[] = useMemo(
    () => getParamArray(router.query[alias]),
    [router.query[alias]]
  );

  const [search, setSearch] = useState("");
  const filtersArray = useMemo(() => getSearchArray(filters, 20, search), [filters, search]);

  const onChange = (e: ChangeEvent<HTMLInputElement>, name: string) => {
    if (e.target.checked) valuesFilter.push(name);
    else {
      const index = valuesFilter.indexOf(name);
      valuesFilter.splice(index, 1);
    }

    router.push({
      query: { ...router.query, [alias]: valuesFilter },
    });
  };

  return (
    <ContainerFilter>
      <Input type="search" placeholder="Найти" onChange={(e) => setSearch(e.target.value)} />
      <Content>
        {filtersArray.map((el) => {
          const checked = valuesFilter.includes(el.name);
          return (
            <Container key={el.id}>
              <Checkbox
                onChange={(e) => onChange(e, el.name)}
                checked={checked}
                label={el.name}
                id={`${id}-${el.id}`}
              />
            </Container>
          );
        })}
        {search && !filtersArray.length && <NotFount>Ничего не найдено!</NotFount>}
      </Content>
      <CustomButton onClick={onClick} typeBtn={"blue"}>
        Применить
      </CustomButton>
    </ContainerFilter>
  );
};

const Container = styled.div`
  padding: 16px 0;
`;

const ContainerFilter = styled.div`
  display: grid;
  grid-row-gap: 16px;
  label {
    font-weight: 600;
  }
`;

const Content = styled.div`
  @import "variables";

  max-height: 350px;
  overflow-y: auto;
  & > div:not(:last-child) {
    border-bottom: 1px solid $blue-2;
  }
`;

const CustomButton = styled(Button)`
  width: 100%;
  padding: 17px;
`;

const NotFount = styled.div`
  @import "variables";

  color: $black;
  margin-bottom: 16px;
`;
