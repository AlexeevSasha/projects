import { Collapse, Form, Input, Space } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import TextArea from "antd/lib/input/TextArea";
import { ImageField } from "../../../ui/ImageField";
import { imageRepository } from "../../../api/imageRepository";
import { ICmsProps } from "../../interfaces/ICmsProps";

export const FormRedBanner = ({ lang }: ICmsProps) => {
  const { t } = useTranslation();

  return (
    <Collapse>
      <Collapse.Panel
        header={t("pagesSections.spartakKids.kids.redBlock")}
        key="FormRedBanner"
        className="site-collapse-custom-panel"
      >
        <Form.Item name={["redBlock", "title", lang]} label={t("pagesSections.stadiumStaff.eventTeam.title")}>
          <Input />
        </Form.Item>
        <Form.Item name={["redBlock", "description", lang]} label={t("pagesSections.chairPlotting.description")}>
          <TextArea />
        </Form.Item>
        <Form.Item name={["redBlock", "link", lang]} label={t("pagesSections.spartakKids.kids.buttonLink")}>
          <Input />
        </Form.Item>
        <Form.Item name={["redBlock", "buttonTitle", lang]} label={t("pagesSections.spartakKids.kids.buttonName")}>
          <Input />
        </Form.Item>

        <Space size={"large"}>
          <Form.Item
            name={["redBlock", "desktop", lang]}
            label={t("pagesSections.clubResults.mainInfo.banner") + " " + t("pagesSections.spartakKids.kids.desktop")}
          >
            <ImageField uploadRequest={imageRepository.upload} />
          </Form.Item>

          <Form.Item
            name={["redBlock", "tablet", lang]}
            label={t("pagesSections.clubResults.mainInfo.banner") + " " + t("pagesSections.spartakKids.kids.tablet")}
          >
            <ImageField uploadRequest={imageRepository.upload} />
          </Form.Item>
          <Form.Item
            name={["redBlock", "mobile", lang]}
            label={t("pagesSections.clubResults.mainInfo.banner") + " " + t("pagesSections.spartakKids.kids.mobile")}
          >
            <ImageField uploadRequest={imageRepository.upload} />
          </Form.Item>
        </Space>

        <Form.Item name={["redBlock", "photo", lang]} label={t("pagesSections.spartakKids.kids.objectPhoto")}>
          <ImageField uploadRequest={imageRepository.upload} />
        </Form.Item>
      </Collapse.Panel>
    </Collapse>
  );
};
