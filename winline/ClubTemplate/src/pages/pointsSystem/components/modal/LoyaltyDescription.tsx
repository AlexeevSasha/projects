import { Descriptions, Drawer } from "antd";
import type { ILoyaltyProgram } from "../../../../api/dto/pointsSystem";
import { useTranslation } from "react-i18next";
import { getFormatedDate } from "../../../../common/helpers/getFormatedDate";
import { formsConstantsValidation } from "../../../../common/constants/formsConstantsValidation";

interface IProps {
  data: ILoyaltyProgram | null;
  onClose: () => void;
  visible: boolean;
}

const LoyaltyDescription = ({ data, onClose, visible }: IProps) => {
  const { t } = useTranslation();

  return (
    <Drawer
      title={t("common.view") + " - " + t(`pointsSystem.loyalty.${data?.type}`)}
      closable={true}
      destroyOnClose={true}
      onClose={onClose}
      visible={visible}
      width={370}
    >
      <Descriptions column={1}>
        <Descriptions.Item label={t("common.status")}>{t(`common.statuses.neutral.${data?.status?.toLowerCase()}`)}</Descriptions.Item>
        <Descriptions.Item label={t("pointsSystem.loyalty.points")}>{data?.points}</Descriptions.Item>
        <Descriptions.Item label={t("common.startDate")}>
          {getFormatedDate(data?.startDate, formsConstantsValidation.dateTimeFormat)}
        </Descriptions.Item>
        <Descriptions.Item label={t("common.endDate")}>
          {getFormatedDate(data?.endDate, formsConstantsValidation.dateTimeFormat)}
        </Descriptions.Item>
        <Descriptions.Item label={t("pointsSystem.participantsNumber")}>{data?.participantsNumber}</Descriptions.Item>
      </Descriptions>
    </Drawer>
  );
};

export default LoyaltyDescription;
