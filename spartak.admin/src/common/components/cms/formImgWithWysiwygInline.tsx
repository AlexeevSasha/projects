import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Collapse, Form } from "antd";
import { imageRepository } from "api/imageRepository";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { ImageField } from "ui/ImageField";
import { Wysiwyg } from "../../../ui/Wisiwyg/Wysiwyg";
import React from "react";
import { ICmsProps } from "../../interfaces/ICmsProps";
import { NamePath } from "antd/lib/form/interface";
import { getNamePath } from "../../helpers/getNamePath";

interface IProps extends ICmsProps {
  name?: NamePath;
}

/*
 * Картинка слева, тест справа
 * В визвиге можно писать список, отображаеться с красными точками
 * Чётные картинка справка, нечётные картинка слева
 */
export const FormImgWithWysiwygInline = (props: IProps) => {
  const { t } = useTranslation();

  return (
    <Collapse>
      <Collapse.Panel
        header={t("pagesSections.infoBlockImgWithWysiwyg.title")}
        key="ImgWithWysiwygInline"
        className="site-collapse-custom-panel"
      >
        <Form.List name={getNamePath(props.name || "", "imgWithWysiwygInline")}>
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <div style={{ marginBottom: 15 }} key={`${"imgWithWysiwygInline" + index}`}>
                  <Form.Item name={[field.name, "img"]} label={t("pagesSections.image")}>
                    <ImageField uploadRequest={imageRepository.upload} />
                  </Form.Item>

                  <Form.Item {...field} name={[field.name, "description", props.lang]}>
                    <Wysiwyg uploadRequest={imageRepository.upload} />
                  </Form.Item>

                  <MinusContainer>
                    <DeleteOutlined onClick={() => remove(field.name)} />
                  </MinusContainer>
                </div>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  {t("pagesSections.addBlock")}
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Collapse.Panel>
    </Collapse>
  );
};

const MinusContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
