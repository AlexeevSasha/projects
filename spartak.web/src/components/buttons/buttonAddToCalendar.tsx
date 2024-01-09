import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { lang } from "../../../public/locales/lang";
import { CalendarIcon } from "../../assets/icon/calendarIcon";
import { theme } from "../../assets/theme/theme";

interface IProps {
  title: string;
  date: Date;
  location: string;
}

export const ButtonAddToCalendar = (props: IProps) => {
  const { locale = "ru" } = useRouter();

  return (
    <Link
      href={`https://calendar.google.com/calendar/u/0/r/eventedit?text=${encodeURI(props.title)}&dates=${props.date
        .toISOString()
        .replaceAll(".", "")
        .replaceAll("-", "")
        .replaceAll(":", "")}/${new Date(+props.date + 7200000)
        .toISOString()
        .replaceAll(".", "")
        .replaceAll("-", "")
        .replaceAll(":", "")}&location=${props.location}&sprop=name:`}
      passHref
    >
      <Container
        target={"_blank"}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <CalendarIcon stroke="white" /> <Text>{lang[locale].button.addToCalendar}</Text>
      </Container>
    </Link>
  );
};

const Container = styled.a`
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
  font-size: 0.83vw;
  display: flex;
  align-items: center;
  padding: 0.21vw 0.63vw;
  background-color: rgba(204, 18, 45, 0.1);
  text-decoration: none;

  svg {
    margin-right: 0.42vw;
  }
  svg path {
    stroke: ${theme.colors.red};
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.09vw;
    padding: 0.52vw 1.56vw;

    svg {
      margin-right: 1.04vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
    padding: 1.07vw 3.2vw;
    width: 100%;
    display: flex;
    justify-content: center;

    svg {
      margin-right: 2.13vw;
    }
  }
`;

const Text = styled.span`
  font-size: 0.73vw;
  color: ${theme.colors.red};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.83vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.73vw;
  }
`;
