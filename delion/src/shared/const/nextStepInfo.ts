interface NextStep {
  text: string;
  buttonText: string;
}

export type Steps = 1 | 2 | 3 | 4 | 5;

export const nextStepInfo: Record<Steps, NextStep> = {
  1: {
    text: 'Можем начать заполнять данные мечтателей',
    buttonText: 'Перейти',
  },
  2: {
    text: 'Теперь перейдем к категории мечтателя',
    buttonText: 'Категория',
  },
  3: {
    text: 'Теперь перейдем к дополнительной информации',
    buttonText: 'Доп. информация',
  },
  4: {
    text: 'Теперь перейдем к описании доброго дела',
    buttonText: 'Доброе дело',
  },
  5: {
    text: 'Осталось только описать желание вашего Мечтателя',
    buttonText: 'Желание',
  },
};
