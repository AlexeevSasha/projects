export interface IAddOrderRequest {
  name: string;
  description: string;
  registerGroupId: number;
  authorId: number;
  authorName: string;
  tableName: string;
  nsi127Column: string;
}
