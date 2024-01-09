import React from "react";
import { useSelector } from "react-redux";
import { styled } from "../../../../common/styles/styled";
import { ConstructorFilterContainer } from "../RegisterCheckList/ConstructorFilterContainer";
import { filterConstructorSelector } from "module/filter/filterConstructorSelector";
import { TextAreaStyle } from "../../../../common/ui/Input/styles/textAreaStyles";
import { DrawerContainer } from "../../../../common/components/Popup/components/DrawerContainer";

export const ViewFilters = () => {
  const { selectsLoading, searchType, searchSql } = useSelector(filterConstructorSelector);

  return (
    <DrawerContainer
      width={90}
      unitOfMeasureWidth={"vw"}
      loading={selectsLoading}
      titleId={"name_modal"}
      id={"modal"}
      title={"Критерии включения"}
    >
      <ContentContainer>
        {searchType ? (
          <FilterContainer>
            <h3>Критерии отбора пациентов</h3>
            <ConstructorFilterContainer disabled type="criterion" />
            <h3 style={{ marginTop: 20 }}>Критерии отбора случаев медицинского обслуживания</h3>
            <ConstructorFilterContainer disabled type="additionalCriterion" />
          </FilterContainer>
        ) : (
          <TextAreaStyle
            id={"input_sql"}
            placeholder={"SQL Code*"}
            defaultValue={searchSql}
            disabled
            style={{ minHeight: "400px" }}
          />
        )}
      </ContentContainer>
    </DrawerContainer>
  );
};

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const FilterContainer = styled.div`
  h3 {
    margin: 10px 0;
  }
`;
