import type { Key } from 'react';

declare global {
  export type ComponentKey = Key | null | undefined;
  export type Status = 'warning' | 'success' | 'default';

  export type Option = {
    label: string;
    value: number;
  };

  export type FileData = {
    id: number;
    file: string;
    name: string;
    original_filename: string;
  };

  export type ObjectKeys<T> = T extends object
    ? (keyof T)[]
    : T extends number
    ? []
    : T extends Array<unknown> | string
    ? string[]
    : never;
}

export {};
