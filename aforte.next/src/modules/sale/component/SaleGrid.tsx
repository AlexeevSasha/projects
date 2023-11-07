import { SaleT } from "../interfaces/sale";
import styled from "astroturf/react";
import { SaleCard } from "./SaleCard";
import { Pagination } from "../../../common/components/Pagination";
import { Button } from "../../../common/components/Button";

type Props = {
  sales: SaleT[];
};

export const SaleGrid = ({ sales }: Props) => {
  return (
    <div>
      <Container>
        {sales.map((el) => (
          <SaleCard key={el.id} {...el} />
        ))}
      </Container>
      <Pagination total={6} onChange={() => {}} />
      <CustomButton typeBtn={"blueWhite"}>Больше акций</CustomButton>
    </div>
  );
};

const Container = styled.div`
  @import "variables";

  display: grid;
  grid-template-columns: repeat(2, minmax(220px, 1fr));
  grid-gap: 24px;
  margin-bottom: 16px;

  @media (max-width: 1200px) {
    grid-template-columns: minmax(160px, 1fr);
  }

  @include respond-to(small) {
    margin-bottom: 8px;
    grid-gap: 8px;
  }
`;

const CustomButton = styled(Button)`
  @import "variables";

  width: 100%;
  padding: 17px;
  display: none;

  @include respond-to(small) {
    display: block;
  }
`;
