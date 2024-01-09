import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

export const FormFields = {
  snils: {
    name: 'snils',
    label: 'СНИЛС',
    placeholder: '123-456-789 00',
    type: 'text',
    mask: {
      mask: '000-000-000 00',
      maskError: 'СНИЛС должен содержать ровно 11 цифр',
      pattern: /^\d{3}-\d{3}-\d{3} \d{2}$/,
    },
  },
  innFiz: {
    name: 'inn',
    label: 'ИНН',
    placeholder: '123456789012',
    type: 'text',
    mask: {
      mask: '000000000000',
      maskError: 'ИНН должен содержать ровно 12 цифр',
      pattern: /^\d{12}$/,
    },
  },
  innOrg: {
    name: 'inn',
    label: 'ИНН',
    placeholder: '1234567890',
    type: 'text',
    mask: {
      mask: '0000000000',
      maskError: 'ИНН должен содержать ровно 10 цифр',
      pattern: /^\d{10}$/,
    },
  },
  passport_series: {
    name: 'passport_series',
    label: 'Серия паспорта',
    placeholder: 'Серия паспорта',
    type: 'text',
    mask: {
      mask: '0000',
      maskError: 'Серия паспорта должна содержать ровно 4 цифры',
      pattern: /^\d{4}$/,
    },
  },
  passport_number: {
    name: 'passport_number',
    label: 'Номер паспорта',
    placeholder: 'Номер паспорта',
    type: 'text',
    mask: {
      mask: '000000',
      maskError: 'Номер паспорта должен содержать ровно 6 цифр',
      pattern: /^\d{6}$/,
    },
  },
  passport_issue_date: {
    name: 'passport_issue_date',
    label: 'Дата выдачи',
    placeholder: 'Дата выдачи',
    type: 'date',
    dateProps: {
      disabledDate: (current: Dayjs) => current > dayjs(),
    },
  },
  passport_division_code: {
    name: 'passport_division_code',
    label: 'Код подразделения',
    placeholder: '123-456',
    type: 'text',
    mask: {
      mask: '000-000',
      maskError: 'Код подразделения должен содержать 6 цифр',
      pattern: /^\d{3}-\d{3}$/,
    },
  },
  ogrn: {
    name: 'ogrn',
    label: 'ОГРН',
    placeholder: 'ОГРН',
    mask: {
      mask: '000000000000000',
      maskError: 'ОГРН должен содержать 13 или 15 цифр',
      pattern: /^(\d{13}|\d{15})$/,
    },
    type: 'text',
  },
  kpp: {
    name: 'kpp',
    label: 'КПП',
    placeholder: 'КПП',
    mask: {
      mask: '000000000',
      maskError: 'КПП должен содержать ровно 9 цифр',
      pattern: /^\d{9}$/,
    },
    type: 'text',
  },
};
