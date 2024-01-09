import type { ReactNode } from 'react';
import { Space } from 'antd';
import pinkNote from '@shared/assets/pink-note.png';
import psychologyConclusion from '@shared/assets/psychology-conclusion.jpg';
import { Divider, FileListHint, Hint, Paragraph, StatusHint } from '@shared/ui';

export const getDreamerCategoryHint = (categoryId: number | undefined): ReactNode[] => {
  switch (categoryId) {
    case 1:
      return [
        <FileListHint
          key={'disabilities-conclusion-hint'}
          files={[
            {
              image: psychologyConclusion,
              description:
                'Фотография или скан заключения психолого-медико-педагогической комиссии, выданного не ранее августа 2022 года. Оно может выглядеть так',
            },
          ]}
        />,
        <StatusHint
          key={'disabilities-conclusion-info-hint'}
          status={'warning'}
          text='Обращаем ваше внимание на то, что документ должен быть хорошего качества, заверен подписью и/или печатью и содержать в себе информацию о ФИО, дате рождения участника, номере документа. Также просим вас проверить срок годности документа.'
        />,
      ];
    case 2:
      return [
        <FileListHint
          key={'disability-note-hint'}
          files={[
            {
              image: pinkNote,
              description:
                'Розовая справка может выглядеть так. Запросите ее в поликлинике по месту прописки, если ее нет на руках',
            },
          ]}
        />,
        <StatusHint
          key={'disability-mse-hint'}
          status={'warning'}
          text='Справка МСЭ должна быть актуальной на день подачи заявки и заверена подписью и/или печатью'
        />,
        <StatusHint
          key={'disability-files-hint'}
          status={'warning'}
          text='Обращаем ваше внимание на то, что документ должен быть хорошего качества, заверен подписью и/или печатью и содержать в себе информацию о ФИО, дате рождения участника, номере документа. Также просим вас проверить срок годности документа.'
        />,
      ];
    case 3:
      return [
        <StatusHint
          key={'ill-note-hint'}
          title='Какие справки подтверждают диагноз?'
          text='Фотография или скан любой справки, которая подтверждает, что у ребенка диагноз, входящий в Международную классификацию болезней 10-го пересмотра (МКБ-10): С00-С96 – злокачественное новообразование со сроком после окончания основного курса лечения не более 5 лет; D66; D80 – D84; E84; D86; G12.0 – G12.1; G71.0; Q78.0; Q81; N18.0; K72.0; K72.1; K72.9; B16-B19; I42.0; I42.3; I42.4; I42.5; I25.5; I50.0; I50.1; I50.9; I97.1; T86.0 –T86.4; T86.8; T86.9; Z99.2).'
        />,
        <StatusHint
          key={'ill-files-hint'}
          status={'warning'}
          text='Обращаем ваше внимание на то, что документ должен быть хорошего качества, заверен подписью и/или печатью и содержать в себе информацию о ФИО, дате рождения участника, номере документа. Также просим вас проверить срок годности документа.'
        />,
      ];
    case 4:
      return [
        <Hint
          style={{ backgroundColor: 'white' }}
          key={'orphan-hint'}
          title='Можно загрузить фотографию или скан одного из следующих документов:'
        >
          <Space size={16} direction={'vertical'} split={<Divider />}>
            <Paragraph level={6}>
              Cправка из отдела опеки и попечительства о том, что ребенок относится к категории
              детей-сирот и детей, оставшихся без попечения родителей
            </Paragraph>
            <Paragraph level={6}>Постановление о назначении опекунства</Paragraph>
            <Paragraph level={6}>Опекунское удостоверение</Paragraph>
            <Space size={16} direction={'vertical'} align='start'>
              <Paragraph level={6}>
                Свидетельство о смерти обоих родителей или документы, подтверждающие смерть одного
                из родителей и отсутствие второго родителя или отсутствие обоих родителей в связи с:
              </Paragraph>
              <Space align='start'>
                <span>•</span>
                <Paragraph level={6}>
                  Решением суда о лишении родительских прав, отобрании ребенка, признании одного или
                  обоих родителей безвестно отсутствующими, объявлении умершими, признании
                  недееспособными;
                </Paragraph>
              </Space>
              <Space align='start'>
                <span>•</span>
                <Paragraph level={6}>
                  Приговором или решением суда об осуждении одного или обоих родителей; документы об
                  отбывании наказания одного или обоих родителей в исправительных учреждениях (за
                  последний год) или содержании их под стражей в период следствия;
                </Paragraph>
              </Space>
              <Space align='start'>
                <span>•</span>
                <Paragraph level={6}>
                  Розыском одного или обоих родителей, не установлением сведений об их
                  местонахождении.
                </Paragraph>
              </Space>
            </Space>
          </Space>
        </Hint>,
        <StatusHint
          key={'orphan-warning'}
          status={'warning'}
          text='Свидетельство об усыновлении или удочерении не подтверждает эту категорию'
        />,
      ];
    case 5:
      return [
        <StatusHint
          key={'file-hint'}
          title='Можно загрузить фотографию или скан одного из следующих документов, выданных не ранее сентября 2022 года:'
        >
          <Space size={16} direction={'vertical'} split={<Divider />}>
            <Paragraph level={6}>Справка о признании семьи малоимущей/малообеспеченной</Paragraph>
            <Paragraph level={6}>
              Справка о назначении государственной социальной помощи (ежемесячные выплаты по уходу
              за ребенком от 3 до 7 лет, от 8 до 17 лет)
            </Paragraph>
            <Paragraph level={6}>
              Справка о наличии среднедушевого дохода семьи ниже величины прожиточного минимума.
            </Paragraph>
          </Space>
        </StatusHint>,
        <StatusHint
          key={'orphan-warning'}
          status={'warning'}
          text='Cправка или удостоверение о многодетности не подтверждает эту категорию.'
        />,
        <StatusHint
          key={'orphan-warning'}
          status={'warning'}
          text='Обращаем ваше внимание на то, что документ должен быть хорошего качества, заверен подписью и/или печатью и содержать в себе информацию о ФИО, дате рождения участника, номере документа. Также просим вас проверить срок годности документа.'
        />,
      ];
    case 6:
      return [
        <StatusHint
          key={'svo-warning'}
          status={'warning'}
          text='Обращаем ваше внимание на то, что в данном разделе необходимо заполнить информацию о родителе, пребывающем за пределами специальной военной операции'
        />,
      ];
    case 7:
      return [
        <StatusHint
          key={'is-danbas'}
          title='Можно загрузить фотографию или скан одного из следующих документов:'
        >
          <Space direction={'vertical'} split={<Divider />}>
            <Paragraph level={6}>
              Справка о регистрации по месту жительства (на территории Донецкой и Луганской Народных
              Республик, Запорожской и Херсонской областей)
            </Paragraph>
            <Paragraph level={6}>Адресная справка (справка о постоянной прописке)</Paragraph>
            <Paragraph level={6}>Страница паспорта с пропиской</Paragraph>
          </Space>
        </StatusHint>,
      ];
    default:
      return [
        <Hint
          key={'default-hint'}
          title={'Выберите категорию'}
          description={'Чтобы приложить документы надо сначала выбрать категорию мечтателя'}
        />,
      ];
  }
};
