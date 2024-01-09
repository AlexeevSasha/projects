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

export const InputNetwork = React.memo(({ access, saveProposal, info, options, disabled, clickEdit }: IProps) => {
  const defValue = info.networkId
    ? (options.find((item) => item.value === info.networkId) as ICustomSelect)
    : options[0];
  const [value, setValue] = useState<ICustomSelect>(defValue);
  const [cloneValue, setCloneValue] = useState<ICustomSelect>(defValue || ({} as ICustomSelect));

  useEffect(() => {
    setValue(defValue);
  }, [defValue]);

  const onClickIconEdit = () => {
    clickEdit("network");
    setCloneValue(value);
  };
  const onClickIconCross = () => {
    clickEdit("");
    setValue(cloneValue);
    setCloneValue({} as ICustomSelect);
  };

  const onSave = () => {
    clickEdit("");
    saveProposal({ ...info, networkId: value.value < 0 ? null : Number(value.value) });
  };

  return (
    <InputContainer>
      <Title>Сеть МО</Title>
      <SelectContainer id={"network"}>
        <CustomSelectContainer>
          <CustomSelect
            htmlID={"network_MO"}
            SelectValue={value}
            options={options}
            onChange={(value: ICustomSelect) => setValue(value)}
            isDisabled={disabled}
            isSearchable={false}
          />
        </CustomSelectContainer>

        {access === Access.Edit ? (
          disabled ? (
            <IconContainerFloatingmes title={ru.floatingmes.edit} id={"edit_network"} onClick={onClickIconEdit}>
              <IconEdit />
            </IconContainerFloatingmes>
          ) : (
            <>
              <IconContainerFloatingmes title={ru.floatingmes.save} id={"save_network"} onClick={onSave}>
                <IconSave />
              </IconContainerFloatingmes>
              <IconContainerFloatingmes
                title={ru.floatingmes.cancel}
                id={"close_edit_network"}
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
