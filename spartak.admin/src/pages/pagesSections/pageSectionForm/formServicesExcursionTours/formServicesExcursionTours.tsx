import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Collapse, Form, Input, Row } from "antd";
import TextArea from "antd/es/input/TextArea";
import { CMS } from "common/components/cms";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { imageRepository } from "../../../../api/imageRepository";
import { ImageField } from "../../../../ui/ImageField";
import { Wysiwyg } from "../../../../ui/Wisiwyg/Wysiwyg";
import { ICmsProps } from "../../../../common/interfaces/ICmsProps";

export const FormServicesExcursionTours = (props: ICmsProps) => {
  const { t } = useTranslation();

  return (
    <>
      {/*/!* мета - теги *!/*/}
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
      {/*Красный блок с текстом*/}
      <Collapse>
        <Collapse.Panel
          header={t("pagesSections.servicesAdjacentTerritory.redBlock.collapseText")}
          key="3"
          className="site-collapse-custom-panel"
        >
          <Form.Item
            name={["redBanner", "text1", props.lang]}
            label={t("pagesSections.servicesAdjacentTerritory.redBlock.firstColumn")}
          >
            <Wysiwyg uploadRequest={imageRepository.upload} bottom="10px" />
          </Form.Item>
          <Form.Item
            name={["redBanner", "text2", props.lang]}
            label={t("pagesSections.servicesAdjacentTerritory.redBlock.secondColumn")}
          >
            <Wysiwyg uploadRequest={imageRepository.upload} />
          </Form.Item>
        </Collapse.Panel>
      </Collapse>
      {/*/!*Стандартный тур*!/*/}
      <Collapse>
        <Collapse.Panel
          header={t("pagesSections.excursionTours.standardTour.title")}
          key="4"
          className="site-collapse-custom-panel"
        >
          <Form.Item name={["standardTour", "title", props.lang]}>
            <Input placeholder={t("pagesSections.excursionTours.standardTour.tourName")} />
          </Form.Item>
          <Form.Item name={["standardTour", "description", props.lang]}>
            <TextArea rows={3} placeholder={t("pagesSections.excursionTours.standardTour.tourDescription")} />
          </Form.Item>
          <Form.Item
            name={["standardTour", "img", props.lang]}
            label={t("pagesSections.excursionTours.standardTour.tourImage")}
          >
            <ImageField uploadRequest={imageRepository.upload} />
          </Form.Item>

          <Row gutter={8}>
            <Col>
              <Form.Item name={["standardTour", "price1", "label", props.lang]}>
                <TextArea rows={3} placeholder={t("pagesSections.excursionTours.standardTour.priceDescription")} />
              </Form.Item>
              <Form.Item name={["standardTour", "price1", "value", props.lang]}>
                <Input type={"number"} min={0} placeholder={t("pagesSections.excursionTours.standardTour.price")} />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item name={["standardTour", "price2", "label", props.lang]}>
                <TextArea rows={3} placeholder={t("pagesSections.excursionTours.standardTour.priceDescription")} />
              </Form.Item>
              <Form.Item name={["standardTour", "price2", "value", props.lang]}>
                <Input type={"number"} min={0} placeholder={t("pagesSections.excursionTours.standardTour.price")} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name={["standardTour", "pricesDescription", props.lang]}
            label={t("pagesSections.excursionTours.standardTour.packagesDescription")}
          >
            <Wysiwyg uploadRequest={imageRepository.upload} />
          </Form.Item>
          <Form.Item name={["standardTour", "link", props.lang]}>
            <Input placeholder={t("pagesSections.excursionTours.standardTour.linkToTour")} />
          </Form.Item>
          <Form.Item name={["standardTour", "buttonName", props.lang]}>
            <Input placeholder={t("pagesSections.excursionTours.toursConstructor.buttonsName")} />
          </Form.Item>
          <Form.List name={["standardTour", "options"]}>
            {(fieldsBlockInfo, { add: blockInfoAdd, remove: blockInfoRemove }) => (
              <>
                {fieldsBlockInfo.map((blockInfo, index) => (
                  <div key={`${"option" + index}`}>
                    <Form.Item {...blockInfo} name={[index, props.lang]}>
                      <Input placeholder={t("pagesSections.excursionTours.standardTour.point")} />
                    </Form.Item>
                    <MinusContainer>
                      <DeleteOutlined onClick={() => blockInfoRemove(blockInfo.name)} />
                    </MinusContainer>
                  </div>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => blockInfoAdd()} block icon={<PlusOutlined />}>
                    {t("pagesSections.excursionTours.standardTour.addPoint")}
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Collapse.Panel>
      </Collapse>
      {/*/!*Конструктор туров*!/*/}
      <Collapse>
        <Collapse.Panel
          header={t("pagesSections.excursionTours.toursConstructor.title")}
          key="5"
          className="site-collapse-custom-panel"
        >
          <Form.List name={["customTours"]}>
            {(customToursInfo, { add: tourInfoAdd, remove: tourInfoRemove }) => (
              <>
                {customToursInfo.map((tourInfo, index) => (
                  <div key={`${"tourInfo" + index}`}>
                    <Form.Item name={[index, "title", props.lang]}>
                      <Input placeholder={t("pagesSections.excursionTours.standardTour.tourName")} />
                    </Form.Item>
                    <Form.Item name={[index, "description", props.lang]}>
                      <Wysiwyg uploadRequest={imageRepository.upload} />
                    </Form.Item>
                    <Row gutter={8}>
                      <Col>
                        <Form.Item name={[index, "priceFrom", props.lang]}>
                          <Input
                            type={"number"}
                            min={0}
                            placeholder={t("pagesSections.excursionTours.toursConstructor.priceFrom")}
                          />
                        </Form.Item>
                      </Col>
                      <Col>
                        <Form.Item name={[index, "priceTo", props.lang]}>
                          <Input
                            type={"number"}
                            min={0}
                            placeholder={t("pagesSections.excursionTours.toursConstructor.priceTo")}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Form.Item name={[index, "link", props.lang]}>
                      <Input placeholder={t("pagesSections.excursionTours.standardTour.linkToTour")} />
                    </Form.Item>
                    <Form.Item name={[index, "buttonName", props.lang]}>
                      <Input placeholder={t("pagesSections.excursionTours.toursConstructor.buttonsName")} />
                    </Form.Item>
                    <Form.Item name={[index, "additionalInfo", props.lang]}>
                      <TextArea
                        rows={3}
                        placeholder={t("pagesSections.excursionTours.toursConstructor.additionalInfo")}
                      />
                    </Form.Item>
                    <Form.Item
                      name={[index, "img", props.lang]}
                      label={t("pagesSections.excursionTours.standardTour.tourImage")}
                    >
                      <ImageField uploadRequest={imageRepository.upload} />
                    </Form.Item>
                    <Row gutter={8}>
                      <Col>
                        <Form.Item name={[index, "price1", "label", props.lang]}>
                          <TextArea
                            rows={3}
                            placeholder={t("pagesSections.excursionTours.standardTour.priceDescription")}
                          />
                        </Form.Item>
                        <Form.Item name={[index, "price1", "value", props.lang]}>
                          <Input
                            type={"number"}
                            min={0}
                            placeholder={t("pagesSections.excursionTours.standardTour.price")}
                          />
                        </Form.Item>
                      </Col>
                      <Col>
                        <Form.Item name={[index, "price2", "label", props.lang]}>
                          <TextArea
                            rows={3}
                            placeholder={t("pagesSections.excursionTours.standardTour.priceDescription")}
                          />
                        </Form.Item>
                        <Form.Item name={[index, "price2", "value", props.lang]}>
                          <Input
                            type={"number"}
                            min={0}
                            placeholder={t("pagesSections.excursionTours.standardTour.price")}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Form.Item name={[index, "additionalDescription", props.lang]}>
                      <Wysiwyg
                        uploadRequest={imageRepository.upload}
                        // placeholder={t(
                        //   "pagesSections.excursionTours.toursConstructor.additionalDescription"
                        // )}
                      />
                    </Form.Item>
                    <MinusContainer>
                      <DeleteOutlined onClick={() => tourInfoRemove(tourInfo.name)} />
                    </MinusContainer>
                  </div>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => tourInfoAdd()} block icon={<PlusOutlined />}>
                    {t("pagesSections.excursionTours.standardTour.addPoint")}
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Collapse.Panel>
      </Collapse>
      {/*/!*Дополнительная информация*!/*/}
      <Collapse>
        <Collapse.Panel
          header={t("pagesSections.excursionTours.additionalInfo.title")}
          key="6"
          className="site-collapse-custom-panel"
        >
          <Form.Item
            name={["additional", "text", props.lang]}
            label={t("pagesSections.excursionTours.additionalInfo.description")}
          >
            <Wysiwyg uploadRequest={imageRepository.upload} bottom="10px" />
          </Form.Item>
          <Form.Item
            name={["additional", "img", props.lang]}
            label={t("pagesSections.excursionTours.additionalInfo.photo")}
          >
            <ImageField uploadRequest={imageRepository.upload} />
          </Form.Item>
        </Collapse.Panel>
      </Collapse>
    </>
  );
};

const MinusContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding-bottom: 24px;
`;
