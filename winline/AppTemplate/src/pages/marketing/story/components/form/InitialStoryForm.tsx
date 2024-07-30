import { FC, useEffect, useMemo, useState } from "react";
import { Checkbox, Divider, Form, Input, Radio, RadioChangeEvent, Select, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import styled from "styled-components";
import { IStory } from "../../../../../api/dto/content/IStory";
import {
  validationEmpty,
  validationText,
  validationTextButton,
  validationTitle
} from "../../../../../common/helpers/story/validationStory";
import { StoryInputImg } from "../StoryInputImg";
import { useTranslation } from "react-i18next";
import { formsConstantsValidation } from "../../../../../common/constants/formsConstantsValidation";
import { useSelector } from "react-redux";
import { StateType } from "../../../../../core/redux/store";
import { StyledTooltip } from "../../../../../ui/commonComponents";

const { Text } = Typography;
const { Option } = Select;

interface IProps {
  form: any;
  setSizeError: any;
  setAcceptError: any;
  storyUpdate: IStory | null;
}

interface ISrcData {
  src: string;
  file: File | null | string;
}

export const InitialStoryForm: FC<IProps> = ({ form, setSizeError, setAcceptError, storyUpdate }) => {
  const { t } = useTranslation();
  const [isDisabledButtonData, setDisabledButtonData] = useState<boolean>(false);
  const [linkItemValue, setLinkValue] = useState<{ linkType: string; linkValue: string } | {}>({});
  const [srcData, setSrcData] = useState<ISrcData>({ src: "", file: null });
  const [srcDataMini, setSrcDataMini] = useState<ISrcData>({ src: "", file: null });
  const [linkType, setLinkType] = useState("");

  const { deepLinks } = useSelector((state: StateType) => state.commons);

  const changeStateInputsButton = () => {
    setDisabledButtonData(!isDisabledButtonData);
    setLinkType("");
    isDisabledButtonData && form.validateFields([["additionalInfo", "textButton"]]);
    form.resetFields([
      ["additionalInfo", "textButton"],
      ["additionalInfo", "linkType"],
      ["additionalInfo", "linkValue"]
    ]);
    isDisabledButtonData && setLinkValue({ linkType: "None", linkValue: undefined });
  };

  useEffect(() => {
    setDisabledButtonData(!!storyUpdate?.additionalInfo?.textButton);
    form.resetFields();
    storyUpdate && setLinkType(storyUpdate?.additionalInfo?.linkType);

    return () => {
      setSizeError({ size: false, mini: false });
      setAcceptError(false);
    };
  }, [storyUpdate]);

  const deepLinksOptions = useMemo(
    () =>
      deepLinks.map((option, i) => (
        <Option key={i + 1} value={option.link}>
          {option.name}
        </Option>
      )),
    [deepLinks]
  );

  return (
    <>
      <Form.Item
        required={false}
        label={t("common.heading")}
        name={"name"}
        initialValue={storyUpdate?.name}
        rules={[
          {
            validator: validationTitle
          }
        ]}
      >
        <Input maxLength={50} />
      </Form.Item>
      <Form.Item
        name={["additionalInfo", "previewTitle"]}
        label={t("common.heading") + " " + t("marketing.story.preview")}
        initialValue={storyUpdate?.additionalInfo?.previewTitle}
        required={false}
        rules={[
          {
            max: formsConstantsValidation.entity.default.max,
            message: t("validations.maxLengthExceeded", { max: formsConstantsValidation.entity.default.max })
          }
        ]}
      >
        <Input maxLength={50} />
      </Form.Item>
      <Form.Item
        required={false}
        label={t("common.text")}
        name={["additionalInfo", "text"]}
        initialValue={storyUpdate?.additionalInfo?.text}
        rules={[
          {
            validator: validationText
          }
        ]}
      >
        <TextArea style={{ resize: "none" }} rows={4} showCount maxLength={300} />
      </Form.Item>
      <Form.Item
        name={["additionalInfo", "isAutoPlayStory"]}
        initialValue={storyUpdate?.additionalInfo?.isAutoPlayStory}
        valuePropName="checked"
        style={{ marginBottom: "8px" }}
      >
        <Checkbox>{t("marketing.story.autoPlay")}</Checkbox>
      </Form.Item>
      <Form.Item
        name={["additionalInfo", "isTemplate"]}
        valuePropName={"checked"}
        initialValue={storyUpdate?.additionalInfo?.isTemplate}
        style={{ marginBottom: "13px" }}
      >
        <Checkbox>{t("marketing.story.crmTemplate")}</Checkbox>
      </Form.Item>
      <Checkbox style={{ marginBottom: "8px" }} checked={isDisabledButtonData} onClick={changeStateInputsButton}>
        {t("marketing.story.form.hasButton")}
      </Checkbox>
      <Form.Item
        label={t("common.textButton")}
        required={false}
        name={["additionalInfo", "textButton"]}
        initialValue={storyUpdate?.additionalInfo?.textButton}
        rules={[
          {
            validator: isDisabledButtonData ? validationTextButton : validationEmpty
          }
        ]}
      >
        <Input disabled={!isDisabledButtonData} maxLength={24} />
      </Form.Item>
      <Form.Item
        name={["additionalInfo", "linkType"]}
        initialValue={storyUpdate?.additionalInfo?.linkType}
        required={false}
        rules={[{ required: isDisabledButtonData, message: t("validations.required") }]}
      >
        <Radio.Group
          disabled={!isDisabledButtonData}
          value={linkType}
          onChange={(e: RadioChangeEvent) => {
            form.resetFields([["additionalInfo", "linkValue"]]);
            setLinkType(e.target.value);
          }}
          buttonStyle="solid"
        >
          <StyledTooltip title={t("common.links.screen")}>
            <Radio.Button value="DeepLink">DeepLink</Radio.Button>
          </StyledTooltip>
          <StyledTooltip title={t("common.links.hyperLink")}>
            <Radio.Button value="HyperLink">HyperLink</Radio.Button>
          </StyledTooltip>
        </Radio.Group>
      </Form.Item>
      {linkType === "DeepLink" ? (
        <Form.Item
          name={["additionalInfo", "linkValue"]}
          initialValue={storyUpdate?.additionalInfo?.linkValue}
          rules={[{ required: isDisabledButtonData, message: t("validations.required") }]}
        >
          <Select showSearch={false} getPopupContainer={(trigger: any) => trigger.parentElement}>
            {deepLinksOptions}
          </Select>
        </Form.Item>
      ) : linkType === "HyperLink" ? (
        <Form.Item
          name={["additionalInfo", "linkValue"]}
          initialValue={storyUpdate?.additionalInfo?.linkValue}
          rules={[
            {
              required: true,
              message: t("validations.required")
            },
            {
              type: "url",
              message: t("validations.invalidUri")
            },
            {
              max: formsConstantsValidation.link.max,
              message: t("validations.maxLengthExceeded", { max: formsConstantsValidation.link.max })
            }
          ]}
        >
          <Input maxLength={500} />
        </Form.Item>
      ) : (
        <></>
      )}
      <Divider />
      <ImgBlock>
        <Form.Item
          name={["additionalInfo", "image"]}
          initialValue={storyUpdate?.additionalInfo?.image}
          rules={[
            {
              required: !storyUpdate?.additionalInfo?.image,
              message: t("validations.required")
            }
          ]}
        >
          <StoryInputImg
            src={srcData.src}
            imgText={t("common.image") + " " + "1080х1920"}
            storyForUpdateImage={storyUpdate?.additionalInfo?.image}
            setSizeError={setSizeError}
            setAcceptError={setAcceptError}
            setSrsData={setSrcData}
            form={form}
            fieldName={["additionalInfo", "image"]}
          />
        </Form.Item>
        <Form.Item
          name={["additionalInfo", "imageMini"]}
          initialValue={storyUpdate?.additionalInfo?.imageMini}
          rules={[
            {
              required: !storyUpdate?.additionalInfo?.imageMini,
              message: t("validations.required")
            }
          ]}
        >
          <StoryInputImg
            src={srcDataMini.src}
            storyForUpdateImage={storyUpdate?.additionalInfo?.imageMini}
            imgText={t("common.image") + " " + "400х400"}
            setSizeError={setSizeError}
            setAcceptError={setAcceptError}
            setSrsData={setSrcDataMini}
            form={form}
            fieldName={["additionalInfo", "imageMini"]}
            mini
          />
        </Form.Item>
      </ImgBlock>
      <Text type={"secondary"}>{t("marketing.story.form.imagesUpload")}</Text>
    </>
  );
};

const ImgBlock = styled.div`
  display: flex;
  grid-gap: 10%;

  & > :first-child {
    width: 135px;
  }
`;
