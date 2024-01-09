import React, { useState } from "react";
import { IconGroupHide } from "common/components/Icon/IconGroupHide";
import { IconGroupShow } from "common/components/Icon/IconGroupShow";
import { Tbody, Td, Tr } from "./UIcomponent/UIcomponent";

interface IProps {
  name: string;
  index: number;
  children: any;
}

export const TableGroup = (props: IProps) => {
  const [open, setOpen] = useState<boolean>(true);
  return (
    <>
      <Tbody>
        <Tr>
          <Td>
            {open ? (
              <span id={"close_register_group"} onClick={() => setOpen(false)}>
                <IconGroupHide />
              </span>
            ) : (
              <span id={"open_register_group"} onClick={() => setOpen(true)}>
                <IconGroupShow />
              </span>
            )}
          </Td>
          <Td colSpan={7} id={"group_name_" + props.index}>
            {props.name ? props.name : ""}
          </Td>
        </Tr>
      </Tbody>
      {open ? props.children : null}
    </>
  );
};
