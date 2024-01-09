import { ConstructorFilterContainer } from "pages/Register/component/RegisterCheckList/ConstructorFilterContainer";
import { styled } from "common/styles/styled";
import { theme } from "common/styles/theme";
import { FilterConstructorAction } from "module/filter/filterConstructorAction";
import { filterConstructorSelector } from "module/filter/filterConstructorSelector";
import { ProposalCriterionAction } from "module/proposalCriterion/proposalCriterionAction";
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconLoading } from "common/components/Icon/IconLoading";
import { ICustomSelect } from "../../../../common/interfaces/ISelect";
import { CustomSelect } from "../../../../common/ui/Select/CustomSelect";
import { CodeEdit } from "../../../../common/ui/CodeEdit";
import { IControllerResponse } from "../../../../common/interfaces/response/IControllerResponse";
import { ITestControlList } from "../../../../common/interfaces/ITestControlList";

export const BlockConstructorCriterion = () => {
  const dispatch = useDispatch();
  const { selectsLoading, searchType, searchSql } = useSelector(filterConstructorSelector);

  const typeFilter = useMemo(() => (searchType ? "Конструктор" : "SQL-запрос"), [searchType]);

  const handleChangeType = (type: ICustomSelect) => {
    dispatch(FilterConstructorAction.updateSearchType(type.value.toString()));
    dispatch(ProposalCriterionAction.clearTestCriterion());
  };

  const inputSearchSql = (value: string) => {
    dispatch(FilterConstructorAction.updateSearchSql(value));
    dispatch(
      ProposalCriterionAction.testCriterion.done({
        result: { message: "", isError: true } as IControllerResponse<ITestControlList>,
      })
    );
  };

  return (
    <>
      <SettingItem id={"type_setting"}>
        <label>Тип настройки</label>
        <CustomSelect
          htmlID={"type_setting"}
          SelectValue={{ value: typeFilter, label: typeFilter } as unknown}
          options={[
            { label: "Конструктор", value: "Конструктор" },
            { label: "SQL-запрос", value: "SQL-запрос" },
          ]}
          onChange={handleChangeType}
        />
      </SettingItem>

      {selectsLoading ? (
        <IconLoading />
      ) : searchType ? (
        <FilterContainer id={"main_container_criterion"}>
          <Title>Критерии отбора пациентов</Title>
          <ConstructorFilterContainer id={0} type={"criterion"} />
          <Title>Критерии отбора случаев медицинского обслуживания</Title>
          <ConstructorFilterContainer id={1} type={"additionalCriterion"} />
        </FilterContainer>
      ) : (
        <CodeEdit
          language={"sql"}
          placeholder={`select 
\t\tcase_biz_key, case_patient_local_key, case_record_created, case_organization_biz_key, case_open_date, case_close_date, case_caseresult_id, case_casetype_id
\t\tfrom iemk_case 
where case_is_cancelled=0  
[
условия на выбор:
- условия к полям из iemk_case, например: and case_caseresult_id=5
- условия к таблицам из emk путем проверки вхождения ключей, например: and case_biz_key in (...)
- условия к проверке по карточке пациента путем вложения: and case_patient_local_key in (...)
]`}
          onChange={inputSearchSql}
          defaultValue={searchSql}
        />
      )}
    </>
  );
};

const Title = styled.h3`
  display: flex;
  align-items: center;
  color: ${theme.colors.black};
  justify-content: space-between;
  margin: 10px 5px 10px 0;
`;

const FilterContainer = styled.div``;

const SettingItem = styled.div`
  display: flex;
  flex-direction: column;
  color: ${theme.colors.black};
  width: 44%;
  margin-right: 50px;
`;
