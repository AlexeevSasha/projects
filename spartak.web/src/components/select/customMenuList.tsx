import React, { Children, FC, ReactElement } from "react";
import { MenuListProps } from "react-select";
import VirtualList, { ItemInfo } from "react-tiny-virtual-list";
import { useWindowSize } from "../../core/hooks/UseWindowSize";

const renderItem = (props: ItemInfo & { children?: ReactElement }) => {
  const { children } = props;

  if (Array.isArray(children)) {
    return (
      <div style={props.style} key={props.index}>
        {children[props.index]}
      </div>
    );
  }
  return (
    <div key={props.index} className="react-virtualized-menu-placeholder">
      {children?.props.children}
    </div>
  );
};

export const CustomMenuList: FC<MenuListProps> = ({ options, children, maxHeight, getValue }) => {
  const { width = 1920 } = useWindowSize(true);
  const DefaultItemHeight = (width > 767 ? (width > 1199 ? 30 / 19.2 : 30 / 7.67) : 30 / 3.75) * (width / 100);

  const [value] = getValue();
  const initialOffset = options.indexOf(value) * DefaultItemHeight;
  const childrenOptions = Children.toArray(children);
  const wrapperHeight =
    maxHeight < childrenOptions.length * DefaultItemHeight
      ? maxHeight
      : childrenOptions.length * DefaultItemHeight + 12;

  return (
    <VirtualList
      width="100%"
      height={wrapperHeight}
      scrollOffset={initialOffset}
      itemCount={childrenOptions.length}
      itemSize={DefaultItemHeight}
      renderItem={(props) => renderItem({ ...props, children: children as ReactElement })}
    />
  );
};
