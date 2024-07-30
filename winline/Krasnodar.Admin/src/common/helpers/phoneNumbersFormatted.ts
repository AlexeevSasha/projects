export const phoneNumberFormatted = (phone: string | undefined): string => {
  if (!phone) {
    return "";
  }
  if (!phone.includes("+")) {
    phone = "+" + phone;
  }
  const phoneNumbers = phone.split("");
  phoneNumbers.splice(2, 0, " ");
  phoneNumbers.splice(6, 0, " ");
  phoneNumbers.splice(10, 0, " ");

  return phoneNumbers.join("");
};
