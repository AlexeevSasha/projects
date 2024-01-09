import { IPatientRouteRecommendationQuestion } from "./IPatientRouteRecommendationQuestion";

export type IPatientRouteRecommendation = Partial<{
  recommendationText: string;
  questions: Array<IPatientRouteRecommendationQuestion>;
}>;
