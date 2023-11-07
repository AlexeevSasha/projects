import styled from "astroturf/react";
import { Product } from "../../products/components/Product";
import { NextImage } from "../../../common/components/NextImage";
import { CustomSwiper } from "../../slider/components/CustomSwiper";
import { XSSProtection } from "../../products/utils/XSSProtection";
import { MetaCatalogueT } from "../interfaces/metaCatalogue";

type Props = Pick<
  MetaCatalogueT,
  "description" | "descriptionSections" | "images" | "certificate" | "shortDescription"
>;

export const InstructionsUseMedicinalProduct = (props: Props) => {
  return (
    <Container>
      <div>
        <InstructionsUseTitle>
          {props.shortDescription ? (
            <div
              dangerouslySetInnerHTML={{
                __html: XSSProtection(props.shortDescription.replace(/(\r\n|\r|\n)/g, "<br>")),
              }}
            />
          ) : null}
          {props.description ? (
            <p
              dangerouslySetInnerHTML={{
                __html: XSSProtection(props.description.replace(/(\r\n|\r|\n)/g, "<br>")),
              }}
            />
          ) : null}
        </InstructionsUseTitle>
        <Product.DescriptionSections descriptionSections={props.descriptionSections} />
      </div>
      {props.certificate.length ? (
        <div>
          <TitleSlider>Сертификаты Фарингосепт</TitleSlider>
          <CustomSwiper<string>
            id={"image-certificate-slider"}
            items={props.certificate}
            sliderSettings={{ desktopSB: 14, mobileSB: 14 }}
            arrowSettings={{ size: "sm" }}
          >
            {(param) => (
              <ContainerImages isCertificate>
                <NextImage src={param} alt={"certificate"} />
              </ContainerImages>
            )}
          </CustomSwiper>
        </div>
      ) : null}
      {props.images.length ? (
        <div>
          <TitleSlider>Фотографии Фарингосепт</TitleSlider>
          <CustomSwiper<string>
            id={"image-medical-slider"}
            items={props.images}
            sliderSettings={{ desktopSB: 14, mobileSB: 14 }}
            arrowSettings={{ size: "sm" }}
          >
            {(param) => (
              <ContainerImages>
                <NextImage src={param} alt={"medical"} />
              </ContainerImages>
            )}
          </CustomSwiper>
        </div>
      ) : null}
    </Container>
  );
};

const Container = styled.div`
  @import "variables";

  display: grid;
  grid-template-columns: minmax(300px, 1fr);
  grid-row-gap: 43px;
  color: $black;
  background: $white;
  border-radius: 32px;
  padding: 40px;

  @include respond-to(small) {
    padding: 24px 12px;
    grid-row-gap: 24px;
  }
`;

const ContainerImages = styled.div<{ isCertificate?: boolean }>`
  @import "variables";

  padding: 8px;
  background: rgba($blue-1, 0.1);
  border-radius: 28px;
  width: 124px;
  height: 124px;

  &.isCertificate {
    background: $white;
    height: 160px;
  }

  @include respond-to(small) {
    width: 80px;
    height: 80px;
    padding: 5px;

    &.isCertificate {
      height: 110px;
      padding: 7px 5px;
    }
  }
`;

const TitleSlider = styled.div`
  @import "variables";

  font-weight: 600;
  font-size: 16px;
  line-height: 137%;
  letter-spacing: 0.02em;
  margin-bottom: 20px;

  @include respond-to(small) {
    margin-bottom: 12px;
  }
`;

const InstructionsUseTitle = styled.div`
  @import "variables";

  margin-bottom: 28px;
  font-weight: 600;
  font-size: 16px;
  line-height: 137%;
  letter-spacing: 0.02em;

  p {
    margin: 12px 0 0;
    font-weight: 400;
    font-size: 14px;
    line-height: 26px;
  }

  @include respond-to(small) {
    margin: 0 8px 16px;
    p {
      margin: 10px 0 0;
    }
  }
`;
