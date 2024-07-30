import { ItemText } from "../../../../ui/descriptionText";
import { Descriptions, Divider, Drawer, Image } from "antd";
import { useTranslation } from "react-i18next";
import { ILoyalty } from "../../../../api/dto/loyalty/ILoyalty";
import { useSelector } from "react-redux";
import { StateType, useAppDispatch } from "../../../../core/redux/store";
import { formsConstantsValidation } from "../../../../common/constants/formsConstantsValidation";
import { getFormatedDate } from "../../../../common/helpers/getFormatedDate";
import { useEffect } from "react";
import { getEventsThunk, getSectorsThunk } from "../../../../modules/loyalty/loyaltyActionAsync";
import { TFunction } from "i18next";

interface IProps {
  data?: ILoyalty;
  onClose(): void;
  availability: string[];
}

interface IAvailabilityProps {
  data?: ILoyalty;
  loyaltyTypes: string[];
  t: TFunction;
}

const AvailabilityDescriptions = ({ data, loyaltyTypes, t }: IAvailabilityProps) => {
  return (
    <Descriptions column={1}>
      <Descriptions.Item label={t("common.type")}>
        {t(`loyaltyForm.thirdStep.awards.${loyaltyTypes.find((item) => item === data?.condition.award.type)}`)}
      </Descriptions.Item>
      {data && data.condition.award.type === "freebet" ? (
        <Descriptions.Item label={t("loyalty.description.file")}>
          <a href={data.condition.award.uploadFile || "#"}>
            {data.condition.award.uploadFile?.slice(data.condition.award.uploadFile.lastIndexOf("/") + 1)}
          </a>
        </Descriptions.Item>
      ) : data && data.condition.award.type === "voucherToTheBox" ? (
        <Descriptions.Item label={t("loyalty.description.count")}>{data.condition.award.quantity}</Descriptions.Item>
      ) : data && data.condition.award.type === "couponForMerchandise" ? (
        <Descriptions.Item label={t("loyalty.description.count")}>{data.condition.award.quantity}</Descriptions.Item>
      ) : data && data.condition.award.type === "externalReference" ? (
        <>
          <Descriptions.Item label={t("common.link")}>{data.condition.award.link}</Descriptions.Item>
          <Descriptions.Item label={t("common.textButton")}>{data.condition.award.buttonText}</Descriptions.Item>
        </>
      ) : (
        ""
      )}
    </Descriptions>
  );
};

export const LoyaltyDescription = ({ data, onClose, availability }: IProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const clubs = useSelector((state: StateType) => state.commons.clubs);

  const { events, type, sectors } = useSelector((state: StateType) => state.loyalty);

  useEffect(() => {
    if (data && boughtTicket) {
      dispatch(getEventsThunk(data.club.id));
      if (data?.condition.winCondition.find((item) => item.type === "BoughtTicket")) {
        dispatch(getSectorsThunk(data.condition.winCondition.find((item) => item.type === "BoughtTicket")?.matchId as string));
      }
    }
  }, [data]);

  const boughtTicket = data?.condition.winCondition.find((i) => i.type === "BoughtTicket");
  const isNewUser = data?.condition.winCondition.some((item) => item.type === "NewUser");
  const isFullProfile = data?.condition.winCondition.some((item) => item.type === "FullProfile");

  return (
    <Drawer title={t("loyalty.description.title")} closable={true} destroyOnClose={true} onClose={onClose} visible={!!data} width={560}>
      <Descriptions column={2}>
        <Descriptions.Item label={t("common.title")}>{data?.name}</Descriptions.Item>
        <Descriptions.Item label={t("common.createdUtc")}>
          {getFormatedDate(data?.createdUtc, formsConstantsValidation.dateTimeFormat)}
        </Descriptions.Item>
        <Descriptions.Item label={t("common.project")}>{clubs.find((item) => item.id === data?.club.id)?.clubName}</Descriptions.Item>
        <Descriptions.Item label={t("loyalty.beginDate")}>
          {getFormatedDate(data?.startDate, formsConstantsValidation.dateTimeFormat)}
        </Descriptions.Item>
        <Descriptions.Item label={t("loyalty.participantsCount")}>{data?.acceptUser.total}</Descriptions.Item>
        <Descriptions.Item label={t("loyalty.endDate")}>
          {getFormatedDate(data?.endDate, formsConstantsValidation.dateTimeFormat)}
        </Descriptions.Item>
        <Descriptions.Item label={t("loyalty.description.winnersCount")}>{data?.winnerUser.total}</Descriptions.Item>
        <Descriptions.Item label={t("loyalty.description.stopDate")}>
          {data?.outOfStock ? getFormatedDate(data?.outOfStock, formsConstantsValidation.dateTimeFormat) : "-"}
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      <Descriptions column={1}>
        <Descriptions.Item label={t("common.heading")}>{data?.title}</Descriptions.Item>
        <Descriptions.Item label={t("loyalty.desc")}>{data?.description}</Descriptions.Item>
        <Descriptions.Item label={t("common.image")}>
          <Image src={data?.imageUploader} width={"343px"} style={{ borderRadius: "12px" }} alt="promotionImg" />
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      <Descriptions column={1}>
        <Descriptions.Item style={{ paddingBottom: 0 }} label={t("loyalty.description.availability")}>
          <Descriptions layout="horizontal" size="small">
            <Descriptions.Item label="">
              {t(
                `loyaltyForm.secondStep.showUsers.options.showUsersOptions.${
                  availability.find((item) => item === data?.condition.availabilityCondition.type)
                  // (data && data.condition.availabilityCondition.type === availability[2] ? "," : "")
                }`
              ) + (data && data.condition.availabilityCondition.type === availability[2] ? "," : "")}
            </Descriptions.Item>
            {data && data.condition.availabilityCondition.type === availability[2] ? (
              <Descriptions.Item label="">
                <a href={data.condition.availabilityCondition.uploadFile || "#"}>
                  {data.condition.availabilityCondition.uploadFile?.slice(
                    data.condition.availabilityCondition.uploadFile?.lastIndexOf("/") + 1
                  )}
                </a>
              </Descriptions.Item>
            ) : (
              ""
            )}
          </Descriptions>
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      <ItemText style={{ fontWeight: 600 }}>{t("loyalty.conditions")}</ItemText>
      <Descriptions column={1} size="small">
        {isNewUser && isFullProfile ? (
          <>
            <Descriptions.Item label={""}>{t("loyalty.description.fullProfile")}</Descriptions.Item>
            <Descriptions.Item label={""}>{t("loyalty.description.newUser")}</Descriptions.Item>
          </>
        ) : isNewUser ? (
          <Descriptions.Item label={""}>{t("loyalty.description.newUser")}</Descriptions.Item>
        ) : isFullProfile ? (
          <Descriptions.Item label={""}>{t("loyalty.description.fullProfile")}</Descriptions.Item>
        ) : data?.condition.winCondition.some((item) => item.type === "NoCondition") ? (
          <Descriptions.Item label={""}>{t("loyalty.description.noCondition")}</Descriptions.Item>
        ) : (
          ""
        )}
      </Descriptions>
      <Descriptions>
        {boughtTicket ? (
          <Descriptions.Item style={{ paddingBottom: 0 }} label="">
            {isFullProfile && isNewUser ? (
              <Descriptions>
                <Descriptions.Item
                  style={{ paddingBottom: 0 }}
                  labelStyle={{ fontWeight: 400 }}
                  label={t("loyalty.description.boughtTicket")}
                >
                  <Descriptions column={1} size="small">
                    <Descriptions.Item label={""}>
                      {t("loyalty.event") + " - " + events.find((item) => item.eventId === boughtTicket?.matchId)?.eventName}
                    </Descriptions.Item>
                    <Descriptions.Item label={""}>
                      {t("loyalty.sector") + " - " + sectors.find((item) => item.sectorId === boughtTicket?.sectorId)?.sectorName}
                    </Descriptions.Item>
                    <Descriptions.Item label={""}>
                      {t("loyalty.description.ticketsCount") + " - " + boughtTicket?.quantity}
                    </Descriptions.Item>
                  </Descriptions>
                </Descriptions.Item>
              </Descriptions>
            ) : isFullProfile ? (
              <Descriptions>
                <Descriptions.Item
                  style={{ paddingBottom: 0 }}
                  labelStyle={{ fontWeight: 400 }}
                  label={t("loyalty.description.boughtTicket")}
                >
                  <Descriptions column={1} size="small">
                    <Descriptions.Item label={""}>
                      {t("loyalty.event") + " - " + events.find((item) => item.eventId === boughtTicket.matchId)?.eventName}
                    </Descriptions.Item>
                    <Descriptions.Item label={""}>
                      {t("loyalty.sector") + " - " + sectors.find((item) => item.sectorId === boughtTicket.sectorId)?.sectorName}
                    </Descriptions.Item>
                    <Descriptions.Item label={""}>
                      {t("loyalty.description.ticketsCount") + " - " + boughtTicket.quantity}
                    </Descriptions.Item>
                  </Descriptions>
                </Descriptions.Item>
              </Descriptions>
            ) : (
              <Descriptions>
                <Descriptions.Item
                  style={{ paddingBottom: 0 }}
                  labelStyle={{ fontWeight: 400 }}
                  label={t("loyalty.description.boughtTicket")}
                >
                  <Descriptions column={1} size="small">
                    <Descriptions.Item label={""}>
                      {t("loyalty.event") + " - " + events.find((item) => item.eventId === boughtTicket.matchId)?.eventName}
                    </Descriptions.Item>
                    <Descriptions.Item label={""}>
                      {t("loyalty.sector") + " - " + sectors.find((item) => item.sectorId === boughtTicket.sectorId)?.sectorName}
                    </Descriptions.Item>
                    <Descriptions.Item label={""}>
                      {t("loyalty.description.ticketsCount") + " - " + boughtTicket.quantity}
                    </Descriptions.Item>
                  </Descriptions>
                </Descriptions.Item>
              </Descriptions>
            )}
          </Descriptions.Item>
        ) : (
          ""
        )}
      </Descriptions>
      <Divider />
      <ItemText style={{ fontWeight: 600 }}>{t("loyalty.reward")}</ItemText>
      <AvailabilityDescriptions data={data} loyaltyTypes={type} t={t} />
    </Drawer>
  );
};
