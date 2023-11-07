export interface IPrimaryOrderDescription {
  indicate: string;
  description: string;
  diagnosis: string;
}

export interface IPrimaryOrder {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  timeZone: string;
  messenger: string;
  utm: string;
  form: string;
  status: string;
  comment: string;
  inflammation: IPrimaryOrderDescription;
  pressure: IPrimaryOrderDescription;
  tumor: IPrimaryOrderDescription;
  cardiovascular: IPrimaryOrderDescription;
  vision: IPrimaryOrderDescription;
  joints: IPrimaryOrderDescription;
}
