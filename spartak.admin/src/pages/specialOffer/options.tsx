export const specialOfferType = (locale: string): { label: string; value: string }[] => {
  const typeOptions: {
    value: string;
    label: { [key: string]: string };
  }[] = [
    { value: "FromClub", label: { En: "From club", Ru: "От клуба" } },
    { value: "FromPartners", label: { En: "Winline", Ru: "Винлайн" } },
  ];

  return typeOptions?.map((elem) => ({
    label: elem.label[locale],
    value: elem.value,
  }));
};
