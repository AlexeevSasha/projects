import moment from "moment";
import React, { MouseEvent, ReactNode } from "react";
import { IconCross } from "common/components/Icon/IconCross";
import { IconLoading } from "common/components/Icon/IconLoading";
import { ru } from "common/lang/ru";
import { IThead } from "./TableHead";
import { IconContainerFloatingmes, ItemLink, Tbody, Td, Tr } from "./UIcomponent/UIcomponent";
import { styled } from "../../styles/styled";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { IconDrag } from "../Icon/IconDrag";
import { useControlRender } from "./hooks/useControlRender";
import { useDrag } from "../../hooks/useDrag";

export interface IControlTable {
  name: "edit" | "settings" | "watch" | "delete" | "check" | "download" | "status" | "clickRow" | "sort" | "update";
  onClick?: (id?: string | number, nameFile?: string) => void;
  value?: string;
  modalSettings?: {
    description?: ReactNode;
  };
}

interface IProps {
  isDraggable?: boolean;
  tableHead: IThead[];
  tableBody: any[];

  id?: string;
  control?: IControlTable[];
  disabledApproveDelete?: boolean;

  activeLine?: number;
  numbering?: boolean;

  loadingValue?: { column: string; line: number }[];
  closeLoading?: (event: MouseEvent<HTMLElement>, id: number) => void;

  checkControl?: ((id: number, check: boolean) => void) | false;
  checkList?: number[];
  sortingTable?: (sort: any, errorReset: () => void) => void;
  withHover?: boolean;
  clickRow?: boolean;
  rowFloatingText?: string;

  noWordBreak?: boolean;
}

export const TableBody = (props: IProps) => {
  const { sortedItems, onDragEnd } = useDrag({ fields: props.tableBody, sortingTable: props.sortingTable });

  const { controlRender, checkControl, clickRow } = useControlRender({
    control: props.control,
    disabledApproveDelete: props.disabledApproveDelete,
    checkControl: props.checkControl,
    checkList: props.checkList,
  });

  return (
    <>
      {props.isDraggable ? (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <Tbody {...provided.droppableProps} ref={provided.innerRef}>
                {sortedItems?.map((body, ind) => (
                  <Draggable
                    key={String(body.id) + ind}
                    draggableId={String(body.id)}
                    index={ind}
                    isDragDisabled={body?.isDefault}
                  >
                    {(provided, snapshot) => {
                      const provideDraggable = !body?.isDefault && { ...provided.draggableProps };
                      return (
                        <Tr
                          withHover={props.withHover}
                          ref={provided.innerRef}
                          {...provideDraggable}
                          isDragging={snapshot.isDragging}
                          key={"tr" + ind}
                          active={!!props.activeLine && body.id === props.activeLine}
                          id={`row_${body.id || ind + 1}${body.id && body.id === props.activeLine ? "_active" : ""}`}
                        >
                          <Td
                            noWordBreak={props.noWordBreak}
                            id={`column_number_${body.id || ind + 1}`}
                            {...provided.dragHandleProps}
                          >
                            {!body?.isDefault && <IconDrag />}
                          </Td>

                          {props.numbering && (
                            <Td
                              noWordBreak={props.noWordBreak}
                              style={{ wordBreak: "normal" }}
                              id={`column_number_${body.id || ind + 1}`}
                            >
                              {ind + 1}
                            </Td>
                          )}
                          {checkControl(body.id)}
                          {props.tableHead.map((column) => (
                            <Td
                              noWordBreak={props.noWordBreak}
                              key={column.name + ind}
                              id={`column_${column.value}_${body.id || ind + 1}`}
                              onClick={() =>
                                column.type === "open_link" ? column?.onClick?.(body.id) : clickRow(body)
                              }
                              isClicker={!!props.clickRow || column.type === "open_link"}
                              noWrapText={column.type === "date"}
                            >
                              <IconContainerFloatingmes
                                title={props.rowFloatingText || ""}
                                visible={!!props.rowFloatingText}
                              >
                                {props.loadingValue?.find(
                                  (loadColumn) => loadColumn.column === column.value && loadColumn.line === body.id
                                ) ? (
                                  <LineLoadingContainer>
                                    <IconLoading width={18} height={18} hidePadding />
                                    {props.closeLoading ? (
                                      <IconContainerFloatingmes
                                        title={ru.floatingmes.cancel}
                                        id={"close_load_control_list_" + body.id}
                                        onClick={(e: MouseEvent<HTMLElement>) => props.closeLoading?.(e, body.id)}
                                      >
                                        <IconCross hideFloatingmes />
                                      </IconContainerFloatingmes>
                                    ) : null}
                                  </LineLoadingContainer>
                                ) : column.type === "date" ? (
                                  body[column.value] ? (
                                    moment(body[column.value]).format("DD MMMM YYYY")
                                  ) : (
                                    ""
                                  )
                                ) : column.type === "open_link" ? (
                                  <span>{body[column.value]}</span>
                                ) : column.type === "time" ? (
                                  body[column.value] ? (
                                    moment(body[column.value]).format("DD.MM.YYYY, hh:mm:ss")
                                  ) : (
                                    ""
                                  )
                                ) : (
                                  body[column.value]
                                )}
                              </IconContainerFloatingmes>
                            </Td>
                          ))}
                          {props.control ? controlRender(body, ind) : null}
                        </Tr>
                      );
                    }}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Tbody>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <Tbody>
          {props.tableBody?.map((body, ind) => (
            <Tr
              withHover={props.withHover}
              key={"tr" + ind}
              active={!!props.activeLine && body.id === props.activeLine}
              id={`row_${body.id || ind + 1}${body.id && body.id === props.activeLine ? "_active" : ""}`}
            >
              {props.numbering && (
                <Td
                  noWordBreak={props.noWordBreak}
                  style={{ wordBreak: "normal" }}
                  id={`column_number_${body.id || ind + 1}`}
                >
                  {ind + 1}
                </Td>
              )}
              {checkControl(body.id)}

              {props.tableHead.map((column) => (
                <Td
                  noWordBreak={props.noWordBreak}
                  key={column.name + ind}
                  id={`column_${column.value}_${body.id || ind + 1}`}
                  onClick={() => (column.type === "open_link" ? column?.onClick?.(body[column.value]) : clickRow(body))}
                  isClicker={!!props.clickRow || column.type === "open_link"}
                  noWrapText={column.type === "date"}
                >
                  <IconContainerFloatingmes title={props.rowFloatingText || ""} visible={!!props.rowFloatingText}>
                    {" "}
                    {props.loadingValue?.find(
                      (loadColumn) => loadColumn.column === column.value && loadColumn.line === body.id
                    ) ? (
                      <LineLoadingContainer>
                        <IconLoading width={25} height={25} hidePadding />
                        {props.closeLoading ? (
                          <IconContainerFloatingmes
                            title={ru.floatingmes.cancel}
                            id={"close_load_control_list_" + body.id}
                            onClick={(e: MouseEvent<HTMLElement>) => props.closeLoading?.(e, body.id)}
                          >
                            <IconCross hideFloatingmes />
                          </IconContainerFloatingmes>
                        ) : null}
                      </LineLoadingContainer>
                    ) : column.type === "date" ? (
                      body[column.value] ? (
                        moment(body[column.value]).format("DD MMMM YYYY")
                      ) : (
                        ""
                      )
                    ) : column.type === "open_link" ? (
                      <IconContainerFloatingmes
                        position={"right"}
                        title={"Перейти в заявку"}
                        id={"open_link" + body.id}
                      >
                        <ItemLink>{body[column.value]}</ItemLink>
                      </IconContainerFloatingmes>
                    ) : column.type === "time" ? (
                      body[column.value] ? (
                        moment(body[column.value]).format("DD.MM.YYYY, hh:mm:ss")
                      ) : (
                        ""
                      )
                    ) : (
                      body[column.value]
                    )}{" "}
                  </IconContainerFloatingmes>
                </Td>
              ))}

              {props.control ? controlRender(body, ind) : null}
            </Tr>
          ))}
        </Tbody>
      )}
    </>
  );
};
const LineLoadingContainer = styled.span`
  width: 25px;
  display: flex;
`;
