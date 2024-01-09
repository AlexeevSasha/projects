import { IOrder } from "common/interfaces/order/IOrder";
import React, { useMemo, useState } from "react";
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
  disabled: boolean;
  clickEdit: (value: string) => void;
  options: ICustomSelect[];
}

export const InputMedicalCareProfile = React.memo(
  ({ access, saveProposal, info, disabled, clickEdit, options }: IProps) => {
    const defValue = useMemo(() => new Set(info.profiles), [info.profiles]);
    const [value, setValue] = useState<ICustomSelect[]>(options.filter((item) => defValue.has(Number(item.value))));
    const [cloneValue, setCloneValue] = useState<ICustomSelect[]>(
      options.filter((item) => defValue.has(Number(item.value)))
    );

    const onClickIconEdit = () => {
      clickEdit("profiles");
      setCloneValue(value);
    };

    const onClickIconCross = () => {
      clickEdit("");
      setValue(cloneValue);
      setCloneValue([] as ICustomSelect[]);
    };
    const onChangeSelect = (value: ICustomSelect[]) => {
      setValue(value);
    };

    const onSave = () => {
      clickEdit("");
      saveProposal({ ...info, profiles: value.map((el) => Number(el.value)) });
    };

    return (
      <InputContainer>
        <Title>Профиль медицинской помощи</Title>
        <SelectContainer id={"profiles"}>
          <CustomSelectContainer>
            <CustomSelect
              htmlID={"profiles_Medical"}
              isSearchable
              isMulti
              SelectValue={value}
              options={options}
              onChange={onChangeSelect}
              isDisabled={disabled}
            />
          </CustomSelectContainer>

          {access === Access.Edit ? (
            disabled ? (
              <IconContainerFloatingmes title={ru.floatingmes.edit} id={"edit_profiles"} onClick={onClickIconEdit}>
                <IconEdit />
              </IconContainerFloatingmes>
            ) : (
              <>
                <IconContainerFloatingmes title={ru.floatingmes.save} id={"save_profiles"} onClick={onSave}>
                  <IconSave />
                </IconContainerFloatingmes>
                <IconContainerFloatingmes
                  title={ru.floatingmes.cancel}
                  id={"close_edit_profiles"}
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
  }
);
