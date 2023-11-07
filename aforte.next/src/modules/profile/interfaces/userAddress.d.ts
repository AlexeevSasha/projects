export type UserAddressT = {
  id: string;
  street: string;
  apartment: string;
  entrance?: string;
  floor: string;
  intercom?: string;
  description?: string;
  isSaveAddress: boolean;
  lat?: number;
  lon?: number;
};
