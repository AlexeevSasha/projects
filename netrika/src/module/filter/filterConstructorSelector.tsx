import { createSelector } from "reselect";
import { IAppState } from "../../store/mainReducer";
import { IFilter } from "common/interfaces/IFilter";

const state = ({ filterReducer }: IAppState) => filterReducer;

export const filterConstructorSelector = ({ filterReducer }: IAppState) => filterReducer;

export const selectAdditionalConditionIds = (parentId: number) =>
  createSelector(state, ({ additionalConditionIds }) => additionalConditionIds[parentId]);
export const selectAdditionalConditionById = (id: number) =>
  createSelector(
    state,
    ({ additionalConditions }) => additionalConditions.find((item) => item.id === id) || ({} as IFilter)
  );

export const selectConditionIds = (parentId: number) =>
  createSelector(state, ({ conditionIds }) => conditionIds[parentId]);
export const selectConditionById = (id: number) =>
  createSelector(state, ({ conditions }) => conditions.find((item) => item.id === id) || ({} as IFilter));

export const qualityCriterionSelector = createSelector(state, ({ criterions }) => criterions);
export const qualityCurrensCriterionSelector = createSelector(state, ({ currentCriterions }) => currentCriterions);
export const selectFields = createSelector(state, ({ selects }) =>
  selects.field?.map((field) => ({ value: field.id, label: field.description }))
);
export const selectFilterSelects = createSelector(state, ({ selects }) => ({
  ...selects,
  bizObjWithFields: selects.bizObjWithFields.map((item) => ({ ...item, value: item.id, label: item.name })),
}));
export const selectJsonObservation = createSelector(state, ({ jsonObservation }) => jsonObservation);
// export const selectJsonRule = createSelector(state, ({ jsonRule }) => jsonRule);
