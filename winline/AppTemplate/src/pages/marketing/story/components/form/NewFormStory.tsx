import { FC, useEffect, useRef, useState } from "react";
import { Button, Drawer, Form, message, Tabs } from "antd";
import { InitialStoryForm } from "./InitialStoryForm";
import { useForm } from "antd/es/form/Form";
import { ComponentStoryForm } from "./ComponentStoryForm";
import { IComponentInfo, IStory } from "../../../../../api/dto/content/IStory";
import { addStoryThunk, updateStoryThunk } from "../../../../../modules/content/story/storyActionAsync";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../../../../core/redux/store";

interface IProps {
  visible: boolean;
  closeDrawer: any;
  storyUpdate: IStory | null;
}

export const NewFormStory: FC<IProps> = ({ visible, closeDrawer, storyUpdate }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [form] = useForm();
  const [activeKey, setActiveKey] = useState("initialTab");
  const tabIndex = useRef<number>(0);
  const [deleteSuccess, setDeleteSuccess] = useState<boolean>(false);
  const [sizeError, setSizeError] = useState<{ size: boolean; mini: boolean }>({ size: false, mini: false });
  const [acceptError, setAcceptError] = useState<boolean>(false);
  const [items, setItems] = useState<any[]>([]);
  const [stateStoryComponents, setStateStoryComponents] = useState<IComponentInfo[]>();

  useEffect(() => {
    form.resetFields();
  }, [storyUpdate]);

  useEffect(() => {
    if (storyUpdate) {
      tabIndex.current = storyUpdate?.additionalInfo.componentInfo.length + 1;
    }
  }, [storyUpdate]);

  useEffect(() => {
    if (visible && !storyUpdate) {
      setItems([
        <Tabs.TabPane tab={t("marketing.story.main")} key={"initialTab"} closable={false}>
          <InitialStoryForm form={form} storyUpdate={storyUpdate} setSizeError={setSizeError} setAcceptError={setAcceptError} />
        </Tabs.TabPane>
      ]);
    }
    if (storyUpdate && visible) {
      const componentInfo = Object.keys(storyUpdate?.additionalInfo?.componentInfo)?.map((key, i) => (
        <Tabs.TabPane tab={t("marketing.story.additional")} key={key}>
          <ComponentStoryForm i={i} storyUpdate={storyUpdate} form={form} setSizeError={setSizeError} setAcceptError={setAcceptError} />
        </Tabs.TabPane>
      ));
      items.push(
        <Tabs.TabPane tab={t("marketing.story.main")} key={"initialTab"} closable={false}>
          <InitialStoryForm form={form} storyUpdate={storyUpdate} setSizeError={setSizeError} setAcceptError={setAcceptError} />
        </Tabs.TabPane>
      );
      items.push(...componentInfo);
      setItems([...items]);
    }
  }, [visible, storyUpdate]);

  const add = () => {
    tabIndex.current++;
    items.push(
      <Tabs.TabPane tab={t("marketing.story.additional")} key={tabIndex.current}>
        <ComponentStoryForm
          i={tabIndex.current}
          storyUpdate={storyUpdate}
          form={form}
          setSizeError={setSizeError}
          setAcceptError={setAcceptError}
        />
      </Tabs.TabPane>
    );
    setActiveKey(`${tabIndex.current}`);
  };

  const remove = (targetKey: string) => {
    let newActiveKey = activeKey;
    let lastIndex = -1;
    items.forEach((item: any, i: number) => {
      if (item.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = items.filter((item: any) => item.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };

  const onChange = (newActiveKey: string) => {
    setActiveKey(newActiveKey);
  };

  const onEdit = (targetKey: any, action: "add" | "remove") => {
    if (action === "add") {
      add();
    } else {
      remove(targetKey);
    }
  };

  const handleCloseDrawer = () => {
    setItems([]);
    setActiveKey("initialTab");
    tabIndex.current = 0;
    form.resetFields();
    closeDrawer();
  };

  useEffect(() => {
    setStateStoryComponents(storyUpdate?.additionalInfo.componentInfo);
  }, [storyUpdate]);

  const handleSubmit = () => {
    const validates = form.validateFields();
    validates.catch((error) => {
      tabsValidator(error.errorFields);
    });

    form.validateFields().then((values) => {
      if (storyUpdate) {
        dispatch(
          updateStoryThunk({
            ...storyUpdate,
            ...values,
            additionalInfo: {
              ...values?.additionalInfo,
              componentInfo: items
                .slice(1)
                .map((item, i) =>
                  values?.additionalInfo?.componentInfo?.[+item.key]
                    ? values?.additionalInfo?.componentInfo?.[+item.key]
                    : stateStoryComponents?.[i]
                )
            }
          })
        );
      } else {
        dispatch(
          addStoryThunk({
            ...values,
            additionalInfo: {
              ...values?.additionalInfo,
              componentInfo: values?.additionalInfo?.componentInfo ? values?.additionalInfo?.componentInfo.filter((item: any) => item) : []
            },
            contentType: "Story",
            contentStatus: "Hidden"
          })
        );
      }
      handleCloseDrawer();
    });
  };

  const tabsValidator = (errors: any) => {
    const test = errors.map((error: any) => error.name).map((el: any) => el.filter((num: any) => typeof num === "number"));
    if (errors.length && test.every((el: any) => el[0] === undefined)) {
      setActiveKey("initialTab");
    } else if (errors.length && !test.every((el: any) => el[0] === undefined)) {
      setActiveKey(`${test.find((el: any) => el.length)[0]}`);
    }
  };

  if (deleteSuccess) {
    message.success(t("success.delete.marketing.story.additionalImage"));
  }
  if (acceptError) {
    message.error(t("validations.invalidImageFormat"));
  }
  if (sizeError.size) {
    message.error(t("validations.invalidImageSize", { size: sizeError.mini ? "400х400" : "1080х1920" }));
  }

  return (
    <Drawer
      visible={visible}
      onClose={handleCloseDrawer}
      width={600}
      closable={false}
      title={
        `${storyUpdate ? t("common.buttonsText.edit") : t("common.buttonsText.create")}` + " " + t("marketing.story.title").toLowerCase()
      }
      footer={
        <div
          style={{
            textAlign: "right"
          }}
        >
          <Button onClick={handleCloseDrawer} style={{ marginRight: 8 }}>
            {t("common.buttonsText.cancel")}
          </Button>
          <Button onClick={handleSubmit} type="primary" htmlType={"submit"}>
            {t("common.buttonsText.save")}
          </Button>
        </div>
      }
    >
      <Form form={form} layout={"vertical"}>
        <Tabs type="editable-card" onChange={onChange} onEdit={onEdit} activeKey={activeKey} hideAdd={items.length === 3}>
          {items}
        </Tabs>
      </Form>
    </Drawer>
  );
};
