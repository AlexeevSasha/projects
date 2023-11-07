export interface IOrderSearchParams {
  searchText: string;
  status: string;
  consultId?: string;
  startDate?: Date | null;
  endDate?: Date | null;
}
