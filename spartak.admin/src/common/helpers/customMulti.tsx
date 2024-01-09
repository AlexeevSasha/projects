import { Checkbox, Divider, FormInstance } from "antd";
import { SelectFieldOption } from "../../ui/SelectField";
import { BaseOptionType } from "antd/lib/select";

interface ISelectProps {
  options: SelectFieldOption[];
  fieldName: string;
  form: FormInstance;
  placeholder?: string;
  setValue?: Function;
}

const checkBoxChange = ({ form, fieldName, options, setValue }: Omit<ISelectProps, "placeholder">) => {
  if (form.getFieldValue(fieldName)?.length !== options.length) {
    setValue?.(options.map((item) => item.value));
    form.setFieldsValue({
      [fieldName]: options.map((item) => item.value),
    });
  } else {
    setValue?.([]);
    form.setFieldsValue({
      [fieldName]: [],
    });
  }
};

export const selectProps: Function = ({ placeholder, options, fieldName, form, setValue }: ISelectProps) => ({
  mode: "multiple",
  allowClear: true,
  showSearch: true,
  getPopupContainer: (trigger: { parentNode: HTMLElement }) => trigger.parentNode,
  showArrow: true,
  options,
  placeholder,
  maxTagCount: 1,
  filterOption: (input: string, option: BaseOptionType | undefined) =>
    option?.label?.toLowerCase().indexOf(input.toLowerCase()) >= 0,
  dropdownRender: (allSelectValue: SelectFieldOption[]) => (
    <div>
      {options.length ? (
        <>
          <div style={{ padding: "4px 8px 8px 8px", cursor: "pointer" }}>
            <Checkbox
              checked={options.length === form.getFieldValue(fieldName)?.length}
              onChange={() => checkBoxChange({ form, fieldName, options, setValue })}
            >
              Выбрать всех
            </Checkbox>
          </div>
          <Divider style={{ margin: "0" }} />
        </>
      ) : null}
      {allSelectValue}
    </div>
  ),
});
