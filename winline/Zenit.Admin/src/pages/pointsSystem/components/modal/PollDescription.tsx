import { Descriptions, Divider, Drawer, Image } from "antd";
import type { IPoll } from "../../../../api/dto/pointsSystem";
import { useTranslation } from "react-i18next";
import { getFormatedDate } from "../../../../common/helpers/getFormatedDate";
import { formsConstantsValidation } from "../../../../common/constants/formsConstantsValidation";
import React from "react";

interface IProps {
  data?: Partial<IPoll> | null;
  onClose: () => void;
  visible: boolean;
}

const PollDescription = ({ data, onClose, visible }: IProps) => {
  const { t } = useTranslation();

  return (
    <Drawer
      title={t("common.view") + " - " + t(`pointsSystem.poll.${data?.type}`)}
      closable={true}
      destroyOnClose={true}
      onClose={onClose}
      visible={visible}
      width={400}
    >
      <Descriptions column={1}>
        <Descriptions.Item label={t("common.status")}>{t(`common.statuses.neutral.${data?.status?.toLowerCase()}`)}</Descriptions.Item>
        <Descriptions.Item label={t(`pointsSystem.${data?.type === "FiveEvents" ? "poll" : "loyalty"}.points`)}>
          {data?.points}
        </Descriptions.Item>
        <Descriptions.Item label={t("common.description")}>{data?.description}</Descriptions.Item>
        <Descriptions.Item label={t("common.image")}>
          <Image src={data?.image} />
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      <Descriptions column={1}>
        <Descriptions.Item label={t("common.match")}>{data?.match?.name}</Descriptions.Item>
        <Descriptions.Item label={t("common.startDate")}>
          {getFormatedDate(data?.startDate, formsConstantsValidation.dateTimeFormat)}
        </Descriptions.Item>
        <Descriptions.Item label={t("common.endDate")}>
          {getFormatedDate(data?.endPollDate, formsConstantsValidation.dateTimeFormat)}
        </Descriptions.Item>
        <Descriptions.Item label={t("pointsSystem.poll.endDatePoll")}>
          {getFormatedDate(data?.endDate, formsConstantsValidation.dateTimeFormat)}
        </Descriptions.Item>
        <Descriptions.Item label={t("pointsSystem.participantsNumber")}>{data?.participantsNumber}</Descriptions.Item>
      </Descriptions>
      <Divider />
      <Descriptions column={1}>
        {data?.type === "MatchWinner" && (
          <Descriptions.Item label={t("pointsSystem.poll.rightResponse")}>{data?.matchWinner?.name ?? "-"}</Descriptions.Item>
        )}
        {data?.type === "StartingFive" && (
          <Descriptions.Item label={t("pointsSystem.poll.rightResponse")}>
            {data?.startingFive?.length! > 0
              ? data?.startingFive?.map((player) => " " + player.firstName + " " + player.lastName).join(",")
              : "-"}
          </Descriptions.Item>
        )}

        {data?.type === "FiveEvents" &&
          data?.fiveEvents?.map((event, i) => (
            <>
              <Descriptions.Item label={`${t("pointsSystem.poll.event")} ${++i}`}>{event.question}</Descriptions.Item>
              <Descriptions.Item label={t("pointsSystem.poll.rightResponse")}>
                {event.answer === null ? "-" : event.answer ? t("common.yes") : t("common.no")}
              </Descriptions.Item>
            </>
          ))}
      </Descriptions>
    </Drawer>
  );
};

export default PollDescription;
