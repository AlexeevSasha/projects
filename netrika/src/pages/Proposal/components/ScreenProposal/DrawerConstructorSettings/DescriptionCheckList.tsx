import { styled } from "common/styles/styled";
import { theme } from "common/styles/theme";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ProposalCheckListAction } from "../../../../../module/proposalCheckList/proposalCheckListAction";
import { TextAreaStyle } from "../../../../../common/ui/Input/styles/textAreaStyles";
import { LabelStyle } from "../../../../../common/ui/Input/styles/labelStyles";

interface IProps {
  text: string;
  isError: boolean;
  handelError: () => void;
  disabled: boolean;
}

export const DescriptionCheckList = (props: IProps) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(props.text);

  useEffect(() => {
    setValue(props.text);
  }, [props.text]);

  const changeValue = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      props.handelError();
      setValue(event.currentTarget.value);
      dispatch(ProposalCheckListAction.updateDescription(event.currentTarget.value));
    },
    // eslint-disable-next-line
    [setValue, dispatch]
  );

  return (
    <Container>
      <LabelStyle htmlFor={"description_check_list"} isRequired>
        Описание
      </LabelStyle>
      <InputSQL
        disabled={props.disabled}
        error={props.isError}
        placeholder="Поле обязательно для заполнения..."
        id={"description_check_list"}
        value={value}
        onChange={changeValue}
      />
    </Container>
  );
};

const Container = styled.div`
  padding-top: 15px;
  display: flex;
  flex-direction: column;
  background: ${theme.colors.white};
  margin-right: 20px;
  max-height: 55vh;
`;

const InputSQL = styled(TextAreaStyle)`
  min-height: 100px;
  overflow-y: scroll;
  max-height: fit-content;
`;
