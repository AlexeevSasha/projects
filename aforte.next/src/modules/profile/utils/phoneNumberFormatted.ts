export const phoneNumberFormatted = (phone: string | undefined): string => {
  if (!phone) {
    return "";
  }
  if (!phone.includes("+")) {
    phone = "+" + phone;
  }
  const phoneNumbers = phone.split("");
  phoneNumbers.splice(2, 0, " ", "(");
  phoneNumbers.splice(7, 0, ")", " ");
  phoneNumbers.splice(12, 0, "-");
  phoneNumbers.splice(15, 0, "-");

  return phoneNumbers.join("");
};
