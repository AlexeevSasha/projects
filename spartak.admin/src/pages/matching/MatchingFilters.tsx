import { Button, DatePicker, Form, Input } from "antd";
import { FieldData } from "common/interfaces/IField";
import { StaffFilters } from "common/interfaces/staff";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { CustomDivider } from "ui/CustomDivider";
import { FiltersContainer, FormItem } from "ui/FiltersHeader";
import { SelectField } from "ui/SelectField";
import { ReloadOutlined, SearchOutlined } from "@ant-design/icons";
import { theme } from "../../assets/theme/theme";
import { useSelector } from "react-redux";
import { tournamentsOptionsSelector } from "../../store/dictionary/dictionarySelectors";
import moment from "moment";
import { FilterChangeValue } from "common/interfaces/common";

type Props = {
  onChange(value: FilterChangeValue): void;
  resetFilters(): void;
  getMatchesByClick(): void;
};

export const MatchingFilters = memo(({ onChange, resetFilters, getMatchesByClick }: Props) => {
  const tournamentOptions = useSelector(tournamentsOptionsSelector);
  const { t } = useTranslation();
  const [form] = Form.useForm<StaffFilters>();

  const handleReset = () => {
    form.resetFields();
    resetFilters();
  };

  const handleChange = ([{ name, value }]: FieldData[]) => onChange({ [name.toString()]: value });

  return (
    <FiltersContainer form={form} layout="horizontal" onFieldsChange={handleChange}>
      <FormItem name="OppositeTeam">
        <Input
          prefix={<SearchOutlined style={{ color: theme.colors.lightGray }} />}
          placeholder={t("allPages.filters.OppositeTeamSearch")}
        />
      </FormItem>

      <FormItem name="Tournament/Id">
        <SelectField placeholder={t("allPages.tournaments")} options={tournamentOptions} />
      </FormItem>

      <Form.Item name="MatchStartDateTime">
        <DatePicker.RangePicker
          placeholder={[t("allPages.filters.date.begin"), t("allPages.filters.date.end")]}
          style={{ width: "100%" }}
          disabledDate={(current) => current && current < moment().add(-1, "days")}
        />
      </Form.Item>

      <CustomDivider type="vertical" />

      <Button onClick={handleReset}>{t("allPages.filters.clearFilters")}</Button>

      <Button type={"primary"} onClick={getMatchesByClick}>
        <ReloadOutlined style={{ color: theme.colors.white }} />
        <span>{t("allPages.update")}</span>
      </Button>
    </FiltersContainer>
  );
});
