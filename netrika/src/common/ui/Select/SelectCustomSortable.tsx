import { ICustomSelect } from "../../interfaces/ISelect";
import React, { MouseEventHandler, useState } from "react";
import { useCustomSelect } from "./hooks/useCustomSelect";
import Select, { components, MultiValueGenericProps, MultiValueProps, OnChangeValue, Props } from "react-select";
import {
  SortableContainer,
  SortableContainerProps,
  SortableElement,
  SortableHandle,
  SortEndHandler,
} from "react-sortable-hoc";
import { useSelectComponents } from "./hooks/useSelectComponents";

interface IProps {
  className?: string;
  isRelative?: boolean;
  type?: string; // "text" | "number" | "calendar";
  isMulti?: boolean;
  hideMultiValueRemove?: boolean;
  options: readonly { label: string; value: string | number }[];
  closeMenuOnSelect?: boolean;
  isSearchable?: boolean;
  placeholder?: string;
  onChange?: (value: any, id?: number) => void;
  SelectValue?: ICustomSelect | ICustomSelect[] | unknown[];
  isDisabled?: boolean;
  isClearable?: boolean;
  isError?: boolean;
  fieldID?: string;
  id?: number;
  htmlID: string;
  isCreatable?: boolean;
  creatableType?: string;
  withPaginate?: boolean;
  isLongSingle?: boolean;
  topMenu?: boolean;
  isSortableSelect?: boolean;
}
function arrayMove<T>(array: readonly T[], from: number, to: number) {
  const slicedArray = array.slice();
  slicedArray.splice(to < 0 ? array.length + to : to, 0, slicedArray.splice(from, 1)[0]);
  return slicedArray;
}

const SortableMultiValue = SortableElement((props: MultiValueProps<{ label: string; value: string | number }[]>) => {
  const onMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const innerProps = { ...props.innerProps, onMouseDown };
  return <components.MultiValue {...props} innerProps={innerProps} />;
});

// @ts-ignore
const SortableMultiValueLabel = SortableHandle((props: MultiValueGenericProps) => (
  <components.MultiValueLabel {...props} />
));

const SortableSelect = SortableContainer(Select) as React.ComponentClass<
  Props<{ label: string; value: string | number }[], true> & SortableContainerProps
>;

export const SelectCustomSortable = (props: IProps) => {
  const { NoOptionsMessage } = useSelectComponents();
  const customStyles = useCustomSelect({
    isError: props.isError,
    isDisabled: props.isDisabled,
    isRelative: props.isRelative,
    isLongSingle: props.isLongSingle,
  });
  const [filteredOption] = useState(props.options || ([] as { label: string; value: string | number }[]));

  const onChange = (selectedOptions: OnChangeValue<{ label: string; value: string | number }[], true>) => {
    if (props.onChange) {
      props.onChange(selectedOptions);
    }
  };

  const onSortEnd: SortEndHandler = ({ oldIndex, newIndex }) => {
    // @ts-ignore
    const newValue = arrayMove(props.SelectValue, oldIndex, newIndex);
    if (props.onChange) {
      props.onChange(newValue);
    }
  };

  return (
    <div id={props.htmlID} className={props.className}>
      {props.isSortableSelect && (
        <SortableSelect
          useDragHandle
          axis="xy"
          onSortEnd={onSortEnd}
          distance={4}
          getHelperDimensions={({ node }) => node.getBoundingClientRect()}
          styles={customStyles}
          {...props}
          isMulti
          // @ts-ignore
          options={filteredOption}
          // @ts-ignore
          value={props?.SelectValue}
          // @ts-ignore
          onChange={(val: { value: string; label: string }[]) => onChange(val, props.id)}
          components={{
            // @ts-ignore We're failing to provide a required index prop to SortableElement
            NoOptionsMessage: NoOptionsMessage,
            // @ts-ignore We're failing to provide a required index prop to SortableElement
            MultiValue: SortableMultiValue,
            MultiValueLabel: SortableMultiValueLabel,
          }}
        />
      )}
    </div>
  );
};
