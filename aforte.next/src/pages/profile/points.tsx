import {
  getUser,
  getUserPointsFaq,
  getUserPointsStatus,
  getUserPointsTransaction,
} from "api/userApi";
import styled from "astroturf/react";
import { Profile } from "modules/profile/components/Profile";
import { UserT } from "modules/profile/interfaces/user";
import { UserPointsFaqT } from "modules/profile/interfaces/userPointsFaq";
import { UserPointsStatusT } from "modules/profile/interfaces/userPointsStatus";
import { UserPointsTransactionT } from "modules/profile/interfaces/userPointsTransaction";
import { GetServerSideProps } from "next";
import { getProfileLayout } from "common/components/layout/ProfileLayout";
import { IconPointsCircle } from "common/components/icons/IconPoints";
import { Accordion } from "common/components/Accordion";
import { XSSProtection } from "modules/products/utils/XSSProtection";
import { Advertisement } from "modules/advertisement/components/Advertisement ";
import { getInitialData } from "common/hooks/useInitialData";

type Props = {
  user: UserT;
  faq: UserPointsFaqT[];
  transaction: UserPointsTransactionT[];
  status: UserPointsStatusT;
};

export default function PointsPage(props: Props) {
  return (
    <>
      <CustomTitileH1>Мои баллы</CustomTitileH1>
      <PointsBlock>
        <PointsTitle>Полезные баллы</PointsTitle>
        <PointsCountBlock>
          <IconPointsCircle />
          <PointsCount>{props.user.points} баллов</PointsCount>
        </PointsCountBlock>
        <PointsDescriptions>20 баллов спишутся через 5 дней</PointsDescriptions>
      </PointsBlock>
      <Profile.PointsStatus status={props.status} />
      <Profile.PointsTransaction transaction={props.transaction} />
      <FaqBlock>
        <FaqTitle>Вопросы и ответы</FaqTitle>
        <FlagContent>
          {props.faq.map((element, index) => (
            <Accordion key={index} title={element.title}>
              <div
                dangerouslySetInnerHTML={{
                  __html: XSSProtection(element.description.replace(/(\r\n|\r|\n)/g, "<br>")),
                }}
              />
            </Accordion>
          ))}
        </FlagContent>
      </FaqBlock>
      <AdvertisingBlock>
        <Advertisement.AppAdvertising />
      </AdvertisingBlock>
    </>
  );
};

PointsPage.getLayout = getProfileLayout;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { metaTags = {}, ...initialData } = await getInitialData({ pathname: "/profile/points" });
    const [user, faq, transaction, status] = await Promise.allSettled([
      getUser(),
      getUserPointsFaq(),
      getUserPointsTransaction(),
      getUserPointsStatus(),
    ]);
    return {
      props: {
        user: user.status === "fulfilled" ? user.value : [],
        faq: faq.status === "fulfilled" ? faq.value : [],
        transaction: transaction.status === "fulfilled" ? transaction.value : [],
        status: status.status === "fulfilled" ? status.value : [],
        initialData: { metaTags, ...initialData },
      },
    };
  } catch {
    return { props: {} };
  }
};

const PointsBlock = styled.div`
  @import "variables";
  background: $white;
  display: flex;
  flex-direction: column;
  border-radius: 32px;
  padding: 28px 0px 28px 32px;
  width: 100%;
  @include respond-to(small) {
    padding: 20px 0px 20px 20px;
    border-radius: 28px;
  }
`;

const CustomTitileH1 = styled.h1`
  @import "variables";
  display: none;
  font-weight: 700;
  font-size: 20px;
  line-height: 137%;
  margin: 0;
  @include respond-to(small) {
    display: block;
    margin-bottom: 12px;
  }
`;

const PointsTitle = styled.span`
  @import "variables";
  font-weight: 500;
  font-size: 15px;
  line-height: 137%;
  opacity: 0.4;
  @include respond-to(small) {
    font-weight: 400;
    font-size: 14px;
    line-height: 120%;
  }
`;

const PointsDescriptions = styled.span`
  @import "variables";
  font-weight: 400;
  font-size: 14px;
  line-height: 137%;
  color: $orange3;
  margin-top: 12px;
  @include respond-to(small) {
    margin-top: 8px;
  }
`;

const PointsCountBlock = styled.div`
  @import "variables";
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
  svg {
    width: 28px;
    height: 28px;
    path {
      fill: $greenMain;
    }
  }
  @include respond-to(small) {
    svg {
      width: 32px;
      height: 32px;
    }
  }
`;

const PointsCount = styled.span`
  @import "variables";
  font-weight: 600;
  font-size: 20px;
  line-height: 137%;
  margin-left: 8px;
  @include respond-to(small) {
    font-size: 18px;
  }
`;

const AdvertisingBlock = styled.div`
  @import "variables";
  margin: 16px 0px 40px 0px;
  @include respond-to(small) {
    display: none;
  }
`;

const FaqBlock = styled.div`
  @import "variables";
  display: flex;
  flex-direction: column;
  width: 100%;
  background: $white;
  border-radius: 40px;
  margin-top: 16px;
  padding: 40px 32px;
  @include respond-to(small) {
    margin-top: 8px;
    border-radius: 28px;
    padding: 20px;
  }
`;

const FaqTitle = styled.p`
  @import "variables";
  margin: 0;
  font-weight: 600;
  font-size: 20px;
  line-height: 137%;
  margin-bottom: 24px;
  @include respond-to(small) {
    margin-bottom: 20px;
    font-size: 16px;
  }
`;

const FlagContent = styled.div`
  @import "variables";
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 12px;

  @include respond-to(small) {
    grid-row-gap: 8px;
  }
`;
