import { CopyOutlined } from "@ant-design/icons";
import { Button, DatePicker, Divider, Form, FormInstance, Input, InputNumber, Typography } from "antd";
import { deepMerge } from "common/helpers/deepMerge";
import { fullNameTournamentValidator } from "common/helpers/validators/fullNameValidator";
import { required } from "common/helpers/validators/required";
import { Tournament } from "common/interfaces/tournaments";
import moment, { Moment } from "moment";
import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { ImageField } from "ui/ImageField";
import { RowLabel } from "ui/RowLabel";
import { SelectField } from "ui/SelectField";
import { requiredMinMax } from "../../common/helpers/validators/requiredMinMax";

const { Text } = Typography;

type Props = {
  form: FormInstance;
  values?: Tournament;
  setValues: (value: Tournament) => void;
  tournament?: Tournament;
  submitForm: (draft: boolean) => void;
};

export const InfoForm = ({ form, values, setValues, tournament, submitForm }: Props) => {
  const { t } = useTranslation();
  const [lang, setLang] = useState("Ru");
  const [beginDate, setBeginDate] = useState<Moment | null>(null);

  const currentValues = useRef<Tournament>();
  const initialValues = useMemo(() => {
    const v = tournament || ({ SortOrder: 10 } as Tournament);
    currentValues.current = v;

    return v;
  }, [tournament]);

  const langOptions = useMemo(() => {
    return [
      { label: t("matches.ru"), value: "Ru" },
      { label: t("matches.en"), value: "En" },
    ];
  }, []);

  const handleLangChange = (key: string) => {
    setValues(deepMerge({ ...values }, form.getFieldsValue()));
    setLang(key);
  };

  const fillFromBasicLocale = () => {
    values &&
      form.setFieldsValue({
        ...values,
        FullName: { ...values.FullName, En: values.FullName.Ru },
        Description: { ...values.Description, En: values.Description.Ru },
        ShortName: { ...values.ShortName, En: values.ShortName.Ru },
      });
  };

  const handleChange = (date: Moment | null) => {
    setBeginDate(date);
    if (
      date &&
      form.getFieldValue("EndDate") &&
      date?.toISOString() > moment(form.getFieldValue("EndDate")).toISOString()
    ) {
      form.setFieldsValue({ EndDate: date });
    }
  };

  return (
    <>
      <Row>
        <RowLabel label={t("matches.locale")} />

        <div>
          <SelectField value={lang} options={langOptions} onChange={handleLangChange} style={{ width: 256 }} />

          {lang === "En" && (
            <Fill onClick={fillFromBasicLocale}>
              <CopyOutlined /> <span>{t("allPages.fillFromBasicLocale")}</span>
            </Fill>
          )}

          <Typography.Text
            style={{
              padding: "8px 0 16px",
              display: "block",
              maxWidth: 580,
            }}
          >
            {t("matches.localePrompt")}
          </Typography.Text>
        </div>
      </Row>
      <Divider style={{ marginBottom: 40 }} />

      <Form
        form={form}
        requiredMark={false}
        labelAlign="left"
        initialValues={initialValues}
        validateTrigger={initialValues?.Status === "Published" ? "onBlur" : false}
      >
        <Row>
          <RowLabel label={t("allPages.main")} prompt={t("allPages.prompt")} />

          <Form.Item shouldUpdate={(_, current) => !!(currentValues.current = current)}>
            {() =>
              JSON.stringify(initialValues) !== JSON.stringify(currentValues.current) ? (
                <>
                  <RowLabel label={t("matches.saveChanges")} prompt={t("matches.unsavedChanges")} />

                  <BtnContainer>
                    <Button type="primary" onClick={() => submitForm(initialValues.Status !== "Published")}>
                      {t("allPages.buttonsText.save")}
                    </Button>

                    <Button
                      onClick={() => {
                        form.resetFields();
                        currentValues.current = initialValues;
                        setBeginDate(initialValues.StartDate ? moment(initialValues.StartDate) : null);
                      }}
                    >
                      {t("allPages.buttonsText.cancel")}
                    </Button>
                  </BtnContainer>
                </>
              ) : null
            }
          </Form.Item>
        </Row>
        <FormItem
          name="SortOrder"
          label={<RowLabel label={t("allPages.form.sortOrder") + " *"} />}
          rules={[{ validator: required }]}
        >
          <InputNumber
            min={1}
            name="SortOrder"
            style={{ width: 145 }}
            placeholder={t("allPages.form.orderPlaceholder")}
          />
        </FormItem>
        <FormItem
          name="StartDate"
          label={<RowLabel label={t("allPages.startDate") + " *"} prompt={t("allPages.dateTimeHelp")} />}
          getValueFromEvent={(date) => date?.toISOString()}
          getValueProps={(date) => ({ value: date ? moment(date) : undefined })}
          rules={[{ validator: required }]}
        >
          <DatePicker showTime onChange={handleChange} style={{ width: 256 }} disabled={lang === "En"} />
        </FormItem>

        <FormItem
          name="EndDate"
          label={<RowLabel label={t("allPages.endDate") + " *"} prompt={t("allPages.dateTimeHelp")} />}
          getValueFromEvent={(date) => date?.toISOString()}
          getValueProps={(date) => ({ value: date ? moment(date) : undefined })}
          rules={[{ validator: required }]}
        >
          <DatePicker
            disabledDate={beginDate ? (current) => current < beginDate : undefined}
            showTime
            style={{ width: 256 }}
            disabled={lang === "En"}
            showNow={beginDate ? beginDate <= moment() : true}
          />
        </FormItem>

        <FormItem
          name={["ShortName", lang]}
          label={<RowLabel label={t("tournaments.shortName") + " *"} />}
          rules={[{ validator: (_, value) => requiredMinMax(_, value, 1, 50) }]}
        >
          <Input
            placeholder={t("tournaments.shortNamePlaceholder")}
            name="tournamentsShortName"
            style={{ width: 512 }}
          />
        </FormItem>

        <FormItem
          name={["FullName", lang]}
          label={<RowLabel label={t("tournaments.fullName") + " *"} />}
          rules={[{ validator: fullNameTournamentValidator }]}
        >
          <Input placeholder={t("tournaments.fullNamePlaceholder")} name="tournamentsFullName" style={{ width: 512 }} />
        </FormItem>

        <FormItem name={["Description", lang]} label={<RowLabel label={t("tournaments.tourDesc")} />}>
          <Input.TextArea rows={1} style={{ width: 723 }} />
        </FormItem>

        <Row>
          <FormItem
            name="ImageUrl"
            label={<RowLabel label={t("tournaments.tourImage") + " *"} />}
            rules={[{ validator: required }]}
          >
            <ImageField
              validation={{
                format: ["png", "jpeg"],
                width: 1280,
                height: 1280,
                size: 20480,
                exact: true,
              }}
              disabled={lang === "En"}
            />
          </FormItem>

          <Text type="secondary" style={{ fontSize: 13, maxWidth: 380 }}>
            {t("allPages.form.uploadDesc", {
              format: "png",
              width: "1280",
              height: "1280",
              size: "20",
            })}
          </Text>
        </Row>
      </Form>
    </>
  );
};

const Row = styled.div`
  display: flex;
  grid-gap: 40px;
  margin-bottom: 40px;
  width: 1024px;
`;

const Fill = styled.div`
  display: flex;
  align-items: center;
  height: 32px;
  margin-top: 16px;
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }

  & > *:last-child {
    margin-left: 11px;
  }
`;

const FormItem = styled(Form.Item)`
  grid-gap: 40px;

  #root & {
    margin-bottom: 40px;
  }

  & > div:first-child {
    display: flex;
    align-items: flex-start;

    & > label::after {
      display: none;
    }
  }

  & label > div:first-child::after {
    display: none;
  }
`;

const BtnContainer = styled.div`
  display: flex;
  grid-gap: 8px;
`;
