import React from "react";
import styled from "styled-components";
import { theme } from "../../../assets/theme/theme";
import { NextImage } from "../../../ui/nextImage/nextImage";

export type IPatch = {
  src: string;
  title: string;
  pricePlus: string;
};

interface IProps {
  src: string;
  title: string;
  pricePlus: string;
  backgroundColor?: keyof typeof theme.colors;
  setActive: () => void;
  active: boolean;
}

export const ItemPatch = (patch: IProps) => {
  return (
    <Patch backColor={patch.backgroundColor} active={patch.active} onClick={patch.setActive}>
      <ItemPatchImage>
        <NextImage src={patch.src} alt={patch.title} />
      </ItemPatchImage>
      <PatchDescription>
        <PatchTitle>{patch.title}</PatchTitle>
        <PatchBonus>{patch.pricePlus}</PatchBonus>
      </PatchDescription>
    </Patch>
  );
};

const Patch = styled.div<{ backColor?: keyof typeof theme.colors; active: boolean }>`
  display: flex;
  align-items: center;
  column-gap: 0.63vw;
  cursor: pointer;
  border: ${({ active }) => (active ? `1px solid ${theme.colors.red}` : `1px solid ${theme.colors.grayDark}`)};
  padding: 0.78vw 0.63vw;
  background: ${({ backColor }) => backColor && theme.colors[backColor]};

  &:hover {
    border-color: ${theme.colors.red};
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 1.56vw 1.96vw;
    column-gap: 1.56vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 4vw 3.2vw;
    column-gap: 3.2vw;
  }
`;

const ItemPatchImage = styled.div`
  width: 2.08vw;
  height: 2.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 5.22vw;
    height: 5.22vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 10.67vw;
    height: 10.67vw;
  }
`;

const PatchDescription = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "FCSM Text", sans-serif;
  text-transform: uppercase;
`;

const PatchTitle = styled.span`
  font-size: 0.73vw;
  line-height: 0.94vw;
  color: ${theme.colors.white};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.83vw;
    line-height: 2.35vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.73vw;
    line-height: 4.8vw;
  }
`;

const PatchBonus = styled.span`
  font-size: 0.63vw;
  line-height: 0.73vw;
  color: ${theme.colors.gray};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.56vw;
    line-height: 1.83vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.2vw;
    line-height: 3.73vw;
  }
`;
