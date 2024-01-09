import { Button, Drawer, Form, Input } from "antd";
import { BidToExitEntity } from "common/interfaces/kids";
import { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "store";
import { bidToExitActions } from "store/bidToExit/bidToExit";
import { getBidToExitById, updateBidToExit } from "store/bidToExit/bidToExitActionAsync";
import { bidToExitSelector } from "store/bidToExit/bidToExitSelectors";
import styled from "styled-components";
import { HeaderText } from "ui/HeaderText";
import { Loader } from "ui/Loader";

export const BidToExitForm = memo(() => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm<BidToExitEntity>();
  const [visible, setVisible] = useState(true);
  const dispatch = useAppDispatch();
  const bid = useSelector(bidToExitSelector);

  const closeDrawer = () => {
    form.resetFields();
    setVisible(false);
    setTimeout(() => navigate(-1), 150);
  };

  const submitForm = async () => {
    await dispatch(updateBidToExit({ ...form.getFieldsValue(), Id: `${id}` }));
    closeDrawer();
  };

  useEffect(() => {
    if (id) {
      dispatch(getBidToExitById(id));
    }

    return () => {
      dispatch(bidToExitActions.resetEntity());
    };
  }, [id]);

  return (
    <Drawer
      title={<HeaderText>{t("kids.additionalInfo")}</HeaderText>}
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
      {!bid && id ? (
        <Loader />
      ) : (
        <Form form={form} layout="vertical" requiredMark={false} initialValues={bid} validateTrigger="onBlur">
          <Form.Item shouldUpdate>
            {() => (
              <StoryWrapper>
                <div>{t("kids.story")}:</div>

                <div>{form.getFieldValue("Story")}</div>
              </StoryWrapper>
            )}
          </Form.Item>

          <Form.Item name="Comment" label={t("kids.comment") + ":"}>
            <Input.TextArea rows={8} />
          </Form.Item>
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

const StoryWrapper = styled.div`
  margin-top: 24px;
  margin-bottom: 32px;
`;
