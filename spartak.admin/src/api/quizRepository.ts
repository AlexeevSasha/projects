import { IQuiz, IQuizFilter, TypeOfImage } from "common/interfaces/IQuiz";
import { BaseApiService } from "./BaseApiService";

class QuizRepository extends BaseApiService {
  constructor() {
    super("advertisement");
  }

  fetchByFilter = async (filter: IQuizFilter) => await this.get(`odata/Quiz?${this.getODataQuery(filter)}`);

  fetchById = async (id: IQuiz["Id"]) => {
    const { value } = await this.get(
      `odata/Quiz?$expand=Questions($filter=DeletedUtc eq null;$expand=Answers($filter=DeletedUtc eq null))&$filter=Id eq ${id}`
    );
    // Сортировка вопросов и ответов
    const result: IQuiz = value[0];
    result.Questions?.sort((a, b) => a.Num - b.Num).forEach((question) =>
      question.Answers?.sort((a, b) => a.Num - b.Num)
    );

    return value[0];
  };

  publish = async (quiz: IQuiz) => await this.post("Quiz/Publish", JSON.stringify(quiz));

  draft = async (quiz: IQuiz) => await this.post("Quiz/Draft", JSON.stringify(quiz));

  remove = async (id: IQuiz["Id"]) => await this.delete(`Quiz/Delete?quizId=${id}`);

  upload = async (type: string, file: File) => {
    const formData = new FormData();
    formData.append("formFile", file);

    return await this.post(`Quiz/AddImage?type=${type}&api-version=1.0`, formData, {
      headers: {},
    }).catch(() => file.name);
  };

  fetchExportReport = (quizId: IQuiz["Id"]) =>
    this.post(`Quiz/ExportReport?quizId=${quizId}`, undefined, {
      headers: { "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" },
    });
}

export const quizRepository = new QuizRepository();
