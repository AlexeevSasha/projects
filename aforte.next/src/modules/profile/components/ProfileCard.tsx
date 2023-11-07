import styled from "astroturf/react";
import { ReactElement } from "react";

type Props = {
  icon: ReactElement;
  title: string;
  description: string;
  order?: boolean;
  points?: boolean;
};

export const ProfileCard = ({ icon, title, description, order }: Props) => {
  return (
    <Wrapper>
      <AvatarBlock>{icon}</AvatarBlock>
      <TitleCard>{title}</TitleCard>
      <DescriptionCard order={order}>{description}</DescriptionCard>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  @import "variables";
  background: $white;
  border-radius: 32px;
  height: 200px;
  width: 33.3%;
  margin-right: 20px;
  padding: 32px;
  &:last-child {
    margin-right: 0;
  }
  &:hover {
    box-shadow: $shadowHoverCard;
  }

  @include respond-to(medium) {
    width: 100%;
    margin-right: 0;
    margin-bottom: 16px;
  }
  @include respond-to(small) {
    &:hover {
      box-shadow: none;
    }
  }
`;
const AvatarBlock = styled.div`
  @import "variables";
  width: 60px;
  height: 60px;
  border-radius: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(109, 196, 123, 0.2);
  svg {
    width: 22px;
    height: 22px;
    opacity: 1;
    path {
      fill: $greenMain;
    }
    g {
      opacity: 1;
      path {
        fill: $greenMain;
      }
    }
  }
`;
const TitleCard = styled.p`
  margin: 20px 0px 8px 0px;
  font-size: 20px;
  font-weight: 600;
`;
const DescriptionCard = styled.span<{ order?: boolean }>`
  @import "variables";
  font-weight: 500;
  font-size: 15px;
  opacity: 0.4;
  &.order {
    color: $blue1;
    opacity: 1;
  }
`;
