import type { ReactElement } from 'react';
import { useMemo } from 'react';
import { Col, Row, Space } from 'antd';
import { DreamerWishType, type Dreamer } from '@entities/dreamer';
import { DisclaimerMessage } from '@shared/ui';
import type { ExtendedButtonProps } from '@shared/ui/Button/Button';
import { Button } from '@shared/ui/Button/Button';
import { DreamersAccordionInterests } from '../DreamersAccordionInterests/DreamersAccordionInterests';
import { DreamersAccordionNosologoies } from '../DreamersAccordionNosologies/DreamersAccordionNosologies';
import { DreamersMetaList } from '../DreamersMetaList/DreamersMetaList';
import { DreamersWish } from '../DreamersWish/DreamersWish';
import css from './DreamersAccordionContent.module.scss';

type AccordionContentProps = Dreamer & {
  wishIcon?: ReactElement;
  isActive?: boolean;
  actions: ExtendedButtonProps[] | null;
};

export const DreamersAccordionContent = (props: AccordionContentProps) => {
  const {
    interest,
    nosology,
    isDreamExecuted,
    achievements,
    participation_experience,
    cherished_desire,
    short_dream_description,
    present_title,
    wishIcon,
    present_link_1,
    present_link_2,
    isActive,
    dream_category,
    actions,
  } = props;

  const interests = useMemo(() => {
    if (!interest?.length) {
      return null;
    }

    return <DreamersAccordionInterests interest={interest} />;
  }, [interest]);

  const nosologies = useMemo(() => {
    if (!nosology?.length) {
      return null;
    }

    return <DreamersAccordionNosologoies nosology={nosology} />;
  }, [nosology]);

  const disclaimer = useMemo(() => {
    if (isDreamExecuted && isActive) {
      return (
        <DisclaimerMessage
          color='warning'
          disclaimer='Не забудьте прикрепить отчет об исполнении желания!'
        />
      );
    }

    return null;
  }, [isActive, isDreamExecuted]);

  const dreamerList = useMemo(() => {
    const dataSource = [
      { title: 'Опыт участия в проектах и конкурсах', value: participation_experience },
      { title: 'Достижения мечтателя', value: achievements },
      { title: 'Как у мечтателя возникло заветное желание', value: cherished_desire },
    ];

    return <DreamersMetaList dataSource={dataSource} />;
  }, [achievements, cherished_desire, participation_experience]);

  const dreamerWish = useMemo(() => {
    const wishInfo = {
      [DreamerWishType.MATERIAL]: {
        title: present_title,
        links: [present_link_1, present_link_2],
      },
      [DreamerWishType.NON_MATERIAL]: {
        title: short_dream_description,
        links: [present_link_1, present_link_2],
      },
      [DreamerWishType.SUPRISE]: {
        title: 'Мечтает о подарке-сюрпризе',
        description:
          'В рамках акции можно не загадывать конкретное желание и выбрать категорию «Сюрприз»',
      },
    };
    return <DreamersWish {...wishInfo[dream_category?.type]} wishIcon={wishIcon} />;
  }, [
    dream_category?.type,
    present_link_1,
    present_link_2,
    present_title,
    short_dream_description,
    wishIcon,
  ]);

  const itemActions = useMemo(() => {
    if (!actions) {
      return null;
    }

    return (
      <Col span={24}>
        <Space styles={{ item: { width: '100%' } }}>
          {actions.map((item, index) => (
            <Button {...item} key={index}>
              {item.title}
            </Button>
          ))}
        </Space>
      </Col>
    );
  }, [actions]);

  return (
    <Row gutter={[0, 24]} className={css.content}>
      <Col span={24}>
        <Space wrap>
          {nosologies}
          {interests}
        </Space>
      </Col>
      {disclaimer && <Col span={24}>{disclaimer}</Col>}
      {dreamerList && <Col span={24}>{dreamerList}</Col>}
      {dreamerWish && <Col span={24}>{dreamerWish}</Col>}
      {itemActions}
    </Row>
  );
};
