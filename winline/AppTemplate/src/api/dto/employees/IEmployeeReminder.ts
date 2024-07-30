export interface IEmployeeReminder extends IAddReminder{
  id: string;
  createdUtc: string;
}

export interface IAddReminder {
  employees: string[];
  text: string;
  title: string;
}

export interface IRemindersFilters {
  sorting: string;
  pagination: number;
}
