import { VacancyT } from "../interfaces/vacancy";
import styled from "astroturf/react";

type Props = {
  vacancy: VacancyT;
  detail?: boolean;
};

export const Vacancy = ({ vacancy, detail }: Props) => {
  return (
    <Container detail={detail}>
      <InfoBlock detail={detail}>
        <Title detail={detail}>{vacancy.title}</Title>
        <Salary>{vacancy.salary ? `${vacancy.salary} Р` : "ЗП по договоренности"}</Salary>
      </InfoBlock>
      <City>{vacancy.city}</City>
    </Container>
  );
};

const Container = styled.div<{ detail?: boolean }>`
  @import "variables";

  width: 100%;
  height: 100%;
  background: $white;
  cursor: pointer;
  border-radius: 28px;
  padding: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  &.detail {
    flex-direction: column-reverse;
    padding: 24px;
  }

  @include respond-to(small) {
    flex-direction: column-reverse;
    padding: 20px;
  }
`;

const InfoBlock = styled.div<{ detail?: boolean }>`
  @import "variables";
  display: flex;
  flex-direction: column;
  &.detail {
    margin-top: 37px;
  }
  @include respond-to(small) {
    margin-top: 24px;
  }
`;

const Title = styled.span<{ detail?: boolean }>`
  @import "variables";
  font-weight: 600;
  font-size: 20px;
  line-height: 126%;
  &.detail {
    font-size: 18px;
  }
  @include respond-to(small) {
    font-size: 16px;
  }
`;

const Salary = styled.span`
  @import "variables";
  font-weight: 500;
  font-size: 16px;
  line-height: 126%;
  opacity: 0.3;
  margin-top: 12px;
  @include respond-to(small) {
    font-size: 13px;
    margin-top: 8px;
  }
`;

const City = styled.span`
  @import "variables";
  font-weight: 500;
  font-size: 16px;
  line-height: 126%;
  color: $orange1;
  @include respond-to(small) {
    font-size: 13px;
  }
`;
