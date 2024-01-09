import React, { useMemo } from "react";
import styled from "styled-components";
import { ContainerWithBackgroundImg } from "../../../components/containers/containerWithBackgroundImg";
import { theme } from "../../../assets/theme/theme";
import { useRouter } from "next/router";
import { lang } from "../../../../public/locales/lang";
import { NavMenu } from "../../../components/navMenu/navMenu";
import { mockItemsList } from "../aboutFields/AboutFields";
import { DropdownList } from "../../../components/dropdownList/dropdownList";
import { SendFormProposal } from "../../../components/sendFormProposal/sendFormPropposal";
import { YandexMap } from "../../pageStadium/howToGet/yandexMap";
import { coordinatesArray } from "../../pageAcademy/contacts/coordinates";

export const HowToMoveSokolniki = () => {
  const { locale } = useRouter();
  const t = useMemo(() => lang[locale ?? "ru"], [locale]);

  return (
    <>
      <ContainerWithBackgroundImg
        gradient={theme.gradients.first}
        position="center"
        src={"/images/more/BannerSokolniki_v1.0.0.png"}
      >
        <Title>{t.footer.nav.howToGet}</Title>
      </ContainerWithBackgroundImg>
      <Content>
        <NavMenu menuList={mockItemsList} />
      </Content>
      <MapContainer>
        <YandexMap coordinates={coordinatesArray} hasPointerContainer />
      </MapContainer>
      <Content>
        {HowToMoveInformation.map((item, index) => (
          <DropdownList key={`it${index}`} title={item.title}>
            <InformationBlock>{item.text}</InformationBlock>
          </DropdownList>
        ))}
        <ManagerBlock>
          <SendFormProposal
            description={t.more.aboutFields.managerDescription}
            title={t.form.contactTheManager}
            image={"/images/more/field5_v1.0.0.png"}
          />
        </ManagerBlock>
      </Content>
    </>
  );
};

const Title = styled.h1`
  color: ${theme.colors.white};
  font-family: "FCSM Text", sans-serif;

  font-size: 6.25vw;
  padding: 19.27vw 0 5.21vw 8.75vw;
  margin: 0;
  z-index: 10;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 9.39vw;
    padding: 20.86vw 0 13.04vw 3.13vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 10.67vw;
    padding: 42.67vw 0 10.67vw 4.27vw;
  }
`;

const Content = styled.div`
  padding: 2vw 8.9vw;
  color: ${theme.colors.white};
  font-family: "FCSM Text", sans-serif;

  & nav {
    column-gap: 2vw;
    overflow: auto;
    white-space: nowrap;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 2vw 3.13vw;
  }
  @media screen and (max-width: ${theme.rubberSize.phone}) {
    padding: 2vw 4.27vw;
  }
`;

const InformationBlock = styled.div`
  font-size: 0.94vw;
  color: ${theme.colors.white};
  background: ${theme.colors.blackLight};
  box-sizing: border-box;
  padding: 1.25vw 2.08vw;
`;

const ManagerBlock = styled.div`
  display: flex;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 35.99vw;
  margin-top: 2.07vw;
  margin-bottom: 3.88vw;
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: 65.19vw;
  }
  @media screen and (max-width: ${theme.rubberSize.phone}) {
    height: 61.33vw;
  }
`;

const HowToMoveInformation = [
  {
    title: "Метро",
    text: "Добраться до стадиона можно, доехав до двух ближайших станций метро — «Спартак» (3–5 минут до арены пешком) и «Тушинская» (7–10 минут до арены пешком). Станция метро «Спартак» в матчевые дни работает в обычном режиме — как на вход, так и на выход пассажиров.",
  },
  {
    title: "Личный автотранспорт",
    text: "Въезд на территорию стадиона на автомобиле в день матча осуществляется ТОЛЬКО по сезонным пропускам, выданным при покупке абонемента, и разовым пропускам, которые действительны на день матча. Территория стадиона рассчитана на ограниченное количество парковочных мест, поэтому возможности разместить автомобили без указанного выше пропуска не будет.",
  },
  {
    title: "Наземный городской транспорт",
    text:
      "Рядом с метро «Тушинская» останавливается большое количество автобусов и маршруток. \n" +
      "Автобусы: 2, 88, 210, 248, 266, 372, 400т, 409, 436, 450, 455, 460 м, 464, 467, 540, 541, 542, 549, 568, 575, 614, 631, 640, 741, 741к, 777, 904, 904к, 930, 961, 964. \n" +
      "Маршрутки: 117м, 151, 209, 326, 450м, 468м, 475м, 498, 541, 566, 575, 631м, 741, 856.\n",
  },
  {
    title: "Пригородные поезда",
    text: "Рядом с метро «Тушинская» расположена железнодорожная станция Тушино, от которой можно на электричке доехать до Курского или Рижского вокзала, а также до следующих станций: Нахабино, Дедовск, Новоиерусалимская, Румянцево, Волоколамск, Шаховская, Депо, Царицыно, Красный Строитель, Щербинка, Подольск, Львовская, Столбовая, Чехов, Серпухов, Ревякино.\n",
  },
];
