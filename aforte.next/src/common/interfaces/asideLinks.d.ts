export type AsideLinksIDT =
  | "order"
  | "pharmacy"
  | "loyalty"
  | "faq"
  | "bring-friend"
  | "about-company"
  | "charity"
  | "certificates"
  | "career"
  | "contact";

export type AsideLinksT = {
  id: AsideLinksIDT;
  link: string;
  text: string;
  icon: JSX.Element;
};
