import { VacancyT } from "modules/career/interfaces/vacancy";
import { VacancyDetailT } from "modules/career/interfaces/vacancyDetail";
import { vacancyDetailMock } from "./mockData/vacancyDetailMock";
import { vacancyMock } from "./mockData/vacancyMock";

export const getVacancy = async (): Promise<VacancyT[]> => {
  return vacancyMock;
};

export const getVacancyById = async (id: string): Promise<VacancyDetailT | undefined> => {
  return vacancyDetailMock.find(item => item.id === id);
};
