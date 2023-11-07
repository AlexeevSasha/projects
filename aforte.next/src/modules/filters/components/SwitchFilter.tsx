import { Switch } from "../../../common/components/inputs/Switch";
import styled from "astroturf/react";
import { ChangeEvent, useState } from "react";

type Props = {
  id: string;
  title: string;
  alias: string;
  getValue: (v: object) => void;
  query?: string | string[];
};

export const SwitchFilter = ({ id, title, getValue, alias, query }: Props) => {
  const [checked, setChecked] = useState(!!query);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    getValue({ [alias]: e.target.checked });
  };

  return (
    <Container>
      <label htmlFor={id}>{title}</label>
      <Switch checked={checked} onChange={(e) => onChange(e)} id={id} />
    </Container>
  );
};

const Container = styled.div`
  @import "variables";

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;

  label {
    font-weight: 600;
    font-size: 16px;
    line-height: 137%;
    color: $black;
  }
`;
