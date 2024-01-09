import { styled } from "common/styles/styled";
import { theme } from "common/styles/theme";
import React, { useCallback, useMemo } from "react";
import { IconArrow } from "common/components/Icon/IconArrow";
import { IconGroupCross } from "common/components/Icon/IconGroupCross";
import { IconGroupEmpty } from "common/components/Icon/IconGroupEmpty";
import { Th, Thead, Tr } from "./UIcomponent/UIcomponent";
import { ISelect } from "../../interfaces/ISelect";

export interface IThead {
  name: string;
  value: string;
  type?: string;
  options?: ISelect[];
  onClick?: (value?: any) => void;
  width?: string;
  sortName?: string;
}

interface IProps {
  withGroup?: boolean;
  numberingWidth?: string;
  controlWidth?: string;
  tableHead: IThead[];
  control?: boolean;
  multiSort?: (FieldName: string) => void;
  multiFieldSort?: Record<string, boolean | undefined>;
  sort?: (field: string) => void;
  fieldSort?: { field?: string; isDesc: boolean };
  group?: number;
  isAllSelected?: boolean;
  isDraggable?: boolean;
  clearGroup?: () => void;
  selectAllGroup?: () => void;
  numbering?: boolean;
  children: any;
  disableScroll?: boolean;
  id?: string;
  classNameContainer?: string;
}

export const TableHead = ({ children, ...props }: IProps) => {
  const handleSort = useCallback(
    (field: string) => () => {
      if (props.sort) props.sort(field);
    },
    [props]
  );

  const handleMultiSort = useCallback(
    (field: string) => () => {
      if (props.multiSort) props.multiSort(field);
    },
    [props]
  );

  const header = useMemo(() => {
    return (
      <Thead>
        <Tr style={{ width: props.numberingWidth ?? "initial" }}>
          {props?.isDraggable && <Th key={"drag&drop"} id={"drag&drop"} />}
          {props?.withGroup && <Th id={""} key={"group"} width={"20px"} />}
          {props.numbering && (
            <Th key={"number"} id={"number"}>
              №
            </Th>
          )}
          {props.group ? (
            props.isAllSelected ? (
              <Th id={"clear_on"} key={"group"} onClick={props.clearGroup}>
                <IconGroupCross />
              </Th>
            ) : (
              <Th id={"clear_off"} key={"group"} onClick={props.selectAllGroup}>
                <IconGroupEmpty />
              </Th>
            )
          ) : props.group === 0 ? (
            <Th id={"clear_off"} key={"group"} onClick={props.selectAllGroup}>
              <IconGroupEmpty />
            </Th>
          ) : (
            <></>
          )}
          {props.tableHead.map((item) =>
            item.sortName && props.multiFieldSort ? (
              <Th
                key={item.name}
                onClick={handleMultiSort(item.sortName)}
                id={item.value + "_thead"}
                sort={true}
                textBold={props.multiFieldSort[item.sortName] !== undefined}
                width={item.width}
              >
                <span style={{ display: "flex" }}>
                  {item.name}
                  {props.multiSort && (
                    <ContainerIcon>
                      {props.multiFieldSort[item.sortName] === true ||
                      props.multiFieldSort[item.sortName] === undefined ? (
                        <IconArrow rotate={"180deg"} color={theme.colors.hightBlue} />
                      ) : (
                        <div style={{ height: "8px" }} />
                      )}
                      {props.multiFieldSort[item.sortName] === false ||
                      props.multiFieldSort[item.sortName] === undefined ? (
                        <IconArrow rotate={"0"} color={theme.colors.hightBlue} />
                      ) : null}
                    </ContainerIcon>
                  )}
                </span>
              </Th>
            ) : (
              <Th
                key={item.name}
                onClick={handleSort(item.value)}
                id={item.value + "_thead"}
                sort={!!props.sort}
                textBold={item.value === props.fieldSort?.field}
                width={item.width}
              >
                <span style={{ display: "flex" }}>
                  {item.name}
                  {props.sort && (
                    <ContainerIcon>
                      {item.value !== props.fieldSort?.field || props.fieldSort.isDesc ? (
                        <IconArrow rotate={"180deg"} color={theme.colors.hightBlue} />
                      ) : (
                        <div style={{ height: "8px" }} />
                      )}
                      {item.value !== props.fieldSort?.field || !props.fieldSort.isDesc ? (
                        <IconArrow rotate={"0"} color={theme.colors.hightBlue} />
                      ) : null}
                    </ContainerIcon>
                  )}
                </span>
              </Th>
            )
          )}
          {props.control && (
            <Th id={"controls"} style={{ textAlign: "center", width: props.controlWidth ?? "initial" }}>
              Действия
            </Th>
          )}
        </Tr>
      </Thead>
    );
  }, [props, handleSort, handleMultiSort]);

  return (
    <Container id={props.id || ""} disableScroll={props.disableScroll} className={props.classNameContainer}>
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
`;

const ContainerIcon = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  justify-content: center;
  svg {
    padding-top: 2px;
  }
`;
