export interface IOrderDiseaseCardListItem {
  id: number;
  orderId: number;
  sectionId: number;
  sectionName: string;
  groupId: number;
  groupName: string;
  elementTypeId: number;
  elementTypeName: string;
  name: string;
  description: string;
  target: string;
  updatedAt: Date | string;
}
