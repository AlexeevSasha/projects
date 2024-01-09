import { useEffect, useState } from "react";
import { IDragResult } from "../interfaces/IDragAndDrop";

interface IProps {
  fields: any;
  sortingTable?: (sort: any, errorReset: () => void) => void;
  withoutFixedItem?: boolean;
}

export const useDrag = (props: IProps) => {
  const getItems = (lists: any) =>
    Array.from({ length: lists?.length }, (v, k) => k).map((k) => {
      return {
        ...lists[k],
        id: lists[k].id,
        content: lists[k].id,
      };
    });
  const [items, setItems] = useState(getItems(props.fields));

  useEffect(() => {
    setItems(getItems(props.fields));
  }, [props.fields]);

  const onDragEnd = (result: IDragResult) => {
    const { destination, source } = result;

    if (!destination || (destination.index === 0 && !props.withoutFixedItem)) {
      return;
    }
    const newItems = Array.from(items);
    const [removed] = newItems.splice(source.index, 1);
    newItems.splice(destination.index, 0, removed);
    props.sortingTable && props.sortingTable(newItems, () => setItems(getItems(props.fields)));
    setItems(newItems);
  };
  return { sortedItems: items, onDragEnd };
};
