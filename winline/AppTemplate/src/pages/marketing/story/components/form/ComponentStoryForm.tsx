import { useEffect, useMemo, useState } from "react";
import { Checkbox, Divider, Form, Input, Radio, RadioChangeEvent, Select, Typography } from "antd";
import styled from "styled-components";
import type { IStory } from "../../../../../api/dto/content/IStory";
import {
  validationEmpty,
  validationText,
  validationTextButton,
  validationTitle
} from "../../../../../common/helpers/story/validationStory";
import { StoryInputImg } from "../StoryInputImg";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { StateType } from "../../../../../core/redux/store";
import { StyledTooltip } from "../../../../../ui/commonComponents";
import { formsConstantsValidation } from "../../../../../common/constants/formsConstantsValidation";

const { Text } = Typography;
const { Option } = Select;

interface ISrcData {
  src: string;
  file: File | null | string;
}

export const ComponentStoryForm = ({
  i,
  form,
  setSizeError,
  setAcceptError,
  storyUpdate
}: {
  i: number;
  form: any;
  setAcceptError: any;
  setSizeError: any;
  storyUpdate: IStory | null;
}) => {
  const { t } = useTranslation();
  const [srcData, setSrcData] = useState<ISrcData>({ src: "", file: null });
  const [isDisabledButtonData, setDisabledButtonData] = useState<boolean>(false);
  const [linkItemValue, setLinkValue] = useState<{ linkType: string; linkValue: string } | {}>({});
  const [linkType, setLinkType] = useState("");

  const { deepLinks } = useSelector((state: StateType) => state.commons);

  const changeStateInputsButton = () => {
    setDisabledButtonData(!isDisabledButtonData);
    setLinkType("");
    isDisabledButtonData && form.validateFields([["additionalInfo", "componentInfo", i, "textButton"]]);
    form.resetFields([
      ["additionalInfo", "componentInfo", i, "textButton"],
      ["additionalInfo", "componentInfo", i, "linkType"],
      ["additionalInfo", "componentInfo", i, "linkValue"]
    ]);
    isDisabledButtonData && setLinkValue({ linkType: "None", linkValue: undefined });
  };

  useEffect(() => {
    setDisabledButtonData(!!storyUpdate?.additionalInfo?.componentInfo[i]?.textButton);
    storyUpdate && setLinkType(storyUpdate?.additionalInfo?.componentInfo[i]?.linkType);

    return () => {
      setSizeError({ size: false, mini: false });
      setAcceptError(false);
    };
  }, [storyUpdate]);

  const deepLinksOptions = useMemo(
    () =>
      deepLinks.map((option, index) => (
        <Option key={index + 1} value={option.link}>
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
        name={["additionalInfo", "componentInfo", i, "title"]}
        initialValue={storyUpdate?.additionalInfo?.componentInfo[i]?.title}
        rules={[
          {
            validator: validationTitle
          }
        ]}
      >
        <Input maxLength={50} />
      </Form.Item>
      <Form.Item
        required={false}
        label={t("common.text")}
        name={["additionalInfo", "componentInfo", i, "text"]}
        initialValue={storyUpdate?.additionalInfo?.componentInfo[i]?.text}
        rules={[
          {
            validator: validationText
          }
        ]}
      >
        <Input.TextArea style={{ resize: "none" }} rows={4} showCount maxLength={300} />
      </Form.Item>
      <Checkbox style={{ marginBottom: "8px" }} checked={isDisabledButtonData} onClick={changeStateInputsButton}>
        {t("marketing.story.form.hasButton")}
      </Checkbox>
      <Form.Item
        label={t("common.textButton")}
        required={false}
        name={["additionalInfo", "componentInfo", i, "textButton"]}
        initialValue={storyUpdate?.additionalInfo?.componentInfo[i]?.textButton}
        rules={[
          {
            validator: isDisabledButtonData ? validationTextButton : validationEmpty
          }
        ]}
      >
        <Input disabled={!isDisabledButtonData} maxLength={24} />
      </Form.Item>
      <Form.Item
        name={["additionalInfo", "componentInfo", i, "linkType"]}
        initialValue={storyUpdate?.additionalInfo?.componentInfo[i]?.linkType}
        required={false}
        rules={[{ required: isDisabledButtonData, message: t("validations.required") }]}
      >
        <Radio.Group
          disabled={!isDisabledButtonData}
          value={linkType}
          onChange={(e: RadioChangeEvent) => {
            form.resetFields([["componentInfo", i, "linkValue"]]);
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
          name={["additionalInfo", "componentInfo", i, "linkValue"]}
          initialValue={storyUpdate?.additionalInfo?.componentInfo[i]?.linkValue}
          rules={[{ required: isDisabledButtonData, message: t("validations.required") }]}
        >
          <Select showSearch={false} getPopupContainer={(trigger: any) => trigger.parentElement}>
            {deepLinksOptions}
          </Select>
        </Form.Item>
      ) : linkType === "HyperLink" ? (
        <Form.Item
          name={["additionalInfo", "componentInfo", i, "linkValue"]}
          initialValue={storyUpdate?.additionalInfo?.componentInfo[i]?.linkValue}
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
          name={["additionalInfo", "componentInfo", i, "imageId"]}
          initialValue={storyUpdate?.additionalInfo?.componentInfo[i]?.imageId}
          rules={[
            {
              required: !storyUpdate?.additionalInfo?.componentInfo[i]?.imageId,
              message: t("validations.required")
            }
          ]}
        >
          <StoryInputImg
            src={srcData.src}
            storyForUpdateImage={storyUpdate?.additionalInfo?.componentInfo[i]?.imageId}
            imgText={t("common.image") + " " + "1080х1920"}
            setSizeError={setSizeError}
            setAcceptError={setAcceptError}
            setSrsData={setSrcData}
            form={form}
            fieldName={["additionalInfo", "componentInfo", i, "imageId"]}
          />
        </Form.Item>
      </ImgBlock>
      <Text type={"secondary"}>{t("marketing.story.form.additionalImage")}</Text>
    </>
  );
};

const ImgBlock = styled.div`
  display: flex;
  grid-gap: 10%;
`;
