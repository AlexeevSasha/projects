import { SearchOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { theme } from "assets/theme/theme";
import { FilterChangeValue, Statys } from "common/interfaces/common";
import { FieldData } from "common/interfaces/IField";
import { PlayersFilters } from "common/interfaces/players";
import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { ownTeamsOptionsSelector } from "store/dictionary/dictionarySelectors";
import { CustomDivider } from "ui/CustomDivider";
import { FiltersContainer, FormItem } from "ui/FiltersHeader";
import { SelectField } from "ui/SelectField";

interface Props {
  onChange(value: FilterChangeValue): void;
  resetFilters(): void;
}

export const ClubsPlayersFilters = memo(({ onChange, resetFilters }: Props) => {
  const { t } = useTranslation();
  const [form] = Form.useForm<PlayersFilters>();
  const teamOptions = useSelector(ownTeamsOptionsSelector);

  const statusesOptions = useMemo(
    () =>
      Object.entries(Statys)
        .splice(2, 2)
        .map(([value, label]) => ({
          label: t(`allPages.statuses.${label}`),
          value,
        })),
    []
  );

  const handleReset = () => {
    form.resetFields();
    resetFilters();
  };

  const handleChange = ([{ name, value }]: FieldData[]) => onChange({ [name.toString()]: value });

  return (
    <FiltersContainer form={form} layout="horizontal" onFieldsChange={handleChange}>
      <FormItem name="FullName">
        <Input
          name="playerFioSearch"
          placeholder={t("allPages.filters.fioSearchPlaceholder")}
          prefix={<SearchOutlined style={{ color: theme.colors.lightGray }} />}
        />
      </FormItem>

      <FormItem name="Teams/Id">
        <SelectField placeholder={t("clubsPlayers.clubsSearchPlaceholder")} options={teamOptions} />
      </FormItem>

      <FormItem name="Status">
        <SelectField placeholder={t("clubsPlayers.clubsStatusPlaceholder")} options={statusesOptions} />
      </FormItem>

      <CustomDivider type="vertical" />

      <Button onClick={handleReset}>{t("allPages.filters.clearFilters")}</Button>
    </FiltersContainer>
  );
});
