import { IOrder } from "common/interfaces/order/IOrder";
import React, { useEffect, useState } from "react";
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

export const InputGroup = React.memo(({ access, saveProposal, info, options, disabled, clickEdit }: IProps) => {
  const defValue = options.find((item) => item.value === info.idRegisterGroup.toString()) as ICustomSelect;
  const [value, setValue] = useState<ICustomSelect>(defValue || ({} as ICustomSelect));
  const [cloneValue, setCloneValue] = useState<ICustomSelect>(defValue || ({} as ICustomSelect));

  useEffect(() => {
    setValue(defValue);
  }, [defValue]);

  const onClickIconEdit = () => {
    clickEdit("group");
    setCloneValue(value);
  };

  const onClickIconCross = () => {
    clickEdit("");
    setValue(cloneValue);
    setCloneValue({} as ICustomSelect);
  };

  const onSave = () => {
    clickEdit("");
    saveProposal({ ...info, idRegisterGroup: Number(value.value) });
  };

  return (
    <InputContainer>
      <Title>Группа регистра</Title>
      <SelectContainer id={"group"}>
        <CustomSelectContainer>
          <CustomSelect
            htmlID={"group_register"}
            SelectValue={value}
            options={options}
            onChange={(value: ICustomSelect) => setValue(value)}
            isDisabled={disabled}
          />
        </CustomSelectContainer>

        {access === Access.Edit ? (
          disabled ? (
            <IconContainerFloatingmes title={ru.floatingmes.edit} id={"edit_group"} onClick={onClickIconEdit}>
              <IconEdit />
            </IconContainerFloatingmes>
          ) : (
            <>
              <IconContainerFloatingmes title={ru.floatingmes.save} id={"save_group"} onClick={onSave}>
                <IconSave />
              </IconContainerFloatingmes>
              <IconContainerFloatingmes
                title={ru.floatingmes.cancel}
                id={"close_edit_group"}
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
