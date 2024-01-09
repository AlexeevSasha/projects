import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Collapse, Form, Input } from "antd";
import { CMS } from "common/components/cms";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { imageRepository } from "../../../../api/imageRepository";
import { Wysiwyg } from "../../../../ui/Wisiwyg/Wysiwyg";
import { ICmsProps } from "../../../../common/interfaces/ICmsProps";

export const FormClubContacts = (props: ICmsProps) => {
  const { t } = useTranslation();

  return (
    <>
      {/*мета - теги*/}
      <CMS.MetaTags lang={props.lang} />

      {/* Основная информация на странице */}
      <CMS.MainInfo lang={props.lang} />

      {/*Создание контакта*/}
      <Collapse>
        <Collapse.Panel header={t("pagesSections.clubContacts.title")} key="4" className="site-collapse-custom-panel">
          <Form.List name="clubContacts">
            {(fieldsBlockInfo, { add: blockInfoAdd, remove: blockInfoRemove }) => (
              <>
                {fieldsBlockInfo.map((blockInfo, index) => (
                  <div key={`${"blockInfo" + index}`}>
                    <Form.Item name={[blockInfo.name, "title", props.lang]}>
                      <Input placeholder={t("pagesSections.clubContacts.mainInfo.name")} />
                    </Form.Item>
                    <Form.Item
                      name={[blockInfo.name, "description", props.lang]}
                      label={t("pagesSections.clubContacts.mainInfo.description")}
                    >
                      <Wysiwyg uploadRequest={imageRepository.upload} />
                    </Form.Item>

                    <MinusContainer>
                      <DeleteOutlined onClick={() => blockInfoRemove(blockInfo.name)} />
                    </MinusContainer>
                  </div>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => blockInfoAdd()} block icon={<PlusOutlined />}>
                    {t("pagesSections.servicesAdjacentTerritory.addBlockInfo")}
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Collapse.Panel>
      </Collapse>
    </>
  );
};

const MinusContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 5px 0 20px;
`;
