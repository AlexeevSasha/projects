import { useEffect, useState } from "react";
import { Button, Card, Tabs } from "antd";
import { useTranslation } from "react-i18next";
import { ContentStyled, HeaderStyled, TitleStyled } from "../../ui/commonComponents";
import { PlusOutlined } from "@ant-design/icons";
import { StoryAvailable } from "./components/StoryAvailable";
import { StoryHidden } from "./components/StoryHidden";
import type { IStory } from "../../api/dto/content/story/story";
import { useAppDispatch } from "../../core/redux/store";
import { getDeepLinksThunk } from "../../modules/commons/commonsActionAsync";

export const StoryLayout = ({ access }: { access: boolean }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [tab, setTab] = useState("available");
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
      <HeaderStyled>
        <TitleStyled level={4}>{t("story.title")}</TitleStyled>
      </HeaderStyled>

      <ContentStyled>
        <Card>
          <Tabs onChange={handleTabChange} tabBarExtraContent={access && button}>
            <TabPane tab={t("story.tab1")} key="available">
              {tab === "available" && (
                <StoryAvailable access={access} selectedForm={selectedForm} visible={visible} showStoryForm={showStoryForm} />
              )}
            </TabPane>
            <TabPane tab={t("story.tab2")} key="hidden">
              {tab === "hidden" && (
                <StoryHidden access={access} selectedForm={selectedForm} visible={visible} showStoryForm={showStoryForm} />
              )}
            </TabPane>
          </Tabs>
        </Card>
      </ContentStyled>
    </>
  );
};
