import { useRouter } from "next/router";
import React, { FC, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { getYearsOld, toISOString } from "../../../assets/constants/date";
import { theme } from "../../../assets/theme/theme";
import { ContainerContent } from "../../../components/containers/containerContent";
import { Pagination } from "../../../components/pagination/pagination";
import { Tabs } from "../../../components/tabs/tabs";
import { DataContext } from "../../../core/dataProvider";
import { UseWinlineModal } from "../../voting/useWinlineModal";

type Props = {
  tab: string;
  setTab: (tab: string) => void;
  filter: JSX.Element;
  itemsCount: number;
  confirmModal?: () => void;
};

export const LoyaltyLayout: FC<Props> = ({ children, tab, setTab, filter, itemsCount, confirmModal }) => {
  const { locale = "ru", query, push } = useRouter();
  const [useWinlineModalIsOpen, setUseWinlineModalIsOpen] = useState(false);
  const { auth: { user = undefined } = {} } = useContext(DataContext);
  const birthDate = user?.personalData.BirthDate || toISOString(new Date());

  // Если пользователю меньше 18 или он не дал согласия на получение акций, то открывается попап
  useEffect(() => {
    if (getYearsOld(birthDate) < 18 || !user?.AllowToUseWinline) {
      setUseWinlineModalIsOpen(true);
    }
  }, [user]);

  return (
    <Container>
      {useWinlineModalIsOpen && (
        <UseWinlineModal
          birthDate={birthDate}
          onClose={() => {
            setUseWinlineModalIsOpen(false);
            push("/profile/personalData");
          }}
          onConfirm={() => {
            setUseWinlineModalIsOpen(false);
            confirmModal?.();
          }}
        />
      )}

      <Title>{lang[locale].profileLoyalty.listTitle}</Title>

      <TabSelectBlock>
        <Tabs
          tabs={[
            { key: "active", label: lang[locale].profileLoyalty.active },
            { key: "history", label: lang[locale].profileLoyalty.history },
          ]}
          active={tab}
          onClick={(tab) => setTab(tab as string)}
        />

        {tab === "history" ? filter : null}
      </TabSelectBlock>

      <Content>{children}</Content>

      <Pagination pageSize={6} currentPage={Number(query.page) || 1} itemsCount={itemsCount} />
    </Container>
  );
};

const Container = styled(ContainerContent)`
  font-weight: 500;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 4.69vw;
  margin-top: 2.13vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-bottom: 10.67vw;
    margin-top: 3.26vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-bottom: 10.67vw;
    margin-top: 6.66vw;
  }
`;

const Content = styled.div`
  width: 100%;
  display: grid;
  grid: auto / 1fr 1fr 1fr;
  margin-top: 2.08vw;
  row-gap: 2.08vw;
  column-gap: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid: auto / 1fr 1fr;
    margin-top: 5.215vw;
    row-gap: 5.215vw;
    column-gap: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid: auto / 1fr;
    row-gap: 6.4vw;
  }
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.white_black};
  margin: 0;
  margin-bottom: 2.08vw;
  font-weight: 700;
  font-size: 2.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-bottom: 3.13vw;
    font-size: 4.17vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-bottom: 6.4vw;
    font-size: 8.53vw;
  }
`;

const TabSelectBlock = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    flex-direction: column;
    align-items: flex-start;

    & > *:first-child > span {
      width: 33.37vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    align-items: stretch;

    & > * {
      width: 100%;
    }
  }
`;
