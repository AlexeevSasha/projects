export type AuthorT = {
  id: string;
  image: string;
  name: string;
  profession: string;
};

export type SocialMediaAuthorT = {
  nameSocialMedia: "ok" | "vk" | "dzen" | "telegram" | "link";
  link: string;
  text?: string;
};

export type AuthorDetailsT = {
  author: AuthorT;
  socialMedia: SocialMediaAuthorT[];
  description: string;
};
