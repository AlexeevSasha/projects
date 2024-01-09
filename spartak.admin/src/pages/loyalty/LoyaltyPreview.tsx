import { Divider, Modal } from "antd";
import { eventRepository } from "api/eventRepository";
import { subscriptionRepository } from "api/subscriptionRepository";
import { theme } from "assets/theme/theme";
import { formatInMoscowDate } from "common/helpers/getFormatedDate";
import { SectorDto } from "common/interfaces/event";
import { LoyaltyEntity } from "common/interfaces/loyalty";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useAppDispatch } from "store";
import { getNotificationByExternalId } from "store/notifications/notificationsActionAsync";
import { noticeSelector } from "store/notifications/notificationsSelectors";
import styled from "styled-components";

type Props = {
  onClose: () => void;
  promo?: LoyaltyEntity;
};

export const LoyaltyPreview = ({ onClose, promo }: Props) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const notice = useSelector(noticeSelector);
  const [dataEvent, setDataEvent] = useState<{ eventName: string; sectorsName: SectorDto[] }>({
    eventName: "",
    sectorsName: [],
  });

  const conditions = (promo?.Condition.WinCondition || []).reduce((acc: Record<string, any>, { Type, ...rest }) => {
    return { ...acc, [Type]: rest };
  }, {});

  useEffect(() => {
    const boughtTicket = promo?.Condition.WinCondition.find((item) => item.Type === "BoughtTicket");
    setDataEvent({ eventName: "", sectorsName: [] });

    promo?.Id && dispatch(getNotificationByExternalId(promo?.Id));

    if (boughtTicket) {
      Promise.allSettled([
        subscriptionRepository.fetchById(boughtTicket.EventId || ""),
        eventRepository.fetchSectors(boughtTicket.EventId || ""),
      ]).then((res) => {
        setDataEvent({
          eventName: res[0].status === "fulfilled" ? res[0].value.FullName.Ru : "",
          sectorsName:
            res[1].status === "fulfilled"
              ? res[1].value.filter((elem) => boughtTicket.SectorIds?.includes(Number(elem.Id)))
              : [],
        });
      });
    }
  }, [promo]);

  return (
    <Modal title={t("loyalty.promoInfo")} footer={[null]} onCancel={onClose} visible={!!promo}>
      {promo && (
        <>
          <Row>
            <span>{t("loyalty.name")}</span>
            <span>{promo.Name}</span>
          </Row>

          <Row>
            <span>{t("loyalty.project")}</span>
            <span>ФК “Спартак”</span>
          </Row>

          <Row>
            <span>{t("loyalty.totalAward")}</span>
            <span>{promo.AcceptUser.Total || "-"}</span>
          </Row>

          <Row>
            <span>{t("loyalty.dateStart")}</span>
            <span>{formatInMoscowDate(promo.StartDate, { withTime: true })}</span>
          </Row>

          <Row>
            <span>{t("loyalty.dateEnd")}</span>
            <span>{formatInMoscowDate(promo.EndDate, { withTime: true })}</span>
          </Row>

          <Row>
            <span>{t("loyalty.dateStop")}</span>
            <span>{formatInMoscowDate(promo.OutOfStock, { withTime: true }) || "-"}</span>
          </Row>

          <Divider />

          <Row>
            <span>{t("loyalty.loyaltyTitle")}</span>
            <span>{promo.Title}</span>
          </Row>

          <Row>
            <span>{t("loyalty.desc")}</span>
            <span
              dangerouslySetInnerHTML={{
                __html: promo.Description,
              }}
            />
          </Row>

          <Row>
            <span>{t("loyalty.image")}</span>
            <Img src={promo.ImageUrl} alt={promo.Name} />
          </Row>

          <Divider />

          <Row>
            <span>{t("loyalty.available")}</span>
            <span>Всем, у кого изначально выполнены условия</span>
          </Row>

          <Divider />

          <Title>Условия</Title>

          {conditions.NoCondition && <div style={{ color: theme.colors.middleGray }}>Без условий </div>}

          {conditions.NewUser && <div style={{ color: theme.colors.middleGray }}>Новый пользователь</div>}

          {conditions.BoughtTicket && (
            <Row>
              <span>{t("loyalty.boughtTicket")}</span>
              <div>
                <div>{dataEvent.eventName ? `Событие - ${dataEvent.eventName},` : ""}</div>
                <div>
                  {dataEvent.sectorsName.length
                    ? `Сектора - ${dataEvent.sectorsName.reduce((a, b) => (a ? a + ", " + b.Name : b.Name), "")},`
                    : ""}
                </div>
                <div> Кол-во билетов - {conditions.BoughtTicket.Quantity}</div>
              </div>
            </Row>
          )}

          <Divider />

          <Title>Награда</Title>

          <Row>
            <span>{t("loyalty.type")}</span>
            <span>{t(`loyalty.awardType.${promo.Condition.Award.Type}`)}</span>
          </Row>

          {promo.TotalAward && (
            <Row>
              <span>{t("loyalty.count")}</span>
              <span>{promo.TotalAward}</span>
            </Row>
          )}
          {notice && (
            <>
              <Divider />

              <Title>Пуш-уведомление</Title>
              <Row>
                <span>{t("notifications.sendDateTime")}</span>
                <span>{formatInMoscowDate(notice?.SendTime, { withTime: true })}</span>
              </Row>

              <Row>
                <span>{t(`notifications.class`)}</span>
                <span>
                  <span>{t(`notifications.PushType.${notice?.PushType || "AllUser"}`)}</span>
                  {notice?.PushType === "FromFile" ? (
                    <b>
                      <a href={notice?.ExternalFileUrl || ""} style={{ marginLeft: "10px" }}>
                        ссылка на файл
                      </a>
                    </b>
                  ) : null}
                </span>
              </Row>
              <Row>
                <span>{t("notifications.header")}</span>
                <span>{notice?.Heading}</span>
              </Row>
              <Row>
                <span>{t("notifications.text")}</span>
                <span>{notice?.Message}</span>
              </Row>
              <Row>
                <span>{t("notifications.link")}</span>
                <span style={{ overflowWrap: "anywhere" }}>{notice?.LinkValueUrl}</span>
              </Row>
            </>
          )}
        </>
      )}
    </Modal>
  );
};

const Row = styled.div`
  display: flex;
  align-items: flex-start;
  font-size: 14px;

  & > span:first-child {
    color: ${theme.colors.gray};
    margin-right: 8px;

    &::after {
      content: ": ";
    }
  }

  & > *:last-child {
    color: ${theme.colors.middleGray};
  }
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: ${theme.colors.gray};
`;

const Img = styled.img`
  width: 343px;
  height: 154px;
  border-radius: 12px;
`;
