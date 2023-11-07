export type StoryReviewsT = {
  id: string;
  image: string;
  star: number;
  title: string;
  description: string;
  author: string;
  date?: string;
};

export type StoryAllReviewsT = {
  reviews: StoryReviewsT[];
  ratings: {
    total: number;
    star: number;
  }[];
};

export type ProductReviewsT = {
  id: string;
  star: number;
  advantages: string;
  disadvantages: string;
  commentary: string;
  date: string;
  author: string;
  isAnonim: boolean;
};
