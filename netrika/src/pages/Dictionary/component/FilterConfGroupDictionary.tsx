import { IconFilter } from "../../../common/components/Icon/IconFilter";
import { CustomSelect } from "../../../common/ui/Select/CustomSelect";
import React, { FC, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { ICustomSelect } from "../../../common/interfaces/ISelect";
import { useSelector } from "react-redux";
import { dictionaryConfGroupSelector } from "../../../module/dictionaryConfGroup/dictionaryConfGroupSelector";
import { IConfGroupDictionary } from "../../../common/interfaces/dictionary/IConfGroupDictionary";

const notSelected: ICustomSelect = { value: "", label: "Показать всё" };

const getOptions = (data: IConfGroupDictionary[], setOptions: Function, first: boolean, setFirst: Function) => {
  if (data && first) {
    const mySet = new Set(data?.map((el) => el.confBlockName).sort());
    setFirst(false);
    setOptions([notSelected, ...Array.from(mySet).map((el) => ({ value: el, label: el }))]);
  } else {
    setOptions((prev: ICustomSelect) => prev);
  }
};

interface IProps {
  filterText: (str: string) => void;
}

export const FilterConfGroupDictionary: FC<IProps> = ({ filterText }) => {
  const state = useSelector(dictionaryConfGroupSelector);
  const [value, setValue] = useState(notSelected);
  const [first, setFirst] = useState(true);
  const [options, setOptions] = useState([notSelected]);

  useEffect(() => {
    getOptions(state.data.items, setOptions, first, setFirst);

    // eslint-disable-next-line
  }, [state.data.items]);

  const onChangeFilter = useCallback(
    (value: ICustomSelect) => {
      setValue(value);
      filterText(String(value.value));
    },
    [filterText]
  );

  return (
    <Container>
      Название блока <IconFilter />
      <CustomSelect
        htmlID={"nsi_nsiDictionaryFilter"}
        isSearchable
        SelectValue={value}
        options={options}
        onChange={onChangeFilter}
      />
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 115px 16px 300px;
  align-items: center;
  gap: 10px;
`;
