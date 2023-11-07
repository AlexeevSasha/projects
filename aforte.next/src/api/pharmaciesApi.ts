import { PharmaciesT } from "modules/profile/interfaces/pharmacies";
import { api } from "./baseApi";
import { pharmaciesFavouritesMock } from "./mockData/pharmaciesFavouritesMock";
import { pharmaciesStoryMock } from "./mockData/pharmaciesStoryMock";

export const getPharmacies = () => {
  return api.get<PharmaciesT>(
    "outlets/nearest?page=1&limit=10000&regionFias=0c5b2444-70a0-4932-980c-b4dc0d3f02b5"
  );
};

export const getPharmaciesFavourites = async (): Promise<PharmaciesT[]> => {
  return pharmaciesFavouritesMock;
};

export const getPharmaciesStory = async (): Promise<PharmaciesT[]> => {
  return pharmaciesStoryMock;
};
