import { useEffect, useState } from 'react';
import type { FormInstance } from 'antd';
import { Col, Form, Grid, Modal, Row, Space } from 'antd';
import cx from 'classnames';
import { observer } from 'mobx-react';
import type { DefaultOptionType } from 'rc-select/lib/Select';
import type { PartnerApplicationsForm } from '@entities/application/model/application';
import { DreamerWishType } from '@entities/dreamer';
import type { PartnerDreamCategory } from '@features/application/partner';
import { partnerFilterNames } from '@features/application/partner';
import { DadataAutoComplete } from '@features/dadata';
import { DREAM_CATEGORIES_OPTIONS, ORGANIZATIONS_OPTIONS, ORPHANAGE_OPTIONS } from '@shared/const';
import { useStores } from '@shared/lib';
import { Button, Divider, MinMaxNumberInput, Select } from '@shared/ui';
import css from './PatrnerFiltersModal.module.scss';

type TPartnerFiltersModalProps = {
  isOpened: boolean;
  onCancel(): void;
  onReset(): void;
  form: FormInstance<PartnerApplicationsForm>;
  onFilterSave: () => void;
  dreamCategory: PartnerDreamCategory | undefined;
  setDreamCategory: (category: PartnerDreamCategory | undefined) => void;
};

const SHARED_NUMBER_INPUT_PROPS = {
  min: 0,
  controls: false,
};

export const PartnerFiltersModal = observer((props: TPartnerFiltersModalProps) => {
  const breakpoints = Grid.useBreakpoint();
  const { catalogueS } = useStores();
  const { isOpened, onCancel, onReset, form, onFilterSave, setDreamCategory, dreamCategory } =
    props;
  const [themes, setThemes] = useState<Option[]>([]);

  const { getDreamApplicationThemes } = catalogueS.request;

  const nonMaterialDisableCondition =
    dreamCategory?.type !== DreamerWishType.NON_MATERIAL &&
    dreamCategory?.type !== DreamerWishType.MIXED;
  const materialDisableCondition =
    dreamCategory?.type !== DreamerWishType.MATERIAL &&
    dreamCategory?.type !== DreamerWishType.MIXED;

  useEffect(() => {
    getDreamApplicationThemes.request().then((res) => {
      setThemes(res?.data || []);
    });
  }, []);

  useEffect(() => {
    if (!catalogueS?.dreamCategories) {
      catalogueS.getDreamCategories();
    }
  }, [catalogueS]);

  const onResetFiltersButtonClick = () => {
    onReset();
    onCancel();
  };

  const resetDreamCategoriesFields = () => {
    form.resetFields([
      partnerFilterNames.material_dream_category,
      partnerFilterNames.no_material_dream_category,
      partnerFilterNames.theme,
    ]);
  };

  const onSelectChange = (name: string, option: DefaultOptionType | DefaultOptionType[]) => {
    if (Array.isArray(option)) return;

    if (!option || !option.value || !option.label) {
      form.resetFields([name]);
      return;
    }

    form.setFieldValue(name, option);
  };

  return (
    <Modal
      title={breakpoints.xs ? 'Фильтры' : 'Настройки фильтров'}
      open={isOpened}
      centered={!breakpoints.xs}
      width={breakpoints.xs ? '100%' : 728}
      className={cx(css.modal, { [css.isMobile]: breakpoints.xs })}
      onCancel={onCancel}
      footer={
        <Space
          style={{
            flexDirection: breakpoints.xs ? 'column-reverse' : 'row',
            justifyContent: 'flex-end',
          }}
          styles={{ item: { width: breakpoints.xs ? '100%' : '200px' } }}
          direction={breakpoints.xs ? 'vertical' : 'horizontal'}
          size={12}
        >
          <Button fullWidth type='default' onClick={onResetFiltersButtonClick}>
            Сбросить фильтр
          </Button>
          <Button fullWidth type='primary' onClick={onFilterSave}>
            Применить фильтр
          </Button>
        </Space>
      }
    >
      <>
        <Divider marginBottom={24} />
        <Form
          form={form}
          className={css.form}
          layout='vertical'
          scrollToFirstError
          labelAlign='left'
        >
          <Row gutter={[16, 0]} align={'middle'}>
            <Col xs={24} sm={12}>
              <DadataAutoComplete
                form={form}
                name={partnerFilterNames.region}
                placeholder='Все'
                label='Регион и населённый пункт'
              />
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label='Категория желаний в заявке'
                name={partnerFilterNames.dream_category_type}
              >
                <Select
                  allowClear
                  showSearch
                  placeholder='Все'
                  options={DREAM_CATEGORIES_OPTIONS}
                  onChange={(_, option) => {
                    if (Array.isArray(option)) return;

                    onSelectChange(partnerFilterNames.dream_category_type, option);
                    resetDreamCategoriesFields();

                    if (option && typeof option.value === 'number') {
                      setDreamCategory({
                        type: option.value,
                        value: option.value,
                        label: option.label ? option.label.toString() : '',
                      });
                      return;
                    }
                    setDreamCategory(undefined);
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Divider marginBottom={16} />
          <Row gutter={[16, 0]} align={'middle'}>
            <Col xs={24} sm={12}>
              <Form.Item
                label='Подкатегория для материального желания'
                name={partnerFilterNames.material_dream_category}
              >
                <Select
                  allowClear
                  showSearch
                  disabled={materialDisableCondition}
                  placeholder='Все'
                  options={catalogueS.dreamCategories?.filter(
                    (x) => x.type === DreamerWishType.MATERIAL,
                  )}
                  onChange={(_, option) =>
                    onSelectChange(partnerFilterNames.material_dream_category, option)
                  }
                />
              </Form.Item>
            </Col>
          </Row>
          <Divider marginBottom={16} />
          <Row gutter={[16, 0]} align={'middle'}>
            <Col xs={24} sm={12}>
              <Form.Item
                label='Подкатегория для нематериального желания'
                name={partnerFilterNames.no_material_dream_category}
              >
                <Select
                  allowClear
                  showSearch
                  placeholder='Все'
                  disabled={nonMaterialDisableCondition}
                  options={catalogueS.dreamCategories?.filter(
                    (x) => x.type === DreamerWishType.NON_MATERIAL,
                  )}
                  onChange={(_, option) =>
                    onSelectChange(partnerFilterNames.no_material_dream_category, option)
                  }
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label='Тематика для нематериального желания'
                name={partnerFilterNames.theme}
              >
                <Select
                  allowClear
                  showSearch
                  placeholder='Все'
                  disabled={nonMaterialDisableCondition}
                  loading={!themes}
                  options={themes}
                  onChange={(_, option) => onSelectChange(partnerFilterNames.theme, option)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Divider marginBottom={16} />
          <Row gutter={[16, 0]} align={'middle'}>
            <Col xs={24} sm={12}>
              <MinMaxNumberInput
                label='Число мечтателей в заявке'
                minInput={{
                  name: partnerFilterNames.dreamers_count_min,
                  ...SHARED_NUMBER_INPUT_PROPS,
                }}
                maxInput={{
                  name: partnerFilterNames.dreamers_count_max,
                  ...SHARED_NUMBER_INPUT_PROPS,
                }}
              />
            </Col>
            <Col xs={24} sm={12}>
              <MinMaxNumberInput
                label='Стоимость подарка (в рублях)'
                minInput={{
                  name: partnerFilterNames.amount_min,
                  ...SHARED_NUMBER_INPUT_PROPS,
                }}
                maxInput={{
                  name: partnerFilterNames.amount_max,
                  ...SHARED_NUMBER_INPUT_PROPS,
                }}
              />
            </Col>
          </Row>
          <Divider marginBottom={16} />
          <Row gutter={[16, 0]} align={'middle'}>
            <Col xs={24} sm={12}>
              <Form.Item
                label='Через организаторов'
                name={partnerFilterNames.is_available_delivery}
              >
                <Select
                  allowClear
                  showSearch
                  placeholder='Все'
                  options={ORGANIZATIONS_OPTIONS}
                  onChange={(_, option) =>
                    onSelectChange(partnerFilterNames.is_available_delivery, option)
                  }
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label='Детский дом' name={partnerFilterNames.orphanage}>
                <Select
                  allowClear
                  showSearch
                  placeholder='Все'
                  options={ORPHANAGE_OPTIONS}
                  onChange={(_, option) => onSelectChange(partnerFilterNames.orphanage, option)}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </>
    </Modal>
  );
});
