export function countNonUndefinedObjectValues(obj: {} | null) {
  if (!obj) return 0;

  return Object.values(obj).filter((value) => value !== undefined).length;
}
