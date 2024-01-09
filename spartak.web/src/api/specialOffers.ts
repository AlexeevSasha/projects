import { ICorrectQuizAnswerResponse, IQuiz, IQuizAnswerSubmit } from "../componentPages/quiz/interfaces/IQuiz";
import { BaseApiService } from "./BaseApiService";
import { ISpecialOffer } from "./dto/ISpecialOffer";

class SpecialOffersRepository extends BaseApiService {
  constructor() {
    super("advertisement");
  }
  fetchSpecialOffers = (Type?: string) =>
    this.get<ISpecialOffer[]>(
      `/SpecialOfferUser/AccessedSpecialOffers${Type ? `?TypeFilteredSpecialOffer=${Type}&api-version=2.0` : ""}`
    );

  fetchSpecialOfferById = (id: string) =>
    this.get<ISpecialOffer>(`/SpecialOfferUser/AccessedSpecialOfferById?specialOfferId=${id}`);

  fetchQuiz = (id: string) => this.get<IQuiz>(`/ClientQuiz/GetQuizInfo?quizId=${id}`);

  startingQuiz = (id: string) =>
    this.get<{ Questions: IQuiz["Questions"]; UserValidation: string }>(`/ClientQuiz/GetQuizQuestions?quizId=${id}`);

  checkAnswer = (answer: IQuizAnswerSubmit["Questions"][0]) =>
    this.post<ICorrectQuizAnswerResponse[]>("/ClientQuiz/AnswerQuestion", JSON.stringify(answer));

  submitQuiz = (value: IQuizAnswerSubmit) =>
    this.put<IQuiz["ClientQuizStatistic"]>("/ClientQuiz/SubmitQuiz", JSON.stringify(value));
}

export const specialOffersRepository = new SpecialOffersRepository();
