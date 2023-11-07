import { productReviewsMock, storyAllReviewsMock, storyReviewsMock } from "./mockData/reviewsMock";
import {
  ProductReviewsT,
  StoryAllReviewsT,
  StoryReviewsT,
} from "../modules/reviews/interfaces/reviews";

export const getStoryReviews = async (): Promise<StoryReviewsT[]> => storyReviewsMock;

export const getProductReviews = async (): Promise<{
  reviews: ProductReviewsT[];
  totalReview: number | null;
}> => ({
  reviews: productReviewsMock,
  totalReview: 10,
});

export const getAllStoryReviews = async (): Promise<StoryAllReviewsT> => storyAllReviewsMock;
