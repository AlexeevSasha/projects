import React from "react";
import { useDispatch } from "react-redux";
import { InputField } from "common/ui/Input/InputField/InputField";
import { styled } from "common/styles/styled";
import { ProposalCheckListAction } from "../../../../../module/proposalCheckList/proposalCheckListAction";
import { Title } from "../../GeneralInfo/FormInfoProposal/styledInputs";
import { theme } from "../../../../../common/styles/theme";

interface IProps {
  name?: string;
  isError: boolean;
  handelError?: () => void;
  disabled: boolean;
}

export const CommonSettings: React.FC<IProps> = ({ name, isError, handelError, disabled }) => {
  const dispatch = useDispatch();

  const { updateName } = ProposalCheckListAction;

  const handleNameChange = (value: string) => {
    dispatch(updateName(value));
    if (handelError) {
      handelError();
    }
  };

  return (
    <>
      <SettingContainer>
        <SettingItem>
          <Title>
            Название контрольного списка
            <span className={"required"}>*</span>
          </Title>

          <InputField
            altId="input_name_control_list"
            error={isError}
            type="String"
            defaultValue={name || ""}
            onChange={handleNameChange}
            placeholder="Поле обязательно для заполнения..."
            maxWidth="380px"
            maxLength={200}
            disabled={disabled}
          />
        </SettingItem>
      </SettingContainer>
    </>
  );
};

const SettingItem = styled.div`
  display: flex;
  flex-direction: column;
  color: ${theme.colors.black};
  width: 44%;
  margin-right: 50px;
`;

const SettingContainer = styled.div`
  display: flex;
  align-items: stretch;
  margin-bottom: 10px;
`;
