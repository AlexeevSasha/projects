export interface IReview {
  id: string;
  createdAt: string;
  fullName: string;
  nameConsult: string;
  rating: string;
  likeIt: string;
  offers: string;
  comfort: string;
  recommendation: string;
  personalAboutTorsunov: string;
  agreement: boolean;
}

export type ReviewFormT = Omit<IReview, "id" | "createdAt">;
