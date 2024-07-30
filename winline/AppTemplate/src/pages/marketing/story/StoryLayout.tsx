import React, { useEffect, useState } from "react";
import { Button, Card, Tabs } from "antd";
import type { IStory } from "../../../api/dto/content/IStory";
import { useTranslation } from "react-i18next";
import { PlusOutlined } from "@ant-design/icons";
import { getDeepLinksThunk } from "../../../modules/commons/commonsActionAsync";
import { useAppDispatch } from "../../../core/redux/store";
import { ContentStyled, HeaderStyled, TitleStyled } from "../../../ui/commonComponents";

const StoryPublish = React.lazy(async () => import("./components/StoryPublish"));
const StoryHidden = React.lazy(async () => import("./components/StoryHidden"));

export const StoryLayout = ({ access }: { access: boolean }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [tab, setTab] = useState("publish");
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedForm, setSelectedForm] = useState<IStory | null>(null);

  const { TabPane } = Tabs;
  const handleTabChange = (key: string) => setTab(key);

  const showStoryForm = (value = null) => {
    setSelectedForm(value);
    setVisible(!visible);
  };

  useEffect(() => {
    dispatch(getDeepLinksThunk());
  }, []);

  const button = (
    <Button onClick={() => showStoryForm()} type="primary" icon={<PlusOutlined />}>
      {t("common.buttonsText.create")}
    </Button>
  );

  return (
    <>
      <Tabs onChange={handleTabChange} tabBarExtraContent={access && button}>
        <TabPane tab={t("marketing.tabs.publish")} key="publish">
          {tab === "publish" && (
            <StoryPublish access={access} selectedForm={selectedForm} visible={visible} showStoryForm={showStoryForm} />
          )}
        </TabPane>
        <TabPane tab={t("marketing.tabs.hidden")} key="hidden">
          {tab === "hidden" && <StoryHidden access={access} selectedForm={selectedForm} visible={visible} showStoryForm={showStoryForm} />}
        </TabPane>
      </Tabs>
    </>
  );
};
