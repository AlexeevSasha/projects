import React, { useEffect, useState } from "react";
import { Button, Card, Tabs } from "antd";
import { useTranslation } from "react-i18next";
import { ContentStyled, HeaderStyled, TitleStyled } from "../../ui/commonComponents";
import { getStatuses } from "../../api/requests/adv";
import AdvTable from "./components/AdvTable";
import { IAdv } from "../../api/dto/adv/IAdv";
import { PlusOutlined } from "@ant-design/icons";

export const AdvLayout = ({ access }: { access: boolean }) => {
  const { t } = useTranslation();

  const [statuses, setStatuses] = useState([]);
  const [author, setAuthor] = useState("club");
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedForm, setSelectedForm] = useState<IAdv | null>(null);

  const isWinline = author === "winline";

  useEffect(() => {
    getStatuses().then((value) => setStatuses(value));
  }, []);

  const { TabPane } = Tabs;
  const handleTabChange = (key: string) => setAuthor(key);

  const showFormAdv = (value = null) => {
    setSelectedForm(value);
    setVisible(!visible);
  };

  const button = (
    <Button onClick={() => showFormAdv()} type="primary" icon={<PlusOutlined />}>
      {t("common.buttonsText.create")}
    </Button>
  );

  return (
    <>
      <HeaderStyled>
        <TitleStyled level={4}>{t("adv.title")}</TitleStyled>
      </HeaderStyled>

      <ContentStyled>
        <Card>
          <Tabs onChange={handleTabChange} tabBarExtraContent={access && !isWinline && button}>
            <TabPane tab={t("adv.tab2")} key="club">
              {author === "club" && (
                <AdvTable
                  isWinline={!isWinline}
                  selectedForm={selectedForm}
                  showFormAdv={showFormAdv}
                  visible={visible}
                  access={access}
                  author={author}
                  statuses={statuses}
                />
              )}
            </TabPane>
            <TabPane tab={t("adv.tab1")} key="winline">
              {author === "winline" && (
                <AdvTable
                  isWinline={!isWinline}
                  selectedForm={selectedForm}
                  showFormAdv={showFormAdv}
                  visible={visible}
                  access={access}
                  author={author}
                  statuses={statuses}
                />
              )}
            </TabPane>
          </Tabs>
        </Card>
      </ContentStyled>
    </>
  );
};
