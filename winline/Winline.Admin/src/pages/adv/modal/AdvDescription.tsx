import { Descriptions, Drawer, Image } from "antd";
import { useTranslation } from "react-i18next";
import type { IAdv } from "../../../api/dto/adv/IAdv";

interface IProps {
  data: IAdv | null;
  onClose: () => void;
  visible: boolean;
}

export const AdvDescription = ({ data, onClose, visible }: IProps) => {
  const { t } = useTranslation();

  return (
    <Drawer title={t("common.view")} closable={true} destroyOnClose={true} onClose={onClose} visible={visible} width={400}>
      <Descriptions column={1}>
        <Descriptions.Item label={t("common.project")}>{data?.clubName}</Descriptions.Item>
        <Descriptions.Item label={t("common.place")}>{data?.locationName}</Descriptions.Item>
        <Descriptions.Item label={t("common.title")}>{data?.name}</Descriptions.Item>
        <Descriptions.Item label={t("common.links.hyperLink")}>
          <a href={data?.transitionUri} target="_blank">
            {data?.transitionUri}
          </a>
        </Descriptions.Item>
        <Descriptions.Item label={t("common.image")}>
          <Image src={data?.imageUri} />
        </Descriptions.Item>
      </Descriptions>
    </Drawer>
  );
};
