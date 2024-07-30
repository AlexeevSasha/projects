import { useEffect, useMemo, useState } from "react";
import { Checkbox, Divider, Form, Input, Radio, RadioChangeEvent, Select, Tooltip } from "antd";
import type { IStory } from "../../../../api/dto/content/story/story";
import {
  validationEmpty,
  validationText,
  validationTextButton,
  validationTitle
} from "../../../../common/helpers/commonValidators/story/validationStory";
import { LinkTypes } from "../../../../common/helpers/story/LinkTypes";
import { useSelector } from "react-redux";
import { StateType } from "../../../../core/redux/store";
import { useTranslation } from "react-i18next";
import { formsConstantsValidation } from "../../../../common/constants/formsConstantsValidation";
import { ImageUpload } from "../../../../ui/formItemComponents/ImageUpload";
import { mimeTypes, SourceContainer, StyledCard } from "./InitialStoryForm";
import { VideoUpload } from "../../../../ui/formItemComponents/VideoUpload";
import { validationHyperLink } from "../../../../common/helpers/commonValidators/validationHyperLink";

const { Option } = Select;

const uploadImage = `${process.env.REACT_APP_CONTENT}/Content/AddImage`;
const uploadVideo = `${process.env.REACT_APP_CONTENT}/Content/AddVideo`;
interface IProps {
  i: number;
  form: any;
  compImageUploaded?: boolean;
  storyUpdate: IStory | null;
}

export const ComponentStoryForm = ({ i, form, compImageUploaded, storyUpdate }: IProps) => {
  const { t } = useTranslation();
  const [isDisabledButtonData, setDisabledButtonData] = useState<boolean>(false);
  const [linkType, setLinkType] = useState(0);
  const [radioChecked, setRadioChecked] = useState<string>();
  const [imageUrl, setImageUrl] = useState<string | null>("");
  const [videoUrl, setVideoUrl] = useState<string | null>("");
  const [changeType, setChangeType] = useState(false);
  const { deepLinks } = useSelector((state: StateType) => state.commons);

  const changeStateInputsButton = () => {
    setDisabledButtonData(!isDisabledButtonData);
    setLinkType(0);
    isDisabledButtonData && form.validateFields([["additionalInfo", "component", i, "textButton"]]);
    form.resetFields([
      ["additionalInfo", "component", i, "textButton"],
      ["additionalInfo", "component", i, "linkType"],
      ["additionalInfo", "component", i, "linkValue"]
    ]);
  };

  useEffect(() => {
    if (!videoUrl && !imageUrl) {
      setRadioChecked("image");
    }
  }, []);

  useEffect(() => {
    if (storyUpdate?.additionalInfo?.component[i]?.linkType && isDisabledButtonData) {
      setLinkType(storyUpdate?.additionalInfo?.component[i]?.linkType);
    } else {
      setLinkType(0);
    }
  }, [storyUpdate, isDisabledButtonData]);

  useEffect(() => {
    if (linkType && storyUpdate) {
      form.resetFields([["additionalInfo", "component", i, "linkValue"]]);
    }
  }, [linkType]);

  useEffect(() => {
    setImageUrl("");
    setVideoUrl("");
    setDisabledButtonData(!!storyUpdate?.additionalInfo?.component[i]?.textButton);
    storyUpdate && setLinkType(storyUpdate?.additionalInfo?.component[i]?.linkType);
    if (storyUpdate?.additionalInfo?.component[i]?.imageUrl) {
      setRadioChecked("image");
      setImageUrl(storyUpdate.additionalInfo.component[i].imageUrl as string);
      form.setFieldValue([`${i}componentImageUrl`], storyUpdate.additionalInfo.component[i]?.imageUrl);
    }
    if (storyUpdate?.additionalInfo?.component[i]?.videoUrl) {
      setRadioChecked("video");
      setVideoUrl(storyUpdate?.additionalInfo?.component[i]?.videoUrl as string);
      form.setFieldValue([`${i}componentVideoUrl`], storyUpdate.additionalInfo.component[i]?.videoUrl);
    }
  }, [storyUpdate, i]);

  useEffect(() => {
    if (radioChecked === "image") {
      setVideoUrl(null);
      form.resetFields([`${i}componentVideoUrl`]);
    }
    if (radioChecked === "video") {
      setImageUrl(null);
      form.resetFields([`${i}componentImageUrl`]);
    }
  }, [radioChecked, imageUrl, videoUrl]);

  const handleRadioChange = (type: string) => {
    setChangeType(radioChecked !== type ? true : false);
    setRadioChecked((prev) => (prev !== type ? type : prev));
  };

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
        name={["additionalInfo", "component", i, "title"]}
        initialValue={storyUpdate?.additionalInfo?.component[i]?.title}
        rules={[
          {
            validator: validationTitle
          }
        ]}
      >
        <Input showCount maxLength={50} />
      </Form.Item>
      <Form.Item
        required={false}
        label={t("common.text")}
        name={["additionalInfo", "component", i, "text"]}
        initialValue={storyUpdate?.additionalInfo?.component[i]?.text}
        rules={[
          {
            validator: validationText
          }
        ]}
      >
        <Input.TextArea onPressEnter={(e) => e.preventDefault()} style={{ resize: "none" }} rows={4} showCount maxLength={300} />
      </Form.Item>
      <Checkbox style={{ marginBottom: "8px" }} checked={isDisabledButtonData} onClick={changeStateInputsButton}>
        {t("story.form.hasButton")}
      </Checkbox>
      <Form.Item
        label={t("common.textButton")}
        required={false}
        name={["additionalInfo", "component", i, "textButton"]}
        initialValue={!isDisabledButtonData ? storyUpdate?.additionalInfo?.component[i]?.textButton : undefined}
        rules={[
          {
            validator: isDisabledButtonData ? validationTextButton : validationEmpty
          }
        ]}
      >
        <Input disabled={!isDisabledButtonData} showCount maxLength={24} />
      </Form.Item>
      <Form.Item
        name={["additionalInfo", "component", i, "linkType"]}
        initialValue={!isDisabledButtonData ? storyUpdate?.additionalInfo?.component[i]?.linkType : undefined}
        required={false}
        rules={[{ required: isDisabledButtonData, message: t("validations.required") }]}
      >
        <Radio.Group
          disabled={!isDisabledButtonData}
          value={linkType}
          onChange={(e: RadioChangeEvent) => {
            form.resetFields([["additionalInfo", "component", i, "linkValue"]]);
            setLinkType(e.target.value);
          }}
          buttonStyle="solid"
        >
          <Tooltip placement="top" title={t("common.links.screen")}>
            <Radio.Button value={LinkTypes.DeepLink}>DeepLink</Radio.Button>
          </Tooltip>
          <Tooltip placement="top" title={t("common.links.hyperLink")}>
            <Radio.Button value={LinkTypes.HyperLink}>HyperLink</Radio.Button>
          </Tooltip>
        </Radio.Group>
      </Form.Item>
      {linkType === LinkTypes.DeepLink ? (
        <Form.Item
          name={["additionalInfo", "component", i, "linkValue"]}
          initialValue={
            linkType === storyUpdate?.additionalInfo?.component[i]?.linkType
              ? storyUpdate?.additionalInfo?.component[i]?.linkValue
              : undefined
          }
          rules={[{ required: isDisabledButtonData, message: t("validations.required") }]}
        >
          <Select showSearch={false} getPopupContainer={(trigger) => trigger.parentElement}>
            {deepLinksOptions}
          </Select>
        </Form.Item>
      ) : linkType === LinkTypes.HyperLink ? (
        <Form.Item
          name={["additionalInfo", "component", i, "linkValue"]}
          initialValue={
            linkType === storyUpdate?.additionalInfo?.component[i]?.linkType
              ? storyUpdate?.additionalInfo?.component[i]?.linkValue
              : undefined
          }
          rules={[
            {
              validator: validationHyperLink
            }
          ]}
        >
          <Input showCount maxLength={formsConstantsValidation.link.max} />
        </Form.Item>
      ) : (
        <></>
      )}
      <Divider />

      <SourceContainer>
        <StyledCard>
          <Radio checked={radioChecked !== "video"} onClick={() => handleRadioChange("image")}>
            {t("common.image")}
          </Radio>
          <ImageUpload
            required={radioChecked !== "video"}
            orientation="vertical"
            accept={`${mimeTypes.image.jpg + "," + mimeTypes.image.png}`}
            disabled={radioChecked === "video"}
            initialValue={imageUrl}
            action={uploadImage}
            label=""
            updateImage={imageUrl}
            form={form}
            name={`${i}componentImageUrl`}
            entity={formsConstantsValidation.entity.story.image}
            mimeTypes={[mimeTypes.image.jpg, mimeTypes.image.png]}
            validationDependence={compImageUploaded}
            changedType={changeType}
            clearChangedType={() => setChangeType(false)}
          />
        </StyledCard>
        <StyledCard>
          <Radio checked={radioChecked === "video"} onClick={() => handleRadioChange("video")}>
            {t("story.video")}
          </Radio>
          <VideoUpload
            required={radioChecked === "video"}
            accept={`${mimeTypes.video.mp4 + "," + mimeTypes.video.mov}`}
            disabled={radioChecked !== "video"}
            initialValue={videoUrl}
            action={uploadVideo}
            label=""
            updateVideo={videoUrl}
            form={form}
            name={`${i}componentVideoUrl`}
            entity={formsConstantsValidation.entity.story.video}
            mimeTypes={[mimeTypes.video.mp4, mimeTypes.video.mov]}
            changedType={changeType}
            clearChangedType={() => setChangeType(false)}
          />
        </StyledCard>
      </SourceContainer>
    </>
  );
};
