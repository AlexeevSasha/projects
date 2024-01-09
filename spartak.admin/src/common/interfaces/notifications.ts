import { BaseFilters } from "./common";

export enum NoticeType {
  push = "Push",
  sms = "SMS",
  email = "E-mail",
}

export type LinkType = "None" | "HyperLink" | "Screen" | "DeepLink";

export type NoticeFilters = BaseFilters & {
  Header?: string;
  IsAwaiting?: string;
};

export type NoticeEntity = {
  Id: string;
  Heading: string;
  ExternalId?: string;
  Message: string;
  TypeLink?: LinkType;
  DeletedUtc?: string;
  CreatedUtc?: string;
  SendTime?: string;
  SentTime?: string;
  Type: NoticeType;
  Lang: "ru" | "en";
  LinkValueUrl?: string;
  UserTopicCondition?: string;
  FailedCounter?: number;
  SuccessCounter?: number;
  ExternalFileUrl: string | null;
  PushType?: string;
};

export type NoticeResponce = {
  items: NoticeEntity[];
  count: number;
};
