import { Col, Input, InputNumber, Row, Space } from 'antd';
import type { NamePath } from 'antd/lib/form/interface';
import type { Dreamer } from '@entities/dreamer';
import { InformationBox, TitleWithInputBox } from '@features/moderator';
import { NonMaterialWishIcon, SurpriseWishIcon } from '@shared/assets';
import { Button, Paragraph, TrafficLightInput } from '@shared/ui';
import { ModeratorPopover } from '@widgets/moderator/dreamer/ModeratorPopover';
import css from './DreamerWishType.module.scss';

interface IProps {
  dreamer: Dreamer;
  name: NamePath;
}

export const MaterialWish = ({ dreamer, name }: IProps) => {
  return (
    <Space size={'middle'} direction={'vertical'}>
      <TitleWithInputBox
        isListField
        strong
        title={'Желание мечтателя'}
        input={<TrafficLightInput popover={<ModeratorPopover name={'wish_dreamer'} />} />}
        name={[name, 'dream_mark']}
        rules={[{ required: true, message: 'Это поле обязательно' }]}
      />
      <InformationBox
        title={'Подкатегория'}
        description={dreamer.dream_category.label}
        catalogue={'DreamCategory'}
        name={[name, 'dream_category']}
        popover={<ModeratorPopover name={'material_gift'} />}
      />

      <InformationBox
        title={'Ссылка на подарок из первого источника'}
        description={
          <Button textLink type={'text'} href={dreamer.present_link_1} target={'_blank'}>
            {dreamer.present_link_1}
          </Button>
        }
        catalogue={'PresentLink'}
        name={[name, 'present_link_1']}
        popover={<ModeratorPopover name={'link_material_gift'} />}
      />
      <InformationBox
        title={'Ссылка на подарок из второго источника'}
        description={
          <Button textLink type={'text'} href={dreamer.present_link_2} target={'_blank'}>
            {dreamer.present_link_2}
          </Button>
        }
        catalogue={'PresentLink'}
        name={[name, 'present_link_2']}
        popover={<ModeratorPopover name={'link_material_gift'} />}
      />

      <TitleWithInputBox
        name={[name, 'present_title']}
        input={<Input maxLength={200} size={'middle'} placeholder={'Название подарка'} />}
        title={'Название подарка'}
        rules={[{ required: true, message: 'Это поле обязательно' }]}
        isBackground
        popover={<ModeratorPopover name={'name_material_gift'} />}
      />
      <TitleWithInputBox
        input={
          <InputNumber
            style={{ width: '100%' }}
            size={'middle'}
            placeholder={'Стоимость подарка'}
          />
        }
        title={'Стоимость подарка'}
        name={[name, 'price']}
        rules={[
          { required: true, message: 'Это поле обязательно' },
          {
            message: 'Допустимая стоимость подарка от 500 до 99 999 рублей',
            validator: (_, value) => {
              if (value >= 500 && value <= 99999) {
                return Promise.resolve();
              } else {
                return Promise.reject();
              }
            },
          },
        ]}
        isBackground
        popover={<ModeratorPopover name={'price_material_gift'} />}
      />
    </Space>
  );
};

export const NoMaterialWish = ({ dreamer, name }: IProps) => {
  return (
    <Space size={'middle'} direction={'vertical'}>
      <TitleWithInputBox
        strong
        title={'Желание мечтателя'}
        input={<TrafficLightInput popover={<ModeratorPopover name={'wish_dreamer'} />} />}
        name={[name, 'dream_mark']}
        rules={[{ required: true, message: 'Это поле обязательно' }]}
      />
      <InformationBox
        title={'Категория желания'}
        description={
          <Space align={'center'}>
            <div className={css.icon}>
              <NonMaterialWishIcon width={20} height={20} />
            </div>
            <span>Нематериальное</span>
          </Space>
        }
      />
      <InformationBox title={'Подкатегория'} description={dreamer.dream_category.label} />
      <InformationBox title={'Тематика желания'} description={dreamer.theme.label} />
      <InformationBox
        title={'Детализация тематики желания'}
        description={dreamer.theme_specification.label}
        catalogue={'ThemeSpecification'}
        name={[name, 'theme_specification']}
        popover={<ModeratorPopover name={'theme_specification'} />}
      />
      <InformationBox title={'Описание желания'} description={dreamer.dream_description} />
      <TitleWithInputBox
        title={'Отредактируйте описание желания согласно правилам'}
        name={[name, 'short_dream_description']}
        input={
          <Input.TextArea
            maxLength={250}
            autoSize
            size={'middle'}
            placeholder={'Описание желания'}
          />
        }
        rules={[{ required: true, message: 'Это поле обязательно' }]}
        isBackground
        popover={<ModeratorPopover name={'description_nomaterial_wish'} />}
      />
      <InformationBox
        title={'Дополнительно можете указать ссылку на мечту'}
        description={
          <Button textLink type={'text'} href={dreamer.present_link_1} target={'_blank'}>
            {dreamer.present_link_1}
          </Button>
        }
      />
      <TitleWithInputBox
        isListField
        input={
          <InputNumber
            style={{ width: '100%' }}
            size={'middle'}
            placeholder={'Стоимость подарка'}
          />
        }
        title={'Стоимость нематериального желания'}
        name={[name, 'price']}
        rules={[
          { required: true, message: 'Это поле обязательно' },
          {
            message: 'Допустимая стоимость подарка от 500 до 999 999 рублей',
            validator: (_, value) => {
              if (value >= 500 && value <= 999999) {
                return Promise.resolve();
              } else {
                return Promise.reject();
              }
            },
          },
        ]}
        isBackground
        popover={<ModeratorPopover name={'price_nomaterial_wish'} />}
      />
    </Space>
  );
};
export const SurpriseWish = () => {
  return (
    <div className={css.surprise}>
      <Row gutter={16} align={'middle'}>
        <Col span={15}>
          <Paragraph level={4} strong>
            Желание мечтателя
          </Paragraph>
        </Col>
        <Col span={9}>
          <Space className={css.surprise__dream} align={'center'}>
            <div className={css.icon}>
              <SurpriseWishIcon width={20} height={20} />
            </div>
            <span>Мечтает о подарке-сюрпризе</span>
          </Space>
        </Col>
      </Row>
    </div>
  );
};
