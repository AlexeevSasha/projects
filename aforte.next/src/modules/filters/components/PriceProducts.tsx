import styled from "astroturf/react";
import { ChangeEvent, KeyboardEvent, useCallback, useEffect, useState } from "react";
import { getMaxPrice, getMinPrice } from "../utils/getMaxMinPrice";
import { TitleFilter } from "./TitleFilter";
import { RangeSlider } from "./RangeSlider";

type Props = {
  max: number;
  min: number;
  title: string;
  getValuesPrice: (v: object) => void;
  query: { minPrice?: string | string[]; maxPrice?: string | string[] };
};

export const PriceProducts = ({ min, max, title, getValuesPrice, query }: Props) => {
  const [rangeFrom, setRangeFrom] = useState<number | undefined>(undefined);
  const [rangeBefore, setRangeBefore] = useState<number | undefined>(undefined);
  const [from, setFrom] = useState<number>(min);
  const [before, setBefore] = useState<number>(max);

  const getValues = useCallback(
    (minV: number, maxV: number) =>
      getValuesPrice({
        minPrice: min === minV ? [] : minV,
        maxPrice: max === maxV ? [] : maxV,
      }),
    []
  );

  const onChange = (min: number, max: number) => {
    setFrom(min);
    setBefore(max);
    setRangeFrom(min);
    setRangeBefore(max);
  };

  useEffect(() => {
    const minV = query.minPrice ? +query.minPrice : min;
    const maxV = query.maxPrice ? +query.maxPrice : max;
    onChange(minV, maxV);
  }, [min, max, query.maxPrice, query.minPrice]);

  const onChangeFrom = (e: ChangeEvent<HTMLInputElement>) => {
    if (isNaN(+e.target.value) || e.target.value.includes(".")) return;
    setFrom(+e.target.value.trim());
  };
  const onChangeBefore = (e: ChangeEvent<HTMLInputElement>) => {
    if (isNaN(+e.target.value) || e.target.value.includes(".")) return;
    setBefore(+e.target.value.trim());
  };

  const onBlurFrom = (e: ChangeEvent<HTMLInputElement>) => {
    const value = getMaxPrice(min, before - 1, +e.target.value);
    setFrom(value);
    setRangeFrom(value);
    getValues(value, before);
  };
  const onKeyDownFrom = (e: KeyboardEvent) => {
    if (e.key == "Enter") {
      const value = getMaxPrice(min, before - 1, +(e.target as HTMLInputElement).value);
      setFrom(value);
      setRangeFrom(value);
      getValues(value, before);
    }
  };
  const onBlurBefore = (e: ChangeEvent<HTMLInputElement>) => {
    const value = getMinPrice(max, from + 1, +e.target.value);
    setBefore(value);
    setRangeBefore(value);
    getValues(from, value);
  };
  const onKeyDownBefore = (e: KeyboardEvent) => {
    if (e.key == "Enter") {
      const value = getMinPrice(max, from + 1, +(e.target as HTMLInputElement).value);
      setBefore(value);
      setRangeBefore(value);
      getValues(from, value);
    }
  };

  return (
    <Container>
      <TitleFilter>{title}</TitleFilter>
      <Price>
        <InputContainer>
          <span>от</span>
          <Input
            onKeyDown={onKeyDownFrom}
            onBlur={onBlurFrom}
            onChange={onChangeFrom}
            value={from}
            style={{ width: `${String(from).length + 1}ch` }}
            aria-label="price"
          />
          руб
        </InputContainer>
        <InputContainer>
          <span>от</span>
          <Input
            onKeyDown={onKeyDownBefore}
            onBlur={onBlurBefore}
            onChange={onChangeBefore}
            value={before}
            style={{ width: `${String(before).length + 1}ch` }}
            aria-label="price"
          />
          руб
        </InputContainer>
      </Price>
      <RangeSlider
        getValuesRange={getValues}
        beforeVal={rangeBefore}
        fromVal={rangeFrom}
        onChange={onChange}
        min={min}
        max={max}
      />
    </Container>
  );
};

const Container = styled.div`
  margin-bottom: 30px;
`;

const Price = styled.div`
  @import "variables";

  display: flex;
  margin: 16px 0 26px;

  div {
    max-width: 160px;
    width: 100%;
    border: 2px solid $border;
    border-radius: 12px;
    padding: 15px 16px;
    font-size: 14px;
    line-height: 137%;
    color: $black;

    span {
      color: rgba($black, 0.4);
    }
  }

  div:first-child {
    margin-right: 8px;
  }
`;

const InputContainer = styled.div`
  @import "variables";

  display: flex;
  max-width: 160px;
  border: 2px solid $border;
  border-radius: 12px;
  padding: 15px 16px;
  font-size: 14px;
  line-height: 137%;
  color: $black;
`;

const Input = styled.input`
  @import "variables";

  max-width: 80px;
  display: inline-block;
  border: none;
  outline: none;
  background: transparent;
  margin: 0 0 0 4px;
`;
