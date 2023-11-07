import { IconPackage } from "../components/icons/IconPackage";
import { IconShop } from "../components/icons/IconShop";
import { IconPointsCircle } from "../components/icons/IconPoints";
import { IconInfoBig } from "../components/icons/IconInfo";
import { ContainerIconAsideLinks } from "../components/ContainerIconAsideLinks";
import { IconBringFriend } from "../components/icons/IconBringFriend";
import { IconCharity } from "../components/icons/IconCharity";
import { IconCertificates } from "../components/icons/IconCertificates";
import { AsideLinksT } from "../interfaces/asideLinks";
import { IconCareer } from "../components/icons/IconCareer";
import { IconPhone } from "../components/icons/IconPhone";

export const asideLinks: AsideLinksT[] = [
  {
    id: "order",
    link: "/help/order",
    text: "Как сделать заказ",
    icon: (
      <ContainerIconAsideLinks>
        <IconPackage />
      </ContainerIconAsideLinks>
    ),
  },
  {
    id: "pharmacy",
    link: "/profile/pharmacies",
    text: "Аптеки для самовывоза",
    icon: (
      <ContainerIconAsideLinks>
        <IconShop />
      </ContainerIconAsideLinks>
    ),
  },
  {
    id: "loyalty",
    link: "/",
    text: "Программа лояльности",
    icon: (
      <ContainerIconAsideLinks>
        <IconPointsCircle />
      </ContainerIconAsideLinks>
    ),
  },
  {
    id: "bring-friend",
    link: "",
    text: "Приведи друга",
    icon: (
      <ContainerIconAsideLinks icon={"bring-friend"}>
        <IconBringFriend />
      </ContainerIconAsideLinks>
    ),
  },
  {
    id: "faq",
    link: "/help/faq",
    text: "Вопросы и ответы",
    icon: (
      <ContainerIconAsideLinks icon={"info"}>
        <IconInfoBig />
      </ContainerIconAsideLinks>
    ),
  },
  {
    id: "about-company",
    link: "/company",
    text: "О компании",
    icon: (
      <ContainerIconAsideLinks>
        <IconShop />
      </ContainerIconAsideLinks>
    ),
  },
  {
    id: "charity",
    link: "/charity",
    text: "Благотворительность",
    icon: (
      <ContainerIconAsideLinks>
        <IconCharity />
      </ContainerIconAsideLinks>
    ),
  },
  {
    id: "certificates",
    link: "/",
    text: "Сертификаты и лицензии",
    icon: (
      <ContainerIconAsideLinks>
        <IconCertificates />
      </ContainerIconAsideLinks>
    ),
  },
  {
    id: "career",
    link: "/career",
    text: "Карьера",
    icon: (
      <ContainerIconAsideLinks>
        <IconCareer />
      </ContainerIconAsideLinks>
    ),
  },
  {
    id: "contact",
    link: "/",
    text: "Контакты",
    icon: (
      <ContainerIconAsideLinks>
        <IconPhone />
      </ContainerIconAsideLinks>
    ),
  },
];
