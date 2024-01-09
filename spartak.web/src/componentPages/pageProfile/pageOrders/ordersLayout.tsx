import { useRouter } from "next/router";
import React, { FC } from "react";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { theme } from "../../../assets/theme/theme";
import { ContainerContent } from "../../../components/containers/containerContent";
import { Tabs } from "../../../components/tabs/tabs";

type Props = {
  tab: string;
  setTab: (tab: string) => void;
  filter: JSX.Element;
};

export const OrdersLayout: FC<Props> = ({ children, tab, setTab, filter }) => {
  const { locale = "ru" } = useRouter();

  return (
    <Container>
      <TabSelectBlock>
        <Tabs
          tabs={[
            { key: "tickets", label: lang[locale].profileOrders.tickets },
            { key: "products", label: lang[locale].profileOrders.products },
          ]}
          active={tab}
          onClick={(tab) => setTab(tab as string)}
        />

        {filter}
      </TabSelectBlock>

      {children}
    </Container>
  );
};

const Container = styled(ContainerContent)`
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
