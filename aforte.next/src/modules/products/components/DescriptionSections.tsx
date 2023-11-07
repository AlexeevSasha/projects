import { XSSProtection } from "../utils/XSSProtection";
import { Accordion } from "../../../common/components/Accordion";
import { useState } from "react";
import { useResize } from "../../../common/hooks/useResize";
import styled from "astroturf/react";
import { ProductT } from "../interfaces/product";

type Props = Pick<ProductT, "descriptionSections">;

export const DescriptionSections = ({ descriptionSections }: Props) => {
  const [active, setActive] = useState(0);

  const handlerClick = (num: number) => {
    setActive(num);
    const element = document.querySelector(".instructions");
    element?.scroll(0, 0);
  };

  const { width } = useResize();

  return (
    <Content>
      {width > 768 ? (
        <>
          <RightBlock>
            {descriptionSections.map((el, i) => (
              <RightBlockContent onClick={() => handlerClick(i)} active={active === i} key={i}>
                {el.header}
              </RightBlockContent>
            ))}
          </RightBlock>
          <LeftBlock
            className={"instructions"}
            dangerouslySetInnerHTML={{
              __html: XSSProtection(
                descriptionSections[active].content.replace(/(\r\n|\r|\n)/g, "<br>")
              ),
            }}
          />
        </>
      ) : (
        <>
          {descriptionSections.map((el, i) => (
            <Accordion title={el.header} key={i}>
              <AccordionText
                dangerouslySetInnerHTML={{
                  __html: XSSProtection(el.content.replace(/(\r\n|\r|\n)/g, "<br>")),
                }}
              />
            </Accordion>
          ))}
        </>
      )}
    </Content>
  );
};

const Content = styled.div`
  @import "variables";

  display: grid;
  grid-template-columns: 300px 1fr;

  @include respond-to(small) {
    grid-template-columns: 1fr;
    grid-row-gap: 4px;
  }
`;

const RightBlock = styled.div`
  @import "variables";

  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 28px;
  height: fit-content;

  @include respond-to(small) {
    grid-gap: 4px;
  }
`;

const RightBlockContent = styled.p<{ active: boolean }>`
  @import "variables";

  position: relative;
  cursor: pointer;
  margin: 0;
  font-weight: 600;
  font-size: 14px;
  line-height: 137%;
  color: $blue1;

  &.active {
    cursor: default;
    pointer-events: none;
    color: $black;

    &:before {
      position: absolute;
      content: "";
      top: 0;
      right: -1px;
      width: 2px;
      height: 28px;
      background: $blue1;
    }
  }
`;

const LeftBlock = styled.div`
  @import "variables";

  position: relative;
  height: 350px;
  overflow-y: auto;
  overflow-x: hidden;
  padding-left: 50px;
  border-left: 1px solid rgb($black, 0.1);

  @include respond-to(small) {
    display: none;
  }
`;

const AccordionText = styled.div`
  @import "variables";

  font-weight: 400;
  font-size: 14px;
  line-height: 140%;
  letter-spacing: 0.02em;
  color: rgba($black, 0.7);
`;
