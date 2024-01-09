import React, { useEffect, useState } from "react";
import Editor from "react-simple-code-editor";
import Highlight, { defaultProps, Language } from "prism-react-renderer";
import styled from "styled-components";
import { theme } from "../styles/theme";

interface IProps {
  defaultValue: string;
  onChange: (value: string) => void;
  placeholder: string;
  isError?: boolean;
  readonly?: boolean;
  language: Language;
}
export const CodeEdit = (props: IProps) => {
  const [code, setCode] = useState(props.defaultValue || props.placeholder);

  const onChange = (value: string) => {
    setCode(value);
    props.onChange(value);
  };

  useEffect(() => {
    setCode(props.defaultValue || props.placeholder);
  }, [props.defaultValue, props.placeholder]);

  const highlight = (code: string) => (
    <Highlight {...defaultProps} code={code} language={props.language}>
      {({ tokens, getLineProps, getTokenProps }) => (
        <React.Fragment>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </React.Fragment>
      )}
    </Highlight>
  );

  return (
    <EditorContainer id={"input_sql"}>
      <Editor
        maxLength={150000}
        readOnly={props.readonly}
        value={code}
        onValueChange={(code) => onChange(code)}
        highlight={highlight}
        padding={10}
        style={{
          minHeight: "100%",
          boxSizing: "border-box",
          border: props.isError ? `1px solid ${theme.colors.lightRed}` : `1px solid ${theme.colors.gray}`,
          borderRadius: "5px",
          fontSize: "14px",
        }}
      />
    </EditorContainer>
  );
};

const EditorContainer = styled.div`
  padding: 5px;
  height: 100%;
  overflow-y: scroll;
  textarea {
    :focus-visible {
       border: 1px solid ${theme.colors.lightGreen}
       outline: none !important;
     }

  }
`;

export const Line = styled.pre`
  display: table-row;
`;

export const LineNo = styled.span`
  display: table-cell;
  text-align: right;
  padding-right: 1em;
  user-select: none;
  opacity: 0.5;
`;

export const LineContent = styled.span`
  display: table-cell;
  line-height: 1.3em;
  height: 1.3em;
`;
