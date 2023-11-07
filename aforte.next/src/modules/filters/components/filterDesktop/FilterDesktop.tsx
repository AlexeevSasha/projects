import styled from "astroturf/react";
import { TitleFilter } from "../TitleFilter";
import { IconArraySmall } from "../../../../common/components/icons/IconArraySmall";
import { Checkbox } from "../../../../common/components/inputs/Checkbox";
import { ChangeEvent, useMemo, useState } from "react";
import { getSearchArray } from "../../utils/getSearchArray";
import { MultiFilterT } from "../../interfaces/filters";
import { Input } from "../../../../common/components/inputs/Input";
import { getParamArray } from "../../utils/getParamArray";

type Props = {
  id: string;
  isRadioInput?: boolean;
  title: string;
  alias: string;
  filters: MultiFilterT[];
  query?: string | string[];
  getValuesFilter: (v: object) => void;
};

export const FilterDesktop = ({
  id,
  isRadioInput,
  getValuesFilter,
  alias,
  title,
  query,
  filters,
}: Props) => {
  const valuesFilter: string[] = useMemo(() => getParamArray(query), [query]);

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(true);
  const [isShowAll, setIsShowAll] = useState(false);

  const toggleOpen = () => setOpen((prev) => !prev);
  const toggleShowAll = () => setIsShowAll((prev) => !prev);

  const filterArray = useMemo(
    () => getSearchArray(filters, isShowAll ? 20 : 4, search),
    [filters, isShowAll, search]
  );

  const onChange = (e: ChangeEvent<HTMLInputElement>, name: string) => {
    if (e.target.checked) valuesFilter.push(name);
    else {
      const index = valuesFilter.indexOf(name);
      valuesFilter.splice(index, 1);
    }
    getValuesFilter({ [alias]: valuesFilter });
  };

  return (
    <Container>
      <ContainerTitle>
        <TitleFilter>{title}</TitleFilter>
        <SvgWrapper onClick={toggleOpen}>
          <IconArraySmall />
        </SvgWrapper>
      </ContainerTitle>
      <Wrapper open={open}>
        <div>
          {isShowAll && (
            <Input
              type="search"
              placeholder="Найти"
              onChange={(e) => setSearch(e.target.value)}
              style={{ margin: "12px 0" }}
            />
          )}
          <Content>
            {filterArray.map((el) => {
              const checked = valuesFilter.includes(el.name);
              return (
                <Checkbox
                  checked={checked}
                  onChange={(e) => onChange(e, el.name)}
                  radio={isRadioInput}
                  key={el.id}
                  label={el.name}
                  id={`${id}-${el.id}`}
                />
              );
            })}
          </Content>
          {search && !filterArray.length && <NotFount>Ничего не найдено!</NotFount>}
          <ViewAll onClick={toggleShowAll}>{isShowAll ? "Свернуть" : "Посмотреть все"}</ViewAll>
        </div>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  @import "variables";

  position: relative;
  padding: 20px 0;
  border-bottom: 1px solid $blue-2;
`;

const NotFount = styled.div`
  @import "variables";

  color: $black;
  margin-bottom: 16px;
`;

const Wrapper = styled.div<{ open: boolean }>`
  height: 0;
  position: absolute;
  & > div {
    opacity: 0;
  }

  &.open {
    position: relative;
    height: fit-content;
    margin-top: 16px;
    & > div {
      opacity: 1;
    }
  }
`;

const Content = styled.div`
  @import "variables";

  margin-bottom: 16px;
  max-height: 270px;
  overflow-y: auto;
  & > div {
    margin-top: 16px;
  }

  & > div:first-child {
    margin: 0;
  }
`;

const ViewAll = styled.span`
  @import "variables";

  font-weight: 600;
  font-size: 16px;
  line-height: 137%;
  color: $blue1;
  cursor: pointer;
`;

const ContainerTitle = styled.div`
  @import "variables";

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SvgWrapper = styled.div`
  z-index: 2;
  cursor: pointer;
  height: 20px;
  svg {
    width: 20px;
    height: 20px;
  }
`;
