import { useRouter } from "next/router";
import styled from "styled-components";
import { theme } from "../../../../assets/theme/theme";
import { ContainerContent } from "../../../../components/containers/containerContent";
import { langVoting } from "../lang/langVoting";

export const MatchFooter = () => {
  const { locale = "ru" } = useRouter();

  return (
    <Container>
      <Title>{langVoting[locale].matchFooterHeader}</Title>

      <AboutBlock>
        <AboutDesc>
          <P dangerouslySetInnerHTML={{ __html: langVoting[locale].matchFooterText1 }} />
          <P dangerouslySetInnerHTML={{ __html: langVoting[locale].matchFooterText2 }} />
        </AboutDesc>
      </AboutBlock>
    </Container>
  );
};

const Container = styled(ContainerContent)`
  color: ${({ theme }) => theme.colors.white_black};
  font-family: "FCSM Text";
  flex-flow: column;
  align-items: flex-start;
  margin-bottom: 6.66vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-bottom: 10.43vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-bottom: 10.66vw;
  }
`;

const Title = styled.h3`
  font-weight: 700;
  font-size: 2.7vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 5.21vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 8.53vw;
  }
`;

const P = styled.p`
  font-weight: 500;
  letter-spacing: 0.1px;
  color: ${({ theme }) => theme.colors.grayLight_grayDark};
  font-size: 0.9375vw;
  width: 50%;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.34vw;
    width: 100%;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.26vw;
  }

  & > a {
    color: ${theme.colors.red};
  }
`;

const AboutBlock = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: relative;
`;

const AboutDesc = styled.div`
  width: 100%;
  font-size: 0.9375vw;
  color: ${({ theme }) => theme.colors.grayLight_grayDark};
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    height: auto;
    font-size: 2.34vw;
    display: block;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.26vw;
  }
`;
