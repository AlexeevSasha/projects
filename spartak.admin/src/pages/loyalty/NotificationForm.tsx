import { Checkbox, DatePicker, FormInstance, Input, Radio } from "antd";
import { notificationsRepository } from "api/notificationsRepository";
import { theme } from "assets/theme/theme";
import { required } from "common/helpers/validators/required";
import { requiredMinMax } from "common/helpers/validators/requiredMinMax";
import { DeepLinkList } from "common/interfaces/IDeepLinks";
import moment from "moment";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useAppDispatch } from "store";
import { notificationsActions } from "store/notifications/notifications";
import { deepLinksSelector } from "store/notifications/notificationsSelectors";
import styled from "styled-components";
import { ImageField } from "ui/ImageField";
import { RowLabel } from "ui/RowLabel";
import { SelectField } from "ui/SelectField";
import { UploadDesc } from "ui/UploadDesc";
import { FormItem } from "./CommonForm";
import { LoyaltyFormValues } from "./LoyaltyForm";
import { validationHyperLink } from "common/helpers/validators/validationHyperLink";
import { LinkType } from "common/interfaces/notifications";

type Props = {
  form: FormInstance<LoyaltyFormValues>;
  isDisable?: boolean;
};

export const NotificationForm = ({ form, isDisable }: Props) => {
  const { t } = useTranslation();
  const deepLinks = useSelector(deepLinksSelector);
  const dispatch = useAppDispatch();
  const [showForm, setShowForm] = useState(form.getFieldValue("PushRequest"));
  const [linkType, setLinkType] = useState<LinkType>(form.getFieldValue(["PushRequest", "TypeLink"]) || "None");

  const [screenOptions, setScreenOptions] = useState<any>([]);
  useEffect(() => {
    setScreenOptions(deepLinks?.map((elem) => ({ label: DeepLinkList[`${elem.name}`], value: elem.link })) || []);
  }, [deepLinks]);
  useEffect(() => {
    if (!deepLinks) {
      notificationsRepository.getDeepLink().then((res) => dispatch(notificationsActions.setDeepLinks(res)));
    }
  }, []);

  return (
    <div>
      <FormItem name={"PushRequest"}>
        <Checkbox
          onChange={(event) => {
            setShowForm(event.target.checked);
            form.setFieldsValue({ ...form.getFieldsValue(), PushRequest: undefined });
            setLinkType("None");
          }}
          checked={showForm}
        >
          {t("loyalty.push.checkBoxText")}
        </Checkbox>
      </FormItem>
      {showForm ? (
        <>
          <FormItem
            name={["PushRequest", "SendTime"]}
            rules={[{ validator: required }]}
            label={<RowLabel label={t("loyalty.push.sendDateTime")} required />}
            getValueFromEvent={(date) => date?.toISOString()}
            getValueProps={(date) => ({
              value: date ? moment(date) : undefined,
            })}
          >
            <DatePicker
              showTime
              style={{ width: 291 }}
              disabledDate={(date) => moment(date) < moment().set({ seconds: -1 })}
            />
          </FormItem>
          <FormItem
            name={["PushRequest", "Heading"]}
            label={<RowLabel label={t("loyalty.push.title")} prompt={t("loyalty.push.titlePrompt")} required />}
            rules={[{ validator: (_, value) => requiredMinMax(_, value, 1, 50) }]}
          >
            <Input style={{ width: "256px" }} placeholder={t("specialOffer.text")} />
          </FormItem>
          <FormItem
            name={["PushRequest", "Message"]}
            label={<RowLabel label={t("loyalty.push.text")} prompt={t("loyalty.push.textPrompt")} required />}
            rules={[{ validator: (_, value) => requiredMinMax(_, value, 1, 150) }]}
          >
            <Input.TextArea name="noticeText" rows={8} />
          </FormItem>

          <Container>
            <FormItem name={["PushRequest", "ImageUrl"]} label={<RowLabel label={t("queez.queezQuestions.image")} />}>
              <ImageField
                validation={{
                  width: 1024,
                  height: 512,
                  size: 1024,
                  format: ["png"],
                  exact: true,
                }}
                uploadRequest={notificationsRepository.uploadImg}
              />
            </FormItem>
            <UploadDesc width={296}>
              {t("allPages.form.uploadDesc", {
                width: "1024",
                height: "512",
                size: "1",
                format: "png",
              })}
            </UploadDesc>
          </Container>

          <Label>{t("calendar.eventLink")}</Label>
          <FormItem name={["PushRequest", "TypeLink"]} shouldUpdate>
            <Radio.Group
              onChange={() => {
                form.setFieldsValue({
                  ...form.getFieldsValue(),
                  PushRequest: { ...form.getFieldsValue().PushRequest, LinkValueUrl: undefined },
                });
                setLinkType(form.getFieldValue(["PushRequest", "TypeLink"]));
              }}
            >
              <FormItem
                name={linkType === "Screen" ? ["PushRequest", "LinkValueUrl"] : "something"}
                rules={[{ ...(linkType === "Screen" && { validator: required }) }]}
                label={
                  <RowLabel
                    label={
                      <Radio style={{ fontWeight: 400 }} value={"Screen"}>
                        {t("notifications.appScreen")}
                      </Radio>
                    }
                  />
                }
              >
                <SelectField
                  options={screenOptions}
                  style={{ width: 291 }}
                  disabled={form.getFieldValue(["PushRequest", "TypeLink"]) !== "Screen"}
                />
              </FormItem>
              <FormItem
                name={linkType === "HyperLink" ? ["PushRequest", "LinkValueUrl"] : "something"}
                rules={[{ validator: (_, value) => validationHyperLink(_, value, linkType === "HyperLink") }]}
                label={
                  <RowLabel
                    label={
                      <Radio style={{ fontWeight: 400 }} value={"HyperLink"}>
                        {t("notifications.gyperLink")}
                      </Radio>
                    }
                  />
                }
              >
                <Input
                  // name="NoticeLink"
                  style={{ width: 291 }}
                  disabled={linkType !== "HyperLink"}
                />
              </FormItem>
            </Radio.Group>
          </FormItem>
        </>
      ) : null}
    </div>
  );
};

const Container = styled.div`
  display: flex;
`;

const Label = styled.div`
  font-family: "SF Pro Display", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
  color: ${theme.colors.neroGray};
  margin: 4px 0 20px;
`;
