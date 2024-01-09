import React, { CSSProperties, PropsWithChildren } from "react";
import styled from "styled-components";
import { Tbody, Th, Thead, Tr } from "common/components/Table/UIcomponent/UIcomponent";

interface Props {
  headers: TableHeaderItem[];
  bordered?: boolean;
  minWidth?: number;
  containerStyle?: CSSProperties;
  hideTheadPaddingTop?: boolean;
}

export const SimpleTable = (props: PropsWithChildren<Props>) => {
  return (
    <Container style={props.containerStyle}>
      <Table style={{ minWidth: props.minWidth ? `${props.minWidth}px` : undefined, position: "relative" }}>
        <Thead>
          <Tr style={{ border: props.bordered ? "none" : undefined }}>
            {props.headers.map((item) => (
              <PaddinglessTh
                key={item.title}
                style={item.style}
                bordered={props.bordered}
                hideTheadPaddingTop={props.hideTheadPaddingTop}
              >
                {item.title}
              </PaddinglessTh>
            ))}
          </Tr>
        </Thead>
        <Tbody>{props.children}</Tbody>
      </Table>
    </Container>
  );
};

export interface TableHeaderItem {
  id: string;
  title: string;
  style?: CSSProperties;
}

const Container = styled.div<{ disableScroll?: boolean }>`
  /* display: flex; */
  overflow: ${(props) => (props.disableScroll ? "initial" : "auto")};
  height: 100%;
`;

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  table-layout: fixed;
`;

const PaddinglessTh = styled(Th)<{ bordered?: boolean; hideTheadPaddingTop?: boolean }>`
  padding: ${({ hideTheadPaddingTop }) => (hideTheadPaddingTop ? "0px 10px 10px 10px;" : "10px 10px 10px 10px")};
  border: ${({ bordered }) => (bordered ? "1px solid rgb(224, 224, 229)" : undefined)};
`;
