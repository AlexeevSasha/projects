import { theme } from "common/styles/theme";
import { ProposalCriterionAction } from "module/proposalCriterion/proposalCriterionAction";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "../../../../common/styles/styled";
import { proposalCriterionSelector } from "../../../../module/proposalCriterion/proposalCriterionSelector";
import { BlockConstructorCriterion } from "./BlockConstructorCriterion";
import { FooterCriterionFilter } from "./FooterCriterionFilter";
import { IControllerResponse } from "../../../../common/interfaces/response/IControllerResponse";
import { ITestControlList } from "../../../../common/interfaces/ITestControlList";
import { DrawerContainer } from "../../../../common/components/Popup/components/DrawerContainer";
import { TextArea } from "../../../../common/ui/Input/TextArea";

interface IProps {
  registerId: number;
}

export const FormCreateCriterion: React.FC<IProps> = ({ registerId }) => {
  const dispatch = useDispatch();
  const { criterionText, loading, loadingTest } = useSelector(proposalCriterionSelector);

  useEffect(() => {
    dispatch(
      ProposalCriterionAction.testCriterion.done({
        result: { message: "", isError: true } as IControllerResponse<ITestControlList>,
      })
    );
  }, [dispatch]);

  return (
    <DrawerContainer
      callbackAfterClose={() => {
        dispatch(ProposalCriterionAction.clearTestCriterion());
      }}
      width={90}
      unitOfMeasureWidth={"vw"}
      title={"Настройки критериев включения"}
      footer={<FooterCriterionFilter registerId={registerId} />}
      loading={loading || loadingTest}
    >
      <Container>
        <FilterContainer>
          <BlockConstructorCriterion />
        </FilterContainer>
        <TextAreaContainer>
          <TextArea
            style={{ maxHeight: "100%", minHeight: 80 }}
            id={"help_text"}
            disabled={true}
            value={criterionText.criteriaDescription}
          />
        </TextAreaContainer>
      </Container>
    </DrawerContainer>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;
const TextAreaContainer = styled.div`
  padding-top: 15px;
  display: flex;
  flex-direction: column;
  background: ${theme.colors.white};
`;

const FilterContainer = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;
