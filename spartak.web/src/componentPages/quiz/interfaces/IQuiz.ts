import { LocaleType } from "../../../api/dto/LocaleType";

export enum TypeOfImage {
  Preview = "Preview",
  Question = "Question",
  Answer = "Answer",
}

export enum AnswerEnum {
  None = "None",
  Multiselect = "Multiselect",
  MonoSelect = "MonoSelect",
  FreeAnswer = "FreeAnswer",
  // Если при запросе ответов приходит ошибка:
  Errors = "Errors",
}
export enum AppearanceEnum {
  None = "None",
  Text = "Text",
  WithImage = "WithImage",
  FreeAnswer = "FreeAnswer",
}

export type IAnswer = {
  Id: string;
  DeletedUtc?: string;
  Text: LocaleType;
  AnswerImage: string;
  Points?: number | null;
  IsCorrectAnswer: boolean;
  QuestionId?: string;
  Num: number;
};

type IQuestions = {
  Id: string;
  DeletedUtc?: string;
  Text: LocaleType;
  QuestionImage: string;
  AnswerType: AnswerEnum;
  IsAdditionalFreeAnswer: boolean;
  AppearanceAnswer?: AppearanceEnum;
  CorrectAnswerCount: number;
  QuizId?: string;
  Num: number;
  Answers?: IAnswer[];
};

export type IClientQuizStatistic = {
  ClientPoints: number;
  QuizPoints: number;
  ClientCorrectQuestions: number;
  QuizCorrectQuestions: number;
};

export type IQuiz = {
  Id: string;
  CreatedUtc?: string;
  UpdatedUtc?: string;
  DeletedUtc?: string;
  IsDraft: true;
  Status: string;
  StartPublish: string;
  EndPublish: string;
  PreviewPhoto: string;
  Header: LocaleType;
  Announce: LocaleType;
  Text: LocaleType;
  Questions: IQuestions[];
  ClientQuizStatistic?: IClientQuizStatistic;
};

export type IQuizAnswerSubmit = {
  QuizId: string;
  Questions: {
    QuestionId: string;
    Responses: (
      | {
          AnswerId: string | null;
          ClientFreeResponse?: string;
          IsClientResponded?: boolean;
        }
      | {
          ClientFreeResponse: string;
        }
    )[];
  }[];
};

export type ICorrectQuizAnswerResponse = {
  AnswerId: string;
  Points: number;
  IsCorrectAnswer: boolean;
  IsClientResponded: boolean;
};
