import { UserT } from "modules/profile/interfaces/user";
import { UserDistributionsT } from "modules/profile/interfaces/userDistributions";
import { UserPointsFaqT } from "modules/profile/interfaces/userPointsFaq";
import { UserPointsStatusT } from "modules/profile/interfaces/userPointsStatus";
import { UserPointsTransactionT } from "modules/profile/interfaces/userPointsTransaction";
import { userDistributionsMock } from "./mockData/userDistributionsMock";
import { userMock } from "./mockData/userMock";
import { userPointsFaqMock } from "./mockData/userPointsFaqMock";
import { userPointsStatusMock } from "./mockData/userPointsStatusMock";
import { userPointsTransactionMock } from "./mockData/userPointsTransactionMock";
import { userFavouritesMock } from "./mockData/userFavouritesMock";

export const getUser = async (): Promise<UserT> => {
  return userMock;
};

export const getUserDistributions = async (): Promise<UserDistributionsT> => {
  return userDistributionsMock;
};

export const getUserPointsFaq = async (): Promise<UserPointsFaqT[]> => {
  return userPointsFaqMock;
};

export const getUserPointsTransaction = async (): Promise<UserPointsTransactionT[]> => {
  return userPointsTransactionMock;
};

export const getUserPointsStatus = async (): Promise<UserPointsStatusT> => {
  return userPointsStatusMock;
};

export const getUserFavourites = async (): Promise<string[]> => userFavouritesMock;
