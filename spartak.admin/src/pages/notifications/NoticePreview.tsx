import { Divider, Modal, Typography } from "antd";
import { formatInMoscowDate } from "common/helpers/getFormatedDate";
import { NoticeEntity } from "common/interfaces/notifications";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

type Props = {
  notice?: NoticeEntity;
  onClose: () => void;
};

export const NoticePreview = ({ notice, onClose }: Props) => {
  const { t } = useTranslation();

  return (
    <Modal title={null} visible={!!notice} footer={null} onCancel={onClose}>
      <Title>{`${t("notifications.noticeId")}: ${notice?.Id}`}</Title>

      <ModalRow>
        <Typography.Text>{t("notifications.type")}</Typography.Text>
        <Typography.Text type="secondary">{t("notifications.noticeType", { type: notice?.Type })}</Typography.Text>
      </ModalRow>

      <ModalRow>
        <Typography.Text>{t("allPages.createdUtc")}</Typography.Text>
        <Typography.Text type="secondary">{formatInMoscowDate(notice?.CreatedUtc)}</Typography.Text>
      </ModalRow>

      <ModalRow>
        <Typography.Text>{t("notifications.sendDateTime")}</Typography.Text>
        <Typography.Text type="secondary">{formatInMoscowDate(notice?.SendTime, { withTime: true })}</Typography.Text>
      </ModalRow>

      <ModalRow>
        <Typography.Text>{t("allPages.locale")}</Typography.Text>
        <Typography.Text type="secondary">{t(`allPages.${notice?.Lang || "ru"}`)}</Typography.Text>
      </ModalRow>

      <ModalRow>
        <Typography.Text>{t(`notifications.class`)}</Typography.Text>
        <Typography.Text type="secondary">
          {t(`notifications.PushType.${notice?.PushType || "AllUser"}`)}
        </Typography.Text>
        {notice?.PushType === "FromFile" ? (
          <b>
            <Typography.Link type="secondary" href={notice?.ExternalFileUrl || ""}>
              ссылка на файл
            </Typography.Link>
          </b>
        ) : null}
      </ModalRow>

      <Divider />

      <ModalRow>
        <Typography.Text>{t("notifications.header")}</Typography.Text>
        <Typography.Text type="secondary">{notice?.Heading}</Typography.Text>
      </ModalRow>
      <ModalRow>
        <Typography.Text>{t("notifications.text")}</Typography.Text>
        <Typography.Text type="secondary">{notice?.Message}</Typography.Text>
      </ModalRow>
      <ModalRow>
        <Typography.Text>{t("notifications.link")}</Typography.Text>
        <Typography.Text type="secondary">
          <LinkSpan>{notice?.LinkValueUrl}</LinkSpan>
        </Typography.Text>
      </ModalRow>
    </Modal>
  );
};

const LinkSpan = styled.span`
  word-break: break-all;
`;

const Title = styled.div`
  font-size: 16px;
  margin-bottom: 32px;
`;

const ModalRow = styled.div`
  margin-bottom: 8px;
  display: flex;
  grid-gap: 8px;

  & > *:first-child::after {
    content: ": ";
  }
`;
