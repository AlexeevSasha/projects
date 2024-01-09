import React, { FC } from "react";

import { styled } from "../../../../../../common/styles/styled";
import {
  IRegisterFilterFieldsFilterGroup,
  IRegisterFilterFieldsFilterGroupItem,
} from "../../../../../../common/interfaces/register/IRegisterFilterFields";
import { Control, useController } from "react-hook-form";
import { FieldItem } from "./FieldItem";
import { theme } from "../../../../../../common/styles/theme";

interface IProps {
  field: IRegisterFilterFieldsFilterGroup;
  index: number;
  control: Control<{ filterGroups: IRegisterFilterFieldsFilterGroup[] }>;
}

export const FormItem: FC<IProps> = ({ field, control, index }: IProps) => {
  const { field: filterGroup } = useController({
    control,
    name: `filterGroups.${index}`,
    defaultValue: field,
  });

  return (
    <SubForm>
      <Title>{filterGroup.value.displayGroup}</Title>
      {filterGroup.value.items?.map((item: IRegisterFilterFieldsFilterGroupItem, i: number) => (
        <FieldItem key={i} control={control} index={i} item={item} parentIndex={index} field={field} />
      ))}
    </SubForm>
  );
};

const SubForm = styled.div`
  border: 1px solid ${theme.colors.lightGreen};
  border-radius: 5px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  margin: 10px 0;
  width: 49%;
`;
const Title = styled.h3``;
