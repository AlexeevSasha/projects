import { Button, message, Collapse, Form } from "antd";
import { useCallback, useEffect, useState } from "react";
import {
  getArrayItemsForm,
  getArrayMobileSettings,
  getObject,
  Items,
  MobileSettingsType
} from "../../../common/helpers/getArrayMobileSetting";
import { useTranslation } from "react-i18next";
import { Loader } from "../../../ui/Loader";
import { getMobileConfig, updateMobileConfig } from "../../../api/requests/mobileConfig";
import styled from "styled-components";

const { Panel } = Collapse;

export const MobileForm = ({ access }: { access: boolean }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [mobileSettings, setMobileSettings] = useState<MobileSettingsType | []>([]);

  useEffect(() => {
    setIsLoading(true);
    getMobileConfig()
      .then((res) => {
        setMobileSettings(getArrayMobileSettings(res));
        setCount(0);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    form.resetFields();
  }, [mobileSettings]);

  const onFinish = (value: { field: MobileSettingsType }) => {
    if (count) {
      const object = getObject(value["field"]);
      setIsLoading(true);
      updateMobileConfig(object)
        .then(() => {
          message.success(t("success.update.default"));
          setMobileSettings(value["field"]);
          setCount(0);
          setIsLoading(false);
        })
        .catch(() => setIsLoading(false));
    }
  };

  const onReset = useCallback(() => {
    form.resetFields();
    setCount(0);
  }, []);

  return (
    <Form form={form} onFinish={onFinish} initialValues={mobileSettings}>
      {isLoading ? <Loader /> : ""}
      {mobileSettings.length ? (
        <>
          <Form.List name="field" initialValue={mobileSettings}>
            {(fields) => (
              <Collapse key="field" accordion>
                {fields.map(({ key, name }) => {
                  const [keys] = Object.entries(mobileSettings[key])[0];

                  return (
                    <Panel header={keys} key={keys}>
                      <Form.Item noStyle>{Items(getArrayItemsForm(mobileSettings[key], keys, setCount, [`${name}`], access))}</Form.Item>
                    </Panel>
                  );
                })}
              </Collapse>
            )}
          </Form.List>
          {count ? (
            <CoundRed>
              {t("mobileConfig.changedFields")}: {count}
            </CoundRed>
          ) : null}
          {access ? (
            <div style={{ display: "flex", gap: 16, marginTop: 16 }}>
              <Button onClick={onReset}>{t("common.buttonsText.reset")}</Button>
              <Button htmlType="submit" type="primary">
                {t("common.buttonsText.confirm")}
              </Button>
            </div>
          ) : null}
        </>
      ) : null}
    </Form>
  );
};

const CoundRed = styled.div`
  margin-top: 4px;
  color: #f5222d;
`;
