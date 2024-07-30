import { Select } from "antd";
import i18n from "i18next";
import { useState } from "react";
import styled from "styled-components";
import { theme } from "../../../assets/theme/theme";
import { useTranslation } from "react-i18next";
import { languages } from "../../../common/constants/languages";
import { setStorageLanguage, getStorageLanguage } from "../../../common/helpers/storageLanguage";
import { changeLang } from "../../../common/helpers/changeLang";

const { Option } = Select;

export const Language = () => {
  const { t } = useTranslation();
  const [defaultLang, setDefaultLang] = useState(getStorageLanguage());

  const handleChange = async (value: string) => {
    i18n.changeLanguage(value, () => {
      setStorageLanguage(value);
      setDefaultLang(value);
      changeLang(value);
    });
  };

  return (
    <Flex>
      <TextWrapper>
        <h3>{t("settings.language")}</h3>
        <p>{t("settings.interfaceLang")}</p>
      </TextWrapper>
      <div style={{ maxWidth: 330, width: "100%" }}>
        <Select defaultValue={defaultLang} style={{ width: "100%" }} onChange={handleChange}>
          {languages.map(({ lang, title }, index) => (
            <Option value={lang} key={index}>
              {title}
            </Option>
          ))}
        </Select>
      </div>
    </Flex>
  );
};

const Flex = styled.div`
  display: flex;
  gap: 25px;
`;

const TextWrapper = styled.div`
  max-width: 200px;
  width: 100%;
  margin-bottom: 20px;

  h3 {
    color: ${theme.colors.neroGray};
    line-height: 22px;
    margin: 0;
  }

  p {
    color: #83888b;
    line-height: 20px;
    margin: 0;
  }
`;
