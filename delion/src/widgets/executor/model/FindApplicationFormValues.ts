import type { Dadata } from '@shared/model';

export type FindApplicationFormValues = {
  place: Dadata;
  price_max?: number;
  price_min?: number;
  suprises?: number;
};
