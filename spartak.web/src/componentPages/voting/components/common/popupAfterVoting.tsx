import styled from "styled-components";
import { IconCheckMark } from "../../../../assets/icon/iconCheckMark";
import { theme } from "../../../../assets/theme/theme";
import { langVoting } from "../lang/langVoting";
import { useRouter } from "next/router";

export const PopupAfterVoting = () => {
  const { locale = "ru" } = useRouter();
  return (
    <Container>
      <IconCheckMark color={theme.colors.green2} />
      {langVoting[locale].textAfterVoting}
    </Container>
  );
};

const Container = styled.div`
  font-family: "Roboto";
  font-weight: 400;
  position: absolute;
  right: 0;

  background-color: ${theme.colors.green2}30;
  font-size: 0.73vw;
  display: grid;
  grid-template-columns: 1.25vw 1fr;
  grid-column-gap: 0.42vw;
  padding: 0.42vw 0.83vw;
  width: 26.67vw;

  svg {
    font-size: 1.25vw;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    position: relative;
    font-size: 1.83vw;
    grid-template-columns: 3.13vw 1fr;
    grid-column-gap: 1.04vw;
    padding: 1.04vw 2.08vw;
    width: 100%;
    margin-bottom: 8.34vw;
    box-sizing: border-box;

    svg {
      font-size: 3.13vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.73vw;
    grid-template-columns: 6.4vw 1fr;
    grid-column-gap: 2.13vw;
    padding: 2.13vw 4.27vw;
    margin-bottom: 10.67vw;

    svg {
      font-size: 6.4vw;
    }
  }
`;
