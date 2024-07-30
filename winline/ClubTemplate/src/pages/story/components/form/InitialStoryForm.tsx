import { FC, useEffect, useMemo, useState } from "react";
import { Card, Checkbox, DatePicker, Divider, Form, Input, Radio, RadioChangeEvent, Select, Tooltip } from "antd";
import TextArea from "antd/es/input/TextArea";
import styled from "styled-components";
import type { IStory } from "../../../../api/dto/content/story/story";
import {
  validationEmpty,
  validationText,
  validationTextButton,
  validationTitle
} from "../../../../common/helpers/commonValidators/story/validationStory";
import { useTranslation } from "react-i18next";
import { formsConstantsValidation } from "../../../../common/constants/formsConstantsValidation";
import { useSelector } from "react-redux";
import { StateType } from "../../../../core/redux/store";
import { LinkTypes } from "../../../../common/helpers/story/LinkTypes";
import moment, { Moment } from "moment";
import { ImageUpload } from "../../../../ui/formItemComponents/ImageUpload";
import { theme } from "../../../../assets/theme/theme";
import { VideoUpload } from "../../../../ui/formItemComponents/VideoUpload";
import { validationHyperLink } from "../../../../common/helpers/commonValidators/validationHyperLink";

const { Option } = Select;

const uploadImage = `${process.env.REACT_APP_CONTENT}/Content/AddImage`;
const uploadVideo = `${process.env.REACT_APP_CONTENT}/Content/AddVideo`;

export const mimeTypes = {
  image: { png: "image/png", jpg: "image/jpeg" },
  video: { mp4: "video/mp4", mov: "video/quicktime" }
};
export interface ISrcData {
  src: string;
  file: File | null | string;
}

interface IProps {
  form: any;
  storyUpdate: IStory | null;
}

export const InitialStoryForm: FC<IProps> = ({ form, storyUpdate }) => {
  const { t } = useTranslation();
  const [isDisabledButtonData, setDisabledButtonData] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Moment>();
  const [linkType, setLinkType] = useState(0);
  const [radioChecked, setRadioChecked] = useState<string>();
  const [imageUrl, setImageUrl] = useState<string | null>("");
  const [imageMiniUrl, setImageMiniUrl] = useState<string | null>("");
  const [videoUrl, setVideoUrl] = useState<string | null>("");
  const [changeType, setChangeType] = useState(false);
  const { deepLinks } = useSelector((state: StateType) => state.commons);

  const changeStateInputsButton = () => {
    setDisabledButtonData(!isDisabledButtonData);
    setLinkType(0);
    isDisabledButtonData && form.validateFields([["additionalInfo", "textButton"]]);
    form.resetFields([
      ["additionalInfo", "textButton"],
      ["additionalInfo", "linkType"],
      ["additionalInfo", "linkValue"]
    ]);
  };

  useEffect(() => {
    if (!videoUrl && !imageUrl) {
      setRadioChecked("image");
    }
  }, []);

  useEffect(() => {
    if (storyUpdate?.additionalInfo?.linkType && isDisabledButtonData) {
      setLinkType(storyUpdate?.additionalInfo?.linkType);
    } else {
      setLinkType(0);
    }
  }, [storyUpdate, isDisabledButtonData]);

  useEffect(() => {
    if (linkType && storyUpdate) {
      form.resetFields([["additionalInfo", "linkValue"]]);
    }
  }, [linkType]);

  useEffect(() => {
    setImageUrl("");
    setImageMiniUrl("");
    setVideoUrl("");
    setDisabledButtonData(!!storyUpdate?.additionalInfo?.textButton);
    form.resetFields();
    storyUpdate && setLinkType(storyUpdate?.additionalInfo?.linkType);
    if (storyUpdate?.additionalInfo.imageUrl) {
      setImageUrl(storyUpdate?.additionalInfo?.imageUrl);
      setRadioChecked("image");
      form.setFieldValue(["imageUrl"], storyUpdate?.additionalInfo?.imageUrl);
    }
    if (storyUpdate?.additionalInfo.videoUrl) {
      setVideoUrl(storyUpdate?.additionalInfo?.videoUrl);
      setRadioChecked("video");
      form.setFieldValue(["videoUrl"], storyUpdate?.additionalInfo?.videoUrl);
    }
    if (storyUpdate?.additionalInfo.imageMiniUrl) {
      setImageMiniUrl(storyUpdate.additionalInfo.imageMiniUrl);
      form.setFieldValue(["imageMiniUrl"], storyUpdate.additionalInfo.imageMiniUrl);
    }
  }, [storyUpdate]);

  const handleChange = () => {
    setStartDate(form.getFieldValue("beginningPublication"));
  };

  useEffect(() => {
    if (radioChecked === "image") {
      setVideoUrl(null);
      form.resetFields(["videoUrl"]);
    }
    if (radioChecked === "video") {
      setImageUrl(null);
      form.resetFields(["imageUrl"]);
      if (storyUpdate?.additionalInfo?.videoUrl) {
        setVideoUrl(storyUpdate.additionalInfo.videoUrl);
      }
    }
  }, [radioChecked, imageUrl, videoUrl]);

  const handleRadioChange = (type: string) => {
    setChangeType(radioChecked !== type ? true : false);
    setRadioChecked((prev) => (prev !== type ? type : prev));
  };

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
        label={t("story.beginningPublishDate")}
        name={"beginningPublication"}
        initialValue={storyUpdate ? moment(storyUpdate?.beginningPublication) : null}
        hidden={storyUpdate ? true : false}
        style={{ marginBottom: "10px" }}
        rules={[
          {
            required: true,
            message: t("validations.required")
          }
        ]}
      >
        <DatePicker
          disabledDate={(current) => {
            return current && current < moment().endOf("day").add(-1, "d");
          }}
          style={{ width: "100%" }}
          onChange={handleChange}
          format={formsConstantsValidation.dateTimeFormat}
          showTime
        />
      </Form.Item>
      <Form.Item
        required={false}
        label={t("story.endPublishDate")}
        name={"endPublication"}
        initialValue={storyUpdate ? moment(storyUpdate?.endPublication) : null}
        hidden={storyUpdate ? true : false}
        rules={[
          {
            required: true,
            message: t("validations.required")
          }
        ]}
      >
        <DatePicker
          disabledDate={(current) => {
            return current && moment(startDate) && current < moment(startDate);
          }}
          style={{ width: "100%" }}
          format={formsConstantsValidation.dateTimeFormat}
          showTime
        />
      </Form.Item>
      <Divider style={{ display: storyUpdate ? "none" : "block" }} />
      <Form.Item
        required={false}
        label={t("common.heading")}
        name="name"
        initialValue={storyUpdate?.name}
        rules={[
          {
            validator: validationTitle
          }
        ]}
      >
        <Input showCount maxLength={50} />
      </Form.Item>
      <Form.Item
        name={["additionalInfo", "previewTitle"]}
        label={t("common.heading") + " " + t("story.preview").toLowerCase()}
        initialValue={storyUpdate?.additionalInfo?.previewTitle}
        required={false}
        rules={[
          { validator: validationTitle },
          {
            max: formsConstantsValidation.entity.default.max,
            message: t("validations.maxLengthExceeded", { max: formsConstantsValidation.entity.default.max })
          }
        ]}
      >
        <Input showCount maxLength={50} />
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
        <TextArea onPressEnter={(e) => e.preventDefault()} style={{ resize: "none" }} rows={4} showCount maxLength={300} />
      </Form.Item>
      <Divider />
      <Form.Item
        name={["additionalInfo", "isAutoPlayStory"]}
        initialValue={storyUpdate?.additionalInfo?.isAutoPlayStory}
        valuePropName="checked"
        style={{ marginBottom: "5px" }}
      >
        <Checkbox>{t("story.autoPlay")}</Checkbox>
      </Form.Item>
      <Checkbox style={{ marginBottom: "8px" }} checked={isDisabledButtonData} onClick={changeStateInputsButton}>
        {t("story.form.hasButton")}
      </Checkbox>
      <Form.Item
        label={t("common.textButton")}
        required={false}
        name={["additionalInfo", "textButton"]}
        initialValue={!isDisabledButtonData ? storyUpdate?.additionalInfo?.textButton : undefined}
        rules={[
          {
            validator: isDisabledButtonData ? validationTextButton : validationEmpty
          }
        ]}
      >
        <Input disabled={!isDisabledButtonData} showCount maxLength={24} />
      </Form.Item>
      <Form.Item
        name={["additionalInfo", "linkType"]}
        initialValue={!isDisabledButtonData ? storyUpdate?.additionalInfo?.linkType : undefined}
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
          name={["additionalInfo", "linkValue"]}
          initialValue={linkType === storyUpdate?.additionalInfo.linkType ? storyUpdate?.additionalInfo?.linkValue : undefined}
          rules={[{ required: isDisabledButtonData, message: t("validations.required") }]}
        >
          <Select showSearch={false} getPopupContainer={(trigger) => trigger.parentElement}>
            {deepLinksOptions}
          </Select>
        </Form.Item>
      ) : linkType === LinkTypes.HyperLink ? (
        <Form.Item
          name={["additionalInfo", "linkValue"]}
          initialValue={linkType === storyUpdate?.additionalInfo.linkType ? storyUpdate?.additionalInfo?.linkValue : undefined}
          rules={[{ validator: validationHyperLink }]}
        >
          <Input showCount maxLength={formsConstantsValidation.link.max} />
        </Form.Item>
      ) : (
        <></>
      )}
      <Divider />
      <ImageUpload
        required
        accept={`${mimeTypes.image.jpg + "," + mimeTypes.image.png}`}
        initialValue={imageMiniUrl}
        action={uploadImage}
        label={t("story.preview") + " " + t("common.image").toLowerCase()}
        updateImage={imageMiniUrl}
        form={form}
        name={"imageMiniUrl"}
        entity={{
          width: formsConstantsValidation.entity.story.imageMin.width,
          height: formsConstantsValidation.entity.story.imageMin.width,
          size: formsConstantsValidation.entity.story.image.size
        }}
        mimeTypes={[mimeTypes.image.jpg, mimeTypes.image.png]}
      />
      <Divider />
      <SourceContainer>
        <StyledCard>
          <Radio checked={radioChecked !== "video"} onClick={() => handleRadioChange("image")}>
            {t("common.image")}
          </Radio>
          <ImageUpload
            required={radioChecked !== "video"}
            orientation="vertical"
            accept={`${mimeTypes.image.jpg + ", " + mimeTypes.image.png}`}
            disabled={radioChecked === "video"}
            initialValue={imageUrl}
            action={uploadImage}
            label=""
            updateImage={imageUrl}
            form={form}
            name={"imageUrl"}
            entity={formsConstantsValidation.entity.story.image}
            mimeTypes={[mimeTypes.image.jpg, mimeTypes.image.png]}
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
            accept={`${mimeTypes.video.mp4 + ", " + mimeTypes.video.mov}`}
            disabled={radioChecked !== "video"}
            initialValue={videoUrl}
            action={uploadVideo}
            label=""
            updateVideo={videoUrl}
            form={form}
            name={"videoUrl"}
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

export const SourceContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
`;

export const StyledCard = styled(Card)`
  border-radius: 4px;
  border-color: ${theme.colors.grayLightWhite};
  .ant-card-body {
    padding: 16px;
  }
  .ant-upload-list {
    margin-bottom: 8px;
  }
  div,
  span {
    margin: 0;
  }
  label {
    padding-bottom: 8px;
  }
`;
