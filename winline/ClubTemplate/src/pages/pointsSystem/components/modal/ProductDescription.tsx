import React from "react";
import { Descriptions, Drawer, Image } from "antd";
import { useTranslation } from "react-i18next";
import { IProduct } from "../../../../api/dto/pointsSystem";

interface IProps {
  data: IProduct | null;
  onClose: () => void;
  visible: boolean;
}

const ProductDescription = ({ data, onClose, visible }: IProps) => {
  const { t } = useTranslation();

  return (
    <Drawer
      title={t("common.view") + " - " + t("pointsSystem.products.title").split(" ")[0]}
      closable={true}
      destroyOnClose={true}
      onClose={onClose}
      visible={visible}
      width={426}
    >
      <Descriptions column={1}>
        <Descriptions.Item label={t("pointsSystem.products.visible")}>
          {data?.visible ? t("common.statuses.neutral.available") : t("common.statuses.neutral.hidden")}
        </Descriptions.Item>
        <Descriptions.Item label={t("common.title")}>{data?.name}</Descriptions.Item>
        <Descriptions.Item label={t("pointsSystem.products.priceInPoints")}>{data?.priceInPoints}</Descriptions.Item>
        <Descriptions.Item label={t("common.total")}>{data?.total}</Descriptions.Item>
        <Descriptions.Item label={t("common.image")}>
          <Image src={data?.image} />
        </Descriptions.Item>
      </Descriptions>
    </Drawer>
  );
};

export default ProductDescription;
