import styled from "astroturf/react";
import { Accordion } from "common/components/Accordion";
import { IconPerson } from "common/components/icons/IconPerson";
import { IconPhoto } from "common/components/icons/IconPhoto";
import { UserT } from "../interfaces/user";
import { UserAddressT } from "../interfaces/userAddress";
import { DeliveryAddress } from "./DeliveryAddress";
import { ProfileDelete } from "./ProfileDelete";
import { ProfileForm } from "./ProfileForm";

type Props = {
  user: UserT;
  userAddress: UserAddressT[];
};

export const ProfileSettings = ({ user, userAddress }: Props) => {
  return (
    <CustomWrapper>
      <ProfileFormBlock
        style={{ width: Object.values(user).filter((item) => item == "").length ? "79%" : "100%" }}
      >
        <InfoBlock>
          <AvatarBlock>
            <span className="default">
              <IconPerson />
            </span>
            <span className="getPhoto">
              <IconPhoto />
            </span>
          </AvatarBlock>
          <ProfileInfoBlock>
            <UserName>
              {user.surname} {user.name}
            </UserName>
            <Description>
              Укажите основную информацию, чтобы пользоваться сервисом было удобнее
            </Description>
            <MobileDescription>Загрузить фотографию</MobileDescription>
          </ProfileInfoBlock>
        </InfoBlock>
        <Title>Мои данные</Title>
        <ProfileForm user={user} />
        <TitleAdress>Адреса</TitleAdress>
        <DescriptionAdress>
          Для заказа в один клик, чтобы не вводить каждый раз при заказе
        </DescriptionAdress>
        {userAddress && <DeliveryAddress userAddress={userAddress} />}
        <Accordion withoutBG title="Хотите удалить аккаунт ?">
          <ProfileDelete id={user.id} />
        </Accordion>
      </ProfileFormBlock>
      {Object.values(user).filter((item) => item == "").length ? (
        <PointsBlock>
          <PointText>Получите</PointText>
          <CountPoints>500 баллов</CountPoints>
          <ProgressLine>
            <Line
              style={{
                width: `${(8 - Object.values(user).filter((item) => item == "").length) * 12.5}%`,
              }}
            ></Line>
          </ProgressLine>
          <FieldsLeft>
            Осталось заполнить <br /> {Object.values(user).filter((item) => item == "").length} поля
          </FieldsLeft>
        </PointsBlock>
      ) : null}
    </CustomWrapper>
  );
};
const CustomWrapper = styled.div`
  @import "variables";
  display: flex;
  flex-direction: row;
  width: 100%;
  background: $white;
  border-radius: 32px;
  margin: 20px 0px 40px 0px;
  @include respond-to(small) {
    margin: 12px 0px 8px 0px;
    border-radius: 28px;
  }
`;
const ProfileFormBlock = styled.div`
  @import "variables";
  display: flex;
  flex-direction: column;
  padding: 40px;
  width: 90%;
  @media (max-width: 1350px) {
    width: 100%;
  }
  @include respond-to(small) {
    padding: 20px;
    width: 100% !important;
  }
`;
const InfoBlock = styled.div`
  @import "variables";
  display: flex;
  flex-direction: row;
  margin-bottom: 40px;
  align-items: center;
  @include respond-to(small) {
    margin-bottom: 32px;
  }
`;
const ProfileInfoBlock = styled.div`
  @import "variables";
  display: flex;
  flex-direction: column;
  margin-left: 28px;
  @include respond-to(small) {
    margin-left: 16px;
  }
`;
const UserName = styled.span`
  @import "variables";
  font-weight: 600;
  font-size: 24px;
  line-height: 137%;
  margin-bottom: 4px;
  @include respond-to(small) {
    font-size: 18px;
    margin-bottom: 8px;
  }
`;
const Description = styled.span`
  @import "variables";
  font-weight: 400;
  font-size: 14px;
  line-height: 137%;
  opacity: 0.4;
  @include respond-to(small) {
    display: none;
  }
`;
const DescriptionAdress = styled(Description)`
  @import "variables";
  @include respond-to(small) {
    display: block;
  }
`;
const MobileDescription = styled.span`
  @import "variables";
  display: none;
  font-weight: 500;
  font-size: 13px;
  line-height: 137%;
  color: $blue1;
  @include respond-to(small) {
    display: block;
  }
`;
const Title = styled.h3`
  @import "variables";
  font-weight: 600;
  font-size: 22px;
  line-height: 137%;
  margin: 0px 0px 32px 0px;
  @include respond-to(small) {
    font-size: 20px;
    margin: 0px 0px 24px 0px;
  }
`;
const TitleAdress = styled(Title)`
  @import "variables";
  margin: 0px 0px 8px 0px;
  @include respond-to(small) {
    margin: 0px 0px 12px 0px;
  }
`;
const PointsBlock = styled.div`
  @import "variables";
  display: flex;
  flex-direction: column;
  padding-right: 40px;
  margin-top: 221px;
  width: 21%;
  @media (max-width: 1350px) {
    display: none;
  }
  @include respond-to(small) {
    display: none;
  }
`;
const AvatarBlock = styled.div`
  @import "variables";
  min-width: 80px;
  min-height: 80px;
  border-radius: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: $blue-3;
  span[class="getPhoto"] {
    display: none;
  }
  svg {
    ellipse {
      fill: $blue1;
    }
    path {
      fill: $blue1;
    }
  }
  &:hover {
    span[class="default"] {
      display: none;
    }
    span[class="getPhoto"] {
      display: block;
    }
  }
  @include respond-to(small) {
    min-width: 60px;
    min-height: 60px;
  }
`;
const PointText = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 120%;
  opacity: 0.4;
  margin-bottom: 8px;
`;
const CountPoints = styled.span`
  font-weight: 600;
  font-size: 16px;
  line-height: 120%;
  margin-bottom: 16px;
`;
const FieldsLeft = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 120%;
  margin-top: 16px;
`;
const ProgressLine = styled.div`
  @import "variables";
  height: 4px;
  background: rgba($greenMain, 0.2);
  border-radius: 10px;
`;
const Line = styled.span`
  @import "variables";
  display: block;
  border-radius: 10px;
  height: 4px;
  background: $greenMain;
`;
