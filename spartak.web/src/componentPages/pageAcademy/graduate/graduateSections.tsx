import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { IconArrowRight } from "../../../assets/icon/iconArrowRight";
import { theme } from "../../../assets/theme/theme";
import { NextImage } from "../../../ui/nextImage/nextImage";
import { GraduateSectionEntity } from "../../../api/dto/GraduateSecion";
import { ContainerContent } from "../../../components/containers/containerContent";

type Props = {
  sections: GraduateSectionEntity[];
};

export const GraduateSections = ({ sections }: Props) => {
  const { push, locale = "ru" } = useRouter();

  return (
    <Container>
      {sections.map(({ Id, ImageSectionUrl, FullName }) => (
        <Section key={Id} onClick={() => push(`/academy/graduate/${Id}`)}>
          <NextImage src={ImageSectionUrl} />

          <Name>{getLocalValue(FullName, locale)}</Name>

          <Arrow>
            <IconArrowRight />
          </Arrow>
        </Section>
      ))}
    </Container>
  );
};

const Container = styled(ContainerContent)`
  flex-flow: row wrap;
  margin-top: 4.16vw;
  margin-bottom: 4.17vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 5.22vw 3.13vw 10.43vw;
    margin-top: 5.21vw;
    margin-bottom: 7.3vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 10.67vw 4.27vw;
    margin-top: 6.4vw;
    margin-bottom: 4.2vw;
  }
`;

const Section = styled.div`
  width: 40.625vw;
  height: 22.24vw;
  position: relative;
  cursor: pointer;
  margin-bottom: 2.08vw;

  @media screen and (min-width: ${theme.rubberSize.desktop + 1}) {
    &:nth-child(2n - 1) {
      margin-right: 1.25vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 100%;
    height: 51.37vw;
    margin-bottom: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: 50vw;
    margin-bottom: 6.4vw;
  }

  &:hover {
    transform: scale(1.02, 1.02);
    transition: all 0.2s ease-in-out;
  }

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: ${({ theme }) => theme.gradients.section_none};
  }
`;

const Name = styled.div`
  position: absolute;
  z-index: 15;
  bottom: 1.25vw;
  left: 1.25vw;
  color: ${theme.colors.white};
  font-size: 1.25vw;
  padding-right: 3.91vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.35vw;
    left: 3.13vw;
    bottom: 3.13vw;
    padding-right: 8.34vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    left: 6.4vw;
    bottom: 6.4vw;
    font-size: 4.8vw;
    padding-right: 15.73vw;
  }
`;

const Arrow = styled.div`
  position: absolute;
  z-index: 16;
  right: 1.25vw;
  bottom: 1.25vw;
  display: flex;
  align-items: flex-end;

  svg {
    margin-top: auto;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    right: 3.13vw;
    bottom: 3.13vw;

    svg {
      width: 3.13vw;
      height: 3.13vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    right: 6.4vw;
    bottom: 6.4vw;

    svg {
      width: 6.4vw;
      height: 6.4vw;
    }
  }
`;
