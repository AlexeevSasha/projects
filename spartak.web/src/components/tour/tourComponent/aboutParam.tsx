import { useRouter } from "next/router";
import styled from "styled-components";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { theme } from "../../../assets/theme/theme";
import { IPriceBlock } from "../../../api/dto/IEscursionTour";

interface IProps {
  blockParams: IPriceBlock[];
}

export const AboutParam = (props: IProps) => {
  const { locale = "ru" } = useRouter();
  return (
    <Container>
      {props.blockParams?.map(
        (elem, i) =>
          elem && (
            <ParamContainer key={i}>
              <Text>{getLocalValue(elem?.label, locale)}</Text>
              <Price>{getLocalValue(elem?.value, locale)} ₽</Price>
            </ParamContainer>
          )
      )}
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1.25vw;

  grid-area: tourAboutParam;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-gap: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-gap: 6.4vw;
    grid-template-columns: 1fr;
  }
`;

const ParamContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.83vw;
  border: 1px solid ${theme.colors.grayDark};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 2.09vw 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 3.2vw;
  }
`;

const Text = styled.div`
  font-weight: 700;
  font-size: 0.94vw;
  color: ${({ theme }) => theme.colors.grayLight_black};
  height: 100%;
  margin-bottom: 0.83vw;
  text-transform: uppercase;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-weight: 600;
    font-size: 2.35vw;
    margin-bottom: 2.09vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-weight: 500;
    font-size: 4.27vw;
    margin-bottom: 1.07vw;
  }
`;

const Price = styled.div`
  font-weight: 700;
  font-size: 2.08vw;
  color: ${theme.colors.red};
  justify-self: flex-end;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 5.22vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-weight: 500;
    font-size: 8.53vw;
  }
`;
