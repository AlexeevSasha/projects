import { RejectApplicationReason } from '@entities/application';

export const RejectApplicationFormConfig = {
  reason: {
    name: 'reason',
    rules: [{ required: true, message: 'Пожалуйста, укажите причину' }],
    options: [
      { value: RejectApplicationReason.REGION, label: 'Нет подходящего мне региона' },
      {
        value: RejectApplicationReason.PRICE,
        label: 'Не устраивает предлагаемая стоимость исполнения заявки',
      },
      { value: RejectApplicationReason.PERSONAL, label: 'Так сложились личные обстоятельства' },
      { value: RejectApplicationReason.OTHER, label: 'Другое' },
    ],
    placeholder: 'Причина',
  },
  comment: {
    name: 'comment',
    placeholder: 'Комментарий',
    rows: 3,
  },
};
