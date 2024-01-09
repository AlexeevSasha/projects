import { Button, Divider, Drawer, Form, Input, InputNumber, Switch, Tabs, Typography } from "antd";
import { comicRepository } from "api/comicRepository";
import { pdfComicRepository } from "api/pdfComicRepository";
import { theme } from "assets/theme/theme";
import { deepMerge } from "common/helpers/deepMerge";
import { required } from "common/helpers/validators/required";
import { ComicEntity } from "common/interfaces/kids";
import { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "store";
import { comicActions } from "store/comic/comic";
import { getComicById, getComicSeasonOptions, saveComic } from "store/comic/comicActionAsync";
import { comicSelector, seasonOptinsSelector } from "store/comic/comicSelectors";
import { noticeActions } from "store/notice/notice";
import styled from "styled-components";
import { HeaderText } from "ui/HeaderText";
import { ImageField } from "ui/ImageField";
import { Loader } from "ui/Loader";
import { SelectField } from "ui/SelectField";
import { UploadDesc } from "ui/UploadDesc";
import { UploadField } from "ui/UploadField";

export const ComicForm = memo(() => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id } = useParams<{ id: string }>();
  const isCreate = pathname.endsWith("create");
  const [form] = Form.useForm<ComicEntity>();
  const [lang, setLang] = useState("Ru");
  const [visible, setVisible] = useState(true);
  const [values, setValues] = useState<ComicEntity | undefined>();
  const dispatch = useAppDispatch();
  const comic = useSelector(comicSelector);
  const seasons = useSelector(seasonOptinsSelector);

  const closeDrawer = () => {
    form.resetFields();
    setVisible(false);
    setTimeout(() => navigate(-1), 150);
  };

  const handleTabClick = (key: string) => {
    setValues(form.getFieldsValue());
    setLang(key);
  };

  const submitForm = async () => {
    if (
      !(await form
        .validateFields()
        .then(() => true)
        .catch(() => false))
    ) {
      dispatch(noticeActions.add({ message: t("allPages.formError"), type: "error" }));

      return;
    }
    await dispatch(saveComic(deepMerge<ComicEntity>({ ...values, Id: comic?.Id }, form.getFieldsValue())))
      .unwrap()
      .then(() => {
        dispatch(noticeActions.add({ message: t("allPages.saveSuccess") }));
        closeDrawer();
      });
  };

  useEffect(() => {
    dispatch(getComicSeasonOptions());
    if (!isCreate && id) {
      dispatch(getComicById(id)).unwrap().then(setValues);
    }

    return () => {
      dispatch(comicActions.resetEntity());
    };
  }, [id]);

  return (
    <Drawer
      title={<HeaderText>{t(`kids.${isCreate ? "addJournal" : "editJournal"}`)}</HeaderText>}
      closable={false}
      destroyOnClose={true}
      getContainer={false}
      onClose={closeDrawer}
      visible={visible}
      width="440px"
      bodyStyle={{ padding: "0 30px 130px" }}
      footer={
        <Footer>
          <Button onClick={closeDrawer} style={{ marginRight: 8 }}>
            {t("allPages.buttonsText.cancel")}
          </Button>

          <Button onClick={submitForm} type="primary" htmlType="submit">
            {t("allPages.buttonsText.save")}
          </Button>
        </Footer>
      }
    >
      <Tabs defaultActiveKey={lang} onChange={handleTabClick}>
        <Tabs.TabPane tab={t("allPages.ru")} key="Ru" />
        <Tabs.TabPane tab={t("allPages.en")} key="En" />
      </Tabs>

      {!comic && !isCreate ? (
        <Loader />
      ) : (
        <Form form={form} layout="vertical" requiredMark={false} initialValues={comic} validateTrigger="onBlur">
          <Form.Item name="SortOrder" label={t("allPages.form.sortOrder") + " *"} rules={[{ validator: required }]}>
            <InputNumber style={{ width: 145 }} min={1} placeholder={t("allPages.form.orderPlaceholder")} />
          </Form.Item>

          <Form.Item name={["Name", lang]} label={t("allPages.title") + " *"} rules={[{ validator: required }]}>
            <Input placeholder={t("kids.enterName")} />
          </Form.Item>

          <Form.Item name="ComicSeasonId" label={t("kids.season") + " *"} rules={[{ validator: required }]}>
            <SelectField placeholder={t("kids.enterSeason")} options={seasons} />
          </Form.Item>

          <Form.Item name={["Edition", lang]} label={t("kids.edition")}>
            <Input placeholder={t("kids.enterEdition")} />
          </Form.Item>

          <SwitchContainer>
            <Typography.Text>{t("kids.specEdition")}</Typography.Text>

            <Form.Item name="IsSpecialEdition" valuePropName="checked">
              <Switch />
            </Form.Item>
          </SwitchContainer>

          <Divider />

          <UploadWrapper>
            <div>
              <Form.Item name="ComicFileUrl" label="PDF *" rules={[{ validator: required }]}>
                <UploadField
                  validate={(file: File) => {
                    const typeError = !file.type.includes("pdf");
                    const sizeError = !(file.size / 1024 <= 20480);
                    if (typeError || sizeError) {
                      dispatch(noticeActions.add({ message: t("kids.pdfError"), type: "error" }));
                    }

                    return !typeError && !sizeError;
                  }}
                  uploadRequest={(file: File) => pdfComicRepository.upload(file)}
                />
              </Form.Item>

              <UploadDesc>{t("kids.uploadRule")}</UploadDesc>
            </div>

            <div>
              <Form.Item name="ComicPosterUrl" label={t("kids.poster") + " *"} rules={[{ validator: required }]}>
                <ImageField
                  validation={{
                    width: 378,
                    height: 554,
                    size: 2048,
                    format: ["png"],
                    exact: true,
                  }}
                  uploadRequest={comicRepository.uploadImage}
                />
              </Form.Item>

              <UploadDesc>
                {t("allPages.form.uploadDesc", {
                  width: "378",
                  height: "554",
                  size: "2",
                  format: "png",
                })}
              </UploadDesc>
            </div>
          </UploadWrapper>
        </Form>
      )}
    </Drawer>
  );
});

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const SwitchContainer = styled.div`
  display: flex;
  width: 280px;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
`;

const UploadWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  & > div {
    width: 164px;
  }
`;
