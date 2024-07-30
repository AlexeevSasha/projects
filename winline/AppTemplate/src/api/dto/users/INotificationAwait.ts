export interface TUnionNotification extends IAddNotification {
  id: string;
  sentTime: string;
  createdUtc: string;
}

export interface IAddNotification {
  heading: string;
  linkValue: string;
  message: string;
  sendTime: string;
  typeLink: string;
  userFilter: string;
  userIds: string[];
  type: "Push" | "SMS" | "Email";
  os: string[] | null;
}

export interface INotificationFilters {
  sorting: string;
  pagination: number;
}
