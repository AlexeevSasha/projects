import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Tabs } from "antd";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../../core/redux/store";
import { getDeepLinksThunk } from "../../../modules/commons/commonsActionAsync";
import type { IBanner } from "../../../api/dto/content/IBanner";

const BannerPublish = React.lazy(async () => import("./components/BannerPublish"));
const BannerHidden = React.lazy(async () => import("./components/BannerHidden"));

export const BannerLayout = ({ access }: { access: boolean }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [tab, setTab] = useState("publish");
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedForm, setSelectedForm] = useState<IBanner | null>(null);

  const { TabPane } = Tabs;
  const handleTabChange = (key: string) => setTab(key);

  const showBannerForm = (value = null) => {
    setSelectedForm(value);
    setVisible(!visible);
  };

  useEffect(() => {
    dispatch(getDeepLinksThunk());
  }, []);

  const button = (
    <Button onClick={() => showBannerForm()} type="primary" icon={<PlusOutlined />}>
      {t("common.buttonsText.create")}
    </Button>
  );

  return (
    <>
      <Tabs onChange={handleTabChange} tabBarExtraContent={access && button}>
        <TabPane tab={t("marketing.tabs.publish")} key="publish">
          {tab === "publish" && (
            <BannerPublish access={access} selectedForm={selectedForm} visible={visible} showBannerForm={showBannerForm} />
          )}
        </TabPane>
        <TabPane tab={t("marketing.tabs.hidden")} key="hidden">
          {tab === "hidden" && (
            <BannerHidden access={access} selectedForm={selectedForm} visible={visible} showBannerForm={showBannerForm} />
          )}
        </TabPane>
      </Tabs>
    </>
  );
};
