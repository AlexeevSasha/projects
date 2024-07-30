import { Collapse } from "antd";
import { InputForm } from "../../pages/mobileConfig/components/InputForm";

export type ArrayType = JSX.Element | { [key: string]: ArrayType[] };
export type MobileSettingsType = { [key: string]: string | object }[];
export type Count = (value: ((prevState: number) => number) | number) => void;

export const getArrayMobileSettings = <T extends object>(obj: T) => {
  const array: MobileSettingsType = [];

  Object.entries(obj).forEach(([keys, value]) => {
    array.push({ [keys]: value });
  });

  return array;
};

export const getObject = (array: MobileSettingsType) => {
  const obj: { [key: string]: string | object } = {};

  array.forEach((el) => {
    const [key, value] = Object.entries(el)[0];
    obj[key] = value;
  });

  return obj;
};

export const Items = (arr: ArrayType[]) => {
  return arr.map((el) => {
    const [key, value] = Object.entries(el)[0];
    const header = !isNaN(+key) ? +key + 1 : key;
    if (Array.isArray(value)) {
      return (
        <Collapse key={key} accordion>
          <Collapse.Panel header={header} key={header}>
            {Items(value)}
          </Collapse.Panel>
        </Collapse>
      );
    } else {
      return el;
    }
  });
};

export const getArrayItemsForm = <T extends object>(obj: T, key: keyof T, setCount: Count, nameKey: string[], access: boolean) => {
  const array: ArrayType[] = [];

  return getItem(obj, key, array, nameKey, setCount, access);
};

function getItem<T extends object>(obj: T, key: keyof T, arr: ArrayType[], nameKey: string[], setCount: Count, access: boolean) {
  Object.entries(obj[key]).forEach(([keys, value]) => {
    if (typeof value === "string" || !value) {
      const allNameKey = [...nameKey, `${key}`, keys];
      arr.push(<InputForm key={keys} arrName={allNameKey} name={keys} value={value} setCount={setCount} access={access} />);
    } else if (typeof value === "object") {
      arr.push({ [keys]: [] });
      const findEl = arr.find((el: ArrayType) => Object.keys(el)[0] === keys);
      //@ts-ignore
      getItem(obj[key], keys, findEl[keys], [...nameKey, key], setCount, access);
    }
  });

  return arr;
}
