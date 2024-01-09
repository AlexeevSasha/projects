import { selectFields } from "module/filter/filterConstructorSelector";
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InputField } from "common/ui/Input/InputField/InputField";
import { styled } from "common/styles/styled";
import { RegisterSettingsCheckListAction } from "module/registerSettingsCheckList/registerSettingsCheckListAction";
import {
  selectCommonSettings,
  selectErrors,
  selectSearchType,
} from "module/registerSettingsCheckList/registerSettingsCheckListSelector";
import { ICustomSelect } from "../../../../../../common/interfaces/ISelect";
import { CustomSelect } from "../../../../../../common/ui/Select/CustomSelect";
import { theme } from "../../../../../../common/styles/theme";
import { SelectCustomSortable } from "../../../../../../common/ui/Select/SelectCustomSortable";
import { LabelStyle } from "../../../../../../common/ui/Input/styles/labelStyles";

interface IProps {
  showAdditionalFields: boolean;
}

export const CommonSettings: React.FC<IProps> = ({ showAdditionalFields }) => {
  const { name, searchFields } = useSelector(selectCommonSettings);
  const errors = useSelector(selectErrors);
  const searchType = useSelector(selectSearchType);
  const field = useSelector(selectFields);
  const dispatch = useDispatch();
  const typeFilter = useMemo(() => (searchType ? "Конструктор" : "SQL-запрос"), [searchType]);

  const fieldsValues = useMemo(
    () => searchFields?.map((searchField) => field?.find((f) => +f.value === searchField)) || ([] as ICustomSelect[]),
    [field, searchFields]
  );

  const { updateName, updateSearchType, updateFieldsValues } = RegisterSettingsCheckListAction;

  const handleNameChange = (value: string) => {
    dispatch(updateName(value));
  };

  const handleChangeType = (type: ICustomSelect) => {
    dispatch(updateSearchType(type.value.toString()));
  };

  const handleChangeFields = (value: ICustomSelect[]) => {
    dispatch(updateFieldsValues(value?.map((item) => Number(item?.value))));
  };

  return (
    <>
      <SettingContainer>
        <SettingItem width={"25%"}>
          <LabelStyle isRequired> Название контрольного списка</LabelStyle>
          <InputField
            altId="input_name_control_list"
            error={errors.name}
            type="String"
            defaultValue={name || ""}
            onChange={handleNameChange}
            placeholder="Введите название"
            maxWidth="100%"
            maxLength={200}
          />
        </SettingItem>
        {showAdditionalFields && (
          <>
            <SettingItem id={"fields"} width={"75%"}>
              <label>Поля списка пациентов</label>

              {!!field?.length && (
                <SelectCustomSortable
                  closeMenuOnSelect={false}
                  options={field}
                  htmlID={"commonSetting_fields"}
                  isSortableSelect
                  isSearchable
                  placeholder={"Укажите дополнительные поля"}
                  onChange={handleChangeFields}
                  SelectValue={fieldsValues as ICustomSelect[]}
                />
              )}
            </SettingItem>
          </>
        )}
      </SettingContainer>

      <SettingItem id={"type_setting"} style={{ marginBottom: "10px" }}>
        <label>Тип настройки</label>
        <CustomSelect
          htmlID={"commonSetting_type_setting"}
          SelectValue={{ value: typeFilter, label: typeFilter } as unknown}
          options={[
            { label: "Конструктор", value: "Конструктор" },
            { label: "SQL-запрос", value: "SQL-запрос" },
          ]}
          onChange={handleChangeType}
        />
      </SettingItem>
    </>
  );
};

const SettingItem = styled.div<{ width?: string }>`
  display: flex;
  flex-direction: column;
  color: ${theme.colors.black};
  width: ${(props) => (props.width ? props.width : "44%")};
  margin-right: 10px;
`;

const SettingContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
  align-items: center;
`;
