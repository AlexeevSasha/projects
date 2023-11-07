import { recommendationCategoryMock } from "./mockData/recommendationCategoryMock";
import { RecommendationCategoryT } from "../modules/categories/interfaces/recommendationCategory";

export const getRecommendationCategory = async (): Promise<RecommendationCategoryT[]> =>
  recommendationCategoryMock;
