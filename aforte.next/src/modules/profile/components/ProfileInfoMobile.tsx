import styled from "astroturf/react";
import { IconPerson } from "common/components/icons/IconPerson";
import { IconPhoto } from "common/components/icons/IconPhoto";
import { phoneNumberFormatted } from "../utils/phoneNumberFormatted";
import { IconArraySmall } from "common/components/icons/IconArraySmall";
import { UserT } from "../interfaces/user";
import Link from "next/link";

type Props = {
  user: UserT;
};

export const ProfileInfoMobile = ({ user }: Props) => {
  return (
    <Link href="/profile/settings">
      <ProfileMobile>
        <DataWrapper>
          <AvatarBlock>
            <span className="default">
              <IconPerson />
            </span>
            <span className="getPhoto">
              <IconPhoto />
            </span>
          </AvatarBlock>
          <ProfileInfo>
            <UserName>{user.surname} {user.name}</UserName>
            <UserPhone>{phoneNumberFormatted(user.phone)}</UserPhone>
          </ProfileInfo>
        </DataWrapper>
        <IconArraySmall rotate="270deg" size="md" />
      </ProfileMobile>
    </Link>
  );
};
const ProfileMobile = styled.div`
  @import "variables";
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: $white;
  cursor: pointer;
  padding: 16px 28px 16px 16px;
  border-radius: 28px;
  width: 100%;
  margin-bottom: 8px;
  margin-top: 8px;
`;
const DataWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const AvatarBlock = styled.div`
  @import "variables";
  width: 60px;
  height: 60px;
  border-radius: 44px;
  margin-right: 16px;
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
    background: $blue-3;
    span[class="default"] {
      display: none;
    }
    span[class="getPhoto"] {
      display: block;
    }
  }
`;
const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
`;
const UserName = styled.p`
  font-weight: 600;
  font-size: 18px;
  margin: 0px;
`;
const UserPhone = styled.p`
  font-weight: 500;
  font-size: 13px;
  opacity: 0.4;
  margin: 4px 0px 0px 0px;
`;
