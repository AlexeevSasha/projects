import React, { useMemo } from "react";
import { IconClock } from "../../../assets/icon/sokolniki/selectStadium/iconClock";
import { IconStack } from "../../../assets/icon/sokolniki/selectStadium/iconStack";
import { IconPlaceholder } from "../../../assets/icon/sokolniki/selectStadium/iconPlaceholder";
import { CheckIcon } from "../../../assets/icon/sokolniki/selectStadium/checkicon";
import { IconArrowRight } from "../../../assets/icon/iconArrowRight";
import styled from "styled-components";
import { theme } from "../../../assets/theme/theme";
import { useRouter } from "next/router";
import { lang } from "../../../../public/locales/lang";
import { NextImage } from "../../../ui/nextImage/nextImage";

interface IStadium {
  id: string;
  name: string;
  imgSrc: string;
  price: string;
  terms: string[];
  timeWorking: string;
  coating: string;
  size: string;
  isOpened: string;
}

const mockStadiumList: IStadium[] = [
  {
    id: "ed0341e2-010b-49d6-b567-d26dc1cd3565",
    name: "Футбольное поле №1",
    imgSrc: "/images/more/selectStadium/stadium1_v1.0.0.png",
    price: "от 3 600 ₽",
    terms: ["Подогрев поля", "Инвентарь", "Парковка", "Раздевалки / Душевые", "Трибуна 200 мест", "Освещение 250 Lx"],
    timeWorking: "с 07:00 до 23:00",
    coating: "Искуственная трава",
    size: "105 x 68 м",
    isOpened: "Открытое",
  },
  {
    id: "d406bd67-a95e-4486-ab8f-1f7ab1727f75",
    name: "Футбольное поле №2",
    imgSrc: "/images/more/selectStadium/stadium2_v1.0.0.png",
    price: "от 3 600 ₽",
    terms: ["Инвентарь", "Парковка", "Раздевалки / Душевые"],
    timeWorking: "с 07:00 до 23:00",
    coating: "Искуственная трава",
    size: "80 x 70 м",
    isOpened: "Открытое",
  },
  {
    id: "1afd5daa-4ef7-4d32-a90a-0c5825e307fe",
    name: "Футбольное поле №1",
    imgSrc: "/images/more/selectStadium/stadium1_v1.0.0.png",
    price: "от 3 600 ₽",
    terms: ["Подогрев поля", "Инвентарь", "Парковка", "Раздевалки / Душевые", "Трибуна 200 мест", "Освещение 250 Lx"],
    timeWorking: "с 07:00 до 23:00",
    coating: "Искуственная трава",
    size: "105 x 68 м",
    isOpened: "Открытое",
  },
  {
    id: "1463cafa-6c91-4d78-831e-88ddc85a64e6",
    name: "Футбольное поле №2",
    imgSrc: "/images/more/selectStadium/stadium2_v1.0.0.png",
    price: "от 3 600 ₽",
    terms: ["Инвентарь", "Парковка", "Раздевалки / Душевые", "Освещение 250 Lx"],
    timeWorking: "с 07:00 до 23:00",
    coating: "Искуственная трава",
    size: "80 x 70 м",
    isOpened: "Открытое",
  },
];

export const SelectStadiumItem = () => {
  const { locale } = useRouter();
  const t = useMemo(() => lang[locale ?? "ru"], [locale]);
  return (
    <>
      {mockStadiumList.length ? (
        mockStadiumList.map((stadium, index) => (
          <Stadium key={stadium.id} odd={index % 2 !== 0}>
            <Img odd={index % 2 !== 0}></Img><NextImage src={stadium.imgSrc} />
            <RightBlock>
              <Name>{stadium.name}</Name>

              <Conditions>
                <Condition>
                  <IconClock />
                  {stadium.timeWorking}
                </Condition>
                <Condition>
                  <IconStack />
                  {stadium.coating}
                </Condition>
                <Condition>
                  <IconPlaceholder />
                  {stadium.size}
                </Condition>
                <Condition>
                  <CheckIcon />
                  {stadium.isOpened}
                </Condition>
              </Conditions>

              <Terms>
                {stadium.terms.map((term, index) => (
                  <Term key={`t${index}`}>{term}</Term>
                ))}
              </Terms>

              <BottomContainer>
                {stadium.price}
                <ButtonReserve>
                  <IconArrowRight />
                  {t.more.aboutFields.bookField}
                </ButtonReserve>
              </BottomContainer>
            </RightBlock>
          </Stadium>
        ))
      ) : (
        <div>Nodata</div>
      )}
    </>
  );
};

const Stadium = styled.div<{ odd: boolean }>`
  display: grid;
  grid-column-gap: 6.98vw;
  grid-template-columns: ${({ odd }) => (odd ? "auto auto" : "auto auto")};
  grid-template-areas: ${({ odd }) => (odd ? '"rightArea leftArea"' : '"leftArea rightArea"')};
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-template-columns: auto;
    grid-template-areas: "leftArea" "rightArea";
    grid-row-gap: 2.61vw;
  }
  @media screen and (max-width: ${theme.rubberSize.phone}) {
    grid-row-gap: 3.2vw;
  }
`;

const Img = styled.div<{ odd: boolean }>`
  width: 34.9vw;
  height: 26.15vw;
  position: relative;  
  grid-area: leftArea;

  &:after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: linear-gradient(89.11deg, rgba(13, 17, 22, 0) 0.77%, #0d1116 102.31%);
    transform: ${({ odd }) => odd && "rotate(-180deg)"};
  }
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 93.87vw;
    height: 47.72vw;
    &:after {
      background: linear-gradient(180.11deg, rgba(13, 17, 22, 0) 0.77%, #0d1116 95.31%);
      transform: none;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 91.47vw;
    height: 40vw;
  }
`;

const RightBlock = styled.div`
  display: flex;
  flex-direction: column;
  grid-area: rightArea;
`;

const Name = styled.h3`
  font-size: 2.08vw;
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  margin: 0 0 2.08vw;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 4.17vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 6.4vw;
  }
`;

const Conditions = styled.div`
  display: flex;
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    gap: 2.13vw;
    flex-wrap: wrap;
  }
`;

const Condition = styled.div`
  display: grid;
  grid-template-columns: 1.04vw auto;
  font-size: 0.94vw;
  padding: 1.46vw 0.52vw;
  align-items: center;
  grid-column-gap: 0.73vw;
  background: ${theme.colors.blackLight};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: 2.61vw auto;
    grid-column-gap: 1.83vw;
    padding: 2.22vw 1.3vw;
    font-size: 2.09vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-template-columns: 4.27vw auto;
    grid-column-gap: 3.2vw;
    padding: 2.13vw 2.93vw;
    font-size: 4.27vw;
  }
`;

const Terms = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-right: 3.07vw;
  row-gap: 1.67vw;
  column-gap: 1.25vw;
  margin-top: 3.02vw;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding-right: 0;
    column-gap: 3.13vw;
    row-gap: 4.69vw;
    margin-top: 3.13vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    column-gap: 3.2vw;
    row-gap: 4.27vw;
    margin-top: 5.33vw;
  }
`;

const Term = styled.div`
  font-size: 0.94vw;
  padding-left: 1.88vw;
  position: relative;
  width: 10.83vw;
  &:before {
    content: url("/images/stadium/RedPoint.svg");
    display: inline-block;
    width: 1.25vw;
    height: 1.25vw;
    position: absolute;
    left: 0;
  }
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.09vw;
    padding-left: 4.69vw;
    width: 24.51vw;
    &:before {
      width: 3.13vw;
      height: 3.13vw;
    }
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.73vw;
    padding-left: 6.4vw;
    width: 37.7vw;
    &:before {
      width: 4.27vw;
      height: 4.27vw;
    }
  }
`;

const BottomContainer = styled.div`
  display: flex;
  margin-top: auto;
  justify-content: space-between;
  font-size: 1.67vw;
  font-weight: bold;
  align-items: center;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-top: 4.95vw;
    font-size: 4.17vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-top: 5.33vw;
    font-size: 4.27vw;
  }
`;

const ButtonReserve = styled.button`
  font-family: "FCSM Text", sans-serif;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  text-transform: uppercase;
  column-gap: 0.2vw;
  padding: 0.73vw 1.25vw;
  font-size: 0.73vw;
  color: ${theme.colors.white};
  background-color: ${theme.colors.red};
  border: none;
  transition: 0.3s ease;
  svg {
    width: 1.04vw;
    height: 1.04vw;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.83vw;
    padding: 1.83vw 3.13vw;
    column-gap: 1.04vw;

    & svg {
      width: 2.61vw;
      height: 2.61vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 1.6vw 3.2vw;
    font-size: 3.73vw;
    column-gap: 2.13vw;
    & svg {
      width: 5.33vw;
      height: 5.33vw;
    }
  }

  &:hover {
    background-color: ${theme.colors.redDark};
  }

  &:active {
    transform: scale(1.05);
  }
`;
