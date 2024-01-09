import { Collapse, Form, Input } from "antd";
import { CMS } from "common/components/cms";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { imageRepository } from "../../../../api/imageRepository";
import { theme } from "../../../../assets/theme/theme";
import { required } from "../../../../common/helpers/validators/required";
import { ImageField } from "../../../../ui/ImageField";
import { Wysiwyg } from "../../../../ui/Wisiwyg/Wysiwyg";
import { ICmsProps } from "../../../../common/interfaces/ICmsProps";

export const FormChairPlotting = (props: ICmsProps) => {
  const { t } = useTranslation();

  return (
    <>
      {/* мета - теги */}
      <CMS.MetaTags lang={props.lang} />

      {/* Основная информация на странице */}
      <Collapse>
        <Collapse.Panel
          header={t("pagesSections.servicesAdjacentTerritory.mainInfo.collapseText")}
          key="2"
          className="site-collapse-custom-panel"
        >
          <Form.Item
            name={["mainInfo", "previewImg", props.lang]}
            label={t("pagesSections.servicesAdjacentTerritory.mainInfo.mainInfoImg")}
          >
            <ImageField uploadRequest={imageRepository.upload} />
          </Form.Item>
          <Form.Item
            name={["mainInfo", "title", props.lang]}
            label={t("pagesSections.servicesAdjacentTerritory.mainInfo.mainInfoTitle")}
          >
            <Input />
          </Form.Item>
        </Collapse.Panel>
      </Collapse>

      {/*Контент страницы*/}
      <Collapse>
        <Collapse.Panel
          header={t("pagesSections.chairPlotting.description")}
          key="3"
          className="site-collapse-custom-panel"
        >
          <Form.Item name={["info", "img", props.lang]} label={t("allPages.photo")} rules={[{ validator: required }]}>
            <ImageField
              validation={{
                width: 568,
                height: 462,
                size: 1024,
                format: ["png", "jpeg"],
                exact: true,
              }}
            />
          </Form.Item>

          <UploadDesc>
            {t("allPages.form.uploadDesc", {
              width: "568",
              height: "462",
              size: "1",
              format: "png, jpeg",
            })}
          </UploadDesc>

          <Form.Item name={["info", "description", props.lang]} label={t("pagesSections.academyEnter.mainInfo")}>
            <Wysiwyg uploadRequest={imageRepository.upload} />
          </Form.Item>
        </Collapse.Panel>
      </Collapse>
    </>
  );
};
const UploadDesc = styled.span`
  color: ${theme.colors.middleGray};
`;
