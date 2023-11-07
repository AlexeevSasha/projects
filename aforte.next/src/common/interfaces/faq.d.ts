type OptionsFaqT = {
  title: string;
  descriptions: string;
};

export type FaqT = {
  title: string;
  questions: {
    label: string;
    options: OptionsFaqT[];
  }[];
};
