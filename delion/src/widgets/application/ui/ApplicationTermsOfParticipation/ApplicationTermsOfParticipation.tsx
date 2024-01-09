import type { Dispatch, FC, SetStateAction } from 'react';
import React, { useState } from 'react';
import { Checkbox, Grid, Modal, Space, Typography } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useRouter } from 'next/router';
import { NextIcon, NumberIcon, PrevIcon } from '@shared/assets';
import { ApplicationTermsNumbersIcon } from '@shared/assets/icons/ApplicationTermsNumbersIcon';
import { DrawerCloseIcon } from '@shared/assets/icons/CloseIcon';
import { APP_ROUTES } from '@shared/const';
import { useStores } from '@shared/lib';
import { Button, Divider, Paragraph } from '@shared/ui';
import { CustomButton } from '@shared/ui/LegacyInput/CustomButton';
import css from './ApplicationTermsOfParticipation.module.scss';

interface Props {
  isOpenModal: boolean;
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
}

interface ApplicationTermsOfParticipation {
  title: string;
  content: React.ReactNode;
  footer: React.ReactNode;
}

export const ApplicationTermsOfParticipation: FC<Props> = ({ isOpenModal, setIsOpenModal }) => {
  const { trusteeS } = useStores();
  const { push } = useRouter();

  const breakpoints = Grid.useBreakpoint();
  const isDesktop = breakpoints.md;

  const [currentStep, setStep] = useState<number>(0);

  const listTextStyle = {
    fontSize: '14px',
  };

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (e: CheckboxChangeEvent) => {
    setIsChecked(e.target.checked);
  };

  const PrevButton: FC = () => (
    <CustomButton
      type='default'
      onClick={() => setStep(currentStep - 1)}
      icon={<PrevIcon />}
      title='Назад'
    />
  );
  const NextButton: FC = () => (
    <CustomButton
      type='primary'
      onClick={() => setStep(currentStep + 1)}
      icon={<NextIcon />}
      iconPosition='after'
      title='Далее'
    />
  );

  const CreateDreamButton: FC<{ isChecked: boolean }> = ({ isChecked }) => (
    <CustomButton
      type={isChecked ? 'primary' : 'default'}
      disabled={!isChecked}
      onClick={() => {
        if (isChecked) {
          trusteeS
            .createApplication({ agree_with_pd: true })
            .then(() => push(APP_ROUTES.TRUSTEE_APPLICATION));
        }
      }}
      icon={<NextIcon />}
      iconPosition='after'
      title='Создать заявку'
    />
  );

  const states: ApplicationTermsOfParticipation[] = [
    {
      title: 'О Ёлке желаний',
      content: (
        <Space direction='vertical' size={16}>
          <Paragraph level={isDesktop ? 4 : 5}>
            Цель проекта – подарить радость и ощущение новогоднего волшебства детям, оказавшимся в
            трудной жизненной ситуации. Благодаря акции граждане, которые хотят совершить добрый
            поступок, могут найти тех, кто нуждается в помощи, и исполнить их новогодние желания.
          </Paragraph>
          <Paragraph level={isDesktop ? 4 : 5}>
            Исполнители — это обычные люди. У них разный доход и положение в обществе, но их
            объединяет стремление помочь людям. Они регистрируются на сайте и выбирают те желания,
            которые могут исполнить. По этой причине мы не гарантируем, что все заявки будут
            реализованы.
          </Paragraph>
        </Space>
      ),
      footer: (
        <Space>
          <NextButton />
        </Space>
      ),
    },
    {
      title: 'Кто может принять участие в акции?',
      content: (
        <Space direction='vertical'>
          <Paragraph level={isDesktop ? 4 : 5}>
            В акции могут принять участие дети в возрасте от 3 до 17 лет включительно, подходящие
            под одну из следующих категорий:
          </Paragraph>
          <Space direction='horizontal'>
            <ApplicationTermsNumbersIcon type={1} />
            <Paragraph style={listTextStyle}>
              Дети с ограниченными возможностями здоровья, инвалидностью или с состоянием здоровья,
              угрожающим жизни
            </Paragraph>
          </Space>
          <Space direction='horizontal'>
            <ApplicationTermsNumbersIcon type={2} />
            <Paragraph style={listTextStyle}>
              Дети-сироты и дети, которые остались без попечения родителей
            </Paragraph>
          </Space>
          <Space direction='horizontal'>
            <ApplicationTermsNumbersIcon type={3} />
            <Paragraph style={listTextStyle}>
              Дети из семей с доходом ниже прожиточного минимума
            </Paragraph>
          </Space>
          <Space direction='horizontal'>
            <ApplicationTermsNumbersIcon type={4} />
            <Paragraph style={listTextStyle}>
              Дети из семей военнослужащих и (или) мобилизованных, принимающих либо принимавших
              участие в специальной военной операции
            </Paragraph>
          </Space>
          <Space direction='horizontal'>
            <ApplicationTermsNumbersIcon type={5} />
            <Paragraph style={listTextStyle}>
              Дети проживающие и зарегистрированные на территории Донецкой и Луганской Народных
              Республик, Запорожской и Херсонской областей
            </Paragraph>
          </Space>
        </Space>
      ),
      footer: (
        <Space>
          <PrevButton />
          <NextButton />
        </Space>
      ),
    },
    {
      title: 'Какие желания могут быть исполнены?',
      content: (
        <Space direction='vertical'>
          <Space direction='horizontal'>
            <ApplicationTermsNumbersIcon type={1} />
            <Paragraph style={listTextStyle}>
              Материальные желания, например игрушки, товары для хобби, развивающие материалы,
              книги, одежда и наряды, спортивный инвентарь или музыкальные инструменты
            </Paragraph>
          </Space>
          <Space direction='horizontal'>
            <ApplicationTermsNumbersIcon type={2} />
            <Paragraph style={listTextStyle}>
              Нематериальные желания в категориях: роль, цель, встреча и поездка
            </Paragraph>
          </Space>
          <Space direction='horizontal'>
            <ApplicationTermsNumbersIcon type={3} />
            <Paragraph style={listTextStyle}>
              В этом году появилась возможность не загадывать конкретный подарок, а оставить место
              для настоящего новогоднего чуда. Расскажите об увлечениях и интересах мечтателя как
              можно подробнее и выберите категорию «Сюрприз». В таком случае исполнитель сам сможет
              выбрать подарок, опираясь на информацию о мечтателе.
            </Paragraph>
          </Space>
        </Space>
      ),
      footer: (
        <Space>
          <PrevButton />
          <NextButton />
        </Space>
      ),
    },
    {
      title: 'Какие желания НЕЛЬЗЯ загадать в акции?',
      content: (
        <Space direction='vertical'>
          <Paragraph level={isDesktop ? 4 : 5}>
            У акции «Ёлка желаний» есть свои ограничения — так же как они есть у других акций
          </Paragraph>
          <Space direction='horizontal'>
            <ApplicationTermsNumbersIcon type={1} />
            <Paragraph style={listTextStyle}>
              Прохождение лечения и предоставление медицинских услуг
            </Paragraph>
          </Space>
          <Space direction='horizontal'>
            <ApplicationTermsNumbersIcon type={2} />
            <Paragraph style={listTextStyle}>
              Приобретение технических средств реабилитации и абилитации
            </Paragraph>
          </Space>
          <Space direction='horizontal'>
            <ApplicationTermsNumbersIcon type={3} />
            <Paragraph style={listTextStyle}>
              Приобретение специализированного медицинского оборудования
            </Paragraph>
          </Space>
          <Space direction='horizontal'>
            <ApplicationTermsNumbersIcon type={4} />
            <Paragraph style={listTextStyle}>
              Приобретение недвижимости и транспортных средств
            </Paragraph>
          </Space>
          <Space direction='horizontal'>
            <ApplicationTermsNumbersIcon type={5} />
            <Paragraph style={listTextStyle}>Приобретение животных</Paragraph>
          </Space>
          <Space direction='horizontal'>
            <ApplicationTermsNumbersIcon type={6} />
            <Paragraph style={listTextStyle}>Ремонт помещений</Paragraph>
          </Space>
          <Space direction='horizontal'>
            <ApplicationTermsNumbersIcon type={7} />
            <Paragraph style={listTextStyle}>
              Приобретение бытовой техники, домашней/ офисной/ садовой мебели и другое
            </Paragraph>
          </Space>
        </Space>
      ),
      footer: (
        <Space>
          <PrevButton />
          <NextButton />
        </Space>
      ),
    },
    {
      title: 'Правила участия в акции',
      content: (
        <Space direction='vertical'>
          <Space direction='horizontal'>
            <ApplicationTermsNumbersIcon type={1} />
            <Paragraph style={listTextStyle}>
              Участник является гражданином Российской Федерации, имеет вид на жительство в РФ или
              проживает и зарегистрирован на территории Луганской и Донецкой Народных Республик,
              Запорожской и Херсонской областей
            </Paragraph>
          </Space>
          <Space direction='horizontal'>
            <ApplicationTermsNumbersIcon type={2} />
            <Paragraph style={listTextStyle}>
              Возраст участника — от 3 до 17 лет включительно
            </Paragraph>
          </Space>
          <Space direction='horizontal'>
            <ApplicationTermsNumbersIcon type={3} />
            <Paragraph style={listTextStyle}>
              Загаданное желание подходит под условия акции
            </Paragraph>
          </Space>
          <Space direction='horizontal'>
            <ApplicationTermsNumbersIcon type={4} />
            <Paragraph style={listTextStyle}>
              У вас есть документ, удостоверяющий личность участника
            </Paragraph>
          </Space>
          <Space direction='horizontal'>
            <ApplicationTermsNumbersIcon type={5} />
            <Paragraph style={listTextStyle}>
              У вас есть документ, который подтверждает категорию участника
            </Paragraph>
          </Space>
          <Space direction='horizontal'>
            <ApplicationTermsNumbersIcon type={6} />
            <Paragraph style={listTextStyle}>
              У вас есть СНИЛС ребенка, от имени которого вы подаете заявку. Если вы проживаете на
              территории Донецкой и Луганской Народных Республик, Запорожской и Херсонской областей,
              вместо СНИЛС вы можете прикрепить фотографию паспорта или свидетельства о рождении
            </Paragraph>
          </Space>
        </Space>
      ),
      footer: (
        <Space>
          <PrevButton />
          <NextButton />
        </Space>
      ),
    },
    {
      title: 'О добром деле',
      content: (
        <Space direction='vertical'>
          <Paragraph level={isDesktop ? 4 : 5}>
            Новый год – время чудес, и мы предлагаем нашим мечтателям не только загадать желание, но
            и самим стать волшебником! Сделать приятное, выразить благодарность близкому человеку
            или знакомому не требует больших усилий.
          </Paragraph>
          <Paragraph level={isDesktop ? 4 : 5}>
            Предлагаем каждому ребенку в преддверии нового года запустить круговорот добра и
            совершить доброе дело на выбор. Подробнее со списком добрых дел можно ознакомиться{' '}
            <Button
              style={{ padding: 0 }}
              type='link'
              onClick={() =>
                fetch('/assets/pamyatka-dobrye-dela.pdf').then((response) => {
                  response.blob().then((blob) => {
                    let url = window.URL.createObjectURL(blob);
                    let a = document.createElement('a');
                    a.href = url;

                    a.download = 'Памятка_ЁЖ_Добрые дела.pdf';
                    a.click();
                  });
                })
              }
            >
              здесь
            </Button>
            .
          </Paragraph>
        </Space>
      ),
      footer: (
        <Space>
          <PrevButton />
          <NextButton />
        </Space>
      ),
    },
    {
      title: 'Сроки проведения акции',
      content: (
        <Space direction='vertical'>
          <Paragraph level={isDesktop ? 4 : 5}>
            Акция проводится в период с ноября 2023 года по февраль 2024 года.
          </Paragraph>
          <Paragraph level={isDesktop ? 4 : 5}>
            Сроки исполнения желаний участников, проживающих на территории новых субъектов
            Российской Федерации, могут быть увеличены.
          </Paragraph>
          <Paragraph level={isDesktop ? 4 : 5}>
            Мы стараемся найти исполнителя для каждого мечтателя, но не гарантируем реализацию всех
            желаний.
          </Paragraph>
        </Space>
      ),
      footer: (
        <Space direction='vertical' size={30}>
          <Checkbox onChange={handleCheckboxChange} checked={isChecked}>
            <Paragraph level={isDesktop ? 4 : 5}>
              Ознакомился с условиями проведения акции и{' '}
              <a href='/assets/ПОЛОЖЕНИЕ.pdf' target='_blank'>
                положением
              </a>
              . Даю согласие на{' '}
              <a href='/assets/Согласие_ЕЖ_сайт.pdf' target='_blank'>
                обработку персональных данных
              </a>{' '}
              и готов, в случае необходимости, предоставить письменное согласие по запросу
              организаторов акции.
            </Paragraph>
          </Checkbox>
          <Space direction='horizontal'>
            <PrevButton />
            <CreateDreamButton isChecked={isChecked} />
          </Space>
        </Space>
      ),
    },
  ];

  return (
    <Modal
      open={isOpenModal}
      title={null}
      centered={isDesktop}
      maskClosable={true}
      closeIcon={<DrawerCloseIcon />}
      onCancel={() => setIsOpenModal(false)}
      footer={null}
      afterClose={() => setStep(0)}
      width={isDesktop ? 1124 : 'auto'}
      rootClassName={
        isDesktop
          ? currentStep + 1 !== states.length
            ? css.wrapper_desktop
            : css.wrapper_final
          : css.wrapper_mobile
      }
    >
      <Space direction={isDesktop ? 'horizontal' : 'vertical'} size={24}>
        {currentStep !== states.length - 1 ? (
          <NumberIcon type={currentStep + 1} isBigIcon={isDesktop} />
        ) : null}
        <Space direction={'vertical'} size={24}>
          <Typography.Title level={isDesktop ? 2 : 4} className={css.title}>
            {states[currentStep]?.title}
          </Typography.Title>
          <Divider />
          {states[currentStep]?.content}
          <Divider />
          {states[currentStep]?.footer}
        </Space>
      </Space>
    </Modal>
  );
};
