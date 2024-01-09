import { IconFilter } from "../../../common/components/Icon/IconFilter";
import { CustomSelect } from "../../../common/ui/Select/CustomSelect";
import React, { FC, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { ICustomSelect } from "../../../common/interfaces/ISelect";
import { IDisplayFieldItem } from "../../../common/interfaces/dictionary/IDictionaryDisplayField";
import { useSelector } from "react-redux";
import { dictionaryDisplayFieldSelector } from "../../../module/dictionaryDisplayField/dictionaryDisplayFieldSelector";

const notSelected: ICustomSelect = { value: "", label: "Показать всё" };

const getOptions = (data: IDisplayFieldItem[], setOptions: Function, first: boolean, setFirst: Function) => {
  if (data && first) {
    const mySet = new Set(data?.map((el) => el.bizObjName).sort());
    setFirst(false);
    setOptions([notSelected, ...Array.from(mySet).map((el) => ({ value: el, label: el }))]);
  } else {
    setOptions((prev: ICustomSelect) => prev);
  }
};

interface IProps {
  filterText: (str: string) => void;
}

export const FilterNsiDictionary: FC<IProps> = ({ filterText }) => {
  const state = useSelector(dictionaryDisplayFieldSelector);

  const [first, setFirst] = useState(true);
  const [value, setValue] = useState(notSelected);
  const [options, setOptions] = useState([notSelected]);

  useEffect(() => {
    getOptions(state.displayFieldList.items, setOptions, first, setFirst);

    // eslint-disable-next-line
  }, [state.displayFieldList.items]);

  const onChangeFilter = useCallback(
    (value: ICustomSelect) => {
      setValue(value);
      filterText(String(value.value));
    },
    [filterText]
  );

  return (
    <Container>
      Бизнес-объект <IconFilter />
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
  grid-template-columns: 105px 16px 300px;
  align-items: center;
  gap: 10px;
`;
