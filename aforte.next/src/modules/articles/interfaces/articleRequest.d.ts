export type ArticleRequest = {
  page?: number;
  limit?: number;
  isPopular?: boolean;
  category?: string[];
  sort?: string;
  author?: string;
  articleId?: string;
};
