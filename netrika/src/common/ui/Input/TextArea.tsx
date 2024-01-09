import React, { forwardRef, InputHTMLAttributes } from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import { useCombinedRef } from "../../hooks/useCombinedRef";
import { useAutoResizeTextarea } from "./hook/useAutoResizeTextarea";
import { LabelStyle } from "./styles/labelStyles";
import { generateId } from "../../helpers/generateId";
import { TextAreaStyle } from "./styles/textAreaStyles";

interface ITextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  styleContainer?: React.CSSProperties;
  error?: boolean;
  isRequired?: boolean;
  errorMsg?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, ITextAreaProps>((props, ref) => {
  const { styleContainer, label, isRequired, errorMsg, id = `textarea-${generateId()}`, ...attr } = props;

  const { textareaRef, handleInputChange } = useAutoResizeTextarea();
  const combinedInputRef = useCombinedRef(ref, textareaRef);

  return (
    <div style={styleContainer}>
      {label ? (
        <LabelStyle isRequired={isRequired} error={attr.error} htmlFor={id}>
          {label}
        </LabelStyle>
      ) : null}
      <TextAreaStyle id={id} onInput={handleInputChange} ref={combinedInputRef} {...attr} />
      {errorMsg ? <ErrorBlock>{errorMsg}</ErrorBlock> : null}
    </div>
  );
});

const ErrorBlock = styled.div`
  color: ${theme.colors.lightRed};
`;
