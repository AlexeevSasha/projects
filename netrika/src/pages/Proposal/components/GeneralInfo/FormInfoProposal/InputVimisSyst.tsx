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
import { IVimisSystem } from "../../../../../common/interfaces/IVimisSystem";

interface IProps {
  access: Access;
  saveProposal: (value: IOrder) => void;
  info: IOrder;
  options: ICustomSelect[];
  disabled: boolean;
  clickEdit: (value: string) => void;
}

export const InputVimisSyst = React.memo(({ access, saveProposal, info, options, disabled, clickEdit }: IProps) => {
  const defValue = info.vimisSystem?.map((item) => {
    return { value: item.id, label: item.name };
  });
  const [value, setValue] = useState<ICustomSelect[]>(defValue);
  const [cloneValue, setCloneValue] = useState<ICustomSelect[]>(defValue);

  const onClickIconEdit = () => {
    clickEdit("vimisSyst");
    setCloneValue(value);
  };
  const onClickIconCross = () => {
    clickEdit("");
    setValue(cloneValue);
    setCloneValue([] as ICustomSelect[]);
  };
  const selectUserGroup = (event: ICustomSelect[]) => {
    setValue(event);
  };

  const onSave = () => {
    clickEdit("");
    saveProposal({
      ...info,
      vimisSystem:
        value?.map((item) => {
          return { id: Number(item.value), name: item.label };
        }) || ([] as IVimisSystem[]),
    });
  };
  return (
    <InputContainer>
      <Title>ВИМИС</Title>

      <SelectContainer id={"vimisSyst"}>
        <CustomSelectContainer>
          <CustomSelect
            htmlID={"vimis_syst"}
            isSearchable
            isMulti
            SelectValue={value}
            options={options}
            onChange={selectUserGroup}
            isDisabled={disabled}
          />
        </CustomSelectContainer>

        {access === Access.Edit ? (
          disabled ? (
            <IconContainerFloatingmes title={ru.floatingmes.edit} id={"edit_vimis_syst"} onClick={onClickIconEdit}>
              <IconEdit />
            </IconContainerFloatingmes>
          ) : (
            <>
              <IconContainerFloatingmes title={ru.floatingmes.save} id={"save_vimis_syst"} onClick={onSave}>
                <IconSave />
              </IconContainerFloatingmes>
              <IconContainerFloatingmes
                title={ru.floatingmes.cancel}
                id={"close_vimis_syst"}
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
