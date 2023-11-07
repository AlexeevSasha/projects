export type ArticleCommentT = {
  id: string;
  name: string;
  date: string;
  text: string;
};

export type ArticleCommentsT = {
  id: string;
  count: number;
  comments: ArticleComment[];
};
