import { charityDetailsMock, charityFilterMock, charityMock } from "./mockData/charityMock";
import { CharityDetailsT, CharityT } from "../modules/charity/interfaces/charity";
import { CategoryButtonT } from "../common/interfaces/categoryButton";

export const getCharities = async (): Promise<CharityT[]> => charityMock;

export const getCharitiesFilter = async (): Promise<CategoryButtonT[]> => charityFilterMock;

export const getCharitiesById = async (id: string): Promise<CharityDetailsT> => charityDetailsMock;
