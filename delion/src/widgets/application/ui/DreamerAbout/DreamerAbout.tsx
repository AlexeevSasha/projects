import { type FC } from 'react';
import type { FormInstance } from 'antd';
import { DatePicker, Flex, Form, Input, Space } from 'antd';
import type { ModerationError } from '@entities/application';
import { FormBlock, ModerationErrorHint } from '@entities/application';
import { DreamerDragger, DreamerNosologySelect } from '@features/dreamer';
import birthDoc from '@shared/assets/birth-doc.png';
import hintImage from '@shared/assets/dreamer-about-hint.svg';
import passport from '@shared/assets/passport.png';
import snils from '@shared/assets/snils.png';
import {
  Divider,
  FileListHint,
  ImageHint,
  MaskedInput,
  Paragraph,
  PopupHint,
  StatusHint,
  Upload,
} from '@shared/ui';
import css from './DreamerAbout.module.scss';

interface Props {
  form: FormInstance;
  errors?: ModerationError;
}

const DREAMER_MIN_AGE = 3;
const DREAMER_MAX_AGE = 17;

export const DreamerAbout: FC<Props> = ({ form, errors }) => {
  // const breakpoint = Grid.useBreakpoint();

  return (
    <Space size={8} direction='vertical'>
      <FormBlock
        id='is_dreamer_info'
        title='Информация о мечтателе'
        description='Укажите данные мечтателя'
        hints={
          <ImageHint
            image={hintImage}
            title='Кто такой мечтатель?'
            description='Мечтатель - это ваш ребенок или опекаемый. Информацию о его желании вы подаете в рамках акции.'
          />
        }
        titleHint={{
          title: 'Кто такой мечтатель?',
          body: (
            <ImageHint
              image={hintImage}
              description='Мечтатель - это ваш ребенок или опекаемый. Информацию о его желании вы подаете в рамках акции.'
            />
          ),
        }}
      >
        <Form.Item
          label='Фамилия'
          name={'last_name'}
          validateTrigger='onBlur'
          id='last_name'
          rules={[
            {
              max: 100,
              message: 'Поле не должно превышать 100 символов',
            },
          ]}
        >
          <Input placeholder='Иванов' />
        </Form.Item>
        <Form.Item
          rules={[
            {
              max: 100,
              message: 'Поле не должно превышать 100 символов',
            },
          ]}
          label='Имя'
          id='first_name'
          name={'first_name'}
          validateTrigger='onBlur'
        >
          <Input placeholder='Сергей' />
        </Form.Item>
        <Form.Item
          id='middle_name'
          rules={[
            {
              max: 100,
              message: 'Поле не должно превышать 100 символов',
            },
          ]}
          label='Отчество'
          name={'middle_name'}
        >
          <Input placeholder='Николаевич' />
        </Form.Item>
      </FormBlock>
      <FormBlock errors={errors?.birth_date}>
        <Form.Item
          id='birth_date'
          validateStatus={errors?.birth_date.length ? 'warning' : undefined}
          label='Дата рождения'
          name={'birth_date'}
          rules={[
            {
              validator: (_, value) => {
                if (!value) {
                  return Promise.resolve('');
                }
                const selectedDate = value.toDate();
                const currentDate = new Date();
                const age = currentDate.getFullYear() - selectedDate.getFullYear();

                if (age >= 3 && age <= 17) {
                  return Promise.resolve();
                } else {
                  return Promise.reject(
                    `Мечтатель должен быть от ${DREAMER_MIN_AGE} до ${DREAMER_MAX_AGE} лет`,
                  );
                }
              },
            },
          ]}
        >
          <DatePicker
            placeholder='Выберите дату'
            style={{ width: '100%' }}
            format={'DD.MM.YYYY'}
            inputReadOnly
          />
        </Form.Item>
        <ModerationErrorHint errors={errors?.birth_date} />
        <DreamerDragger form={form} />
        <Divider marginBottom={24} />
      </FormBlock>
      <FormBlock
        title='Свидетельство о рождении или паспорт'
        errors={errors?.document_number}
        titleHint={{
          title: ' ',
          body: (
            <Flex vertical gap={12}>
              <FileListHint
                key={'dreamerFileList'}
                files={[
                  { image: birthDoc, description: 'Свидетельство о рождении выглядит вот так' },
                  {
                    image: passport,
                    description:
                      'Если мечтателю уже 14 лет, у него есть паспорт. Пришлите первую страницу',
                  },
                ]}
              />
              <Divider />
              <StatusHint
                key={'docRuleHint'}
                status={'warning'}
                text='Здесь и далее вы можете прикреплять файлы JPG, PNG, PDF размером не более 10 МБ'
              />
            </Flex>
          ),
        }}
        hints={[
          <FileListHint
            key={'dreamerFileList'}
            files={[
              { image: birthDoc, description: 'Свидетельство о рождении выглядит вот так' },
              {
                image: passport,
                description:
                  'Если мечтателю уже 14 лет, у него есть паспорт. Пришлите первую страницу',
              },
              {
                image: snils,
                description:
                  'СНИЛС — страховое свидетельство. У некоторых он есть только в электронном виде. Получить его можно на Госуслугах',
              },
            ]}
          />,
          <StatusHint
            key={'docRuleHint'}
            status={'warning'}
            text='Здесь и далее вы можете прикреплять файлы JPG, PNG, PDF размером не более 10 МБ'
          />,
          // <StatusHint
          //   key={'consentHint'}
          //   text='Для подачи заявки требуется скачать, заполнить и подписать согласие на обработку данных, и прикрепить подписанный скан соглашения'
          // />,
          <StatusHint
            key={'nosologyHint'}
            text='Если у ребенка имеются какие-либо нарушения по здоровью, вы можете выбрать их в поле «нозология‎». Обращаем ваше внимание, что они могут быть не связаны с категорией мечтателя.'
          />,
        ]}
      >
        <Form.Item label='Серия и номер документа' className={css.documentsField}>
          <Form.Item
            id='document_number'
            rules={[
              {
                max: 20,
                // Регулярка для паспорта и св. о рождении
                // pattern:
                //   /^(M{0,3}(D?C{0,3}|C[DM])(L?X{0,3}|X[LC])(V?I{0,3}|I[VX]))(?<=.)-{0,1}[А-Я]{2}\s{0,1}\d{6}$|^\d{4} \d{6}$/,
                message: 'Проверьте формат серии и номера',
              },
            ]}
            name={'document_number'}
            style={{ flex: 1 }}
            // extra='Используйте латинские буквы для ввода римских цифр'
            validateDebounce={1000}
          >
            <Input
              placeholder='Введите серию и номер документа'
              // placeholder='IV-ЮЮ XXXXXX или XXXX XXXXXX'
            />
          </Form.Item>
          <ModerationErrorHint errors={errors?.document_number} />
          <Upload form={form} name='document_file_id' uploadName='document_file' />
        </Form.Item>
        <Form.Item
          id='nationality'
          rules={[
            {
              max: 100,
              message: 'Поле не должно превышать 100 символов',
            },
            {
              pattern: /^[А-Яа-я-\s]+$/,
              message: 'Некорректный формат',
            },
          ]}
          label={
            <Paragraph>
              Второе гражданство <Paragraph type={'secondary'}>(при наличии)</Paragraph>
            </Paragraph>
          }
          name={'nationality'}
        >
          <Input placeholder='Укажите страну' />
        </Form.Item>
        <Divider marginBottom={24} marginTop={8} />
      </FormBlock>
      <FormBlock
        title='СНИЛС'
        errors={errors?.snils_number}
        titleHint={{
          title: ' ',
          body: (
            <Flex vertical gap={12}>
              <FileListHint
                key={'dreamerFileList'}
                files={[
                  {
                    image: snils,
                    description:
                      'СНИЛС — страховое свидетельство. У некоторых он есть только в электронном виде. Получить его можно на Госуслугах',
                  },
                ]}
              />
              <Divider />
              <StatusHint
                key={'docRuleHint'}
                status={'warning'}
                text='Здесь и далее вы можете прикреплять файлы JPG, PNG, PDF размером не более 10 МБ'
              />
            </Flex>
          ),
        }}
      >
        <Form.Item label='Номер' className={css.documentsField}>
          <Form.Item id='snils_number' name={'snils_number'} style={{ flex: 1 }}>
            <MaskedInput
              mask={'000-000-000 00'}
              pattern={/^\d{3}-\d{3}-\d{3} \d{2}$/}
              placeholder='000-000-000 00'
              status={errors?.snils_number.length ? 'warning' : undefined}
            />
          </Form.Item>
          <ModerationErrorHint errors={errors?.snils_number} />
          <Upload form={form} uploadName='snils_file' name='snils_file_id' />
        </Form.Item>
      </FormBlock>
      <FormBlock
      // titleHint={{
      //   title: (
      //     <StatusHint
      //       borderless
      //       text='Для подачи заявки требуется скачать, заполнить и подписать согласие на обработку данных, и прикрепить подписанный скан соглашения'
      //     />
      //   ),
      // }}
      // title='Письменное согласие на обработку данных'
      // errors={errors?.agreement_file}
      >
        {/* <StatusHint
          status={'warning'}
          text='Обращаем ваше внимание, что оригиналы согласий необходимо направить в Движение Первых по адресу:  109028, г. Москва, ул. Земляной вал, Д. 50А, стр. 2, эт./помещ. 16/XVIII.'
        /> */}
        {/* <Form.Item className={css.documentsField}>
          <Flex vertical={!breakpoint.md} gap={12} style={{ width: '100%' }}>
            <Button
              onClick={() =>
                fetch('/assets/dreamer-application.pdf').then((response) => {
                  response.blob().then((blob) => {
                    let url = window.URL.createObjectURL(blob);
                    let a = document.createElement('a');
                    a.href = url;

                    a.download = 'Согласие_ЛК_Мечтатель.pdf';
                    a.click();
                  });
                })
              }
              type='primary'
              icon={<DownloadOutlined />}
              block
            >
              Скачать шаблон
            </Button>
            <Upload form={form} uploadName='agreement_file' name='agreement_file_id' />
            <ModerationErrorHint errors={errors?.agreement_file} />
          </Flex>
        </Form.Item> */}
        <Divider />
        <Flex gap={12}>
          <Form.Item label='Нозология' name={'nosology_ids'} style={{ width: '100%' }}>
            <DreamerNosologySelect />
          </Form.Item>
          <PopupHint
            title={
              <StatusHint
                borderless
                text='Если у ребенка имеются какие-либо нарушения по здоровью, вы можете выбрать их в поле «нозология‎». Обращаем ваше внимание, что они могут быть не связаны с категорией мечтателя.'
              />
            }
          />
        </Flex>
        <Divider />
      </FormBlock>
    </Space>
  );
};
