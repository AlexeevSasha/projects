import { useState, ChangeEvent, useCallback, FC } from "react";
import { Form, Input } from "antd";
import { Count } from "../../../common/helpers/getArrayMobileSetting";
import { useTranslation } from "react-i18next";
import { formsConstantsValidation } from "../../../common/constants/formsConstantsValidation";

interface IProps {
  name: string;
  value: string;
  arrName: string[];
  setCount: Count;
  access: boolean;
}

export const InputForm: FC<IProps> = ({ name, value, arrName, setCount, access }) => {
  const [visit, setVisit] = useState(false);
  const { t } = useTranslation();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== value) {
      if (!visit) {
        setCount((prev: number) => prev + 1);
        setVisit(true);
      }
    } else {
      setCount((prev: number) => prev - 1);
      setVisit(false);
    }
  };

  const validateRegexp = useCallback((val: string) => {
    const regexp = /^http(s)?:\/\//i;
    const pattern: { pattern?: RegExp; message?: string } = {};

    const validHttp = regexp.test(val);

    if (validHttp) {
      pattern.pattern = regexp;
      pattern.message = t("validations.invalidUri");
    }

    return pattern;
  }, []);

  return (
    <Form.Item
      required={false}
      key={name}
      label={name}
      name={arrName}
      initialValue={value}
      rules={[
        { max: formsConstantsValidation.link.max, message: t("validations.maxLengthExceeded", { max: formsConstantsValidation.link.max }) },
        validateRegexp(value)
      ]}
    >
      <Input disabled={!access} onChange={onChange} />
    </Form.Item>
  );
};
