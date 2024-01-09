import React, { ForwardedRef, MutableRefObject, useCallback, useEffect } from "react";
import { css, styled } from "../../styles/styled";
import { theme } from "../../styles/theme";
import { getCursorPosition, setCursorPosition } from "./helpers";
import { validSequence } from "../../helpers/validSequence";

interface IProps {
  maxWidth?: string;
  disabled?: boolean;
  error?: boolean;
  defValue?: string;
  onChange: (value: string) => void;
}

type EditAbleDivRef<T extends Element> = T extends Element ? T : never;
type Hack<T extends ForwardedRef<any>, P extends Element> = T extends ForwardedRef<any> ? MutableRefObject<P> : never;

export const EditAbleDiv = React.forwardRef<EditAbleDivRef<HTMLDivElement>, IProps>((props: IProps, ref) => {
  const huckRef = ref as Hack<typeof ref, HTMLDivElement>;

  const onHighlightBraces = useCallback(
    (text: string) =>
      text
        ?.split("")
        .map((item: string, index: number) => {
          if (validSequence(text || "").has(index)) {
            return `<span id={${index}} style="color: red">${item}</span>`;
          } else {
            return `<span id={${index}} >${item}</span>`;
          }
        })
        .join(""),

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [validSequence]
  );

  useEffect(() => {
    if (props.defValue) huckRef.current.innerHTML = onHighlightBraces(props.defValue);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [huckRef]);

  const contentChange = (event: React.FormEvent<HTMLDivElement>) => {
    const html = event.currentTarget.innerText;
    props.onChange(html);
    if (ref && huckRef?.current) {
      const pos = getCursorPosition(huckRef.current);
      huckRef.current.innerHTML = onHighlightBraces(html);

      setCursorPosition(huckRef.current, pos);
    }
  };

  return (
    <HighLiteEditable
      maxWidth={props.maxWidth}
      error={props.error}
      disabled={props.disabled}
      ref={ref}
      contentEditable
      onInput={contentChange}
      defaultValue={props.defValue}
    />
  );
});

const HighLiteEditable = styled.div<{ maxWidth?: string; disabled?: boolean; error?: boolean }>`
  min-height: 35px;
  height: fit-content;
  background: ${(props) => (props.disabled ? "rgb(241, 241, 241)" : theme.colors.white)};
  font-style: normal;
  font-weight: normal;
  letter-spacing: 0.005em;
  color: ${theme.colors.black};
  border: 1px solid ${theme.colors.gray};
  box-sizing: border-box;
  border-radius: 5px;
  padding: 7px;
  outline: none;
  text-wrap: none;

  width: ${(props) => (props.maxWidth ? props.maxWidth : "auto")};
  ${(props) =>
    props.error
      ? css`
          border: 1px solid ${theme.colors.lightRed};
          ::placeholder {
            /* Chrome, Firefox, Opera, Safari 10.1+ */
            color: ${theme.colors.lightRed};
            opacity: 1; /* Firefox */
          }

          :-ms-input-placeholder {
            /* Internet Explorer 10-11 */
            color: ${theme.colors.lightRed};
          }

          ::-ms-input-placeholder {
            /* Microsoft Edge */
            color: ${theme.colors.lightRed};
          }
        `
      : css`
          ::placeholder {
            /* Chrome, Firefox, Opera, Safari 10.1+ */
            color: rgba(96, 120, 144, 0.5);
          }
          :-ms-input-placeholder {
            /* Internet Explorer 10-11 */
            color: rgba(96, 120, 144, 0.5);
          }
          ::-ms-input-placeholder {
            /* Microsoft Edge */
            color: rgba(96, 120, 144, 0.5);
          }
        `}
`;
