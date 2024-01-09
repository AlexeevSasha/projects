import Image from "next/image";
import styled from "styled-components";
import { theme } from "../../../assets/theme/theme";
import { IChairPlotting } from "../../../../pages/more/loyalty/chairPlotting";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { useRouter } from "next/router";

export const ChairPlottingContent = (props: IChairPlotting["info"]) => {
  const { locale = "ru" } = useRouter();
  return (
    <Content>
      <Container>
        <div dangerouslySetInnerHTML={{ __html: getLocalValue(props?.description, locale) }} />
        <ImgComtainer>
          <Image src={getLocalValue(props?.img, locale) || ""} alt={"Chair plotting"} layout={"fill"} />
        </ImgComtainer>
      </Container>
    </Content>
  );
};

const Content = styled.div`
  padding: 0 8.75vw 0;
  color: ${({ theme }) => theme.colors.white_black};
  font-family: "FCSM Text", sans-serif;
  margin-bottom: 6.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 0 3.13vw;
    margin-bottom: 10.43vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 0 4.27vw;
    margin-bottom: 10.666vw;
  }
`;
const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  margin-top: 4.17vw;
  grid-row-gap: 4.17vw;
  font-size: 0.94vw;

  a {
    text-decoration: none;
    color: ${theme.colors.fireEngineRed};
  }

  ul {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;

    li {
      display: flex;
      align-items: center;
    }

    li::before {
      padding-right: 0.63vw;
      min-height: 2.08vw;
      min-width: 2.08vw;
      content: url("/images/stadium/RedPoint.svg");

      @media screen and (max-width: ${theme.rubberSize.desktop}) {
        padding-right: 1.56vw;
        min-height: 5.22vw;
        min-width: 5.22vw;
      }
      @media screen and (max-width: ${theme.rubberSize.tablet}) {
        padding-right: 3.2vw;
        min-height: 6.4vw;
        min-width: 6.4vw;
      }
    }
  }
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin: 5.22vw 0 0;
    grid-template-columns: 1fr;
    grid-row-gap: 5.22vw;
    font-size: 2.35vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin: 10.67vw 0 0;
    grid-row-gap: 10.67vw;
    font-size: 4.27vw;
  }
`;

const ImgComtainer = styled.div`
  width: 29.58vw;
  height: 24.06vw;
  position: relative;
  margin: 3.854vw 0 0 5.31vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 55.28vw;
    margin: 0 auto;
    height: 44.98vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 58.93vw;
    height: 48vw;
  }
`;
