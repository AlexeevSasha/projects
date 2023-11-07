import styled from "astroturf/react";
import React, { useCallback, useContext, useState } from "react";
import { IconArraySmall } from "../../../common/components/icons/IconArraySmall";
import { IconSorting } from "../../../common/components/icons/IconSorting";
import { AppContext } from "../../../common/components/ContextProvider";
import { ModalNames } from "../../../common/interfaces/modal";
import { IconCheck } from "../../../common/components/icons/IconCheck";
import { useResize } from "../../../common/hooks/useResize";

const sorts = ["Сначала новые", "Сначала последние ", "Сначала положительные "];

type Props = {
  noneTitleMobile?: boolean;
  positions?: "right";
};

export const Sorting = ({ noneTitleMobile, positions }: Props) => {
  const { openModal, closeModal } = useContext(AppContext);

  const [currentValue, setCurrentValue] = useState(sorts[0]);
  const [isOpen, setIsOpen] = useState(false);

  const { width } = useResize();

  const toggleOpen = () => setIsOpen((prev) => !prev);
  const handlerClickItem = (el: string) => {
    setIsOpen(false);
    setCurrentValue(el);
  };

  const handlerClickModal = useCallback(
    () =>
      openModal(ModalNames.POPUP_MODAL_MOBILE, {
        children: (
          <SelectSort isModal>
            {sorts.map((el, i) => (
              <Item
                isActive={el === currentValue}
                onClick={() => {
                  handlerClickItem(el);
                  closeModal(ModalNames.POPUP_MODAL_MOBILE);
                }}
                key={i}
              >
                {el}
                {el === currentValue ? <IconCheck /> : null}
              </Item>
            ))}
          </SelectSort>
        ),
      }),
    [currentValue]
  );

  return (
    <ContainerSort>
      <Content onClick={width > 768 ? toggleOpen : handlerClickModal}>
        <ContainerIcon isMobile onClick={handlerClickModal}>
          <IconSorting />
        </ContainerIcon>
        <SortValues isMobileNone={noneTitleMobile}>{currentValue}</SortValues>
        <ContainerIcon>
          <IconArraySmall rotate={isOpen ? "180deg" : "0deg"} />
        </ContainerIcon>
      </Content>
      {isOpen && width > 768 && (
        <SelectSort positions={positions}>
          {sorts.map((el, i) => (
            <Item isActive={el === currentValue} onClick={() => handlerClickItem(el)} key={i}>
              {el}
              {el === currentValue ? <IconCheck /> : null}
            </Item>
          ))}
        </SelectSort>
      )}
    </ContainerSort>
  );
};

const ContainerSort = styled.div`
  @import "variables";

  position: relative;
  display: inline-block;
`;
const SortValues = styled.span<{ isMobileNone?: boolean }>`
  @import "variables";
  @include respond-to(small) {
    &.isMobileNone {
      display: none;
    }
  }
`;
const Content = styled.div`
  @import "variables";

  display: inline-grid;
  align-items: center;
  grid-template-columns: repeat(2, fit-content(250px));
  grid-column-gap: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  line-height: 137%;
  color: $blue1;

  &:hover {
    color: $blue2;
    svg path {
      stroke: $blue2;
    }
  }
`;

const ContainerIcon = styled.div<{ isMobile?: boolean }>`
  @import "variables";

  display: flex;
  align-items: center;

  svg {
    @include transition();
  }

  @include respond-to(small) {
    display: none;
  }

  &.isMobile {
    display: none;
    @include respond-to(small) {
      display: flex;
    }
  }
`;

const SelectSort = styled.ul<{ positions?: Props["positions"]; isModal?: boolean }>`
  @import "variables";

  position: absolute;
  top: 20px;
  left: 0;
  background: $white;
  list-style-type: none;
  color: $black;
  font-size: 14px;
  width: 274px;
  z-index: 10;
  box-shadow: 0 4px 16px rgba(19, 51, 103, 0.08);
  padding: 8px;
  border-radius: 20px;

  &.positions-right {
    right: 0;
    left: auto;
  }

  &.isModal {
    position: static;
    display: grid;
    list-style-type: none;
    padding: 0;
    margin: 0;
    color: $blue1;
    background: transparent;
    box-shadow: none;
    font-weight: 600;
    font-size: 14px;
    border-radius: 8px;
    width: 100%;
  }
`;

const Item = styled.li<{ isActive?: boolean }>`
  @import "variables";

  position: relative;
  padding: 12px 16px;
  cursor: pointer;
  border-radius: 8px;
  color: $blue1;
  font-weight: 600;

  &:hover {
    background: $grey;
  }
  &.isActive {
    pointer-events: none;
    color: $black;
  }

  svg {
    position: absolute;
    right: 16px;
  }
`;
