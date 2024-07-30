import React, { useEffect, useMemo, useState } from "react";
import { Form, Input, Radio, Select } from "antd";
import { SelectValue } from "antd/es/select";
import { useSelector } from "react-redux";
import type { StateType } from "../core/redux/store";
import { useTranslation } from "react-i18next";
import { formsConstantsValidation } from "../common/constants/formsConstantsValidation";

const { Option } = Select;

interface IProps {
  isUpdatedLink?: boolean;
  linkType?: string;
  linkValue?: string;
  isDisabledButtonData?: boolean;
  changeLinkValue?: Function;
}

export const FormLinksItem = ({ isUpdatedLink, changeLinkValue, linkType, linkValue, isDisabledButtonData }: IProps) => {
  const { t } = useTranslation();
  const { deepLinks } = useSelector((state: StateType) => state.commons);
  const [disabledLinkSelect, setDisabledLink] = useState<{ screen: boolean; hyperlink: boolean }>({
    screen: true,
    hyperlink: false
  });
  const checkRadioAndValidation = (disabledLinkSelectValue: boolean) => {
    return isDisabledButtonData !== undefined ? isDisabledButtonData && disabledLinkSelectValue : disabledLinkSelectValue;
  };

  const deepLinksOptions = useMemo(
    () =>
      deepLinks.map((option, i) => (
        <Option key={i + 1} value={option.link}>
          {option.name}
        </Option>
      )),
    [deepLinks]
  );

  const disabledRadio = isDisabledButtonData !== undefined ? !isDisabledButtonData : false;

  const disabledInputSelect = (disabledLinkSelectValue: boolean) => {
    return isDisabledButtonData !== undefined ? !isDisabledButtonData || !disabledLinkSelectValue : !disabledLinkSelectValue;
  };

  useEffect(() => {
    if (isUpdatedLink) {
      setDisabledLink({
        screen: linkType !== "DeepLink" && linkType !== "HyperLink" ? true : linkType === "DeepLink",
        hyperlink: linkType === "HyperLink"
      });
    }

    return () => {
      setDisabledLink({ screen: false, hyperlink: false });
    };
  }, [isUpdatedLink, linkValue, linkType]);

  const changeStateLinks = (type: string) => {
    setDisabledLink({ hyperlink: type === "HyperLink", screen: type === "DeepLink" });
    changeLinkValue?.(type, "");
  };

  return (
    <Form.Item key={`${disabledLinkSelect.screen}${disabledLinkSelect.hyperlink}`} label={t("common.link")} required={false}>
      <Radio
        checked={checkRadioAndValidation(disabledLinkSelect.screen)}
        disabled={disabledRadio}
        onClick={() => changeStateLinks("DeepLink")}
      >
        {t("common.links.screen")}
      </Radio>
      <Form.Item
        name={"linkValue1"}
        key={"linkValue1"}
        initialValue={(linkType === "DeepLink" && linkValue) || ""}
        rules={[
          {
            required: checkRadioAndValidation(disabledLinkSelect.screen),
            message: t("validations.required")
          }
        ]}
      >
        <Select
          showSearch={false}
          disabled={disabledInputSelect(disabledLinkSelect.screen)}
          onChange={(e: SelectValue) => changeLinkValue?.("DeepLink", `${e}`)}
        >
          {deepLinksOptions}
        </Select>
      </Form.Item>
      <Radio
        style={{ marginTop: "11px" }}
        checked={checkRadioAndValidation(disabledLinkSelect.hyperlink)}
        disabled={disabledRadio}
        onClick={() => changeStateLinks("HyperLink")}
      >
        {t("common.links.hyperLink")}
      </Radio>
      <Form.Item
        key={"linkValue2"}
        name={"linkValue2"}
        initialValue={(linkType === "HyperLink" && linkValue) || ""}
        rules={
          checkRadioAndValidation(disabledLinkSelect.hyperlink)
            ? [
                {
                  required: true,
                  message: t("validations.required")
                },
                {
                  max: formsConstantsValidation.link.max,
                  message: t("validations.maxLengthExceeded", { max: formsConstantsValidation.link.max })
                },
                {
                  type: "url",
                  message: t("validations.invalidUri")
                }
              ]
            : []
        }
      >
        <Input
          onChange={(e) => changeLinkValue?.("HyperLink", e.target.value)}
          disabled={disabledInputSelect(disabledLinkSelect.hyperlink)}
        />
      </Form.Item>
    </Form.Item>
  );
};
