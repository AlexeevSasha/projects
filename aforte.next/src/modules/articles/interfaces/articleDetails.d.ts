import { AuthorT } from "./author";
import { ArticleCommentsT } from "./articleComments";

export type ArticleDetailsT = {
  id: string;
  label: string;
  title: string;
  date: string;
  time: string;
  view: string;
  image: string;
  description: string;
  anchors: string[];
  author: AuthorT;
  comments: ArticleCommentsT;
};
