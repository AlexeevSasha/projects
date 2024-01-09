import { useLayoutEffect, useState } from 'react';
import { useForm } from 'antd/lib/form/Form';
import { observer } from 'mobx-react';
import type { PartnerApplicationsForm, TFilterTag } from '@entities/application/model/application';
import type { PartnerDreamCategory } from '@features/application/partner';
import { numberFields, partnerFilterNames } from '@features/application/partner';
import { APP_ROOT_ROUTES } from '@shared/const';
import { countNonUndefinedObjectValues, useStores } from '@shared/lib';
import { ApplicationHeader } from '@widgets/executor';
import { ApplicationPageTypes } from '@widgets/executor/model/ApplicationPageTypes';
import { ApplicationLayout } from '@widgets/layout';
import { PartnerFilters, PartnerFiltersModal, PartnerFindApplications } from '@widgets/partner';

export const PartnerFindApplicationsPage = observer(() => {
  const { partnerS } = useStores();
  const [form] = useForm();
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const onFilterButtonClick = () => {
    setIsOpened(true);
  };

  const onCancel = () => {
    setIsOpened(false);
  };

  const onFiltersSave = () => {
    const data = form.getFieldsValue() as PartnerApplicationsForm;
    form.setFieldValue(
      partnerFilterNames.dream_category,
      data.material_dream_category || data.no_material_dream_category,
    );

    if (data.amount_min && data.amount_max && data.amount_min > data.amount_max) {
      const min = data.amount_max;
      data.amount_max = data.amount_min;
      data.amount_min = min;

      form.setFieldValue(partnerFilterNames.amount_min, data.amount_min);
      form.setFieldValue(partnerFilterNames.amount_max, data.amount_max);
    }

    if (
      data.dreamers_count_min &&
      data.dreamers_count_max &&
      data.dreamers_count_min > data.dreamers_count_max
    ) {
      const min = data.dreamers_count_max;
      data.dreamers_count_max = data.dreamers_count_min;
      data.dreamers_count_min = min;

      form.setFieldValue(partnerFilterNames.dreamers_count_min, data.dreamers_count_min);
      form.setFieldValue(partnerFilterNames.dreamers_count_max, data.dreamers_count_max);
    }

    partnerS.getPublicAvailableApplication(form.getFieldsValue());
    setIsOpened(false);
  };

  const onReset = () => {
    form.resetFields();
    partnerS.clearFilterTags();
  };

  // этот хук отвечает за переход из фильтров в мои заявки
  // (если пользователь случайно перешёл - фильтры не сотрутся
  useLayoutEffect(() => {
    if (isOpened) {
      partnerS.filterTags.forEach((x) => {
        if (numberFields.includes(x.formName)) {
          form.setFieldValue(x.formName, x.value);
          return;
        }
        form.setFieldValue(x.formName, {
          value: x.value,
          label: x.label,
        });
      });
    }
  }, [isOpened]);

  const onDeleteFilterTag = (tag: TFilterTag | TFilterTag[]) => {
    if (Array.isArray(tag)) {
      tag.forEach((x) => {
        form.resetFields([x.formName]);
      });
    } else {
      form.resetFields([tag.formName]);
    }

    onFiltersSave();
  };

  const setDreamCategory = (category: PartnerDreamCategory | undefined) => {
    partnerS.setDreamCategory(category);
  };

  return (
    <>
      <ApplicationLayout
        header={
          <ApplicationHeader
            id={ApplicationPageTypes.FIND_APPLICATIONS}
            baseRoleRoute={APP_ROOT_ROUTES.PARTNER}
          />
        }
        filters={
          <PartnerFilters
            onFilterButtonClick={onFilterButtonClick}
            onDelete={onDeleteFilterTag}
            filterTags={partnerS.filterTags}
          />
        }
        content={
          <PartnerFindApplications
            filterIsEmpty={countNonUndefinedObjectValues(partnerS.filterTags)}
            onFilterButtonClick={onFilterButtonClick}
          />
        }
        contentBackground={'white'}
      />
      <PartnerFiltersModal
        form={form}
        onCancel={onCancel}
        onReset={onReset}
        isOpened={isOpened}
        onFilterSave={onFiltersSave}
        dreamCategory={partnerS.dreamCategory}
        setDreamCategory={setDreamCategory}
      />
    </>
  );
});
