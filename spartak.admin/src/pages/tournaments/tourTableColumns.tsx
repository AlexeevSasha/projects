import { Form, Input, InputNumber } from "antd";
import type { ColumnsType } from "antd/es/table";
import { FormListFieldData } from "antd/lib/form/FormList";
import { validationGoals } from "common/helpers/validators/validationMatch";
import i18n, { t } from "i18next";
import styled from "styled-components";

export const getTourTableColumns = (): ColumnsType<FormListFieldData> => {
  const locale = i18n.language === "ru" ? "Ru" : "En";

  return [
    {
      title: <Title>{t("tournaments.position")}</Title>,
      render: (_, { key, name }) => (
        <FormItem key={key} name={[name, "Position"]}>
          <InputNumber min={0} />
        </FormItem>
      ),
    },
    {
      title: <Title>{t("tournaments.team")}</Title>,
      width: "35%",
      render: (_, { key, name }) => (
        <FormItem key={key} name={[name, "Team", "Name", locale]}>
          <Input disabled />
        </FormItem>
      ),
    },
    {
      title: <Title>{t("tournaments.matchs")}</Title>,
      render: (_, { key, name }) => (
        <FormItem key={key} name={[name, "Total"]}>
          <InputNumber min={0} />
        </FormItem>
      ),
    },
    {
      title: <Title>{t("tournaments.wins")}</Title>,
      render: (_, { key, name }) => (
        <FormItem key={key} name={[name, "Won"]}>
          <InputNumber min={0} />
        </FormItem>
      ),
    },
    {
      title: <Title>{t("tournaments.draws")}</Title>,
      render: (_, { key, name }) => (
        <FormItem key={key} name={[name, "Draw"]}>
          <InputNumber min={0} />
        </FormItem>
      ),
    },
    {
      title: <Title>{t("tournaments.defeats")}</Title>,
      render: (_, { key, name }) => (
        <FormItem key={key} name={[name, "Lost"]}>
          <InputNumber min={0} />
        </FormItem>
      ),
    },
    {
      title: <Title>{t("tournaments.balls")}</Title>,
      render: (_, { key, name }) => (
        <FormItem key={key} name={[name, "Goals"]} rules={[{ validator: validationGoals }]}>
          <Input />
        </FormItem>
      ),
    },
    {
      title: <Title>{t("tournaments.points")}</Title>,
      render: (_, { key, name }) => (
        <FormItem key={key} name={[name, "Points"]}>
          <InputNumber min={0} />
        </FormItem>
      ),
    },
  ];
};

const Title = styled.div`
  font-weight: 600;
  min-width: 80px;
`;

const FormItem = styled(Form.Item)`
  & input.ant-input[disabled] {
    border: 0;
    box-shadow: none;
    background: transparent;
    cursor: auto;
    color: inherit;
  }

  & input.ant-input:not(:hover),
  & div.ant-input-number:not(:hover) {
    border: 0;
    box-shadow: none;
    background: transparent;
    cursor: auto;
    color: inherit;
  }
`;
