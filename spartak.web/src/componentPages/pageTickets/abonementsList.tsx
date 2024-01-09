import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { lang } from "../../../public/locales/lang";
import { IAbomenent } from "../../api/dto/IAbonement";
import { theme } from "../../assets/theme/theme";
import { ContainerContent } from "../../components/containers/containerContent";
import { Modal } from "../../components/modal/modal";
import { ModalLayout } from "../../components/modal/modalLayout";
import { DataContext } from "../../core/dataProvider";
import { ThemeContext } from "../../core/themeProvider";
import { EmptyScreenMatches } from "../pageMatches/emptyScreenMatches/emptyScreenMatches";
import { PassportInfoForm } from "../pageProfile/passportInfoForm";
import { AbonementsItem } from "./abonementsitem";

interface IProps {
  abonements: IAbomenent[];
}

export const AbonementsList = ({ abonements }: IProps) => {
  const { locale = "ru", push, asPath } = useRouter();
  const { auth: { user = undefined } = {}, setLoading } = useContext(DataContext);
  const [passportDataIsOpen, setPassportDataOpened] = useState<boolean>(false);
  const { isDarkTheme } = useContext(ThemeContext);

  const navigateToAbonement = (EventId: number) => {
    if (!user) {
      push(`/auth/signin?backUrl=${encodeURIComponent(asPath)}`);
    } else if (!user?.fanData.Passport?.Number) {
      setPassportDataOpened(true);
    } else {
      setLoading(true);
      push(`${process.env.NEXT_PUBLIC_TICKETS_URL}/view-available-zones/` + EventId);
    }
  };

  useEffect(() => {
    if (user?.fanData.Passport?.Number && passportDataIsOpen) setPassportDataOpened(false);
  }, [user, passportDataIsOpen]);

  return (
    <>
      {abonements.length ? (
        <Content>
          {abonements.map((item, index) => (
            <AbonementsItem key={index} {...item} onClick={navigateToAbonement} />
          ))}
        </Content>
      ) : (
        <EmptyScreenMatches
          text={lang[locale].tickets.abonemementsBeLater}
          title={lang[locale].tickets.noAbonements}
          srcImg={`/images/tickets/tickets${isDarkTheme ? "Black" : "White"}.svg`}
        />
      )}

      {passportDataIsOpen && (
        <Modal clickClose={() => setPassportDataOpened(false)}>
          <ModalLayout onClose={() => setPassportDataOpened(false)} hideSocial overflow={undefined}>
            <PassportInfoForm onClose={() => setPassportDataOpened(false)} />
          </ModalLayout>
        </Modal>
      )}
    </>
  );
};

const Content = styled(ContainerContent)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 1.25vw;
  grid-row-gap: 1.25vw;
  margin: 4.17vw auto 6.46vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: 1fr;
    margin: 5.22vw auto 10.43vw;
    grid-row-gap: 5.22vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin: 10.67vw auto;
    grid-row-gap: 6.4vw;
  }
`;
