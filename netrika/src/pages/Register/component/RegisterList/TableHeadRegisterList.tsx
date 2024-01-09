import { styled } from "common/styles/styled";
import React, { useMemo } from "react";
import { IThead } from "common/components/Table/TableHead";
import { Th, Thead, Tr } from "common/components/Table/UIcomponent/UIcomponent";

interface IProps {
  tableHead: IThead[];
  children: any;
}

export const TableHeadRegisterList = ({ children, ...props }: IProps) => {
  const header = useMemo(() => {
    return (
      <Thead>
        <Tr>
          <Th id={"clear_off"} key={"group"} width={"20px"} />

          {props.tableHead.map((item) => (
            <Th key={item.name} id={item.value + "_thead"} width={item.width}>
              {item.name}
            </Th>
          ))}
          <Th id={"controls"} style={{ textAlign: "center" }} width={"100px"}>
            Действия
          </Th>
        </Tr>
      </Thead>
    );
  }, [props]);

  return (
    <Container disableScroll={false}>
      <Table>
        {header}
        {children}
      </Table>
    </Container>
  );
};

const Container = styled.div<{ disableScroll?: boolean }>`
  overflow: ${(props) => (props.disableScroll ? "initial" : "auto")};
  height: 100%;
`;

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  table-layout: fixed;
`;
