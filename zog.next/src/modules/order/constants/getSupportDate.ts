export const getSupportDate = (date: string | null) => {
  const newDate = new Date(date || "");
  newDate.setDate(newDate.getDate() + 30);

  return date ? newDate.toLocaleDateString() : "";
};
