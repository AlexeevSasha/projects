import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, DatePicker, Drawer, Form, Input, Modal } from "antd";
import { advRepository } from "api/advRepository";
import { theme } from "assets/theme/theme";
import { required } from "common/helpers/validators/required";
import { BannerEntity, BannerSizeToSort } from "common/interfaces/banners";
import moment from "moment";
import { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "store";
import { bannersActions } from "store/banners/banners";
import { addBanner, getBanner, getBannerLocations, updateBanner } from "store/banners/bannersActionAsync";
import { bannerLocationOprionaSelector, bannerSelector } from "store/banners/bannersSelectors";
import styled from "styled-components";
import { HeaderText } from "ui/HeaderText";
import { ImageField } from "ui/ImageField";
import { Loader } from "ui/Loader";
import { SelectField } from "ui/SelectField";
import { UploadDesc } from "ui/UploadDesc";
import { requiredMinMax } from "../../common/helpers/validators/requiredMinMax";
import { noticeActions } from "../../store/notice/notice";

const { confirm } = Modal;

export const BannersForm = memo(() => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id } = useParams<{ id: string }>();
  const isCreate = pathname.endsWith("create");
  const [form] = Form.useForm<BannerEntity & { dateRange: [string, string] }>();
  const { t } = useTranslation();
  const [visible, setVisible] = useState(true);
  const dispatch = useAppDispatch();
  const { StartPublish, EndPublish, ...banner } = useSelector(bannerSelector) || {};
  const initialValues = StartPublish ? { ...banner, dateRange: [moment(StartPublish), moment(EndPublish)] } : undefined;
  const locationsOptions = useSelector(bannerLocationOprionaSelector);

  const closeDrawer = () => {
    form.resetFields();
    setVisible(false);
    setTimeout(() => navigate(-1), 150);
  };

  const showConfirm = () => {
    confirm({
      title: <TitleText>{t(`allPages.${isCreate ? "confirmTitle" : "changeConfirmTitle"}`)}</TitleText>,
      icon: <QuestionCircleOutlined style={{ color: theme.colors.red1 }} />,
      content: t(`adv.${isCreate ? "confirmText" : "changeConfirm"}`),
      okText: t("allPages.buttonsText.confirm"),
      cancelText: t("allPages.buttonsText.cancel"),
      onOk: () => submitForm(),
    });
  };

  const submitForm = async () => {
    if (
      !(await form
        .validateFields()
        .then(() => true)
        .catch(() => false))
    ) {
      return;
    }

    const { dateRange, ...values } = form.getFieldsValue();
    dispatch(
      (id ? updateBanner : addBanner)({
        ...banner,
        ...values,
        BannerImages: values.BannerImages.filter((elem) => elem.ImageUri),
        StartPublish: dateRange[0],
        EndPublish: dateRange[1],
      })
    )
      .unwrap()
      .then(() => {
        dispatch(noticeActions.add({ message: t(`adv.${isCreate ? "successCreateAlert" : "successEditAlert"}`) }));
        closeDrawer();
      });
  };

  useEffect(() => {
    !locationsOptions.length && dispatch(getBannerLocations());

    if (!isCreate && id) {
      dispatch(getBanner(id));
    }

    return () => {
      dispatch(bannersActions.reset());
    };
  }, [id]);

  return (
    <Drawer
      title={<HeaderText>{isCreate ? t("adv.createBanner") : t("adv.editBanner")}</HeaderText>}
      closable={false}
      destroyOnClose={true}
      getContainer={false}
      onClose={closeDrawer}
      visible={visible}
      width="440px"
      bodyStyle={{ padding: "24px 30px" }}
      footer={
        <Footer>
          <div>
            <Button onClick={closeDrawer} style={{ marginRight: 8 }}>
              {t("allPages.buttonsText.cancel")}
            </Button>

            <Button onClick={() => showConfirm()} type="primary" htmlType="submit">
              {t("allPages.buttonsText.save")}
            </Button>
          </div>
        </Footer>
      }
    >
      {!isCreate && !initialValues ? (
        <Loader />
      ) : (
        <Form form={form} layout="vertical" requiredMark={false} initialValues={initialValues} validateTrigger="onBlur">
          <Form.Item name="dateRange" label={t("adv.displayPeriod")} rules={[{ validator: required }]}>
            <DatePicker.RangePicker showTime />
          </Form.Item>

          <Form.Item
            name="Name"
            label={t("allPages.title")}
            rules={[{ validator: (_, value) => requiredMinMax(_, value, 1, 50) }]}
          >
            <Input name="bannerName" />
          </Form.Item>

          <Form.Item
            name="LocationId"
            label={t("adv.location")}
            rules={[{ validator: required }]}
            getValueFromEvent={(value) => {
              form.setFieldsValue({ ...form.getFieldsValue(), ImageUri: undefined, BannerImages: [] });

              return value;
            }}
          >
            <SelectField options={locationsOptions} />
          </Form.Item>

          <Form.Item label={t("adv.logo")}>
            <GroupFormItem>
              <Form.Item noStyle shouldUpdate>
                {() => {
                  const { DeviceImageSlots: deviceImageSlots } =
                    locationsOptions.find(({ value }) => value === form.getFieldValue("LocationId")) || {};
                  const sortDeviceImageSlots = deviceImageSlots ? [...deviceImageSlots] : [];
                  sortDeviceImageSlots?.sort((a, b) => BannerSizeToSort[a.Size] - BannerSizeToSort[b.Size]);

                  return sortDeviceImageSlots?.map(({ Width: width = 0, Height: height = 0, Size }, index) => {
                    return (
                      <div>
                        <Form.Item
                          name={["BannerImages", index, "ImageUri"]}
                          label={t(`adv.${Size}`)}
                          rules={[{ validator: index === 0 ? required : undefined }]}
                        >
                          <ImageField
                            validation={{
                              width,
                              height,
                              size: 4096,
                              format: ["jpeg", "png", "gif"],
                            }}
                            disabled={!width}
                            uploadRequest={(file: File) =>
                              advRepository.uploadImage(form.getFieldValue("LocationId"), Size, file)
                            }
                          />
                        </Form.Item>

                        {!!width && (
                          <UploadDesc>
                            {t("allPages.form.uploadDesc", {
                              width,
                              height,
                              size: "4",
                              format: "jpeg, png, gif",
                            })}
                          </UploadDesc>
                        )}

                        <Form.Item name={["BannerImages", index, "Size"]} initialValue={Size} />
                      </div>
                    );
                  });
                }}
              </Form.Item>
            </GroupFormItem>
          </Form.Item>

          <Form.Item name="TransitionUri" label={t("adv.hyperlink")} rules={[{ validator: required }]}>
            <Input name="bannerLink" />
          </Form.Item>
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

const TitleText = styled.span`
  font-weight: 600;
  font-size: 16px;
  display: block;
`;

const GroupFormItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;
