import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import { DraggableElement } from "./DraggableElement";
import { IDictionaryDisplayTableField } from "../../../../../../common/interfaces/dictionary/IDictionaryDisplayTableField";

interface IProps {
  contentList: IDictionaryDisplayTableField[];
  onChangeValue: (value: any) => void;
}

export const DragList = ({ contentList, onChangeValue }: IProps) => {
  const removeFromList = (list: any, index: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(index, 1);
    return [removed, result];
  };
  const lists = ["Поля", "Видимые поля"];

  const getItems = (prefix: string, lists: IDictionaryDisplayTableField[]) =>
    Array.from({ length: lists.length }, (v, k) => k).map((k) => {
      const randomId = Math.floor(Math.random() * 1000);
      return {
        ...lists[k],
        id: `item-${randomId}`,
        prefix,
      };
    });

  const addToList = (list: any, Pos: number, element: any, resultPos?: any, isDoubleClick?: boolean) => {
    const result = Array.from(list);
    if (isDoubleClick) {
      result.push({
        ...element,
        isList: element?.prefix !== "Видимые поля",
        prefix: element?.prefix === "Видимые поля" ? "Поля" : "Видимые поля",
      });
      return result;
    } else {
      result.splice(Pos, 0, {
        ...element,
        isList: resultPos?.destination?.droppableId === "Видимые поля",
        prefix: resultPos?.destination?.droppableId,
      });
      return result;
    }
  };

  const generateLists = () =>
    lists.reduce(
      (acc, listKey) => ({
        ...acc,
        [listKey]:
          listKey === "Видимые поля"
            ? getItems(
                listKey,
                contentList.filter((item) => item.isList)
              )
            : getItems(
                listKey,
                contentList.filter((item) => !item.isList)
              ),
      }),
      {}
    );

  const [elements, setElements] = useState(() => generateLists());

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }
    const listCopy = { ...elements };
    const sourceList = listCopy[result.source.droppableId];
    const [removedElement, newSourceList] = removeFromList(sourceList, result.source.index);
    listCopy[result.source.droppableId] = newSourceList;
    const destinationList = listCopy[result.destination.droppableId];
    listCopy[result.destination.droppableId] = addToList(
      destinationList,
      result.destination.index,
      removedElement,
      result
    );
    setElements(listCopy);
  };

  const doubleClickHandler = async (item: IDictionaryDisplayTableField, index: number) => {
    if (item.prefix) {
      const listCopy = { ...elements };
      const sourceList = listCopy[item.prefix];

      const [removedElement, newSourceList] = removeFromList(sourceList, index);

      listCopy[item.prefix] = newSourceList;
      const destinationList = listCopy[item.prefix === "Видимые поля" ? "Поля" : "Видимые поля"];
      listCopy[item.prefix === "Видимые поля" ? "Поля" : "Видимые поля"] = addToList(
        destinationList,
        destinationList.length,
        removedElement,
        undefined,
        true
      );
      setElements(listCopy);
    }
  };

  useEffect(() => onChangeValue(elements["Видимые поля"]?.concat(elements["Поля"])), [elements, onChangeValue]);

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <ListGrid>
          {lists.map((listKey) => (
            <DraggableElement
              elements={elements[listKey]}
              key={listKey}
              prefix={listKey}
              onDoubleClickFunction={doubleClickHandler}
            />
          ))}
        </ListGrid>
      </DragDropContext>
    </div>
  );
};

const ListGrid = styled.div`
  border-radius: 6px;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
