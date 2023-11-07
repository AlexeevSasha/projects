import { ArticleRequest } from "modules/articles/interfaces/articleRequest";
import { CategoryButtonT } from "../common/interfaces/categoryButton";
import { ArticleT } from "../modules/articles/interfaces/article";
import { ArticleDetailsT } from "../modules/articles/interfaces/articleDetails";
import { AuthorDetailsT, AuthorT } from "../modules/articles/interfaces/author";
import { ArticleDetailsMock } from "./mockData/articleDetailsMock";
import { articlesAuthorMock } from "./mockData/articlesAuthorMock";
import { articlesMock } from "./mockData/articlesMock";

export const getArticlesList = async (props: ArticleRequest): Promise<ArticleT[]> => {
  if (props.isPopular) {
    return articlesMock.popularArticles;
  }
  if (props.author) {
    return articlesMock.popularArticles;
  }
  if (props.articleId) {
    return articlesMock.articles;
  }
  return articlesMock.articles;
};

export const getArticlesById = async (): Promise<ArticleDetailsT> => {
  return ArticleDetailsMock;
};

export const getArticlesCategories = async (): Promise<CategoryButtonT[]> => {
  return articlesMock.tags;
};

export const getAuthors = async (): Promise<AuthorT[]> => {
  return articlesMock.popularAuthor;
};

export const getAuthorById = async (): Promise<AuthorDetailsT> => {
  return articlesAuthorMock;
};
