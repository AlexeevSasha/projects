import { defaultStaticRanges } from "react-date-range";

const ruRangesLabels = {
  "Today": "Сегодня",
  "Yesterday": "Вчера",
  "This Week": "Эта неделя",
  "Last Week": "Прошлая неделя",
  "This Month": "Этот месяц",
  "Last Month": "Прошлый месяц",
};
const enRangesLabels = {
  "Today": "Today",
  "Yesterday": "Yesterday",
  "This Week": "This week",
  "Last Week": "Last week",
  "This Month": "This month",
  "Last Month": "Last month",
};

function translateRange(dictionary: { [key: string]: string }) {
  return (item: any) =>
    dictionary[item.label] ? { ...item, label: dictionary[item.label] } : item;
}

export const ruStaticRanges = defaultStaticRanges.map(translateRange(ruRangesLabels));
export const enStaticRanges = defaultStaticRanges.map(translateRange(enRangesLabels));
