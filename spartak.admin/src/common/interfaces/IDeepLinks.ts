export interface IDeepLinks {
  name: { [key: string]: string };
  link: string;
}

export const DeepLinkList: { [key: string]: string } = {
  Media: "Медиа",
  Matches: "Матчи",
};
