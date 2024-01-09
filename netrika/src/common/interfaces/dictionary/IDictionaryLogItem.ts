export interface IDictionaryLogItem {
  id: number;
  processId: number;
  timeStamp: Date | null;
  level: string | null;
  threadId: string | null;
  methodDescriptionName: string | null;
  controllerName: string | null;
  message: string | null;
  exMessage: string | null;
  incomingMessage: string | null;
  requestId: string | null;
  userName: string | null;
  userMo: string | null;
}
