import styled from "astroturf/react";
import { Product } from "modules/products/components/Product";
import { useRef, useState } from "react";
import { Button } from "../Button";
import { IconSearch } from "../icons/IconSearch";
import { InputStyle } from "../inputs/Input";
import { NextImage } from "../NextImage";
import { IconVoice } from "../icons/IconVoice";
import useOutsideClose from "../../hooks/useOutsideClose";
import Link from "next/link";

type Props = {
  openResult?: (v: boolean) => void;
};

export const SearchInputInHeader = ({ openResult }: Props) => {
  const [result, setResult] = useState(false);
  const ref = useRef(null);

  useOutsideClose(ref, () => {
    setResult(false);
    openResult?.(false);
  });

  return (
    <Container ref={ref}>
      <InputContainer>
        <ContainerIcon>
          <IconSearch />
        </ContainerIcon>
        <CustomInput
          onClick={() => {
            setResult(!result);
            openResult?.(!result);
          }}
          placeholder="Найти товар, вещество, симптом, болезнь "
        />
        <ButtonSearch typeBtn="lightBlue">Найти</ButtonSearch>
        <ContainerIconVoice>
          <IconVoice />
        </ContainerIconVoice>

        <ContainerResult show={!!result}>
          <DrugsContainer>
            <Drugs>Фаризулин</Drugs>
            <Drugs>Фарингосепт</Drugs>
            <Drugs>Фарингомед</Drugs>
            <Drugs>Фаризулин</Drugs>
          </DrugsContainer>
          <ContainerCategory>
            <Title>Люди часто ищут</Title>
            <Link href={"/product/metacatalogue/medicinal-product"}>
              <CategoryElem>
                <CategoryElemContainerImage>
                  <CategoryElemImage>
                    <NextImage
                      src={
                        "https://imshop-dev-s3.aforte.ru/imshop-media-dev/categories/lekarstvennie_sredstva.png"
                      }
                      alt="asd"
                    />
                  </CategoryElemImage>
                </CategoryElemContainerImage>
                <div>
                  <CategoryElemTitle>Средства от простуды и гриппа</CategoryElemTitle>
                  <CategoryElemDescription>Лекарственные средства</CategoryElemDescription>
                </div>
              </CategoryElem>
            </Link>
            <Link href={"/product/metacatalogue/active-ingredient"}>
              <CategoryElem>
                <CategoryElemContainerImage>
                  <CategoryElemImage>
                    <NextImage
                      src={
                        "https://imshop-dev-s3.aforte.ru/imshop-media-dev/categories/lekarstvennie_sredstva.png"
                      }
                      alt="asd"
                    />
                  </CategoryElemImage>
                </CategoryElemContainerImage>
                <div>
                  <CategoryElemTitle>Фаризулин</CategoryElemTitle>
                  <CategoryElemDescription>Вещество</CategoryElemDescription>
                </div>
              </CategoryElem>
            </Link>
            <Link href={"/product/metacatalogue/manufacturer"}>
              <CategoryElem>
                <CategoryElemContainerImage>
                  <CategoryElemImage>
                    <NextImage
                      src={
                        "https://imshop-dev-s3.aforte.ru/imshop-media-dev/categories/lekarstvennie_sredstva.png"
                      }
                      alt="asd"
                    />
                  </CategoryElemImage>
                </CategoryElemContainerImage>
                <div>
                  <CategoryElemTitle>Файзер</CategoryElemTitle>
                  <CategoryElemDescription>Производитель</CategoryElemDescription>
                </div>
              </CategoryElem>
            </Link>
          </ContainerCategory>
          <ContainerProducts>
            <Product.ListItem />
            <Product.ListItem />
            <Product.ListItem />
            <Product.ListItem />
            <ButtonShowMore typeBtn="lightBlue">Показать 45 товаров</ButtonShowMore>
          </ContainerProducts>
        </ContainerResult>
      </InputContainer>
    </Container>
  );
};
const Container = styled.div`
  @import "variables";

  margin-left: 6px;
  width: 55%;

  @include respond-to(small) {
    width: 100%;
    margin: 0;
  }
`;

const InputContainer = styled.div`
  position: relative;
`;

const ContainerIcon = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 14px;
  display: flex;
`;

const CustomInput = styled(InputStyle)`
  @import "variables";

  padding: 14px 108px 14px 45px;
  border: none;

  /* Chrome, Firefox, Opera, Safari 10.1+ */
  &::placeholder {
    color: $blue-1;
    opacity: 1; /* Firefox */
  }

  /* Internet Explorer 10-11 */
  &:-ms-input-placeholder {
    color: $blue-1;
  }

  /* Microsoft Edge */
  &::-ms-input-placeholder {
    color: $blue-1;
  }

  @include respond-to(small) {
    padding: 11px 45px;
  }
`;

const ButtonSearch = styled(Button)`
  @import "variables";

  position: absolute;
  padding: 13px 24px;
  width: fit-content;
  border-radius: 12px;
  font-size: 14px;

  top: 50%;
  transform: translateY(-50%);
  right: 4px;

  @include respond-to(small) {
    display: none;
  }
`;

const ContainerIconVoice = styled.div`
  @import "variables";

  display: none;
  position: absolute;
  width: 20px;
  height: 20px;

  top: 50%;
  transform: translateY(-50%);
  right: 12px;

  @include respond-to(small) {
    display: block;
  }
`;

const ContainerResult = styled.div<{ show?: boolean }>`
  @import "variables";

  position: absolute;
  width: 100%;
  height: 0;
  overflow: hidden;
  background-color: $white;
  z-index: 9;
  top: 56px;
  border-radius: 20px;

  @include transition();

  &.show {
    max-height: 775px;
    height: auto;
    overflow: auto;
    padding: 12px;
  }

  @include respond-to(small) {
    background-color: transparent;

    &.show {
      height: calc(100vh - 176px);
      padding: 12px 0;
    }
  }
`;

const DrugsContainer = styled.div`
  @import "variables";

  display: flex;
  flex-wrap: wrap;

  @include respond-to(small) {
    flex-wrap: nowrap;
    overflow-x: auto;
  }
`;

const Drugs = styled.div`
  @import "variables";

  background: $blue-3;
  color: $blue1;
  padding: 10px 16px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  margin: 0 8px 8px 0;

  @include respond-to(small) {
    background: $white;
    border-radius: 16px;
    padding: 12px 16px;
  }
`;

const ContainerCategory = styled.div`
  @import "variables";

  display: flex;
  flex-direction: column;
  margin-bottom: 8px;

  @include respond-to(small) {
    background: $white;
    border-radius: 28px;
    padding: 20px;
  }
`;

const Title = styled.div`
  @import "variables";

  font-weight: 600;
  font-size: 16px;
  margin: 16px 0 4px 8px;

  @include respond-to(small) {
    margin: 0 0 16px 0;
  }
`;

const CategoryElem = styled.div`
  @import "variables";

  padding: 8px;
  display: flex;
  align-items: center;
  cursor: pointer;

  @include respond-to(small) {
    padding: 8px 0;
  }
`;

const CategoryElemContainerImage = styled.div`
  @import "variables";

  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: $blue-2;
  opacity: 0.3;
  margin-right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CategoryElemImage = styled.div`
  width: 32px;
  height: 32px;
`;

const CategoryElemTitle = styled.div`
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 4px;
`;

const CategoryElemDescription = styled.div`
  @import "variables";

  font-weight: 500;
  font-size: 13px;
  color: $black;
  opacity: 0.4;
`;

const ContainerProducts = styled.div`
  @import "variables";

  display: flex;
  flex-direction: column;
  border-top: 1px solid $blue-2;
  padding: 8px 0;

  @include respond-to(small) {
    border: none;
    background: $white;
    border-radius: 28px;

    & > div:nth-last-child(-n + 2) {
      border-bottom: none;
    }
  }
`;

const ButtonShowMore = styled(Button)`
  @import "variables";

  padding: 19px;
  font-size: 14px;
  margin-top: 12px;

  @include respond-to(small) {
    border: none;
    margin: 8px 20px 20px;
    background: $blue1 !important;
    color: white !important;
  }
`;
