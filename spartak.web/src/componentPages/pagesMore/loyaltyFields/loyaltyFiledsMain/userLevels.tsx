import React from "react";
import styled from "styled-components";
import { LoyaltyMainDataType } from "../../../../../pages/more/loyalty/main";
import { theme } from "../../../../assets/theme/theme";
// import { TextWithRedPoint } from "../../../../components/textWithRedPoint/textWithRedPoint";
import { UserLevelTable } from "./userLevelTable";

type Iprops = LoyaltyMainDataType["userLevels"];

export const UserLevels = (props: Iprops) => {
  return (
    <Container>
      <Title>{props.title}</Title>

      <TableContainer>
        <UserLevelTable {...props} />

        <P dangerouslySetInnerHTML={{ __html: props.bottomText }} />

        {/* <BottomContainer>
          <TextWithRedPoint>
            <Text dangerouslySetInnerHTML={{ __html: props.list[0].title }} />
          </TextWithRedPoint>

          <TextWithRedPoint>
            <Text dangerouslySetInnerHTML={{ __html: props.list[1].title }} />
          </TextWithRedPoint>

          <TextWithRedPoint>
            <Text dangerouslySetInnerHTML={{ __html: props.list[2].title }} />
          </TextWithRedPoint>

          <TextWithRedPoint>
            <Text dangerouslySetInnerHTML={{ __html: props.list[3].title }} />
          </TextWithRedPoint>
        </BottomContainer> */}
      </TableContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h6`
  margin: 0 0 1.25vw;
  font-weight: 700;
  font-size: 2.71vw;
  line-height: 3.33vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin: 0 0 3.13vw;
    font-size: 5.22vw;
    line-height: 6.52vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin: 0 0 6.4vw;
    font-size: 8.53vw;
    line-height: 11.2vw;
  }
`;

const TableContainer = styled.div`
  margin-bottom: 2.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-row-gap: 0.52vw;
    margin-bottom: 2.08vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-row-gap: 0.8vw;
    margin-bottom: 10.67vw;
  }
`;

const P = styled.p`
  margin: 0;
  font-size: 0.94vw;
  line-height: 1.46vw;
  letter-spacing: 0.1px;
  color: ${({ theme }) => theme.colors.grayLight_grayBlack};
  padding-right: 20.94vw;
  margin-top: 2.08vw;
  margin-bottom: 2.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding-right: 0;
    line-height: 3.65vw;
    font-size: 2.35vw;
    margin-top: 5.22vw;
    margin-bottom: 5.22vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    line-height: 5.87vw;
    font-size: 4.27vw;
    margin-top: 10.67vw;
    margin-bottom: 10.67vw;
  }
`;

// const BottomContainer = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   grid-gap: 1.25vw;

//   & > :nth-child(1n) {
//     margin: 0;
//     font-size: 0.94vw;
//     line-height: 1.46vw;
//     letter-spacing: 0.01vw;
//     color: ${({ theme }) => theme.colors.grayLight_grayDark};
//     align-items: baseline;
//   }

//   @media screen and (max-width: ${theme.rubberSize.desktop}) {
//     grid-template-columns: 1fr;
//     grid-gap: 3.13vw;

//     & > :nth-child(1n) {
//       font-size: 2.35vw;
//       line-height: 3.65vw;
//     }
//   }

//   @media screen and (max-width: ${theme.rubberSize.tablet}) {
//     grid-gap: 6.4vw;

//     & > :nth-child(1n) {
//       font-size: 4.8vw;
//       line-height: 7.47vw;
//     }
//   }
// `;

// const Text = styled.div`
//   margin: 0;
// `;
