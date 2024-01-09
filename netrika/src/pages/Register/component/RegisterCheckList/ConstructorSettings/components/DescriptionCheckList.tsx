import { styled } from "common/styles/styled";
import { theme } from "common/styles/theme";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { RegisterSettingsCheckListAction } from "module/registerSettingsCheckList/registerSettingsCheckListAction";
import { useDispatch } from "react-redux";
import { IconArrow } from "../../../../../../common/components/Icon/IconArrow";
import { TextAreaStyle } from "../../../../../../common/ui/Input/styles/textAreaStyles";

interface IProps {
  text: string;
}

export const DescriptionCheckList = (props: IProps) => {
  const [disable, setDisable] = useState(false);
  const [visibleBLock, setVisibleBlock] = useState(false);

  const [value, setValue] = useState(props.text);

  useEffect(() => {
    setValue(props.text);
  }, [props.text, setValue]);

  const dispatch = useDispatch();

  const changeValue = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setDisable(false);
      setValue(event.currentTarget.value);
      dispatch(RegisterSettingsCheckListAction.updateDescription(event.currentTarget.value));
    },
    [dispatch, setValue]
  );

  return (
    <Container>
      <TitilePanel onClick={() => setVisibleBlock(!visibleBLock)}>
        {visibleBLock ? "Скрыть описание" : "Раскрыть описание"}{" "}
        <IconArrow
          rotate={visibleBLock ? "0" : "180deg"}
          color={theme.colors.hightGray}
          height={"10px"}
          width={"16px"}
        />
      </TitilePanel>
      {visibleBLock && (
        <>
          <h3>Описание</h3>
          <InputSQL id={"description_check_list"} disabled={disable} value={value} onChange={changeValue} />
        </>
      )}
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
  min-height: 300px;
  height: 100%;
  overflow-y: scroll;
  max-height: fit-content;
`;
const TitilePanel = styled.div`
  color: ${theme.colors.hightGray};
  margin-bottom: 10px;
  cursor: pointer;

  svg {
    margin-left: 30px;
  }
`;
