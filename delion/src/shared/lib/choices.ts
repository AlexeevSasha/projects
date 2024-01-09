import { OTHER_TEXT_CHOICE_VALUE } from '@shared/const';
import type { Option } from '@shared/ui/LegacyInput/model/form';

export const getSelectedChoiceText = (value: Option['value'], choices: Option[]) => {
  if (typeof value === 'undefined') return '';

  const findItem = choices.find((item) => item.value === value);

  if (typeof findItem !== 'undefined') return findItem.label;

  return '';
};

export const getSelectedChoiceOrOtherFromDict = (
  choicesDict: string[],
  value: number,
  otherValue: string,
) => {
  return value === OTHER_TEXT_CHOICE_VALUE || !value ? otherValue : choicesDict[value];
};
