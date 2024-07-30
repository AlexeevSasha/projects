export interface IAdv {
  id: string;
  name: string;
  locationId: string;
  locationName: string;
  startPublish: string;
  endPublish: string;
  imageUri: string;
  transitionUri: string;
  status: string;
}

export interface IAdvRequest {
  token: string;
  filters: IAdvFilters;
}

export interface IAdvFilters {
  name?: string;
  sorting?: string;
  pagination: number;
  status?: string | undefined;
  author: string;
}
