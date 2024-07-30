import React, { useEffect, useState } from "react";
import { Button, DatePicker, Drawer, Form, InputNumber, message, Select } from "antd";
import { useTranslation } from "react-i18next";
import { ImageUpload } from "../../../../ui/formItemComponents/ImageUpload";
import type { IFiveEvents, IPoll } from "../../../../api/dto/pointsSystem";
import { formsConstantsValidation } from "../../../../common/constants/formsConstantsValidation";
import TextArea from "antd/lib/input/TextArea";
import moment, { Moment } from "moment";
import { getMatches } from "../../../../api/requests/pointsSystem";

interface IProps {
  data?: Partial<IPoll> | null;
  onClose: Function;
  onSave: (payload: IPoll, update?: boolean) => void;
  visible: boolean;
  isLoading: boolean;
}

const eventsNum = new Array(5).fill("");
const entity = formsConstantsValidation.entity.poll;
const uploadAction = `${process.env.REACT_APP_MOBILE}${process.env.REACT_APP_ADMIN}/poll/image`;

const PollForm = ({ data, onClose, onSave, visible, isLoading }: IProps) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const [pollType, setPollType] = useState<string>();
  const [matches, setMatches] = useState<{ value: string; label: string }[]>([]);
  const [disableButton, setDisableButton] = useState(false);

  useEffect(() => {
    if (visible) {
      getMatches().then((result) => {
        setMatches(
          result.map((item) => {
            return { value: item.id, label: item.name };
          })
        );
      });
    }
  }, [visible]);

  useEffect(() => {
    form.resetFields();
    setPollType(data?.type);
    if (data?.id) {
      form.setFieldsValue({
        points: data.points,
        description: data.description,
        image: data.image,
        matchId: data.match?.id,
        startDate: moment(data?.startDate),
        endPollDate: moment(data?.endPollDate),
        endDate: moment(data?.endDate),
        fiveEvents: data.fiveEvents,
        matchWinner: data.matchWinner,
        startingFive: data.startingFive
      });
    }
  }, [data]);

  const closeDrawer = () => {
    form.resetFields();
    onClose();
  };

  function disabledDate(current: Moment) {
    return current && current < moment().endOf("minute").add(-1, "m");
  }

  function validateDateRules(startDate: Moment, endPollDate: Moment, endDate: Moment, disableValidate: boolean): boolean {
    let i = 0;
    if (!disableValidate && startDate <= moment()) {
      i++;
      setDisableButton(true);
      message.error(t("validations.invalidStartPollDate")).then(() => setDisableButton(false));
    }
    if (endPollDate <= startDate || (data?.status === "Opened" && endPollDate <= moment())) {
      i++;
      setDisableButton(true);
      message.error(t("validations.invalidEndPollDate")).then(() => setDisableButton(false));
    }
    if (endDate <= endPollDate || endDate <= moment()) {
      i++;
      setDisableButton(true);
      message.error(t("validations.invalidEndDate")).then(() => setDisableButton(false));
    }

    return i == 0;
  }

  const submitForm = () => {
    form.validateFields().then(async (values) => {
      if (validateDateRules(values.startDate, values.endPollDate, values.endDate, IsDisabledInput(data?.status))) {
        const fiveEventsObj: IFiveEvents[] = [];
        let payload: IPoll | any = { type: data?.type, ...values };

        if (pollType === "FiveEvents") {
          const { event1, event2, event3, event4, event5, ...rest } = payload;
          if (data?.id) {
            form.getFieldsValue(["fiveEvents"]).fiveEvents.map((event: IFiveEvents, i: number) => {
              fiveEventsObj?.push({ id: event.id, question: form.getFieldValue(`event${i + 1}`) });
            });
          } else {
            fiveEventsObj?.push(...eventsNum.map((_, i) => ({ question: form.getFieldValue(`event${i + 1}`) })));
          }
          payload = { ...rest, fiveEvents: fiveEventsObj };
        }

        if (data?.id) {
          onSave({ id: data.id, ...payload }, true);
        } else {
          onSave(payload);
        }
      }
    });
  };

  const IsDisabledInput = (status: IPoll["status"] = "Finished") => {
    return !!["Opened", "Closed"].includes(status);
  };

  return (
    <Drawer
      title={(data?.id ? t("common.edit") : t("common.buttonsText.create")) + " - " + t(`pointsSystem.poll.${data?.type}`)}
      closable={false}
      destroyOnClose={true}
      onClose={closeDrawer}
      visible={visible}
      width={400}
      footer={
        <div
          style={{
            textAlign: "right"
          }}
        >
          <Button onClick={closeDrawer} style={{ marginRight: 8 }}>
            {t("common.buttonsText.cancel")}
          </Button>
          <Button onClick={submitForm} type="primary" htmlType={"submit"} disabled={isLoading || disableButton}>
            {t("common.buttonsText.save")}
          </Button>
        </div>
      }
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label={t(`pointsSystem.${pollType === "FiveEvents" ? "poll" : "loyalty"}.points`)}
          required={false}
          rules={[
            {
              required: true,
              message: t("validations.required")
            }
          ]}
          name={"points"}
        >
          <InputNumber
            style={{ width: "100%" }}
            min={formsConstantsValidation.default.minCount}
            max={formsConstantsValidation.default.maxCount}
            disabled={IsDisabledInput(data?.status)}
          />
        </Form.Item>
        <Form.Item label={t("common.description")} required={false} name={"description"}>
          <TextArea rows={4} maxLength={formsConstantsValidation.entity.poll.max} />
        </Form.Item>
        <ImageUpload
          action={uploadAction}
          label={t("common.image")}
          updateImage={data?.image}
          form={form}
          name={"image"}
          entity={entity.image}
          mimeTypes={["image/jpeg", "image/png"]}
        />
        <Form.Item
          label={t("common.match")}
          required={false}
          hidden={!!(data?.id && data?.status !== "Created")}
          rules={[
            {
              required: true,
              message: t("validations.required")
            }
          ]}
          name={"matchId"}
        >
          <Select
            placeholder={t("common.selectPlaceholder")}
            showSearch
            filterOption={(input, option) => (option?.label.toLowerCase() ?? "").includes(input.toLowerCase())}
            size={"middle"}
            defaultValue={data?.match?.id}
            disabled={IsDisabledInput(data?.status)}
            options={matches}
          />
        </Form.Item>
        <Form.Item
          label={t("common.startDate")}
          required={false}
          hidden={!!(data?.id && data?.status !== "Created")}
          rules={[
            {
              required: true,
              message: t("validations.required")
            }
          ]}
          name={"startDate"}
          tooltip={{ title: t("pointsSystem.poll.tooltips.startDate") }}
        >
          <DatePicker
            format={formsConstantsValidation.dateTimeFormat}
            style={{ width: "100%" }}
            disabledDate={disabledDate}
            disabled={IsDisabledInput(data?.status)}
            showTime
          />
        </Form.Item>
        <Form.Item
          label={t("common.endDate")}
          required={false}
          rules={[
            {
              required: true,
              message: t("validations.required")
            }
          ]}
          name={"endPollDate"}
          tooltip={t("pointsSystem.poll.tooltips.endDate")}
        >
          <DatePicker
            format={formsConstantsValidation.dateTimeFormat}
            style={{ width: "100%" }}
            disabledDate={disabledDate}
            disabled={data?.status == "Closed"}
            showTime
          />
        </Form.Item>
        <Form.Item
          label={t("pointsSystem.poll.endDatePoll")}
          required={false}
          rules={[
            {
              required: true,
              message: t("validations.required")
            }
          ]}
          name={"endDate"}
          tooltip={t("pointsSystem.poll.tooltips.endDatePoll")}
        >
          <DatePicker format={formsConstantsValidation.dateTimeFormat} style={{ width: "100%" }} disabledDate={disabledDate} showTime />
        </Form.Item>
        {((data?.fiveEvents && data.fiveEvents.length > 0) || data?.type === "FiveEvents") && <FiveEvents data={data.fiveEvents || []} />}
      </Form>
    </Drawer>
  );
};

const FiveEvents = ({ data }: { data: IFiveEvents[] }) => {
  const { t } = useTranslation();

  return (
    <>
      {eventsNum.map((_, i) => (
        <Form.Item
          label={t("pointsSystem.poll.event") + ` ${i + 1}`}
          required={false}
          rules={[
            {
              required: true,
              message: t("validations.required")
            },
            {
              max: formsConstantsValidation.entity.poll.max,
              message: t("validations.MaxLengthExceeded", { max: formsConstantsValidation.entity.poll.max })
            }
          ]}
          name={`event${i + 1}`}
          initialValue={data[i]?.question}
        >
          <TextArea />
        </Form.Item>
      ))}
    </>
  );
};

export default PollForm;
