import { Col, Descriptions, Divider, Drawer, Image, Row } from "antd";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import type { IPlayer } from "../../../../../api/dto/IPlayer";
import { getFormatedDate } from "../../../../../common/helpers/getFormatedDate";

interface IProps {
  data: IPlayer | null;
  onClose: () => void;
  visible: boolean;
}

export const PlayerDescription = ({ data, onClose, visible }: IProps) => {
  const { t } = useTranslation();

  return (
    <Drawer title={t("players.description.title")} closable={true} destroyOnClose={true} onClose={onClose} visible={visible} width={520}>
      <Row gutter={40}>
        <Col className="gutter-row" span={12}>
          <Descriptions column={1}>
            <Descriptions.Item label={t("common.id")}>{data?.id}</Descriptions.Item>
            <Descriptions.Item label={t("players.firstName")}>{data?.firstName}</Descriptions.Item>
            <Descriptions.Item label={t("players.lastName")}>{data?.lastName}</Descriptions.Item>
            <Descriptions.Item label={t("players.birthday")}>{getFormatedDate(data?.birthday)}</Descriptions.Item>
            <Descriptions.Item label={t("players.position")}>{data?.position.name}</Descriptions.Item>
            <Descriptions.Item label={t("players.squadNumber")}>{data?.number}</Descriptions.Item>
            <Descriptions.Item label={t("players.height")}>{data?.height}</Descriptions.Item>
            <Descriptions.Item label={t("players.weight")}>{data?.weight}</Descriptions.Item>
          </Descriptions>
        </Col>
        <Col className="gutter-row" span={12}>
          <Descriptions column={1}>
            <Descriptions.Item label={t("players.team")}>{data?.team.name}</Descriptions.Item>
            <Descriptions.Item label={t("players.season")}>{data?.season.name}</Descriptions.Item>
            <Descriptions.Item label={t("common.image")}>{""}</Descriptions.Item>
            <Descriptions.Item label={""}>
              <Image width={104} src={data?.avatarUri} />
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
      <Divider />
      <Descriptions column={1}>
        <Descriptions.Item label={t("players.biography")}>{data?.profile.biography}</Descriptions.Item>
        <Descriptions.Item label={t("common.link") + " " + t("players.productUrl")}>
          <a href={data?.productUrl} target="_blank">
            {data?.productUrl ? " " + data?.productUrl : " - "}
          </a>
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      <Descriptions size="small" column={1} title={t("players.career")}>
        {data?.profile.career[0] ? (
          data?.profile.career.map((item, index) => (
            <Descriptions.Item key={index} label={null}>
              {item.period + " - " + item.club}
            </Descriptions.Item>
          ))
        ) : (
          <Descriptions.Item label={null}>{t("common.no")}</Descriptions.Item>
        )}
      </Descriptions>
      <Divider />
      <Descriptions size="small" column={1} title={t("players.statistics")}>
        {data?.statistics[0] ? (
          data?.statistics.map((item, index) => (
            <>
              <Descriptions.Item key={index} label={t("players.tournament")}>
                {item.tournament}
              </Descriptions.Item>
              <Descriptions.Item contentStyle={{ display: "flex", flexDirection: "column" }} key={index} label={t("players.average")}>
                <StatisticsItem>{t("players.points") + ": " + item.average.points}</StatisticsItem>
                <StatisticsItem>{t("players.selections") + ": " + item.average.selections}</StatisticsItem>
                <StatisticsItem>{t("players.transfers") + ": " + item.average.transfers}</StatisticsItem>
                <StatisticsItem>{t("players.effectiveness") + ": " + item.average.effectiveness}</StatisticsItem>
              </Descriptions.Item>
              <Descriptions.Item contentStyle={{ display: "flex", flexDirection: "column" }} key={index} label={t("common.total")}>
                <StatisticsItem>{t("players.points") + ": " + item.total.points}</StatisticsItem>
                <StatisticsItem>{t("players.selections") + ": " + item.total.selections}</StatisticsItem>
                <StatisticsItem>{t("players.transfers") + ": " + item.total.transfers}</StatisticsItem>
                <StatisticsItem>{t("players.effectiveness") + ": " + item.total.effectiveness}</StatisticsItem>
              </Descriptions.Item>
            </>
          ))
        ) : (
          <Descriptions.Item label="">{t("common.no")}</Descriptions.Item>
        )}
      </Descriptions>
    </Drawer>
  );
};

const StatisticsItem = styled.span`
  :not(:last-child) {
    margin-bottom: 5px !important;
  }
`;
