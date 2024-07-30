import { Descriptions, Divider, Drawer } from "antd";
import { useTranslation } from "react-i18next";
import { IInfoPage } from "../../../../api/dto/content/IInfoPage";
import { getFormatedDate } from "../../../../common/helpers/getFormatedDate";
import { FirstFieldItemText, ItemText } from "../../../../ui/descriptionText";

interface IProps {
  onClose(): void;
  infoPageDes: IInfoPage | null;
}

export const InfoPageDescription = ({ onClose, infoPageDes }: IProps) => {
  const { t } = useTranslation();

  return (
    <Drawer
      title={t("common.id") + `: ${infoPageDes?.id}`}
      closable={true}
      destroyOnClose={true}
      onClose={onClose}
      visible={!!infoPageDes}
      width={560}
    >
      <Descriptions column={1}>
        <Descriptions.Item label={t("common.title")}>{infoPageDes?.name}</Descriptions.Item>
        <Descriptions.Item label={t("marketing.infoPages.tag")}>{infoPageDes?.tag}</Descriptions.Item>
        <Descriptions.Item label={t("common.createdUtc")}>{getFormatedDate(infoPageDes?.createdUtc)}</Descriptions.Item>
        <Descriptions.Item label={t("marketing.infoPages.description.updateDate")}>
          {getFormatedDate(infoPageDes?.updatedUtc)}
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      {infoPageDes && <div dangerouslySetInnerHTML={{ __html: infoPageDes?.additionalInfo.htmlContent }}></div>}
    </Drawer>
  );
};
