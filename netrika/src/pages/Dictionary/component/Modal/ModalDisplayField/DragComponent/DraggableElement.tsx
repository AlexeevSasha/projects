import { Droppable } from "react-beautiful-dnd";
import React from "react";
import styled from "styled-components";
import { ListItem } from "./ListItem";
import { IDictionaryDisplayTableField } from "../../../../../../common/interfaces/dictionary/IDictionaryDisplayTableField";
import { theme } from "../../../../../../common/styles/theme";

interface IProps {
  elements: any;
  prefix: string;
  onDoubleClickFunction: (item: IDictionaryDisplayTableField, index: number) => void;
}
export const DraggableElement = ({ prefix, elements, onDoubleClickFunction }: IProps) => (
  <DroppableStyles>
    <ColumnHeader>{prefix}</ColumnHeader>
    <Droppable droppableId={`${prefix}`}>
      {(provided) => (
        <ListContainer {...provided.droppableProps} ref={provided.innerRef}>
          {elements?.length > 0 &&
            elements.map((item: any, index: number) => (
              <ListItem key={item.id} item={item} index={index} onDoubleClickFunction={onDoubleClickFunction} />
            ))}
          {provided.placeholder}
        </ListContainer>
      )}
    </Droppable>
  </DroppableStyles>
);

const ColumnHeader = styled.div`
  text-transform: uppercase;
  margin-bottom: 20px;
  text-align: center;
  border-bottom: 1px solid ${theme.colors.gray};
`;

const DroppableStyles = styled.div`
  background: #d4d4d4;
  font-weight: bold;
  padding-top: 10px;
`;
const ListContainer = styled.div`
  padding: 10px;
  height: 100%;
`;
