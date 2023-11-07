import styled from "astroturf/react";
import { Button } from "common/components/Button";
import { IconArraySmall } from "common/components/icons/IconArraySmall";
import { IconDistribution } from "common/components/icons/IconDistribution";
import { IconOrder } from "common/components/icons/IconOrder";
import { IconPointsCircle } from "common/components/icons/IconPoints";
import { IconShop } from "common/components/icons/IconShop";
import Link from "next/link";

type Props = {
  points: number;
};

export const ProfileMobileMenu = ({ points }: Props) => {
  return (
    <MenuBlock>
      <MenuList>
        <LinkWrapper>
          <IconBlock>
            <IconOrder color={"#5383C7"} size="lg" />
            <ProfileMenuLink href="/profile/orders">Заказы</ProfileMenuLink>
          </IconBlock>
          <IconArraySmall rotate="270deg" size="md" />
        </LinkWrapper>
        <CustomLine />
        <LinkWrapper>
          <IconBlock>
            <IconShop />
            <ProfileMenuLink href="/profile/pharmacies">Аптеки</ProfileMenuLink>
          </IconBlock>
          <IconArraySmall rotate="270deg" size="md" />
        </LinkWrapper>
        <CustomLine />
        <LinkWrapper>
          <IconBlock>
            <IconDistribution />
            <ProfileMenuLink href="/profile/distributions">Рассылка</ProfileMenuLink>
          </IconBlock>
          <IconArraySmall rotate="270deg" size="md" />
        </LinkWrapper>
        <CustomLine />
        <LinkWrapper>
          <IconBlock>
            <IconPointsCircle />
            <ProfileMenuLink href="/profile/points">
              Баллы <span>{points}</span>
            </ProfileMenuLink>
          </IconBlock>
          <IconArraySmall rotate="270deg" size="md" />
        </LinkWrapper>
      </MenuList>
      <CustomButton>Выйти из аккаунта</CustomButton>
    </MenuBlock>
  );
};
const MenuBlock = styled.div`
  @import "variables";
  background: $white;
  display: flex;
  flex-direction: column;
  padding: 12px 16px;
  border-radius: 28px;
  margin-bottom: 8px;
`;
const MenuList = styled.div`
  display: flex;
  flex-direction: column;
`;
const CustomButton = styled(Button)`
  @import "variables";
  border-radius: 12px;
  padding: 14.5px 0px;
  height: 52px;
  margin-top: 8px;
  color: $orange3;
  background: rgba(255, 120, 90, 0.1);
  &:hover {
    background: rgba(255, 120, 90, 0.3);
  }
`;
const LinkWrapper = styled.div<{ active?: boolean }>`
  @import "variables";
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 8px;
  svg {
    width: 24px;
    height: 24px;
    opacity: 0.2;
    @include transition();
    g {
      opacity: 1;
    }
  }
`;
const CustomLine = styled.hr`
  width: 100%;
  margin: 0;
  border-color: #7aa0db;
  opacity: 0.2;
`;
const IconBlock = styled.div`
  display: flex;
  align-items: center;
`;
const ProfileMenuLink = styled(Link)`
  @import "variables";
  color: $black;
  font-size: 16px;
  font-weight: 600;
  padding-left: 12px;
  span {
    color: $blue2;
  }
`;
