import { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button, Card, Dropdown, Menu, Tabs } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { ContentStyled, HeaderStyled, TitleStyled } from "../../ui/commonComponents";
import { /*getCitiesThunk,*/ getDeepLinksThunk } from "../../modules/commons/commonsActionAsync";
import { StateType, useAppDispatch } from "../../core/redux/store";
// import type { ICity } from "../../api/dto/ICity";
import { NotificationsTable } from "./component/NotificationsTable";

const menu = (showTypeForm: (entity: { type: string }) => void) => (
  <Menu>
    <Menu.Item onClick={() => showTypeForm({ type: "Push" })} key="Push">
      Push
    </Menu.Item>
    <Menu.Item onClick={() => showTypeForm({ type: "SMS" })} key="SMS">
      SMS
    </Menu.Item>
    <Menu.Item onClick={() => showTypeForm({ type: "Email" })} key="Email">
      Email
    </Menu.Item>
  </Menu>
);

const { TabPane } = Tabs;
const tabs = ["wait", "history"];

export const UserNotificationsLayout = ({ access }: { access: boolean }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  // const { cities } = useSelector((state: StateType) => state.commons);
  const [showForm, setShowForm] = useState<null | { type: string }>(null);
  const [tabKey, setTabKey] = useState(tabs[0]);

  useEffect(() => {
    dispatch(getDeepLinksThunk());
    // dispatch(getCitiesThunk());
  }, []);

  /*const citiesData = useMemo(
    () =>
      cities.map((city: ICity) => {
        return { value: city.id, label: city.nameRu };
      }),
    [cities]
  );*/

  const handleTabChange = (key: string) => {
    setTabKey(key);
  };

  const button = (
    <Dropdown trigger={["click"]} overlay={menu(setShowForm)}>
      <Button type="primary" icon={<DownOutlined />}>
        {t("common.buttonsText.create")}
      </Button>
    </Dropdown>
  );

  return (
    <>
      <HeaderStyled>
        <TitleStyled level={4}>{t("users.notifications.title")}</TitleStyled>
      </HeaderStyled>
      <ContentStyled>
        <Card>
          <Tabs onChange={handleTabChange} defaultActiveKey={tabKey} tabBarExtraContent={access && tabKey == "wait" && button}>
            <TabPane tab={t("users.notifications.linksText.wait")} key={tabs[0]}>
              {tabKey === tabs[0] && (
                <NotificationsTable access={access} isHistory={false} setShowForm={setShowForm} showForm={showForm} cities={[]} />
              )}
            </TabPane>
            <TabPane tab={t("users.notifications.linksText.history")} key={tabs[1]}>
              {tabKey === tabs[1] && <NotificationsTable access={access} isHistory={true} cities={[]} />}
            </TabPane>
          </Tabs>
        </Card>
      </ContentStyled>
    </>
  );
};
