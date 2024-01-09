type ActionType = "add" | "edit" | "view";
type EntityType = "activity" | "clinrecThesis" | "pompState" | "report" | "criteria" | "stage" | "route";

const actionTitles: Record<ActionType, string> = {
  add: "Добавление",
  edit: "Редактирование",
  view: "Просмотр",
};

const entityTitles: Record<EntityType, string> = {
  activity: "вмешательства",
  clinrecThesis: "тезиса",
  pompState: "подэтапа",
  report: "отчёта",
  criteria: "критерий",
  stage: "этапа",
  route: "маршрута",
};

export const getTitleModal = (action: ActionType, entityType: EntityType): string => {
  return `${actionTitles[action]} ${entityTitles[entityType]}`;
};
