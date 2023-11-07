import styled from "astroturf/react";
import { IconCertificates } from "../icons/IconCertificates";
import { CompanyT } from "../../interfaces/company";

type Props = Pick<CompanyT, "certificatesAndLicenses">;

export const CertificatesAndLicenses = ({ certificatesAndLicenses }: Props) => {
  return (
    <Container>
      <h3>{certificatesAndLicenses.title}</h3>
      <ContainerCards>
        {certificatesAndLicenses?.files.map((el, i) => (
          <ContainerCard key={i}>
            <CircleIcon>
              <IconCertificates />
            </CircleIcon>
            <div>
              {el.title}
              <br />
              <span>{el.size}</span>
            </div>
          </ContainerCard>
        ))}
      </ContainerCards>
    </Container>
  );
};

const Container = styled.div`
  @import "variables";

  border-radius: 40px;
  padding: 40px;
  background: $white;
  color: $black;

  h3 {
    font-weight: 600;
    font-size: 20px;
    margin: 0 0 32px;
  }

  @include respond-to(small) {
    padding: 24px 20px;

    h3 {
      margin-bottom: 20px;
      font-size: 18px;
    }
  }
`;

const ContainerCards = styled.div`
  @import "variables";

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 60px;
  grid-row-gap: 20px;

  @include respond-to(small) {
    grid-template-columns: 1fr;
    grid-row-gap: 16px;
  }
`;

const ContainerCard = styled.div`
  cursor: pointer;
  display: grid;
  grid-template-columns: 48px 1fr;
  grid-column-gap: 16px;
  font-weight: 500;
  font-size: 14px;
  line-height: 160%;

  span {
    margin-top: 4px;
    font-weight: 400;
    font-size: 14px;
    line-height: 137%;
    letter-spacing: 0.02em;
    opacity: 0.4;
  }
`;

const CircleIcon = styled.div`
  @import "variables";

  width: 48px;
  height: 48px;
  padding: 16px;
  background: rgba(83, 131, 199, 0.1);
  border-radius: 50%;

  svg {
    opacity: 0.6;
    display: block;
    width: 16px;
    height: 16px;

    path {
      fill: $blue1;
    }
  }
`;
