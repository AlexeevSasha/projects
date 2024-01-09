import { useRouter } from "next/router";
import styled from "styled-components";
import { getLocalValue } from "../../../../assets/helpers/getLocalValue";
import { IconCheckMark } from "../../../../assets/icon/iconCheckMark";
import { theme } from "../../../../assets/theme/theme";
import { CustomButton } from "../../../../components/buttons/customButton";
import { NextImage } from "../../../../ui/nextImage/nextImage";
import { VotingVariant } from "../../interfaces/VotingT";
import { langVoting } from "../lang/langVoting";

type Props = VotingVariant & {
  active?: boolean;
  onVote: (Id: VotingVariant["Id"]) => void;
  size?: number;
};

export const VotingPlayerCard = ({ Player, Id, Percent, active, onVote, size }: Props) => {
  const { locale = "ru" } = useRouter();

  return (
    <Container size={size}>
      <PhotoBlock>
        <PhotoContainer>
          <NextImage src={Player.ImageUrl} alt={getLocalValue(Player.Name, locale)} />
          {active ? (
            <ChooseContainer>
              <IconCheckMark color={theme.colors.grayLight} />
              {langVoting[locale].activeChoose}
            </ChooseContainer>
          ) : null}
        </PhotoContainer>
      </PhotoBlock>

      <InfoBlock>
        <div>
          <FullName size={size}>{getLocalValue(Player.Name, locale)}</FullName>

          <Position size={size}>{getLocalValue(Player.Amplua?.Name, locale) || "Нападающий"}</Position>
        </div>
        <Number size={size}>{Player.PlayerNumber}</Number>
      </InfoBlock>

      {Percent !== null ? (
        <PercentIndicator percent={Percent} data-percent={`${Percent}%`} />
      ) : (
        <Button
          type="red"
          onClick={() => onVote(Id)}
          dangerouslySetInnerHTML={{ __html: langVoting[locale].voteToPlayer }}
        />
      )}
    </Container>
  );
};

const Container = styled.div<{ size?: number }>`
  background: ${({ theme }) => theme.colors.black_white};
  color: ${({ theme }) => theme.colors.white_black};
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: ${(props) => (props.size === 4 ? "0.83vw" : "1.25vw")};
  width: ${(props) => (props.size === 4 ? "19.67vw" : "26.66vw")};
  position: relative;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-row-gap: 2.09vw;
    width: 45.37vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-row-gap: 2.13vw;
    width: 44.53vw;
  }
`;

const PhotoBlock = styled.div<{ size?: number }>`
  position: relative;
  height: ${(props) => (props.size === 4 ? "16.98vw" : "23.02vw")};
  width: 100%;
  overflow: hidden;

  :after {
    content: " ";
    position: absolute;
    top: 0;
    height: ${(props) => (props.size === 4 ? "16.98vw" : "23.02vw")};
    right: 0;
    left: 0;
    background: linear-gradient(180deg, rgba(13, 17, 22, 0) 28.7%, #0d1116 100%);
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    height: 34.81vw;
    :after {
      height: 34.81vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: 34.13vw;
    :after {
      height: 34.13vw;
    }
  }
`;

const PhotoContainer = styled.div<{ size?: number }>`
  width: ${(props) => (props.size === 4 ? "12.92vw" : "17.5vw")};
  height: ${(props) => (props.size === 4 ? "14.95vw" : "20.26vw")};
  margin: 2.76vw auto 0;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 29.87vw;
    height: 34.81vw;
    margin: auto;
    :after {
      height: 34.81vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 29.6vw;
    height: 34.13vw;
    :after {
      height: 34.13vw;
    }
  }
`;

const ChooseContainer = styled.div`
  position: absolute;
  left: 0;
  top: 1.25vw;
  display: flex;
  align-items: center;

  background-color: ${theme.colors.white}20;
  padding: 0.21vw 0.42vw;
  border-radius: 1.04vw;

  font-size: 0.73vw;
  z-index: 1;

  svg {
    margin-right: 0.42vw;
    font-size: 1.04vw;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    top: 2.09vw;
    border-radius: 2.61vw;
    padding: 0.52vw 1.04vw;
    font-size: 1.83vw;

    svg {
      margin-right: 1.04vw;
      font-size: 2.61vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    top: 0;
    border-radius: 5.33vw;
    padding: 0.53vw 1.07vw;
    font-size: 3.2vw;

    svg {
      margin-right: 2.13vw;
      font-size: 4.27vw;
    }
  }
`;

const InfoBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FullName = styled.div<{ size?: number }>`
  font-weight: 700;
  text-transform: uppercase;
  font-size: ${(props) => (props.size === 4 ? "0.83vw" : "1.25vw")};
  margin-bottom: 0.42vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.09vw;
    margin-bottom: 0.52vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-weight: 500;
    font-size: 3.2vw;
    margin-bottom: 0;
  }
`;

const Position = styled.div<{ size?: number }>`
  color: ${({ theme }) => theme.colors.gray_grayDark1};
  font-size: ${(props) => (props.size === 4 ? "0.93vw" : "1.25vw")};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.35vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
  }
`;

const Number = styled.span<{ size?: number }>`
  color: ${theme.colors.red};
  font-weight: 700;
  font-size: ${(props) => (props.size === 4 ? "2.71vw" : "3.23vw")};
  min-width: 5.05vw;
  text-align: center;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 6.78vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 6.4vw;
  }
`;

const Button = styled(CustomButton)`
  justify-content: center;
  padding: 0.83vw;
  .button_text {
    margin-left: 0.21vw;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 1.83vw;
    .button_text {
      margin-left: 0.52vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 100%;
    box-sizing: border-box;

    .button_text {
      display: none;
    }
  }
`;

const PercentIndicator = styled.div<{ percent: number }>`
  background: ${({ theme }) => theme.colors.blackLight_gray1};
  position: relative;
  height: 1.67vw;
  align-self: center;
  margin-right: 2.6vw;
  display: flex;
  align-items: center;

  &::before {
    content: "";
    background: ${theme.colors.red};
    position: absolute;
    right: ${({ percent }) => `${100 - percent}%`};
    left: 0;
    bottom: 0;
    top: 0;
  }

  &::after {
    content: attr(data-percent);
    color: ${({ theme }) => theme.colors.white_black};
    position: absolute;
    left: calc(100% + 0.5vw);
    font-size: 0.83vw;
    font-weight: 700;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    height: 4.18vw;
    margin-right: 6.52vw;

    &::after {
      left: calc(100% + 1vw);
      font-size: 2.09vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: 6.13vw;
    margin-right: 12vw;
    align-self: flex-start;
    /* margin-top: 4.53vw; */

    &::after {
      left: calc(100% + 2vw);
      font-size: 3.73vw;
      font-weight: 600;
    }
  }
`;
