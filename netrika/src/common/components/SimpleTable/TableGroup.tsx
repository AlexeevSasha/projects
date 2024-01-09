import React, { PropsWithChildren } from "react";
import { IconGroupHide } from "common/components/Icon/IconGroupHide";
import { IconGroupShow } from "common/components/Icon/IconGroupShow";
import styled from "styled-components";
import { Td, Tr } from "common/components/Table/UIcomponent/UIcomponent";

interface Props {
  title: string;
  isOpen: boolean;
  columnCount: number;
  onClick?: () => void;
}

export const TableGroup = ({ title, isOpen, columnCount, onClick, ...props }: PropsWithChildren<Props>) => (
  <>
    <Tr>
      <PaddinglessTd>
        {isOpen ? (
          <span id={"close_register_group"} onClick={() => onClick?.()}>
            <IconGroupHide />
          </span>
        ) : (
          <span id={"open_register_group"} onClick={() => onClick?.()}>
            <IconGroupShow />
          </span>
        )}
      </PaddinglessTd>
      <Td colSpan={columnCount - 1} style={{ paddingLeft: 0 }}>
        {title}
      </Td>
    </Tr>
    {isOpen && props.children}
  </>
);

const PaddinglessTd = styled(Td)`
  padding: 10px;
`;
