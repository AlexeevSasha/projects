import { IMedia } from "./IMedia";

export interface ITeamsInfo {
  personalData: {
    name: string;
    surname: string;
    position: string;
    number: number;
    height: number;
    weight: number;
    birthDay: string;
  };
  awards: Record<string, string>[];
  biography: string[];
  career: {
    period: string;
    command: string;
    championship: number;
    cup: number;
    euroCup: number;
  }[];
  news: IMedia[];
  anotherPlayers: {
    id: string;
    name: string;
    surname: string;
    number: number;
  }[];
}
