import { styled } from "common/styles/styled";
import { theme } from "common/styles/theme";
import { InputStyle } from "../../../../../common/ui/Input/styles/inputStyles";

export const InputContainer = styled.div`
  margin-top: 10px;
  height: 70px;
`;

export const Title = styled.h3`
  color: ${theme.colors.black};
  margin-bottom: 10px;
  .required {
    color: ${theme.colors.lightRed};
  }
`;

export const EditContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CustomInputProposalGeneralInfo = styled(InputStyle)<{ disable?: boolean }>`
  border-radius: 9px;
  width: 100%;
  margin-right: 10px;
  background: ${(props) => (props.disable ? theme.colors.lightGray : theme.colors.white)};
`;

export const CustomSelectContainer = styled.div`
  width: 95%;
  &:first-child {
    width: 100%;
    margin-right: 10px;
  }
`;

export const SelectContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ContainerControlsGeneralInfo = styled.div`
  display: flex;
`;
