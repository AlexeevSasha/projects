import React, { ReactNode } from "react";
import styled from "styled-components";
import { Td, Tr } from "common/components/Table/UIcomponent/UIcomponent";

interface Props {
  cells: TableCell[];
  bordered?: boolean;
  onClick?: () => void;
}

export const TableRow = ({ cells, bordered, onClick }: Props) => (
  <Tr onClick={() => onClick?.()} style={{ border: bordered ? "none" : undefined }}>
    {cells.map(({ id, content }) => (
      <PaddinglessTd key={id} bordered={bordered}>
        {content}
      </PaddinglessTd>
    ))}
  </Tr>
);

export interface TableCell {
  id: string;
  content: ReactNode;
}

const PaddinglessTd = styled(Td)<{ bordered?: boolean }>`
  padding: 10px;
  border: ${({ bordered }) => (bordered ? "1px solid rgb(224, 224, 229)" : undefined)};
`;
