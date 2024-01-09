import { Draggable } from "react-beautiful-dnd";
import React from "react";
import styled from "styled-components";
import { IDictionaryDisplayTableField } from "../../../../../../common/interfaces/dictionary/IDictionaryDisplayTableField";

interface IProps {
  index: number;
  item: any;
  onDoubleClickFunction: (item: IDictionaryDisplayTableField, index: number) => void;
}

export const ListItem = ({ item, index, onDoubleClickFunction }: IProps) => {
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided) => {
        return (
          <DragItem
            onDoubleClick={() => onDoubleClickFunction(item, index)}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <CardFooter>
              <span>{index + 1}.</span>
              <span>{item.tableField}</span>
            </CardFooter>
          </DragItem>
        );
      }}
    </Draggable>
  );
};

const CardFooter = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const DragItem = styled.div`
  padding: 10px;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background: white;
  margin: 0 0 8px 0;
  display: grid;
  grid-gap: 20px;
  flex-direction: column;
`;
