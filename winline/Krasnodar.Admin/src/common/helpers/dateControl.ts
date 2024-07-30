export const dateControl = (value?: string | null) => {
  return !value || value === '0001-01-01T00:00:00Z' || value === '0001-01-01T00:00:00';
};
