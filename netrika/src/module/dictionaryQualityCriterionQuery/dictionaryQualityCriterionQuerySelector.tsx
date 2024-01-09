import { IAppState } from "../../store/mainReducer";

const state = ({ dictionaryQualityCriterionQuery }: IAppState) => dictionaryQualityCriterionQuery;

export const dictionaryQualityCriterionQuerySelector = state;
