import styled from "styled-components";
import { theme } from "../../../assets/theme/theme";
import { BannerBackground } from "../../../components/containers/containerBanner";

interface IProps {
  nickName: string;
}

const tooLongWord = (str: string) => {
  if (str.includes(" ")) {
    return new Array(...str.split(" ")).filter((word) => word.length > 12).length > 0;
  } else return str.length > 12;
};

export const NameplateView = (props: IProps) => {
  return (
    <NamePlateContainer>
      <TextContainer size={!tooLongWord(props.nickName) ? "md" : "sm"}>
        <Text multiline={props.nickName.includes(" ")}>{props.nickName}</Text>
      </TextContainer>
      <BannerBackground
        srcL={"/images/profile/nameplateBgL_v1.0.0.png"}
        srcM={"/images/profile/nameplateBgL_v1.0.0.png"}
        srcS={"/images/profile/nameplateBgM_v1.0.0.png"}
      />
    </NamePlateContainer>
  );
};

const NamePlateContainer = styled.div`
  position: absolute;
  width: 17.71vw;
  height: 4.79vw;
  right: 8.75vw;
  top: 12.71vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 44.33vw;
    height: 11.99vw;
    right: 3.13vw;
    top: 18.51vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 54.67vw;
    height: 14.67vw;
    right: 4.27vw;
    top: 24.8vw;
  }
`;

const TextContainer = styled.div<{ size: string }>`
  position: absolute;
  z-index: 2;
  color: ${theme.colors.black};
  font-weight: 700;
  font-size: ${({ size }) => (size === "md" ? "0.83vw" : "0.73vw")};
  left: 4.8vw;
  right: 0;
  bottom: 1.8vw;
  top: 1vw;
  display: flex;
  align-items: center;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.09vw;
    font-size: ${({ size }) => (size === "md" ? "2vw" : "1.83vw")};
    left: 12vw;
    bottom: 5vw;
    top: 2.5vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 2.09vw;
    font-size: ${({ size }) => (size === "md" ? "2.09vw" : "1.96vw")};
    left: 20.27vw;
    bottom: 5vw;
  }

  @media screen and (max-width: ${theme.rubberSize.phone}) {
    font-size: 2.67vw;
    font-size: ${({ size }) => (size === "md" ? "2.67vw" : "2.4vw")};
    bottom: 6vw;
  }
`;

const Text = styled.p<{ multiline: boolean }>`
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  flex: 0 1 auto;
  -webkit-line-clamp: ${({ multiline }) => (multiline ? "2" : "1")};
`;
