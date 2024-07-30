import { FC, useEffect, useRef, useState } from "react";
import { Button, Drawer, Form, message, Modal, Tabs } from "antd";
import { InitialStoryForm } from "./InitialStoryForm";
import { useForm } from "antd/es/form/Form";
import { ComponentStoryForm } from "./ComponentStoryForm";
import type { IComponentInfo, IStory } from "../../../../api/dto/content/story/story";
import { useAppDispatch } from "../../../../core/redux/store";
import { addStoryThunk, updateStoryThunk } from "../../../../modules/story/storyActionAsync";
import { useTranslation } from "react-i18next";
import moment from "moment";

interface IProps {
  visible: boolean;
  closeDrawer: any;
  storyUpdate: IStory | null;
}

interface ITab {
  key: string;
  title: string;
  content: any;
}

export const NewFormStory: FC<IProps> = ({ visible, closeDrawer, storyUpdate }) => {
  const [form] = useForm();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [activeKey, setActiveKey] = useState("initialTab");
  const tabIndex = useRef<number>(0);
  const [compImageUploaded, setCompImageUploaded] = useState(true);
  const [compIndexes, setCompIndexes] = useState<number[]>([]);
  const [items, setItems] = useState<ITab[]>([]);
  const [stateStoryComponents, setStateStoryComponents] = useState<IComponentInfo[]>();
  useEffect(() => {
    if (storyUpdate) {
      tabIndex.current = storyUpdate?.additionalInfo.component.length + 1;
    }
  }, [storyUpdate]);

  useEffect(() => {
    form.resetFields();
  }, [storyUpdate]);

  useEffect(() => {
    if (visible && !storyUpdate) {
      setCompIndexes([]);
      setItems([
        {
          key: "initialTab",
          title: t("story.main"),
          content: <InitialStoryForm form={form} storyUpdate={storyUpdate} />
        }
      ]);
    }
    if (storyUpdate && visible) {
      const updateCompIndexes: number[] = [];
      const component = Object.keys(storyUpdate?.additionalInfo?.component)?.map((key, i) => {
        const tab = {
          key: key,
          title: t("story.additional") + " ",
          content: <ComponentStoryForm i={i} storyUpdate={storyUpdate} form={form} compImageUploaded={compImageUploaded} />
        };
        updateCompIndexes.push(i);

        return tab;
      });
      items.push({
        key: "initialTab",
        title: t("story.main"),
        content: <InitialStoryForm form={form} storyUpdate={storyUpdate} />
      });
      items.push(...component);
      setItems([...items]);
      setCompIndexes([...updateCompIndexes]);
    }
  }, [visible]);

  const add = () => {
    tabIndex.current++;
    items.push({
      key: tabIndex.current.toString(),
      title: t("story.additional") + " ",
      content: <ComponentStoryForm i={tabIndex.current} storyUpdate={storyUpdate} form={form} compImageUploaded={compImageUploaded} />
    });
    compIndexes.push(tabIndex.current);
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
    const newCompIndexes = compIndexes.filter((item) => item !== Number(targetKey));
    setCompIndexes([...newCompIndexes]);
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

  const showCloseModal = () => {
    Modal.confirm({
      title: t("common.modal.title") + " " + t("common.modal.close") + "?",
      maskClosable: true,
      content: t("story.modal.close"),
      okText: t("common.buttonsText.confirm"),
      cancelText: t("common.buttonsText.cancel"),
      onOk: () => handleCloseDrawer()
    });
  };

  useEffect(() => {
    setStateStoryComponents(storyUpdate?.additionalInfo.component);
  }, [storyUpdate]);

  const removeKeys = <T extends { [key: string]: any }, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> => {
    const result = { ...obj };
    keys.forEach((key) => delete result[key]);

    return result as Omit<T, K>;
  };

  const handleSubmit = () => {
    const validates = form.validateFields();
    validates.catch((error) => {
      tabsValidator(error.errorFields);
    });

    // eslint-disable-next-line complexity
    form.validateFields().then((values) => {
      if (storyUpdate) {
        const payload = { ...storyUpdate, ...values };

        const comp: string[] = [];
        compIndexes.forEach((key) => {
          comp.push(`${key}` + "componentImageUrl");
          comp.push(`${key}` + "componentVideoUrl");
        });

        const updatePayload = removeKeys(payload, [
          "beginningPublication",
          "endPublication",
          "imageUrl",
          "imageMiniUrl",
          "videoUrl",
          ...comp
        ]) as any;
        const updatedData = {
          ...updatePayload,
          additionalInfo: {
            ...updatePayload?.additionalInfo,
            imageMiniUrl: values.imageMiniUrl || storyUpdate.additionalInfo.imageMiniUrl,
            component: items.slice(1).map((item, i) => {
              const compImageUrl = `${compIndexes[i]}` + "componentImageUrl";
              const compVideoUrl = `${compIndexes[i]}` + "componentVideoUrl";
              const value = values?.additionalInfo?.component?.[+item.key]
                ? values?.additionalInfo?.component?.[+item.key]
                : stateStoryComponents?.[i];

              const updatedComponent = { ...value };

              if (values[compImageUrl] || values[compVideoUrl]) {
                Object.assign(updatedComponent, {
                  imageUrl:
                    (value[compImageUrl] || values[compImageUrl]) && !values[compVideoUrl]
                      ? values[compImageUrl]
                        ? values[compImageUrl]
                        : value[compImageUrl]
                      : null,
                  videoUrl:
                    (value[compVideoUrl] || values[compVideoUrl]) && !values[compImageUrl]
                      ? values[compVideoUrl]
                        ? values[compVideoUrl]
                        : value[compVideoUrl]
                      : null
                });
              }

              return updatedComponent;
            })
          }
        };

        if (storyUpdate.additionalInfo.imageUrl || storyUpdate.additionalInfo.videoUrl) {
          Object.assign(updatedData.additionalInfo, {
            imageUrl:
              (values.imageUrl || storyUpdate.additionalInfo.imageUrl) && !values.videoUrl
                ? values.imageUrl
                  ? values.imageUrl.file
                    ? values.imageUrl.file.response
                    : values.imageUrl
                  : storyUpdate.additionalInfo.imageUrl
                : null,
            videoUrl:
              (values.videoUrl || storyUpdate.additionalInfo.videoUrl) && !values.imageUrl
                ? values.videoUrl
                  ? values.videoUrl.file
                    ? values.videoUrl.file.response
                    : values.videoUrl
                  : storyUpdate.additionalInfo.videoUrl
                : null
          });
        }

        dispatch(updateStoryThunk(updatedData));
        handleCloseDrawer();
      } else {
        if (
          values.imageUrl?.event ||
          values.imageMiniUrl?.event ||
          values.videoUrl?.event ||
          values.additionalInfo?.component?.some((item: any) => item?.imageUrl?.event || item?.videoUrl?.event)
        ) {
          setCompImageUploaded(false);
        }
        if (values.beginningPublication > values.endPublication) {
          message.error(t("validations.invalidBeginPublishDate"));
        } else if (values.beginningPublication > moment() && values.beginningPublication < values.endPublication) {
          const comp: string[] = [];
          compIndexes.forEach((key) => {
            comp.push(`${key}` + "componentImageUrl");
            comp.push(`${key}` + "componentVideoUrl");
          });
          const components = values.additionalInfo.component
            ? values.additionalInfo.component.filter((item: any) => item !== undefined)
            : [];
          const payload = removeKeys(values, ["imageUrl", "imageMiniUrl", "videoUrl", "compImageUrl", "compVideoUrl", ...comp]) as any;
          dispatch(
            addStoryThunk({
              ...payload,
              additionalInfo: {
                ...values.additionalInfo,
                imageUrl: values.imageUrl || null,
                imageMiniUrl: values.imageMiniUrl,
                videoUrl: values.videoUrl || null,
                component: components
                  ? components.map((item: any, ind: number) => {
                      return {
                        ...item,
                        imageUrl: values[`${compIndexes[ind]}` + "componentImageUrl"] || null,
                        videoUrl: values[`${compIndexes[ind]}` + "componentVideoUrl"] || null
                      };
                    })
                  : []
              },
              contentType: "Story",
              contentStatus: "Unknown"
            })
          );
          handleCloseDrawer();
        } else {
          message.error(t("validations.invalidStartPublishDate"));
        }
      }
    });
  };

  const tabsValidator = (errors: any) => {
    const test = errors.map((error: any) => error.name).map((el: any) => el.filter((num: any) => typeof num === "number"));
    const compImageErrors = /[0-9]*component/;
    const compErrors = errors
      .map((error: any) => {
        const result = compImageErrors.test(error.name);
        let tab;
        if (result) {
          tab = error.name[0].substring(0, 1);
        }

        return tab;
      })
      .filter((item: any) => Number(item) || item == 0);

    if (errors.length && test.every((el: any) => el[0] === undefined) && !compErrors[0]) {
      setActiveKey("initialTab");
    } else if ((errors.length && !test.every((el: any) => el[0] === undefined)) || compErrors[0]) {
      if (!compErrors[0]) {
        setActiveKey(`${test.find((el: any) => el.length)[0]}`);
      } else {
        setActiveKey(`${compErrors[0]}`);
      }
    }
  };

  return (
    <Drawer
      visible={visible}
      onClose={showCloseModal}
      width={600}
      closable={false}
      title={`${storyUpdate ? t("common.edit") : t("common.buttonsText.create")}` + " " + t("story.title").toLowerCase()}
      footer={
        <div
          style={{
            textAlign: "right"
          }}
        >
          <Button onClick={showCloseModal} style={{ marginRight: 8 }}>
            {t("common.buttonsText.cancel")}
          </Button>
          <Button onClick={handleSubmit} type="primary" htmlType={"submit"}>
            {t("common.buttonsText.save")}
          </Button>
        </div>
      }
    >
      <Form form={form} layout={"vertical"}>
        <Tabs type="editable-card" onChange={onChange} onEdit={onEdit} activeKey={activeKey} hideAdd={items.length === 6}>
          {items.map((tab, ind) => (
            <Tabs.TabPane tab={ind > 0 ? tab.title + `${ind}` : tab.title} key={tab.key}>
              {tab.content}
            </Tabs.TabPane>
          ))}
        </Tabs>
      </Form>
    </Drawer>
  );
};
