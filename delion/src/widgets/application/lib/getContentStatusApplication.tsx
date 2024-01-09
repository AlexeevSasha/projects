import { EllipsisOutlined } from '@ant-design/icons';
import { Divider, Space } from 'antd';
import type { Application } from '@entities/application';
import { ApplicationStatus } from '@entities/application';
import type { IContentStatusApplication } from '@features/application/trustee';
import { ApplicationCancel } from '@features/application/trustee';
import chernovik from '@shared/assets/trustee-status/img-chernovik.svg';
import complete from '@shared/assets/trustee-status/img-complete.svg';
import dorabotka from '@shared/assets/trustee-status/img-dorabotka.svg';
import moderation from '@shared/assets/trustee-status/img-moderation.svg';
import otkaz from '@shared/assets/trustee-status/img-otkaz.svg';
import razmeshena from '@shared/assets/trustee-status/img-razmeshena.svg';
import notuniq from '@shared/assets/trustee-status/img-uniq.svg';
import { APP_ROUTES } from '@shared/const';
import { Button, Paragraph } from '@shared/ui';
import { ApplicationFeedbackButton, ApplicationReportButton } from '../ui/ApplicationStatusButtons';
import buttonsCss from '../ui/ApplicationStatusButtons/ApplicationStatusButtons.module.scss';

export const getContentStatusApplication = (
  application: Application,
  onCancel: () => Promise<void>,
): IContentStatusApplication | null => {
  switch (application.status) {
    //Черновик
    case ApplicationStatus.DRAFT:
      return {
        title: 'Черновик',
        description: (
          <Paragraph>
            Вы создавали эту заявку, но не отправили ее, и она сохранилась как черновик. Вы можете
            продолжить ее создание с того места, где остановились
          </Paragraph>
        ),
        image_url: chernovik,
        action: (
          <Button href={APP_ROUTES.TRUSTEE_APPLICATION.toString()} type={'primary'}>
            Вернуться к заявке
          </Button>
        ),
      };
    //Ожидает модерации
    case ApplicationStatus.PRE_POSTED:
    case ApplicationStatus.WAIT_MODERATION:
      return {
        title: 'Ожидает модерации',
        description: (
          <>
            <Paragraph>
              Спасибо! Заявка успешно подана и ожидает модерации для размещения в системе. Модерация
              может занять некоторое время. Если у модератора возникнут вопросы или потребуется
              внести некоторые корректировки в заявку, она может быть направлена вам на повторную
              доработку.
            </Paragraph>
            <Paragraph>
              Каждая заявка может быть возвращена на доработку максимум два раза, после чего, если
              заявка не соответсвует всем условиям участия в акции — она будет автоматически
              отклонена.
            </Paragraph>
          </>
        ),
        image_url: moderation,
        titleIcon: <ApplicationCancel onCancel={onCancel} button={<EllipsisOutlined />} />,
      };
    case ApplicationStatus.ERROR:
      return {
        title: 'Заявка неуникальна',
        description: (
          <Paragraph>
            Один или несколько мечтателей, указанных в заявке, уже фигурирует в другой заявке. По
            условиям участия в акции на мечтателя можно заполнить только одну анкету.
          </Paragraph>
        ),

        image_url: notuniq,
        action: (
          <Button href={APP_ROUTES.TRUSTEE_APPLICATION.toString()} type={'primary'}>
            Отредактировать заявку
          </Button>
        ),
      };
    //Требуется доработка
    case ApplicationStatus.NEED_REVISION:
      return {
        title: 'Требуется доработка',
        description: (
          <>
            <Paragraph>Ваша заявка отправлена на повторную доработку.</Paragraph>
            <Paragraph>
              Скорректируйте заявку! Заявка не будет допущена к участию в акции без внесения
              корректировок.
            </Paragraph>
          </>
        ),
        image_url: dorabotka,
        titleIcon: <ApplicationCancel onCancel={onCancel} button={<EllipsisOutlined />} />,
        action: (
          <Button href={APP_ROUTES.TRUSTEE_APPLICATION.toString()} type={'primary'}>
            Редактировать заявку
          </Button>
        ),
      };
    //Отклонена
    case ApplicationStatus.REJECTED:
      return {
        title: 'Отклонена',
        description: (
          <Paragraph>
            К сожалению, Ваша заявка была отклонена. С причиной отклонения можно ознакомиться ниже
          </Paragraph>
        ),
        image_url: otkaz,
        errors: [
          'Вы более двух раз отправляли заявку на доработку, данные в заявке не соответствуют  условиям участия в акции',
        ],
      };
    //Размещена
    case ApplicationStatus.POSTED:
    case ApplicationStatus.TAKEN_FOR_EXECUTION:
    case ApplicationStatus.IN_EXECUTE:
      return {
        title: 'Размещена',
        description: (
          <>
            <Paragraph>
              Ваша заявка принята к участию в акции. При этом, мы не гарантируем, что все заявки
              будут исполнены. Если исполнитель выберет вашу заявку — он с вами свяжется и
              постарается реализовать желание, максимально приближенное к загаданному в заявке.
            </Paragraph>
            <Paragraph>
              Убедительно просим вас соблюдать правила этики и не просить исполнить дополнительные
              желания. При не соблюдении таких правил мы будем вынуждены ограничить ваше участие.
            </Paragraph>
          </>
        ),
        image_url: razmeshena,
        action: (
          <ApplicationReportButton isView={!!application.report_text} title={'Желание исполнено'} />
        ),
      };
    //Исполнена
    case ApplicationStatus.EXECUTED:
      return {
        title: 'Исполнена',
        description: (
          <Paragraph>
            Благодарим вас за участие в акции! Будем рады видеть вас в других наших проектах и
            акциях, о которых вы сможете узнать в наших социальных сетях.
          </Paragraph>
        ),
        image_url: complete,
        action: (
          <Space className={buttonsCss.container}>
            <ApplicationFeedbackButton trustee_feedback={application.trustee_feedback} />
            <Divider className={buttonsCss.container__divider} type='vertical' />
            <ApplicationReportButton
              isView={!!application.report_text}
              title={'Прикрепить отчет'}
            />
          </Space>
        ),
      };

    default:
      return null;
  }
};
