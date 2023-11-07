import styled from "astroturf/react";
import { IconCross } from "common/components/icons/IconCross";
import { NextImage } from "common/components/NextImage";
import Link from "next/link";
import { useRef, useState } from "react";
import { Button } from "../../../common/components/Button";

type Props = {
  settings?: boolean;
  distributions?: boolean;
};

export const ProfileBanner = ({ settings, distributions }: Props) => {
  const [close, setClose] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  const toggle = () => {
    setClose((prev) => !prev);
    setTimeout(() => {
      if (ref && ref.current) {
        ref.current.remove();
      }
    }, 200);
  };

  return (
    <BannerWrapper settings={settings || distributions} close={close} ref={ref}>
      <ImageContainer settings={settings || distributions}>
        <NextImage
          src={distributions ? "/images/polza.png" : "/images/savePoints.png"}
          alt={"review"}
        />
      </ImageContainer>
      <InfoBanner settings={settings || distributions}>
        <InfoTitle settings={settings || distributions}>
          {distributions ? "Подарим промокод на скидку 10% за подписку" : "Получите 500 баллов"}
        </InfoTitle>
        <ActionBlock>
          <InfoDescription settings={settings || distributions}>
            {distributions
              ? "Подпишитесь на рассылку скидок и акций и получите промокод на скидку 10% на следующий заказ"
              : "Расскажите о себе в настройках профиля и получите 500 баллов на следующий заказ"}
          </InfoDescription>
          {!settings && !distributions && (
            <Link href="/profile/settings">
              <CustomButton typeBtn={"blue"}>Заполнить информацию</CustomButton>
            </Link>
          )}
        </ActionBlock>
      </InfoBanner>
      {(settings || distributions) && (
        <Close onClick={toggle}>
          <IconCross />
        </Close>
      )}
    </BannerWrapper>
  );
};

const BannerWrapper = styled.div<{ settings?: boolean; close?: boolean }>`
  @import "variables";
  margin-top: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  width: 100%;
  background: $white;
  border-radius: 40px;
  margin-bottom: 40px;
  opacity: 1;
  transition: opacity 0.2s ease-in-out;
  &.settings {
    margin-top: 20px;
    margin-bottom: 0px;
    border-radius: 32px;
    padding-right: 28px;
    &.close {
      opacity: 0;
    }
  }

  @include respond-to(large) {
    flex-direction: column;
    align-items: center;
    &.settings {
      flex-direction: row;
      align-items: center;
    }
  }
  @include respond-to(small) {
    margin: 0px 0px 8px 0px;
    &.settings {
      display: none;
    }
  }
`;

const ImageContainer = styled.div<{ settings?: boolean }>`
  @import "variables";
  max-width: 120px;
  width: 100%;
  margin: 20px 32px 20px 32px;
  &.settings {
    max-width: 80px;
    margin: 20px 24px 20px 28px;
    div {
      max-height: 80px;
    }
  }
  div {
    max-height: 120px;
  }

  @include respond-to(large) {
    border-radius: 28px;
    width: fit-content;
    padding: 20px 89.5px;
    border-radius: 28px;
    background: $grey;
    max-width: 100%;
    div {
      height: 140px;
      min-width: 140px;
      margin: 0;
      padding: 20px;
    }
    &.settings {
      div {
        height: 80px;
        width: 80px;
      }
    }
  }
`;
const InfoBanner = styled.div<{ settings?: boolean }>`
  @import "variables";
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 38.5px 32px 38.5px 0px;
  &.settings {
    margin: 37.5px 0px 37.5px 0px;
  }

  @include respond-to(large) {
    align-items: center;
    padding: 0px 20px 20px 20px;
    margin: 0;
  }
  &.settings {
    margin: 37.5px 0px 37.5px 0px;
    align-items: flex-start;
    padding: 0;
  }
`;
const ActionBlock = styled.div`
  @import "variables";
  display: flex;
  justify-content: space-between;
  button {
    margin-left: auto;
  }

  @include respond-to(large) {
    flex-direction: column;
    button {
      margin-left: 0px;
    }
  }
`;
const InfoTitle = styled.span<{ settings?: boolean }>`
  font-weight: 600;
  font-size: 20px;
  padding-bottom: 8px;
  &.settings {
    font-size: 18px;
    padding-bottom: 4px;
  }
`;
const InfoDescription = styled.span<{ settings?: boolean }>`
  @import "variables";
  font-weight: 400;
  font-size: 14px;
  max-width: 418px;
  line-height: 24px;
  &.settings {
    opacity: 0.4;
    max-width: 100%;
  }
  @include respond-to(large) {
    margin-bottom: 20px;
    text-align-last: center;
    &.settings {
      text-align-last: left;
    }
  }
`;
const CustomButton = styled(Button)`
  @import "variables";
  border-radius: 16px;
  padding: 16px 40px;
  height: 52px;
  @include respond-to(large) {
    width: 100%;
  }
`;
const Close = styled.span`
  @import "variables";
  cursor: pointer;
  height: fit-content;
  align-self: center;
  display: flex;
  align-items: center;
  border-radius: 40px;
  padding: 12px;
  background: $blue-3;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: rotate(90deg);
  }
  @include respond-to(small) {
    display: none;
  }
`;
