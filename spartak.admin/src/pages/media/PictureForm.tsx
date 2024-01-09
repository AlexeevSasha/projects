import { Button, Form, Typography } from "antd";
import { mediaRepository } from "api/mediaRepository";
import { routePaths } from "common/constants/routePaths";
import { Media } from "common/interfaces/media";
import { saveConfirm } from "pages/media/saveConfirm";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "store";
import { createMedia, saveMediaPicture } from "store/media/mediaActionAsync";
import { mediaSelector } from "store/media/mediaSelectors";
import styled from "styled-components";
import { DragableMultiImageField } from "ui/DragableImageField";
import { ImageField } from "ui/ImageField";
import { Loader } from "ui/Loader";
import { RowLabel } from "ui/RowLabel";
import { required } from "../../common/helpers/validators/required";

interface IProps {
  publishDraftMethod: Function;
}

export const PictureForm = ({ publishDraftMethod }: IProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isCreate = pathname.includes("create");
  const [form] = Form.useForm<Media>();
  const dispatch = useAppDispatch();
  const media = useSelector(mediaSelector);

  const submitForm = async (draft?: boolean) => {
    if (
      !draft &&
      !(await form
        .validateFields()
        .then(() => true)
        .catch(() => false))
    ) {
      return;
    }
    const Id = media?.Id || (await dispatch(createMedia()).unwrap()).Id;

    await dispatch(saveMediaPicture({ ...form.getFieldsValue(), Id, IsDraft: !!draft }))
      .unwrap()
      .then(() => isCreate && navigate(`/${routePaths.media}/${routePaths.form.edit(Id)}/photo`));
  };

  const isTouchedRef = useRef(false);

  const handleFinish = async () => {
    isTouchedRef.current && (await saveConfirm()) && (await submitForm(!media || media.IsDraft));
    publishDraftMethod();
  };

  return !isCreate && !media ? (
    <Loader />
  ) : (
    <Form
      form={form}
      requiredMark={false}
      labelAlign="left"
      initialValues={media}
      onFinish={handleFinish}
      validateTrigger="onBlur"
      id="mediaForm"
    >
      <FormHeader>
        <RowLabel label={t("media.photo")} />
        <Form.Item shouldUpdate>
          {() =>
            (isTouchedRef.current = form.isFieldsTouched()) && (
              <BtnContainer>
                <RowLabel label={t("matches.saveChanges")} prompt={t("matches.unsavedChanges")} />

                <Button type="primary" onClick={() => submitForm(!media || media.IsDraft)}>
                  {t("allPages.buttonsText.save")}
                </Button>

                <Button onClick={() => form.resetFields()}>{t("allPages.buttonsText.cancel")}</Button>
              </BtnContainer>
            )
          }
        </Form.Item>
      </FormHeader>

      <ImageUploadWrapper>
        <FormItem
          name="PreviewPhoto"
          rules={[{ validator: required }]}
          required={true}
          label={<RowLabel label={t("media.preview") + " *"} />}
        >
          <ImageField
            validation={{
              width: 1024,
              height: 734,
              size: 2048,
              format: ["jpeg", "png"],
              exact: true,
            }}
            uploadRequest={mediaRepository.uploadImage}
            withCrop
          />
        </FormItem>

        <Typography.Text type="secondary" style={{ fontSize: 13, maxWidth: 480, flex: "1 1 150px" }}>
          {t("allPages.form.uploadDesc", {
            format: "jpeg, png",
            width: "1024",
            height: "734",
            size: "2",
          })}
        </Typography.Text>
      </ImageUploadWrapper>

      {/*!----------Пока скрыто-----------!*/}
      {/*<ImageUploadWrapper>*/}
      {/*  <FormItem*/}
      {/*    name="BigPhoto"*/}
      {/*    required={true}*/}
      {/*    rules={[{ validator: required }]}*/}
      {/*    label={<RowLabel lable={t("media.bigPicture") + " *"} />}*/}
      {/*  >*/}
      {/*    <ImageField*/}
      {/*      validation={{*/}
      {/*        width: 1920,*/}
      {/*        height: 600,*/}
      {/*        size: 5120,*/}
      {/*        format: ["jpeg", "png"],*/}
      {/*        exact: true,*/}
      {/*      }}*/}
      {/*      uploadRequest={mediaRepository.uploadImage}*/}
      {/*      withCrop*/}
      {/*    />*/}
      {/*  </FormItem>*/}

      {/*  <Typography.Text type="secondary" style={{ fontSize: 13, maxWidth: 480 }}>*/}
      {/*    {t("allPages.form.uploadDesc", {*/}
      {/*      format: "jpeg, png",*/}
      {/*      width: "1920",*/}
      {/*      height: "600",*/}
      {/*      size: "5",*/}
      {/*    })}*/}
      {/*  </Typography.Text>*/}
      {/*</ImageUploadWrapper>*/}

      <ImageUploadWrapper>
        <FormItem name="PhotoGallery" required={true} label={<RowLabel label={t("media.gallery")} />}>
          <DragableMultiImageField
            validation={{
              width: 1920,
              height: 1080,
              size: 5120,
              format: ["jpeg", "png"],
              validate: (width, height) =>
                (width <= 1920 && width >= 1080 && height <= 1080 && height > 243) ||
                (height <= 1920 && height >= 1080 && width <= 1080 && width >= 511),
            }}
            uploadRequest={mediaRepository.uploadImage}
            withCrop
          />
        </FormItem>

        <Typography.Text type="secondary" style={{ fontSize: 13, maxWidth: 480, flex: "1 1 150px" }}>
          {t("media.galleryPrompt")}
        </Typography.Text>
      </ImageUploadWrapper>
    </Form>
  );
};

const FormHeader = styled.div`
  display: flex;
  grid-gap: 40px;
  margin-bottom: 40px;
  width: 1024px;
`;

const BtnContainer = styled.div`
  display: flex;
  grid-gap: 8px;
`;

const ImageUploadWrapper = styled.div`
  display: flex;
`;

const FormItem = styled(Form.Item)`
  grid-gap: 40px;
  flex-grow: 2;

  #root & {
    margin-bottom: 40px;
  }

  & > div:first-child {
    display: flex;
    align-items: flex-start;

    & > label::after {
      display: none;
    }

    & > label {
      height: auto;

      & span {
        white-space: normal;
      }
    }
  }

  & label > div:first-child::after {
    display: none;
  }
`;
