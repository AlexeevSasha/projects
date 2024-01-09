import styled from "styled-components";
import { theme } from "../../assets/theme/theme";

export const ShowMore = styled.a`
  font-weight: 700;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.grayLight_grayDark1};
  text-transform: uppercase;
  width: fit-content;
  display: flex;
  margin-left: auto;
  font-size: 0.83vw;
  margin-top: 0.83vw;

  @media (max-width: ${theme.rubberSize.desktop}) {
    position: relative;
    font-size: 2.08vw;
    margin-top: 2.08vw;
  }

  @media (max-width: ${theme.rubberSize.tablet}) {
    position: relative;
    font-size: 3.73vw;
    margin-top: 4.26vw;
  }
`;

export const CardContainer = styled.div<{ isInDropdown?: boolean }>`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin-top: ${(props) => (props.isInDropdown ? "-1.04vw" : "")};
  gap: 1.24vw;

  @media (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: 1fr 1fr;
    gap: 3.13vw;
  }

  @media (max-width: ${theme.rubberSize.tablet}) {
    grid-template-columns: 1fr;
    gap: 4.266vw;
  }
`;
