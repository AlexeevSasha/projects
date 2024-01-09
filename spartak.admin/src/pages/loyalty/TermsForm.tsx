import { LoadingOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, FormInstance, InputNumber, Radio, Select, Space } from "antd";
import { loyaltyRepository } from "api/loyaltyRepository";
import { theme } from "assets/theme/theme";
import { selectProps } from "common/helpers/customMulti";
import { required } from "common/helpers/validators/required";
import { quantityValidation } from "common/helpers/validators/requiredMinMax";
import moment from "moment";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useAppDispatch } from "store";
import { getEventList, getSectorList } from "store/loyalty/loyaltyActionAsync";
import { loyaltyEventsSelector, loyaltySectorsSelector } from "store/loyalty/loyaltySelectors";
import { noticeActions } from "store/notice/notice";
import styled from "styled-components";
import { RowLabel } from "ui/RowLabel";
import { UploadField } from "ui/UploadField";
import { FormItem } from "./CommonForm";
import { LoyaltyFormValues } from "./LoyaltyForm";

type Props = {
  form: FormInstance<LoyaltyFormValues>;
  isDisable?: boolean;
};

export const TermsForm = ({ form, isDisable }: Props) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const events = useSelector(loyaltyEventsSelector);
  const sectors = useSelector(loyaltySectorsSelector);

  const winTerms = useMemo(
    () => [
      { name: "NewUser", label: t("loyalty.register") },
      { name: "BoughtTicket", label: t("loyalty.ticket") },
    ],
    []
  );

  useEffect(() => {
    !events.length &&
      dispatch(
        getEventList({
          NotNul: "Event",
          withOutDeletedUtc: true,
          pageSize: 1000,
          sorting: "MatchStartDateTime desc",
          MatchStartFromDate: moment(),
        })
      );
  }, []);

  const addFile = async (file: File) => {
    return await loyaltyRepository.addFile(file, "Users").then((res) => res.FilePath);
  };

  return (
    <div>
      <FormItem
        name={["Condition", "AvailabilityCondition", "Type"]}
        rules={[{ validator: required }]}
        label={<RowLabel label={t("loyalty.who")} prompt={t("loyalty.whoDesc")} />}
      >
        <Radio.Group>
          <Space direction="vertical">
            <Radio
              value={"AllUser"}
              disabled={isDisable}
              onClick={() => {
                form.validateFields();
              }}
            >
              {t("loyalty.allUsers")}
            </Radio>
            <Radio value={"FromFile"} disabled={isDisable}>
              {t("loyalty.fromCSV")}
            </Radio>

            <Form.Item shouldUpdate>
              {() => {
                const disabled = form.getFieldValue(["Condition", "AvailabilityCondition", "Type"]) === "AllUser";

                return (
                  <Form.Item
                    name={["Condition", "AvailabilityCondition", "UploadFileUrl"]}
                    rules={
                      disabled
                        ? []
                        : [
                            {
                              validator: (_, value) =>
                                value && value.includes(".csv") ? Promise.resolve() : Promise.reject(),
                              message: t("validations.required"),
                            },
                          ]
                    }
                    getValueFromEvent={(e) => {
                      // Вызывает проверку валидации полей, после присвоения значения
                      setTimeout(() => form.validateFields(), 200);

                      return e;
                    }}
                  >
                    <UploadField
                      uploadRequest={(file) => addFile(file)}
                      removeRequest={loyaltyRepository.deleteFile}
                      placeholder={({ loading } = {}) => (
                        <Button disabled={disabled} icon={loading ? <LoadingOutlined /> : <UploadOutlined />}>
                          {t("loyalty.import")}
                        </Button>
                      )}
                      disabled={disabled || isDisable}
                      listType={undefined}
                      validate={(file: File) => {
                        const typeError = !file.type.includes("csv");
                        const sizeError = !(file.size / 1024 <= 1024);
                        if (typeError || sizeError) {
                          dispatch(noticeActions.add({ message: t("validations.errorLoadFile"), type: "error" }));
                        }

                        return !typeError && !sizeError;
                      }}
                    />
                  </Form.Item>
                );
              }}
            </Form.Item>
          </Space>
        </Radio.Group>
      </FormItem>

      <FormItem
        name="ExistCondition"
        initialValue={false}
        label={<RowLabel label={t("loyalty.victoryCond")} prompt={t("loyalty.condDesc")} />}
      >
        <Radio.Group
          onChange={(e) => {
            return e;
          }}
        >
          <Space direction="vertical">
            <Radio value={true} disabled={isDisable}>
              {t("loyalty.yes")}
            </Radio>
            <Radio value={false} disabled={isDisable}>
              {t("loyalty.no")}
            </Radio>
          </Space>
        </Radio.Group>
      </FormItem>

      <Form.Item shouldUpdate>
        {() => {
          const { ExistCondition, EventId, NewUser, BoughtTicket } = form.getFieldsValue();
          const disabled = !ExistCondition;
          const fieldsDisabled = disabled || !BoughtTicket;
          const sectorDisabled = fieldsDisabled || !EventId;
          const error = ExistCondition && !NewUser && !BoughtTicket;

          return (
            <>
              <FormItem label={<RowLabel label={t("loyalty.forWinCond")} prompt={t("loyalty.forWinCondDesc")} />}>
                <Space direction="vertical">
                  {winTerms.map(({ label, name }) => (
                    <Form.Item key={name} name={name} valuePropName="checked">
                      <Checkbox disabled={disabled || isDisable}>{label}</Checkbox>
                    </Form.Item>
                  ))}

                  {error && <Error>Выберите хотя бы одно условие</Error>}
                </Space>
              </FormItem>

              <FormItem style={{ marginTop: -40 }} label={<RowLabel label="" />}>
                <InputSpace direction="vertical">
                  <Form.Item
                    name="EventId"
                    label={t("loyalty.event")}
                    rules={fieldsDisabled || isDisable ? [] : [{ validator: required }]}
                  >
                    <Select
                      options={events}
                      placeholder={t("loyalty.noChoos")}
                      disabled={fieldsDisabled || isDisable}
                      onChange={(value) => {
                        if (value) {
                          dispatch(getSectorList(value));
                        }
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    name="SectorIds"
                    label={t("loyalty.sector")}
                    rules={sectorDisabled || isDisable ? [] : [{ validator: required }]}
                  >
                    <Select
                      options={sectors}
                      placeholder={t("loyalty.noChoos")}
                      disabled={sectorDisabled || isDisable}
                      {...selectProps({
                        options: sectors || [],
                        fieldName: "SectorIds",
                        form,
                      })}
                    />
                  </Form.Item>

                  <Form.Item
                    name="Quantity"
                    label={t("loyalty.minTickets")}
                    rules={
                      fieldsDisabled || isDisable
                        ? []
                        : [
                            {
                              validator: (_, value) =>
                                quantityValidation(_, value, 1, 99, "loyalty.quantityValidationError"),
                            },
                          ]
                    }
                  >
                    <InputNumber style={{ width: "100%" }} disabled={fieldsDisabled || isDisable} />
                  </Form.Item>
                </InputSpace>
              </FormItem>
            </>
          );
        }}
      </Form.Item>
    </div>
  );
};

const InputSpace = styled(Space)`
  & .ant-form-item {
    display: block;
  }

  & .ant-form-item-label > label::after {
    content: none;
  }
`;

const Error = styled.div`
  color: ${theme.colors.red};
  font-size: 14px;
`;
