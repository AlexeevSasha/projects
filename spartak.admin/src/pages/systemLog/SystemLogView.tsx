import { Divider, Modal, Typography } from "antd";
import { formatInMoscowDate } from "common/helpers/getFormatedDate";
import { LogType } from "common/interfaces/systemLog";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Key } from "react";
import i18n from "i18next";
import { theme } from "../../assets/theme/theme";

type Props = {
  log?: LogType;
  onClose: () => void;
};

export const isIsoDate = (str: string) => {
  return /\d{4}-\d{2}-\d{2}T\d{2}:\d+/.test(str);
};

export const SystemLogView = ({ log, onClose }: Props) => {
  const { t } = useTranslation();
  const locale = i18n.language === "ru" ? "Ru" : "En";

  const parsedChanges = log ? JSON.parse(log.DataChanges as string) : null;

  const getChangesValue = (data?: Record<string, string> | string | null) => {
    return typeof data === "boolean"
      ? data
      : !data
      ? "-"
      : typeof data === "string" && isIsoDate(data)
      ? formatInMoscowDate(data, { withTime: true })
      : typeof data === "string" || typeof data === "number"
      ? data
      : JSON.stringify(data);
  };

  return (
    <Modal title={null} visible={!!log} footer={null} onCancel={onClose}>
      <Title>{`${t("systemLog.rowId")}: ${log?.Id}`}</Title>

      <ModalRow>
        <Typography.Text>{t("systemLog.createDateTime")}</Typography.Text>
        <Typography.Text type="secondary">{formatInMoscowDate(log?.CreatedUtc, { withTime: true })}</Typography.Text>
      </ModalRow>

      <ModalRow>
        <Typography.Text>{t("systemLog.employee")}</Typography.Text>
        <Typography.Text type="secondary">{log?.UserName}</Typography.Text>
      </ModalRow>

      <Divider />

      <ModalRow>
        <Typography.Text>{t("systemLog.entity")}</Typography.Text>
        <Typography.Text type="secondary">{log?.EntityName}</Typography.Text>
      </ModalRow>

      <ModalRow>
        <Typography.Text>{t("systemLog.objectId")}</Typography.Text>
        <Typography.Text type="secondary">{log?.EntityId}</Typography.Text>
      </ModalRow>

      <ModalRow>
        <Typography.Text>{t("allPages.action")}</Typography.Text>
        <Typography.Text type="secondary">{log?.ActionName}</Typography.Text>
      </ModalRow>

      <ModalRow>
        <Typography.Text>{t("systemLog.changedFields")}</Typography.Text>
        <Typography.Text type="secondary">
          {!log ? null : log?.ActionName !== "Update" ? (
            <span>-</span>
          ) : parsedChanges && typeof parsedChanges !== "string" ? (
            <ParagraphChanges>
              {parsedChanges.map(
                (item: {
                  ColumnName: Key | null;
                  OriginalValue: string | Record<string, string> | null;
                  NewValue: string | Record<string, string> | null;
                }) => (
                  <span key={item.ColumnName}>
                    <span translate="no">{`${item.ColumnName}: `}</span>
                    <span>{`
                      '${getChangesValue(item.OriginalValue)}' 
                      → 
                      '${getChangesValue(item.NewValue)}'`}</span>
                  </span>
                )
              )}
            </ParagraphChanges>
          ) : (
            <ParagraphChanges>{log?.DataChanges}</ParagraphChanges>
          )}
        </Typography.Text>
      </ModalRow>
    </Modal>
  );
};

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

  & > span:nth-child(2) {
    max-width: 80%;
    word-break: break-all;
  }
`;

const ParagraphChanges = styled.p`
  margin-bottom: 0;
  font-size: 12px;
  line-height: 20px;

  & > span {
    display: block;
    margin-bottom: 0;
  }

  & > span span:first-child,
  & > span span:nth-child(3) {
    color: ${theme.colors.middleGray};
  }
`;
