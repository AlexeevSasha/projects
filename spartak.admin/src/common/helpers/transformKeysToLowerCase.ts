import mapKeys from "lodash/mapKeys";
import camelCase from "lodash/camelCase";

export const transformKeysEntity = <T extends object = object>(obj: T): T => {
  return mapKeys(obj, (value, key) => {
    return camelCase(key);
  }) as T;
};

export const transformKeysEntities = <T extends object = object>(entities: T[]): T[] => {
  return entities.map((entity: T) => transformKeysEntity<T>(entity));
};
