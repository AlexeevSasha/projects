import { theme } from "common/styles/theme";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IconContainerFloatingmes } from "../../../../common/components/Table/UIcomponent/UIcomponent";
import { ru } from "../../../../common/lang/ru";
import { IconSettings } from "../../../../common/components/Icon/IconSettings";
import { IControlListsFieldsItem } from "../../../../common/interfaces/control/IControlListsField";
import { CheckBox } from "../../../../common/ui/Input/CheckBox";
import { Button } from "../../../Proposal/components/ScreenProposal/DrawerConstructorSettings/SettingsButtons";
import { IconLoading } from "../../../../common/components/Icon/IconLoading";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { IDragResult } from "../../../../common/interfaces/IDragAndDrop";

interface IProps {
  items: IControlListsFieldsItem[];
  onClick: (items: IControlListsFieldsItem[]) => void;
  loading: boolean;
}

export const FieldsSettings = ({ items, onClick, loading }: IProps) => {
  const getItems = (lists: any) =>
    Array.from({ length: lists?.length }, (v, k) => k).map((k) => {
      return {
        ...lists[k],
        id: lists[k].id,
        // content: lists[k].id,
      };
    });
  const [showFieldsSettings, setShowFieldsSettings] = useState<boolean>(false);
  const [activeList, setActiveList] = useState<IControlListsFieldsItem[]>(getItems(items));

  useEffect(() => {
    setActiveList(getItems(items));
  }, [items]);

  const changeActive = (id: number | string) => {
    const newArr = activeList.map((item, index) => (id === index ? { ...item, isVisible: !item.isVisible } : item));
    setActiveList(newArr);
  };

  const onDragEnd = (result: IDragResult) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }
    const newItems = Array.from(activeList);
    const [removed] = newItems.splice(source.index, 1);
    newItems.splice(destination.index, 0, removed);
    setActiveList(newItems);
  };

  return (
    <>
      <Wrapper>
        <IconContainerFloatingmes
          id={"open_settings"}
          title={ru.floatingmes.settings}
          position="left"
          onClick={() => setShowFieldsSettings(!showFieldsSettings)}
        >
          <IconSettings width={24} height={24} />
        </IconContainerFloatingmes>
        {showFieldsSettings && (
          <Container id="right_table_control_list_fields_setting">
            {loading ? (
              <IconLoading />
            ) : (
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                  {(provided, snapshot): JSX.Element => (
                    <ListContainer {...provided.droppableProps} ref={provided.innerRef}>
                      {activeList.map((item, index) => (
                        <Draggable key={item.id} index={index} draggableId={String(item.id)}>
                          {(provided, snapshot): JSX.Element => (
                            <p ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                              {item.name} <CheckBox check={item.isVisible} checkId={index} onCheck={changeActive} />
                            </p>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </ListContainer>
                  )}
                </Droppable>
              </DragDropContext>
            )}
            {!loading && (
              <Button
                onClick={() => {
                  onClick(activeList);
                  setShowFieldsSettings(false);
                }}
                id={"modal_save"}
              >
                Применить
              </Button>
            )}
          </Container>
        )}
      </Wrapper>
      {showFieldsSettings && (
        <Outside
          onClick={() => {
            setShowFieldsSettings(false);
            setActiveList(getItems(items));
          }}
        />
      )}
    </>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  padding: 0 10px 14px 10px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 1003;
  top: 40px;
  right: 3%;
  width: fit-content;
  min-width: 270px;
  max-height: 500px;
  background: ${theme.colors.white};
  box-shadow: -4px 0 31px rgba(0, 0, 0, 0.15);
  justify-content: start;
  transition: width 1s ease;

  p {
    display: flex;
    justify-content: space-between;
  }
`;
const ListContainer = styled.div`
  max-height: 400px;
  overflow-y: auto;
`;

const Outside = styled.div`
  opacity: 0;
  margin-top: 5px;
  background: ${theme.colors.white};
  position: fixed;
  top: 0;
  right: 0;
  width: 90vw;
  height: 100vh;
  z-index: 1002;
`;
