import styled from "astroturf/react";
import { phoneNumberFormatted } from "../utils/phoneNumberFormatted";
import Link from "next/link";
import { IconPointsCircle } from "common/components/icons/IconPoints";
import { IconOrder } from "../../../common/components/icons/IconOrder";
import { IconHome } from "common/components/icons/IconHome";
import { IconShop } from "common/components/icons/IconShop";
import { IconDistribution } from "common/components/icons/IconDistribution";
import { IconPerson } from "common/components/icons/IconPerson";
import { IconPhoto } from "common/components/icons/IconPhoto";
import { UserT } from "../interfaces/user";
import { useRouter } from "next/router";

type Props = {
  user: UserT;
};

export const ProfileAside = ({ user }: Props) => {
  const router = useRouter();
  return (
    <ProfileWrapper>
      <Info>
        <AvatarBlock>
          <span className="default">
            <IconPerson />
          </span>
          <span className="getPhoto">
            <IconPhoto />
          </span>
        </AvatarBlock>
        <Name>
          {user.surname} {user.name}
        </Name>
        <Phone>{phoneNumberFormatted(user.phone)}</Phone>
        <CustomLink href="/profile/settings">Изменить профиль</CustomLink>
      </Info>
      <ProfileMenu>
        <LinkWrapper active={router.pathname === "/profile"}>
          <IconHome />
          <ProfileMenuLink href="/profile">Главная</ProfileMenuLink>
        </LinkWrapper>
        <LinkWrapper
          active={
            router.pathname === "/profile/orders" || router.pathname.includes("/profile/orders/")
          }
        >
          <IconOrder color={"#5383C7"} />
          <ProfileMenuLink href="/profile/orders">Заказы</ProfileMenuLink>
        </LinkWrapper>
        <LinkWrapper>
          <IconShop />
          <ProfileMenuLink href="/profile/pharmacies">Аптеки</ProfileMenuLink>
        </LinkWrapper>
        <LinkWrapper active={router.pathname === "/profile/distributions"}>
          <IconDistribution />
          <ProfileMenuLink href="/profile/distributions">Рассылка</ProfileMenuLink>
        </LinkWrapper>
        <LinkWrapper active={router.pathname === "/profile/points"}>
          <IconPointsCircle />
          <ProfileMenuLink href="/profile/points">
            Баллы <span>{user.points}</span>
          </ProfileMenuLink>
        </LinkWrapper>
      </ProfileMenu>
      <CustomButton>Выйти из аккаунта</CustomButton>
    </ProfileWrapper>
  );
};

const ProfileWrapper = styled.div`
  @import "variables";
  position: sticky;
  top: 100px;
  border-radius: 32px;
  background: $white;
  width: 100%;
  padding: 32px 0px 0px 32px;
  margin-bottom: 40px;
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
`;
const Name = styled.p`
  margin: 16px 0 4px 0px;
  font-size: 24px;
  font-weight: 600;
`;
const Phone = styled.span`
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.02em;
  opacity: 0.4;
`;
const CustomLink = styled(Link)`
  @import "variables";
  margin-top: 12px;
  font-size: 14px;
  font-weight: 600;
  color: $blue1;

  &:hover {
    color: $blue2;
  }
`;
const ProfileMenu = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 28px;
  :last-child {
    margin-bottom: 0px;
  }
`;
const ProfileMenuLink = styled(Link)`
  @import "variables";
  color: $black;
  font-size: 16px;
  font-weight: 500;
  padding-left: 12px;
  span {
    color: $blue2;
  }
`;

const LinkWrapper = styled.div<{ active?: boolean }>`
  @import "variables";
  display: flex;
  align-items: center;
  width: fit-content;
  margin-bottom: 24px;
  svg {
    width: 22px;
    height: 22px;
    opacity: 0.2;
    @include transition();
    g {
      opacity: 1;
    }
  }
  &:hover,
  &.active {
    a {
      font-weight: 600;
      font-size: 16px;
    }
    svg {
      opacity: 1;
    }
  }
`;
const CustomButton = styled.button`
  @import "variables";
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
  color: $orange3;
  font-size: 16px;
  font-weight: 500;
  margin: 32px 0px 32px 0px;
  &:hover {
    @include transition();
    font-weight: 600;
  }
`;
const AvatarBlock = styled.div`
  @import "variables";
  width: 80px;
  height: 80px;
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
`;
