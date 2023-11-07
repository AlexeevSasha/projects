import styled from "astroturf/react";
import React, { useRef, useState } from "react";
import { IconArraySmall } from "./icons/IconArraySmall";

type Props = {
  withoutBG?: boolean;
  title: string;
  children: JSX.Element;
};

export const Accordion = ({ title, children, withoutBG }: Props) => {
  const [active, setActive] = useState(false);
  const [height, setHeight] = useState("0px");
  const content = useRef<HTMLDivElement>(null);

  const toggleAccordion = () => {
    setActive(!active);
    setHeight(active ? "0px" : `${content?.current?.scrollHeight || 0}px`);
  };

  return (
    <AccordionContainer withoutBG={withoutBG} active={active}>
      <HeaderContainer onClick={toggleAccordion}>
        <AccordionTitle>{title}</AccordionTitle>
        <AccordionIcon>
          <IconArraySmall rotate={active ? "180deg" : "360deg"} size="md" />
        </AccordionIcon>
      </HeaderContainer>
      <AccordionContent ref={content} style={{ maxHeight: `${height}` }}>
        {children}
      </AccordionContent>
    </AccordionContainer>
  );
};

const HeaderContainer = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: none;
  outline: none;
  margin: 0;
  transition: background-color 0.6s ease;
`;

const AccordionTitle = styled.div`
  @import "variables";

  font-weight: 500;
  font-size: 16px;
  line-height: 137%;

  @include respond-to(small) {
    font-size: 14px;
    letter-spacing: 0.02em;
  }
`;

const AccordionContainer = styled.div<{ active: boolean; withoutBG?: boolean }>`
  @import "variables";

  display: flex;
  flex-direction: column;
  padding: 24px 24px 0;
  background: $grey;
  color: $black;
  border-radius: 16px;

  &.active {
    padding: 24px;
  }

  &.withoutBG {
    border-radius: 0;
    background: transparent;
    ${HeaderContainer} {
      justify-content: flex-start;
      ${AccordionTitle} {
        font-weight: 600;
        font-size: 16px;
        letter-spacing: 0;
      }
    }
  }

  @include respond-to(small) {
    padding: 16px 16px 4px;
    &.active {
      padding: 16px;
    }
  }
`;

const AccordionIcon = styled.span`
  @import "variables";

  width: 16px;
  height: 16px;
  margin-left: 15px;
  svg {
    transition: all 0.6s ease;
    path {
      stroke: $blue1;
    }
  }
`;
const AccordionContent = styled.div`
  @import "variables";

  background: transparent;
  overflow: hidden;
  transition: max-height 0.6s ease;
  margin-top: 24px;
  font-weight: 400;
  font-size: 14px;
  line-height: 26px;

  @include respond-to(small) {
    margin-top: 12px;
  }
`;
