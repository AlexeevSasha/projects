export interface IControlEvent {
  id: number;
  name: string;
  eventDate: Date | string;
  createdAt?: Date | string;
  updatedAt?: Date | string | null;
}
