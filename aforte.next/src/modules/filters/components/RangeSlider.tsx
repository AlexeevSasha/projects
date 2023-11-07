import styled from "astroturf/react";
import { useRef, useState, useCallback, useEffect } from "react";
import { usePercentRange } from "../hooks/usePercentRange";

type Props = {
  min: number;
  max: number;
  fromVal?: number;
  beforeVal?: number;
  onChange: (min: number, max: number) => void;
  getValuesRange: (max: number, min: number) => void;
};

export const RangeSlider = ({ min, max, onChange, fromVal, beforeVal, getValuesRange }: Props) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const range = useRef<HTMLDivElement>(null);
  const getPercent = useCallback(
    (value: number) => Math.round(((Math.min(value, max) - min) / (max - min)) * 100),
    [min, max]
  );

  useEffect(() => {
    if (typeof fromVal === "number") setMinVal(fromVal);
    if (typeof beforeVal === "number") setMaxVal(beforeVal);
  }, [fromVal, beforeVal]);

  useEffect(() => {
    onChange(minVal, maxVal);
  }, [minVal, maxVal]);

  usePercentRange({
    getPercent,
    maxVal,
    minVal,
    ref: range,
  });

  return (
    <Container>
      <InputStyle
        id={"range-left"}
        style={{ zIndex: 3 }}
        value={minVal}
        min={min}
        max={max}
        type="range"
        aria-label="price"
        onMouseUp={() => {
          getValuesRange(minVal, maxVal);
        }}
        onChange={(event) => {
          const value = Math.min(Number(event.target.value), maxVal - 1);
          setMinVal(value);
        }}
      />
      <InputStyle
        id={"range-right"}
        style={{ zIndex: 4 }}
        value={maxVal}
        min={min}
        max={max}
        type="range"
        aria-label="price"
        onMouseUp={() => {
          getValuesRange(minVal, maxVal);
        }}
        onChange={(event) => {
          const value = Math.max(Number(event.target.value), minVal + 1);
          setMaxVal(value);
        }}
      />
      <Slider>
        <SliderTrack />
        <SliderRange ref={range} />
      </Slider>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InputStyle = styled.input`
  @import "variables";

  -webkit-appearance: none;
  -webkit-tap-highlight-color: transparent;
  pointer-events: none;
  position: absolute;
  height: 0;
  width: 100%;
  outline: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    background-color: $greenMain;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    height: 24px;
    width: 24px;
    margin-top: 4px;
    pointer-events: all;
    position: relative;
  }
`;

const Slider = styled.div`
  position: relative;
  width: 100%;
`;
const SliderTrack = styled.div`
  @import "variables";

  position: absolute;
  background-color: $blue-2;
  width: 100%;
  z-index: 1;
  border-radius: 3px;
  height: 2px;
`;

const SliderRange = styled.div`
  @import "variables";

  position: absolute;
  background-color: $greenMain;
  z-index: 2;
  height: 2px;
`;
