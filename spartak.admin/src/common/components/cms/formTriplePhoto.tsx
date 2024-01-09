import { Collapse, Form } from "antd";
import { imageRepository } from "api/imageRepository";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { ImageField } from "ui/ImageField";
import { ICmsProps } from "../../interfaces/ICmsProps";

export const FormTriplePhoto = (props: ICmsProps) => {
  const { t } = useTranslation();

  return (
    <Collapse>
      <Collapse.Panel
        header={t("pagesSections.servicesVipLodges.tripleBlock.triplePhoto")}
        key="FormTriplePhoto"
        className="site-collapse-custom-panel"
      >
        <StyledPanel>
          <DoublePhotoColumn>
            <Form.Item
              name={["triplePhoto", "photo1", props.lang]}
              label={t("pagesSections.servicesVipLodges.tripleBlock.firstPhoto")}
            >
              <ImageField uploadRequest={imageRepository.upload} />
            </Form.Item>

            <Form.Item
              name={["triplePhoto", "photo2", props.lang]}
              label={t("pagesSections.servicesVipLodges.tripleBlock.secondPhoto")}
            >
              <ImageField uploadRequest={imageRepository.upload} />
            </Form.Item>
          </DoublePhotoColumn>
          <StyledImageField>
            <Form.Item
              name={["triplePhoto", "mainPhoto", props.lang]}
              label={t("pagesSections.servicesVipLodges.tripleBlock.mainPhoto")}
            >
              <ImageField uploadRequest={imageRepository.upload} />
            </Form.Item>
          </StyledImageField>
        </StyledPanel>
      </Collapse.Panel>
    </Collapse>
  );
};

const StyledPanel = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 3fr;
  width: 100%;
`;

const DoublePhotoColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledImageField = styled.div`
  width: 100%;
  height: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
`;
