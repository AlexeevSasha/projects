import { useEffect, useState } from "react";
import { Button, Card, Tabs } from "antd";
import { useTranslation } from "react-i18next";
import { ContentStyled, HeaderStyled, TitleStyled } from "../../ui/commonComponents";
import { getStatuses } from "../../api/requests/adv";
import { useSelector } from "react-redux";
import { StateType, useAppDispatch } from "../../core/redux/store";
import { getClubsThunk } from "../../modules/commons/commonsActionAsync";
import AdvTable from "./components/AdvTable";
import { PlusOutlined } from "@ant-design/icons";
import { IAdv } from "../../api/dto/adv/IAdv";

export const AdvLayout = ({ access }: { access: boolean }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const projects = useSelector((state: StateType) => state.commons.clubs);
  const [statuses, setStatuses] = useState([]);
  const [author, setAuthor] = useState("winline");
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedForm, setSelectedForm] = useState<IAdv | null>(null);

  useEffect(() => {
    getStatuses().then((value) => setStatuses(value));
    dispatch(getClubsThunk());
  }, []);

  const isWinline = author === "winline";
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
          <Tabs onChange={handleTabChange} tabBarExtraContent={access && isWinline && button}>
            <TabPane tab={t("adv.tab1")} key="winline">
              {author === "winline" && (
                <AdvTable
                  selectedForm={selectedForm}
                  visible={visible}
                  isWinline={isWinline}
                  showFormAdv={showFormAdv}
                  access={access}
                  author={author}
                  statuses={statuses}
                  projects={projects}
                />
              )}
            </TabPane>
            <TabPane tab={t("adv.tab2")} key="club">
              {author === "club" && (
                <AdvTable
                  selectedForm={selectedForm}
                  visible={visible}
                  isWinline={isWinline}
                  showFormAdv={showFormAdv}
                  access={access}
                  author={author}
                  statuses={statuses}
                  projects={projects}
                />
              )}
            </TabPane>
          </Tabs>
        </Card>
      </ContentStyled>
    </>
  );
};
