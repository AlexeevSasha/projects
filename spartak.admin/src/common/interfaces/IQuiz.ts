import { LocaleType } from "./common";

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
}
export enum AppearanceEnum {
  None = "None",
  Text = "Text",
  WithImage = "WithImage",
  FreeAnswer = "FreeAnswer",
}

type IAnswer = {
  Id: string;
  DeletedUtc?: string;
  Text: LocaleType;
  AnswerImage: string | null;
  Points?: number | null;
  IsCorrectAnswer: boolean;
  QuestionId?: string;
  Num: number;
  // Поле для формы, а не ДТО
  NumOfTrueAnswer?: number;
};

type IQuestions = {
  Id?: string;
  DeletedUtc?: string;
  Text: LocaleType;
  QuestionImage: string;
  AnswerType: AnswerEnum;
  IsAdditionalFreeAnswer: boolean;
  AppearanceAnswer?: AppearanceEnum;
  QuizId?: string;
  Num: number;
  Answers?: IAnswer[];
};

export type IQuiz = {
  Id?: string;
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
  TotalAcceptedUsers: string;
};

export type IQuizFilter = {};

export type IQuizResponse = {
  "value": IQuiz[];
  "@odata.count": number;
  "@odata.context": string;
};
