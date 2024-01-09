import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Close } from "../../../../assets/icon/close";
import { theme } from "../../../../assets/theme/theme";
import { CustomButton } from "../../../../components/buttons/customButton";
import { Modal } from "../../../../components/modal/modal";
import { NextImage } from "../../../../ui/nextImage/nextImage";
import { VotingDataType } from "../../interfaces/VotingT";
import { langVoting } from "../lang/langVoting";

type Props = {
  voting: VotingDataType;
};

export const VotingModal = ({ voting }: Props) => {
  const { locale = "ru" } = useRouter();
  const [votingModalIsVisible, setVotingModalVisibility] = useState(false);

  const handleClose = () => setVotingModalVisibility(false);

  useEffect(() => {
    const votingState = JSON.parse(localStorage.getItem("voting") || "{}");

    if (!votingState[voting.Id]) {
      setVotingModalVisibility(true);
      localStorage.setItem("voting", JSON.stringify({ ...votingState, [voting.Id]: true }));
    }
  }, []);

  return votingModalIsVisible ? (
    <Modal clickClose={handleClose}>
      <Container>
        <CrossIcon onClick={handleClose} />

        <WinlineImageContainer>
          <NextImage src="/images/icon/iconWinline_v1.0.1.svg" alt="Логотип winline" />
        </WinlineImageContainer>

        {voting.MatchId && <H3>{langVoting[locale].matchModalHeader}</H3>}
        {voting.Month && <H3>{langVoting[locale].monthModalHeader}</H3>}
        {voting.SeasonId && <H3>{langVoting[locale].seasonModalHeader}</H3>}

        {voting.MatchId && (
          <>
            <P>{langVoting[locale].matchText1}</P>
            <P dangerouslySetInnerHTML={{ __html: langVoting[locale].matchText2 }} />
          </>
        )}

        {voting.Month && (
          <>
            <P dangerouslySetInnerHTML={{ __html: langVoting[locale].monthText1(voting.EndVoting) }} />
            <P dangerouslySetInnerHTML={{ __html: langVoting[locale].monthText2 }} />
          </>
        )}

        {voting.SeasonId && (
          <>
            <P dangerouslySetInnerHTML={{ __html: langVoting[locale].seasonText1(voting.EndVoting) }} />
            <P dangerouslySetInnerHTML={{ __html: langVoting[locale].seasonText2 }} />
          </>
        )}

        <Button type="opacity" onClick={handleClose}>
          {langVoting[locale].vote}
        </Button>
      </Container>
    </Modal>
  ) : null;
};

const Container = styled.div`
  background: radial-gradient(68.12% 128.68% at 50% 50%, #cc122d 0%, #2c1a1d 100%);
  width: 41.77vw;
  display: flex;
  flex-flow: column;
  align-items: center;
  padding: 2.4vw 4vw;
  color: ${theme.colors.white};
  font-family: "FCSM Text";
  position: relative;
  box-sizing: border-box;
  overflow: auto;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 100%;
    max-height: 100vh;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: 100vh;
  }
`;

const WinlineImageContainer = styled.div`
  width: 13.38vw;
  height: 3.28vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 33.5vw;
    height: 8.21vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 40.8vw;
    height: 9.86vw;
  }
`;

const H3 = styled.h3`
  margin: 2.08vw 0 1.04vw;
  font-weight: 700;
  font-size: 2.08vw;
  text-align: center;
  width: 95%;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 5.21vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 8.53vw;
  }
`;

const P = styled.p`
  margin-bottom: 0.625vw;

  & > a {
    color: ${theme.colors.win1};
  }
`;

const Button = styled(CustomButton)`
  margin-top: 1.08vw;
  color: ${theme.colors.white};
  border-color: ${theme.colors.white};
`;

const CrossIcon = styled(Close)`
  position: absolute;
  align-self: flex-end;
  cursor: pointer;
  font-size: 1.25vw;
  flex: 1 0;
  right: 1.25vw;
  top: 1.25vw;

  & > path {
    stroke: ${theme.colors.white};
  }

  &:hover {
    opacity: 0.5;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 3.13vw;
    right: 3.13vw;
    top: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 6.4vw;
  }
`;
