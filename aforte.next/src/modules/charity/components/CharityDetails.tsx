import styled from "astroturf/react";
import { TitleH1 } from "../../../common/components/TitleH1";
import { Articles } from "../../articles/components/Articles";
import { NextImage } from "../../../common/components/NextImage";
import { Button } from "../../../common/components/Button";
import { CharityDetailsT } from "../interfaces/charity";
import { XSSProtection } from "../../products/utils/XSSProtection";

export const CharityDetails = (props: CharityDetailsT) => {
  return (
    <Container>
      <ContainerHead>
        <Label>{props.label}</Label>
        <TitleH1 title={props.title} />
        <Articles.DateAndView date={props.date} view={props.view} time={props.time} />
      </ContainerHead>
      <ContainerContent>
        <ContainerImage>
          <NextImage src={props.image} alt={"charity"} />
        </ContainerImage>
        <div>
          <div
            dangerouslySetInnerHTML={{
              __html: XSSProtection(props.description.replace(/(\r\n|\r|\n)/g, "<br>")),
            }}
          />

          <CustomButton typeBtn={"blue"}>Помочь детям</CustomButton>
        </div>
      </ContainerContent>
    </Container>
  );
};

const Container = styled.div`
  @import "variables";

  padding: 32px 40px 40px;
  background: $white;
  color: $black;
  border-radius: 40px;

  & > div {
    max-width: 700px;
    width: 100%;
  }

  @include respond-to(small) {
    padding: 20px;

    & > div {
      max-width: 100%;
    }
  }
`;

const ContainerHead = styled.div`
  display: grid;
  grid-row-gap: 8px;
`;

const Label = styled.div`
  @import "variables";

  font-weight: 500;
  font-size: 13px;
  line-height: 137%;
  color: $blue1;
`;

const ContainerContent = styled.div`
  @import "variables";

  display: grid;
  grid-template-columns: 290px 1fr;
  grid-column-gap: 20px;
  margin-top: 24px;
  font-weight: 400;
  font-size: 14px;
  line-height: 160%;
  letter-spacing: 0.02em;

  @include respond-to(small) {
    grid-template-columns: 1fr;
    grid-row-gap: 16px;
  }
`;

const ContainerImage = styled.div`
  @import "variables";

  max-width: 1000px;
  width: 100%;
  height: auto;

  img {
    position: relative !important;
    height: unset !important;
  }

  @include respond-to(small) {
    height: 350px;
    img {
      position: absolute !important;
      height: 100% !important;
    }
  }
`;

const CustomButton = styled(Button)`
  @import "variables";

  margin-top: 20px;
  padding: 16px 40px;

  @include respond-to(small) {
    margin-top: 16px;
    width: 100%;
  }
`;
