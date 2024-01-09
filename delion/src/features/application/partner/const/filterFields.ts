export const partnerFilterNames = {
  region: 'settlement',
  dream_category_type: 'dream_category_type',
  material_dream_category: 'material_dream_category',
  no_material_dream_category: 'no_material_dream_category',
  amount_max: 'amount_max',
  amount_min: 'amount_min',
  dream_category: 'dream_category',
  dreamers_count_max: 'dreamers_count_max',
  dreamers_count_min: 'dreamers_count_min',
  orphanage: 'orphanage',
  theme: 'theme',
  is_available_delivery: 'is_available_delivery',
};
export const dreamersCountFields = [
  partnerFilterNames.dreamers_count_min,
  partnerFilterNames.dreamers_count_max,
];
export const amountsFields = [partnerFilterNames.amount_min, partnerFilterNames.amount_max];
export const numberFields = [...dreamersCountFields, ...amountsFields];
