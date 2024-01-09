import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { lang } from "../../../../../public/locales/lang";
import { IconInfo } from "../../../../assets/icon/iconInfo";
import { theme } from "../../../../assets/theme/theme";
import { DataContext } from "../../../../core/dataProvider";

type Props = {
  message?: string;
  visible?: boolean;
};

export const TicketAlertInformation = ({ message, visible }: Props) => {
  const { locale = "ru", push, asPath } = useRouter();
  const { auth: { user = undefined } = {}, setDrawerIsOpen } = useContext(DataContext);
  const ref = useRef<HTMLDivElement>(null);

  const handleOpenAuthModal = () => {
    setDrawerIsOpen(false);
    push(`/auth/signin?backUrl=${encodeURIComponent(asPath)}`);
  };

  useEffect(() => {
    const registrBtn = ref.current?.querySelector<HTMLSpanElement>(".open-auth-modal");
    registrBtn && (registrBtn.onclick = handleOpenAuthModal);
  }, [ref.current]);

  return !user || visible ? (
    <Container>
      <IconInfo />
      <div ref={ref} dangerouslySetInnerHTML={{ __html: message || lang[locale].basket.errorAuthorize }} />
    </Container>
  ) : null;
};

const Container = styled.div`
  background: rgba(204, 18, 45, 0.1);
  padding: 0.57vw 0.99vw;
  font-family: "Roboto";
  font-weight: 400;
  display: grid;
  align-items: center;
  white-space: pre-line;
  margin: 0 1.25vw;
  grid-template-columns: 1.25vw 1fr;
  grid-column-gap: 0.42vw;
  font-size: 0.73vw;

  & > svg {
    width: 1.25vw;
    height: 1.25vw;
    margin: 0 0.42vw 0 0;
    align-self: baseline;
    display: flex;

    & path {
      stroke: ${theme.colors.red};
    }
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin: 3.78vw 3.13vw 0;
    grid-column-gap: 1.04vw;
    font-size: 1.83vw;
    padding: 1.04vw 2.09vw;

    grid-template-columns: 3.13vw 1fr;

    & > svg {
      width: 3.13vw;
      height: 3.13vw;
      margin: 0;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin: 6.93vw 4.27vw 0;
    grid-column-gap: 2.13vw;
    font-size: 3.73vw;
    padding: 2.13vw;
    grid-template-columns: 6.4vw 1fr;

    & > svg {
      width: 6.4vw;
      height: 6.4vw;
    }
  }
`;
