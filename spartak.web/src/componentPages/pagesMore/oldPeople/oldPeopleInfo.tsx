import { useRouter } from "next/router";
import styled from "styled-components";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { IconRedPoint } from "../../../assets/icon/iconRedPoint";
import { theme } from "../../../assets/theme/theme";
import { ContainerContent } from "../../../components/containers/containerContent";
import { NextImage } from "../../../ui/nextImage/nextImage";
import { CustomButton } from "../../../components/buttons/customButton";
import { IconArrowRight } from "../../../assets/icon/iconArrowRight";
import { lang } from "../../../../public/locales/lang";

interface IProps {
  info: any;
  additional: any;
}

export const OldPeopleInfo = (props: IProps) => {
  const { locale = "ru", push } = useRouter();

  return (
    <CustomContainerContent>
      <Title>{getLocalValue(props.info.title, locale)}</Title>
      <ContainerTextWithImg>
        <ContainerImg>
          <NextImage src={props.info.firstImg.Ru} alt="спартак фанаты ветеранов" objectFit="cover" quality={100} />
        </ContainerImg>
        <Text dangerouslySetInnerHTML={{ __html: getLocalValue(props.info.descriptionFirst, locale) }} />
      </ContainerTextWithImg>
      <ContainerText>
        <Text dangerouslySetInnerHTML={{ __html: getLocalValue(props.info.descriptionFirstLong, locale) }} />
      </ContainerText>
      <ContainerTextWithImg positionRevert>
        <Text positionRevert dangerouslySetInnerHTML={{ __html: getLocalValue(props.info.descriptionSecond, locale) }} />
        <ContainerImg positionRevert>
          <NextImage src={props.info.secondImg.Ru} alt="спартак фанаты ветеранов" objectFit="cover" quality={100} />
        </ContainerImg>
      </ContainerTextWithImg>
      <ContainerText>
        <Text dangerouslySetInnerHTML={{ __html: getLocalValue(props.info.descriptionSecondLong, locale) }} />
      </ContainerText>
      <ButtonContainer>
        <CustomButton
          type={"red"}
          onClick={() => push(getLocalValue(props.info.buttonLink, locale))}
        >
          <IconArrowRight stroke={theme.colors.white} />
          {getLocalValue(props.info.buttonName, locale)}
        </CustomButton>
      </ButtonContainer>

      <List>
        {props.additional?.map((elem: any, index: number) => (
          <li key={index}>
            <IconRedPoint ts={"5.22vw"} /> <span dangerouslySetInnerHTML={{ __html: getLocalValue(elem, locale) }} />
          </li>
        ))}
      </List>
    </CustomContainerContent>
  );
};

const CustomContainerContent = styled(ContainerContent)`
  font-family: "FCSM Text", sans-serif;
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 2.08vw;
  width: 75vw;
  margin: 4.17vw 16.25vw 0 8.75vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 93.87vw;
    grid-row-gap: 5.22vw;
    margin: 10.43vw auto auto;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-top: 8.53vw;
    width: 91.47vw;
    grid-row-gap: 6.4vw;
  }
`;

const Title = styled.h3`
  font-family: "FCSM Text", sans-serif;
  color: ${({ theme }) => theme.colors.white_black};
  font-size: 3.23vw;
  font-weight: 700;
  line-height: 1;
  margin: 0 0;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 6.78vw;
    /* margin-bottom: 5.22vw; */
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 8.53vw;
    /* margin-bottom: 4.27vw; */
  }
`;

const ContainerTextWithImg = styled.div<{ positionRevert?: boolean }>`
  margin: 0;
  display: grid;
  grid-template-columns: ${(props) => (props.positionRevert ? "1fr 34.9vw" : "34.9vw 1fr")};
  grid-column-gap: 2.08vw;

  p:first-child {
    margin: 0;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: 1fr;
    grid-row-gap: 5.22vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-row-gap: 6.4vw;
  }
`;

const ContainerText = styled.div`
  margin: 0;
`;

const Text = styled.span<{ positionRevert?: boolean }>`
  font-weight: 500;
  font-size: 1.25vw;
  line-height: 1.77vw;
  color: ${({ theme }) => theme.colors.gray_black};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 3.13vw;
    line-height: 4.43vw;
    grid-row-start: ${(props) => (props.positionRevert ? "2" : "")};
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
    line-height: 5.87vw;
  }
`;

const ContainerImg = styled.span<{ positionRevert?: boolean }>`
  position: relative;

  &:after {
    background: ${({ theme }) => theme.gradients.oldPeople};
    transform: ${(props) => (props.positionRevert ? "matrix(-1, 0, 0, 1, -1, 0)" : "")};
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    content: " ";
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    height: 53.19vw;
    grid-row-start: ${(props) => (props.positionRevert ? "1" : "")};

    &:after {
      background: linear-gradient(178.83deg, rgba(13, 17, 22, 0) 1%, #0d1116 99%);
      transform: none;
    }
  }
`;

const List = styled.ul`
  color: ${({ theme }) => theme.colors.gray_black};
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 0.83vw;

  a {
    text-decoration: none;
    color: ${theme.colors.red};
  }

  li {
    display: grid;
    grid-template-columns: 2.08vw 1fr;
    font-size: 1.25vw;
    font-weight: 500;
    grid-column-gap: 1.25vw;
    align-items: center;

    span {
      align-self: center;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-row-gap: 2.09vw;
    li {
      grid-template-columns: 5.22vw 1fr;
      font-size: 2.35vw;
      grid-column-gap: 3.13vw;
    }
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-row-gap: 4.27vw;
    li {
      grid-template-columns: 6.4vw 1fr;
      font-size: 4.27vw;
      grid-column-gap: 3.2vw;
    }
  }
`;

const ButtonContainer = styled.div`
  width: fit-content;
  height: min-content;



  div {
    column-gap: 0.42vw;
    svg {
      path {
        stroke: ${theme.colors.white};
      }
    }
    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      column-gap: 1.04vw;
    }
    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      column-gap: 2.13vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: auto;
  }
`;
