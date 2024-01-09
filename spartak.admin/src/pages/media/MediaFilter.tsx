import { SearchOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form } from "antd";
import { theme } from "assets/theme/theme";
import { FilterChangeValue } from "common/interfaces/common";
import { FieldData } from "common/interfaces/IField";
import { MatchFilters } from "common/interfaces/matches";
import { MediaType } from "common/interfaces/media";
import moment from "moment";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { CustomDivider } from "ui/CustomDivider";
import { FilterInput, FiltersContainer, FormItem } from "ui/FiltersHeader";
import { SelectField } from "ui/SelectField";
import { mediaCategoriesSelector } from "../../store/mediaCategories/mediaCategorySelectors";
import i18n from "i18next";
import { accessNames } from "common/constants/accessNames";
import { rightsSelector } from "store/auth/authSelectors";

type Props = {
  onChange(value: FilterChangeValue): void;
  resetFilters(): void;
};

export const MediaFilter = React.memo(({ onChange, resetFilters }: Props) => {
  const locale = i18n.language === "ru" ? "Ru" : "En";
  const { t } = useTranslation();
  const [form] = Form.useForm<MatchFilters>();
  const categoryOptions = useSelector(mediaCategoriesSelector)?.map((category) => ({
    value: category.Id,
    label: category.CategoryName[locale],
  }));
  const rights = useSelector(rightsSelector);

  const mediaTypeOptions = useMemo(
    () =>
      Object.values(MediaType).map((value) => ({
        value,
        label: t(`media.types.${value.toLowerCase()}`),
      })),
    []
  );

  const mediaStatusesOptions = [
    { label: t("allPages.statuses.Draft"), value: "None" },
    { label: t("allPages.statuses.Planned"), value: "Planned" },
    { label: t("allPages.statuses.Published"), value: "Published" },
  ];

  const mediaSectionsOptions = [
    { label: t("allPages.sections.Academy"), value: "Academy" },
    { label: t("allPages.sections.Site"), value: "Site" },
  ];

  const handleReset = () => {
    form.resetFields();
    resetFilters();
  };

  const handleChange = ([{ name, value }]: FieldData[]) => onChange({ [name.toString()]: value });

  return (
    <FiltersContainer form={form} layout="horizontal" onFieldsChange={handleChange}>
      <FormItem name="MediaHeader">
        <FilterInput
          name="mediaHeaderSearch"
          prefix={<SearchOutlined style={{ color: theme.colors.lightGray }} />}
          placeholder={t("media.searchByHeader")}
        />
      </FormItem>

      <FormItem name="PublishDateTime">
        <DatePicker placeholder={t("allPages.selectData")} style={{ width: "256px" }} />
      </FormItem>

      <FormItem
        name="MediaCategoryName"
        getValueFromEvent={(id) => categoryOptions?.find(({ value }) => value === id)?.label}
      >
        <SelectField placeholder={t("media.category")} options={categoryOptions || []} />
      </FormItem>

      <FormItem name="MediaType">
        <SelectField placeholder={t("media.type")} options={mediaTypeOptions} />
      </FormItem>

      <FormItem name="MediaStatus">
        <SelectField placeholder={t("allPages.filters.statusPlaceholder")} options={mediaStatusesOptions} />
      </FormItem>

      {/* Отображать фильтр только если у пользователя есть права на просмотр обоих категорий */}
      {rights.includes(accessNames.fullAccess) ||
      (rights.includes(accessNames.mediaSite) && rights.includes(accessNames.mediaAcademy)) ? (
        <FormItem name="Section">
          <SelectField placeholder={t("allPages.filters.sectionPlaceholder")} options={mediaSectionsOptions} />
        </FormItem>
      ) : null}

      <CustomDivider type="vertical" />

      <Button onClick={handleReset}>{t("allPages.filters.clearFilters")}</Button>
    </FiltersContainer>
  );
});
