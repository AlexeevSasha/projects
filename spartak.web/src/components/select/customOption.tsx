import { FC } from "react";
import { components, OptionProps } from "react-select";

export const CustomOption: FC<OptionProps> = ({ children, ...props }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { onMouseMove, onMouseOver, ...rest } = props.innerProps;
  const newProps = { ...props, innerProps: rest };
  return <components.Option {...newProps}>{children}</components.Option>;
};
