import { PlusOutlined } from "@ant-design/icons";
import { Button, Drawer, Form, Upload } from "antd";
import { bestPlayerRepository } from "api/bestPlayerRepository";
import { theme } from "assets/theme/theme";
import "moment/locale/ru";
import { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "store";
import { bestPlayerActions } from "store/bestPlayer/bestPlayer";
import { getBestPlayer } from "store/bestPlayer/bestPlayerActionAsync";
import { bestPlayerSelector } from "store/bestPlayer/bestPlayerSelectors";
import styled from "styled-components";
import { HeaderText } from "ui/HeaderText";
import { Loader } from "ui/Loader";
import { UploadDesc } from "../../ui/UploadDesc";

export const ResultForm = memo(() => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm<{ file: File }>();
  const { t } = useTranslation();
  const [visible, setVisible] = useState(true);
  const dispatch = useAppDispatch();
  const promo = useSelector(bestPlayerSelector);
  const promoType = promo?.Month ? "month" : promo?.Match ? "match" : "season"; //${Month ? "monthPlayer" : Match ? "matchPlayer" : "seasonPlayer"}

  const closeDrawer = () => {
    form.resetFields();
    setVisible(false);
    setTimeout(() => navigate(-1), 150);
  };

  const beforeUpload = (file: File) => {
    form.setFieldsValue({ file });

    return false;
  };

  const submitForm = async () => {
    await bestPlayerRepository.uploadResultXLS(form.getFieldValue("file"));
    closeDrawer();
  };

  useEffect(() => {
    if (id) {
      dispatch(getBestPlayer(id));
    }

    return () => {
      dispatch(bestPlayerActions.resetEntity());
    };
  }, [id]);

  return (
    <Drawer
      title={<HeaderText>{`${t("bestPlayer.result")} - ${t("bestPlayer." + promoType + "Player")}`}</HeaderText>}
      closable={false}
      destroyOnClose={true}
      getContainer={false}
      onClose={closeDrawer}
      visible={visible}
      width="440px"
      bodyStyle={{ padding: "0 30px" }}
      footer={
        <Footer>
          <div>
            <Button onClick={closeDrawer} style={{ marginRight: 8 }}>
              {t("allPages.buttonsText.cancel")}
            </Button>

            <Button onClick={submitForm} type="primary" htmlType="submit">
              {t("allPages.buttonsText.save")}
            </Button>
          </div>
        </Footer>
      }
    >
      {!promo ? (
        <Loader />
      ) : (
        <Form form={form} layout="vertical" requiredMark={false} validateTrigger="onBlur">
          <UploadWrapper>
            <Form.Item shouldUpdate label={t("bestPlayer.fileOfParticipants")}>
              {() => {
                const file = form.getFieldValue("file");

                return (
                  <Upload
                    accept="xlsx"
                    showUploadList={{ showPreviewIcon: false }}
                    listType="picture-card"
                    beforeUpload={beforeUpload}
                    fileList={file ? [{ uid: "1", name: file.name }] : []}
                    onRemove={() => form.setFieldsValue({ file: undefined })}
                  >
                    {!file && (
                      <div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>{t("allPages.upload")}</div>
                      </div>
                    )}
                  </Upload>
                );
              }}
            </Form.Item>

            <UploadDescription width={210}>{t("bestPlayer.upload")}</UploadDescription>
          </UploadWrapper>

          <Rules>
            {t("bestPlayer.notice")}
            <ul>
              <li>{t("bestPlayer.param1")}</li>
              <li>{t("bestPlayer.param2")}</li>
              <li>{t("bestPlayer.param3")}</li>
            </ul>
          </Rules>
        </Form>
      )}
    </Drawer>
  );
});

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  width: 100%;
`;

const UploadWrapper = styled.div`
  display: flex;
  margin-top: 18px;
  border-bottom: 1px solid #e8e8e8;

  & div.ant-col.ant-form-item-label > label {
    color: ${theme.colors.neroGray};
    margin-bottom: 8px;
  }
`;

const UploadDescription = styled(UploadDesc)`
  display: flex;
  align-items: center;
`;

const Rules = styled.div`
  color: ${theme.colors.middleGray};
  margin-top: 26px;
  line-height: 22px;

  & > ul {
    padding-left: 24px;
  }
`;
