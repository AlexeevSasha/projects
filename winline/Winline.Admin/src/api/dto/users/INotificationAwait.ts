export interface INotification {
    id: string;
    heading: string;
    message: string;
    type: 'Push' | 'SMS' | 'Email';
    linkValueUrl: string;
    typeLink: string;
    sendTime: string;
    sentTime?: string;
    createdUtc?: string;
    projectId: string;
    failedCounter: number;
    successCounter: number;
    userFilter?: {
        citiesList: string[];
    };
    topicConditionInfo?: {
        mobilePlatforms: string[];
        cityId: string[];
    };
}

export interface INotificationFilters {
    sorting: string;
    pagination: number;
}
