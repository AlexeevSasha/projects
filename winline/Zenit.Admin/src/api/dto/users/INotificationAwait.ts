export interface INotification {
  id: string;
  heading: string;
  message: string;
  type: "Push" | "SMS" | "Email";
  linkValueUrl: string;
  typeLink: string;
  sendTime: string;
  sentTime?: string;
  createdUtc?: string;
  projectId: string;
  failedCounter: number;
  successCounter: number;
  isFromWinline: boolean;
  userFilter?: {
    citiesList: string[];
  };
  topicConditionInfo?: {
    over18: boolean;
    winline: boolean;
    mobilePlatforms: string[];
    cityId: string[];
  };
}

export interface INotificationFilters {
  sorting: string;
  pagination: number;
}
