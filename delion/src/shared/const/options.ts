import type { DefaultOptionType } from 'rc-select/lib/Select';
// eslint-disable-next-line boundaries/element-types
import { DreamerWishType } from '@entities/dreamer';
import { ApplicationExecutionType } from '@shared/api/models';

export const DREAM_CATEGORIES_OPTIONS: DefaultOptionType[] = [
  {
    label: 'Только материальные',
    value: DreamerWishType.MATERIAL,
  },
  {
    label: 'Только нематериальные',
    value: DreamerWishType.NON_MATERIAL,
  },
  {
    label: 'Только подарки-сюрпризы',
    value: DreamerWishType.SUPRISE,
  },
  {
    label: 'Только смешанные',
    value: DreamerWishType.MIXED,
  },
];

export const ORPHANAGE_OPTIONS: DefaultOptionType[] = [
  {
    label: 'Только от детского дома',
    value: 1,
  },
  {
    label: 'Исключить от детского дома',
    value: 0,
  },
];

export const ORGANIZATIONS_OPTIONS: DefaultOptionType[] = [
  {
    label: 'Только через организаторов',
    value: ApplicationExecutionType.WITH_DELIVERY,
  },
  {
    label: 'Исключить через организаторов',
    value: ApplicationExecutionType.INDEPENDENT,
  },
];
