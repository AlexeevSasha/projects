import { useRouter } from "next/router";
import styled from "styled-components";
import { LocaleType } from "../../../api/dto/LocaleType";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { IconInfo } from "../../../assets/icon/iconInfo";
import { theme } from "../../../assets/theme/theme";

interface IProps {
  text?: LocaleType;
}

export const TourWarning = (props: IProps) => {
  const { locale = "ru" } = useRouter();

  return (
    <Alert>
      <IconInfo />
      <AlertText dangerouslySetInnerHTML={{ __html: getLocalValue(props.text, locale) }} />
    </Alert>
  );
};

const Alert = styled.div`
  font-family: "Roboto", sans-serif;
  background: rgba(204, 18, 45, 0.1);
  display: grid;
  grid-template-columns: 1.25vw 1fr;
  grid-gap: 0.41vw;
  padding: 0.41vw 0.83vw;
  font-size: 1.25vw; // Для svg иконки
  color: ${({ theme }) => theme.colors.white_black};
  box-sizing: border-box;

  align-self: flex-end;
  grid-area: tourWarning;

  & svg,
  & a {
    color: ${theme.colors.red};
    text-decoration: none;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 3.13vw; // Для svg иконки
    grid-template-columns: 3.13vw 1fr;
    grid-gap: 1.04vw;
    padding: 1.04vw 2.09vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 6.4vw; // Для svg иконки
    grid-template-columns: 6.4vw 1fr;
    grid-gap: 2.13vw;
    padding: 2.13vw 4.27vw;
  }
`;

const AlertText = styled.div`
  font-size: 0.83vw;
  p {
    margin: 0;
  }
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.09vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
  }
`;
