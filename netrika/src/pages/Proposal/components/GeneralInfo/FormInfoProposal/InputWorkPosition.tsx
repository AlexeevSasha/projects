import { IOrder } from "common/interfaces/order/IOrder";
import React, { useState } from "react";
import { IconCross } from "common/components/Icon/IconCross";
import { IconEdit } from "common/components/Icon/IconEdit";
import { IconSave } from "common/components/Icon/IconSave";
import { ru } from "common/lang/ru";
import { ICustomSelect } from "../../../../../common/interfaces/ISelect";
import { IconContainerFloatingmes } from "common/components/Table/UIcomponent/UIcomponent";
import { Access } from "../../../helpers/access";
import { CustomSelectContainer, InputContainer, SelectContainer, Title } from "./styledInputs";
import { CustomSelect } from "../../../../../common/ui/Select/CustomSelect";

interface IProps {
  access: Access;
  saveProposal: (value: IOrder) => void;
  info: IOrder;
  options: ICustomSelect[];
  disabled: boolean;
  clickEdit: (value: string) => void;
}

export const InputWorkPosition = React.memo(({ access, saveProposal, info, options, disabled, clickEdit }: IProps) => {
  const defValue = info.userWorkPosition.map((item) => {
    return {
      value: item.id,
      label: item.name,
    };
  });
  const [value, setValue] = useState<ICustomSelect[]>(defValue || ([] as ICustomSelect[]));
  const [cloneValue, setCloneValue] = useState<ICustomSelect[]>(defValue || ([] as ICustomSelect[]));

  const onClickIconEdit = () => {
    clickEdit("workPosition");
    setCloneValue(value);
  };
  const onClickIconCross = () => {
    clickEdit("");
    setValue(cloneValue);
    setCloneValue([] as ICustomSelect[]);
  };
  const selectWorkPosition = (event: ICustomSelect[]) => {
    setValue(event);
  };

  const onSave = () => {
    clickEdit("");
    saveProposal({
      ...info,
      userWorkPosition: value.map((item) => {
        return { id: Number(item.value), name: item.label };
      }),
    });
  };

  return (
    <InputContainer>
      <Title>Должность пользователей</Title>
      <SelectContainer id={"workPosition"}>
        <CustomSelectContainer>
          <CustomSelect
            htmlID={"work_position"}
            isSearchable
            isMulti
            SelectValue={value}
            options={options}
            onChange={selectWorkPosition}
            isDisabled={disabled}
          />
        </CustomSelectContainer>

        {access === Access.Edit ? (
          disabled ? (
            <IconContainerFloatingmes title={ru.floatingmes.edit} id={"edit_work_position"} onClick={onClickIconEdit}>
              <IconEdit />
            </IconContainerFloatingmes>
          ) : (
            <>
              <IconContainerFloatingmes title={ru.floatingmes.save} id={"save_work_position"} onClick={onSave}>
                <IconSave />
              </IconContainerFloatingmes>
              <IconContainerFloatingmes
                title={ru.floatingmes.cancel}
                id={"close_edit_work_position"}
                onClick={onClickIconCross}
              >
                <IconCross hideFloatingmes />
              </IconContainerFloatingmes>
            </>
          )
        ) : (
          <></>
        )}
      </SelectContainer>
    </InputContainer>
  );
});
