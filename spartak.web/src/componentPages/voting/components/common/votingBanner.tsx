import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { VotingType } from "../../../../api/MvpVotingRepository";
import { theme } from "../../../../assets/theme/theme";
import { useWindowSize } from "../../../../core/hooks/UseWindowSize";
import { NextImage } from "../../../../ui/nextImage/nextImage";

type Props = {
  votingId: string;
  type: VotingType;
};

export const VotingBanner = ({ votingId, type }: Props) => {
  const { push } = useRouter();

  const { width = 1920 } = useWindowSize(true);
  const bannerSize = width > 767 ? (width > 1199 ? "L" : "M") : "S";

  return (
    <Wrapper onClick={() => push(`/voting/${votingId}`)}>
      <NextImage src={`/images/mvp/${type}Banner${bannerSize}_v1.0.1.png`} priority />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 6.979vw;
  width: 100%;
  position: relative;
  display: flex;
  align-items: flex-end;
  cursor: pointer;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    height: 12.12vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: 9.6vw;
  }
`;
