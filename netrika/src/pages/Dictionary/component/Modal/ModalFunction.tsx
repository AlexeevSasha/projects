import React from "react";
import { BorderGreen } from "../../../DiseaseCard/style/BorderGreen";
import styled from "styled-components";
import { IFunction } from "../../../../common/interfaces/IFunction";
import Highlight, { defaultProps } from "prism-react-renderer";
import { Line, LineContent, LineNo } from "../../../../common/ui/CodeEdit";
import { ModalContainer } from "../../../../common/components/Popup/components/ModalContainer";

interface IProps {
  value?: IFunction[];
}

export const ModalFunction: React.FC<IProps> = (props) => {
  return (
    <ModalContainer width={1500} title={"Список Функций"}>
      <BorderWrapper>
        {props.value?.map((item, i) => (
          <BorderGreen key={`${item.name}${i}`}>
            <BlockLine>
              <NameParam>Имя Функции:</NameParam> <ValueParam>{item.name}</ValueParam>
            </BlockLine>
            <BlockLine>
              <NameParam>Текст Функции:</NameParam>{" "}
              <Highlight {...defaultProps} code={item.text || ""} language="sql">
                {({ className, tokens, getLineProps, getTokenProps }) => (
                  <Pre className={className}>
                    {tokens.map((line, i) => (
                      <Line key={i} {...getLineProps({ line, key: i })}>
                        <LineNo>{i + 1}</LineNo>
                        <LineContent>
                          {line.map((token, key) => (
                            <span key={key} {...getTokenProps({ token, key })} />
                          ))}
                        </LineContent>
                      </Line>
                    ))}
                  </Pre>
                )}
              </Highlight>
            </BlockLine>
          </BorderGreen>
        ))}
      </BorderWrapper>
    </ModalContainer>
  );
};

const BlockLine = styled.div`
  display: flex;
  margin-bottom: 12px;
  justify-content: space-between;
  padding: 5px;
`;

const NameParam = styled.span`
  padding: 5px;
  width: 15%;
`;

const ValueParam = styled.span`
  justify-self: flex-end;
  width: 85%;
  align-self: center;
  word-wrap: normal;
`;
const BorderWrapper = styled.div`
  height: 70vh;
  overflow: auto;
  padding: 0 10px;
`;

const Pre = styled.pre`
  text-align: left;
  margin: 1em 0;
  padding: 0.5em;
  overflow: scroll;

  & .token-line {
    line-height: 1.3em;
    height: 1.3em;
  }
`;
