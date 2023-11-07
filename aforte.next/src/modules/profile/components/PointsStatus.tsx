import styled from "astroturf/react";
import { AppContext } from "common/components/ContextProvider";
import { IconInfo } from "common/components/icons/IconInfo";
import { NextImage } from "common/components/NextImage";
import { ModalNames } from "common/interfaces/modal";
import { CustomSwiper } from "modules/slider/components/CustomSwiper";
import { useContext } from "react";
import { UserPointsStatusT } from "../interfaces/userPointsStatus";
import { PointsStatusBonus } from "./PointsStatusBonus";
import { PointStatusModal } from "./PointsStatusModal";

type Props = {
  status: UserPointsStatusT;
};

export const PointsStatus = ({ status }: Props) => {
  const { openModal } = useContext(AppContext);
  return (
    <Conteinter>
      <StatusInfoBlock>
        <ImageContainer>
          <NextImage src="/images/pointStatus.png" alt={"review"} />
        </ImageContainer>
        <StatusInfo>
          <StatusTitle>Ваш статус</StatusTitle>
          <StatusNameBlock>
            <StatusName>{status.status}</StatusName>
            <div
              style={{ maxHeight: 24 }}
              onClick={() =>
                openModal(ModalNames.POPUP_MODAL, {
                  children: <PointStatusModal status={status} />,
                })
              }
            >
              <IconInfo />
            </div>
          </StatusNameBlock>
          <ProgressLine>
            <Line style={{ width: `${status.currentSum * (100 / status.finishSum)}%` }}></Line>
          </ProgressLine>
          <StatusDiscription>
            Купите еще на {status.finishSum - status.currentSum} рублей и получите следующий статус
          </StatusDiscription>
        </StatusInfo>
      </StatusInfoBlock>
      <CustomSwiper
        id="statusBonus"
        sliderSettings={{ mobileSB: 12, desktopSB: 12 }}
        items={status.bonus}
        arrowSettings={{ hidden: true }}
      >
        {(param) => (
          <CustomSwiper.SlideOfProfileStatus>
            <PointsStatusBonus bonus={param} />
          </CustomSwiper.SlideOfProfileStatus>
        )}
      </CustomSwiper>
    </Conteinter>
  );
};
const Conteinter = styled.div`
  @import "variables";
  background: $white;
  display: flex;
  flex-direction: column;
  border-radius: 32px;
  padding: 28px 32px;
  margin-top: 16px;
  @include respond-to(small) {
    padding: 24px 20px;
    border-radius: 28px;
    margin-top: 8px;
  }
`;
const StatusInfoBlock = styled.div`
  @import "variables";
  display: flex;
  flex-direction: row;
  margin-bottom: 32px;
  @include respond-to(small) {
    margin-bottom: 28px;
  }
`;
const ImageContainer = styled.div<{ settings?: boolean }>`
  @import "variables";
  max-width: 106px;
  width: 100%;
  div {
    height: 106px;
  }
  @include respond-to(small) {
    max-width: 80px;
    div {
      height: 80px;
    }
  }
`;
const StatusInfo = styled.div`
  @import "variables";
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-left: 32px;
  @include respond-to(small) {
    margin-left: 16px;
  }
`;
const StatusTitle = styled.span`
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
const StatusNameBlock = styled.div`
  @import "variables";
  display: flex;
  flex-direction: row;
  align-items: center;
  svg {
    cursor: pointer;
    min-width: 24px;
    min-height: 24px;
    g {
      opacity: 1;
    }
    rect {
      fill: transparent;
      stroke: $greenMain;
    }
    path {
      fill: $greenMain;
    }
  }
  margin-top: 8px;
  @include respond-to(small) {
    margin-top: 4px;
    justify-content: space-between;
    svg {
      min-width: 20px;
      min-height: 20px;
    }
  }
`;
const StatusName = styled.span`
  @import "variables";
  font-weight: 600;
  font-size: 20px;
  line-height: 137%;
  margin-right: 12px;
  @include respond-to(small) {
    font-size: 18px;
    margin-right: 0px;
  }
`;
const StatusDiscription = styled.span`
  @import "variables";
  font-weight: 400;
  font-size: 13px;
  line-height: 137%;
  margin-top: 14px;
  @include respond-to(small) {
    line-height: 150%;
    margin-top: 12px;
  }
`;
const ProgressLine = styled.div`
  @import "variables";
  height: 4px;
  margin-top: 14px;
  background: rgba($greenMain, 0.2);
  border-radius: 10px;
  @include respond-to(small) {
    margin-top: 12px;
  }
`;
const Line = styled.span`
  @import "variables";
  display: block;
  border-radius: 10px;
  height: 4px;
  background: $greenMain;
`;
