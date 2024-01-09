import { Checkbox, Collapse, Form } from "antd";
import { CMS } from "common/components/cms";
import { useTranslation } from "react-i18next";
import { ICmsProps } from "../../../../common/interfaces/ICmsProps";

export const FormFoodCourt = (props: ICmsProps) => {
  const { t } = useTranslation();

  return (
    <>
      {/* мета - теги */}
      <CMS.MetaTags lang={props.lang} />
      {/* Основная информация на странице */}
      <CMS.MainInfo lang={props.lang} />
      {/* Текст в две колонке на красном фоне */}
      <CMS.RedBlock lang={props.lang} />
      {/* Блок с информацией о помещениях с территорией */}
      <CMS.ImgTextWithTerritory lang={props.lang} />
      {/* Блок с тремя картинками в ряду */}
      <CMS.ImgTextWithTerritory lang={props.lang} />
      {/*Блок в котором в ряд 3 фотографии, одна большая и две маленьких*/}
      <CMS.TriplePhoto lang={props.lang} />
      {/* Блок для отображения формы "связаться с нами" */}
      <Collapse>
        <Collapse.Panel
          header={t("pagesSections.servicesAdjacentTerritory.redBlock.collapseText")}
          key="FormFoodCourt1"
          className="site-collapse-custom-panel"
        >
          <Form.Item
            name={"showFeedbackForm"}
            label={t("pagesSections.servicesAdjacentTerritory.redBlock.secondColumn")}
            valuePropName="checked"
          >
            <Checkbox>какой-то текст</Checkbox>
          </Form.Item>
        </Collapse.Panel>
      </Collapse>
    </>
  );
};
