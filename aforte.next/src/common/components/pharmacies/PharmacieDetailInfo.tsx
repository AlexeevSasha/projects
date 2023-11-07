import styled from "astroturf/react";
import { SocialMediaAuthor } from "modules/articles/components/SocialMediaAuthor";
import { SocialMediaAuthorT } from "modules/articles/interfaces/author";
import { PharmaciesT } from "modules/profile/interfaces/pharmacies";
import { phoneNumberFormatted } from "modules/profile/utils/phoneNumberFormatted";
import Link from "next/link";
import { Button } from "../Button";
import { IconCompas } from "../icons/IconCompas";
import { IconPhone } from "../icons/IconPhone";
import { IconTime } from "../icons/IconTime";
import { NextImage } from "../NextImage";

type Props = {
  pharmacie?: PharmaciesT;
  setUserLocation: (value: number[]) => void;
};

export const PharmaciesDetailInfo = ({ pharmacie, setUserLocation }: Props) => {
  const getGeolocation = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setUserLocation([position.coords.latitude, position.coords.longitude]);
    });
  };

  const socialMedia: SocialMediaAuthorT[] = [
    { nameSocialMedia: "vk", link: "https://vk.com/polzaru_apteka" },
    { nameSocialMedia: "ok", link: "https://ok.ru/group/70000000115784" },
    { nameSocialMedia: "telegram", link: "https://t.me/polzaru_apteka" },
    { nameSocialMedia: "dzen", link: "https://zen.yandex.ru/polzaru_apteka" },
  ];

  const workingHours = ["Пн-Пт: 08:00-21:00", "Сб: 09:00-20:00", "Вс: 09:00-19:00"];

  return (
    <Conteiner>
      <CustomLink href="/profile/pharmacies">К списку всех аптек</CustomLink>
      <Title>Алюр-С-Фарм</Title>
      <ContainerImage>
        <NextImage
          style={{ objectFit: "cover", borderRadius: 32 }}
          src={"/mockImages/article-big.png"}
          alt={"article-details"}
        />
      </ContainerImage>
      <InfoBlock>
        <Row>
          <IconCompas />
          <Description>
            <TitleRow>Адрес</TitleRow>
            <Text>603116, Нижегородская обл, Нижний Новгород г, Гордеевская ул, дом № 36А</Text>
            <RouteBtn onClick={getGeolocation}>Проложить маршрут</RouteBtn>
          </Description>
        </Row>
        <Row customColorIcon>
          <IconPhone />
          <Description>
            <TitleRow>Контакты</TitleRow>
            <Text>{phoneNumberFormatted("88002009001")}</Text>
            {socialMedia.length && (
              <PharmacieMediaBlock>
                <SocialMediaAuthor socialMedia={socialMedia} pharmacie />
              </PharmacieMediaBlock>
            )}
          </Description>
        </Row>
        <Row>
          <IconTime />
          <Description>
            <TitleRow>Время работы</TitleRow>
            {workingHours.map((time, inex) => (
              <Text key={inex}>{time}</Text>
            ))}
          </Description>
        </Row>
      </InfoBlock>
    </Conteiner>
  );
};
const Conteiner = styled.div`
  @import "variables";

  display: flex;
  flex-direction: column;
  border-radius: 40px;
  width: 470px;
  background: $white;
  box-shadow: $shadowHoverCard;
  padding: 32px 32px 60px 32px;

  @include respond-to(small) {
    padding: 20px 20px 30px 20px;
    width: 100%;
    &:hover {
      box-shadow: none;
    }
  }
`;

const CustomLink = styled(Link)`
  @import "variables";

  font-weight: 500;
  font-size: 13px;
  color: $blue1;
  line-height: 137%;
`;

const Title = styled.h1`
  @import "variables";

  margin: 7px 0px 0px 0px;
  font-weight: 600;
  font-size: 20px;
  line-height: 137%;

  @include respond-to(small) {
    margin: 3px 0px 0px 0px;
  }
`;

const ContainerImage = styled.div`
  @import "variables";

  margin-top: 20px;
  border-radius: 28px;
  height: 180px;

  @include respond-to(small) {
    height: 160px;
    margin-top: 16px;
  }
`;

const InfoBlock = styled.div`
  @import "variables";

  display: flex;
  flex-direction: column;
  margin-top: 20px;
  div:last-child {
    margin-bottom: 0px;
  }

  @include respond-to(small) {
    margin-bottom: 20px;
  }
`;

const Row = styled.div<{ customColorIcon?: boolean }>`
  @import "variables";

  display: flex;
  flex-direction: row;
  margin-bottom: 17px;
  svg {
    min-width: 24px;
    min-height: 24px;
    path {
      fill: $blue1;
    }
  }
  &.customColorIcon {
    svg {
      opacity: 0.3;
    }
  }

  @include respond-to(small) {
    margin-bottom: 20px;
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 16px;
`;

const TitleRow = styled.span`
  font-weight: 600;
  font-size: 16px;
  line-height: 137%;
`;

const Text = styled.span`
  @import "variables";

  font-weight: 400;
  font-size: 16px;
  line-height: 140%;
  margin-top: 12px;
  @include respond-to(small) {
    font-size: 13px;
  }
`;

const RouteBtn = styled(Button)`
  @import "variables";

  background: none;
  padding: 0;
  font-weight: 400;
  font-size: 16px;
  line-height: 140%;
  color: $blue1;
  width: fit-content;
  @include respond-to(small) {
    font-size: 13px;
  }
`;

const PharmacieMediaBlock = styled.div`
  margin-top: 12px;
`;
