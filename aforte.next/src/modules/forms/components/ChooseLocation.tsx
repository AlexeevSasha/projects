import { getLocationsWithAbort } from "api/outletsApi";
import styled from "astroturf/react";
import { Button } from "common/components/Button";
import { AppContext } from "common/components/ContextProvider";
import { Input } from "common/components/inputs/Input";
import { NextImage } from "common/components/NextImage";
import { LocationT } from "common/interfaces/location";
import { ModalNames } from "common/interfaces/modal";
import { ChangeEvent, useContext, useEffect, useState } from "react";

export const ChooseLocation = () => {
  const { closeModal, initialData, updateLocation } = useContext(AppContext);
  const [exampleLocations, setExampleLocations] = useState<LocationT[]>([]);
  const [abortSignal, setAbortSignal] = useState<any>();
  const [searchResult, setSearchResult] = useState<LocationT[]>([]);

  useEffect(() => {
    if (!exampleLocations.length) {
      getLocationsWithAbort({ page: 1, limit: 5 }).promise.then(
        (res) => res.errors && !res.errors.length && setExampleLocations(res.data.items)
      );
    }
  }, []);

  const serachLocations = (value: ChangeEvent<HTMLInputElement>) => {
    if (typeof abortSignal?.abort === "function") abortSignal.abort();
    console.log("value", value.currentTarget.value);
    const { promise, abortController } = getLocationsWithAbort({
      page: 1,
      limit: 5,
      search: value.currentTarget.value,
    });
    promise.then((res) => res.errors && !res.errors.length && setSearchResult(res.data.items));
    setAbortSignal(abortController);
  };

  return (
    <Container>
      <ImageContainer>
        <NextImage src="/images/chooseLocation.svg" alt="Пилюля и карта" />
      </ImageContainer>
      <EnterContainer>
        <Title>Выберите город</Title>
        <Description>Более 2 000 000 аптек в 40 городах России</Description>
        <InputContainer>
          <Input placeholder="Введите название города" onChange={serachLocations} />
          <CustomButton type="blue">Сохранить</CustomButton>
          {searchResult.length ? (
            <TooltipContainer>
              {searchResult.map((elem) => (
                <TooltipElem
                  key={elem.regionFias}
                  onClick={() => {
                    updateLocation?.(elem);
                    closeModal(ModalNames.POPUP_MODAL);
                  }}
                >
                  {elem.region}, {elem.location}
                </TooltipElem>
              ))}
            </TooltipContainer>
          ) : null}
        </InputContainer>
        <Example>
          Например:{" "}
          {exampleLocations.map((elem, index) => (
            <>
              <ExampleLink
                key={elem.regionFias}
                onClick={() => {
                  updateLocation?.(elem);
                  closeModal(ModalNames.POPUP_MODAL);
                }}
              >
                {elem.location}
              </ExampleLink>
              {index !== exampleLocations.length - 1 ? ", " : ""}
            </>
          ))}
        </Example>
      </EnterContainer>
    </Container>
  );
};

const Container = styled.div`
  @import "variables";

  display: flex;
  padding: 40px;
  width: 940px;

  @include respond-to(large) {
    width: 650px;
  }
  @include respond-to(small) {
    display: block;
    padding: 24px;
    width: 100%;
  }
`;

const ImageContainer = styled.div`
  @import "variables";

  width: 100%;
  max-width: 190px;
  height: 190px;

  @include respond-to(small) {
    background: $grey;
    max-width: 100%;
    padding: 15px;
    border-radius: 28px;
  }
`;

const EnterContainer = styled.div`
  @import "variables";

  display: flex;
  flex-direction: column;
  width: 100%;

  margin-left: 40px;

  @include respond-to(small) {
    margin: 16px 0 0;
    text-align: center;
  }
`;

const Title = styled.span`
  @import "variables";

  font-weight: 700;
  font-size: 24px;
  color: $black;

  margin-bottom: 16px;
`;

const Description = styled.span`
  @import "variables";

  font-weight: 400;
  font-size: 14px;
  color: $black;

  margin-bottom: 16px;
`;

const InputContainer = styled.div`
  @import "variables";

  display: flex;
  margin-bottom: 16px;
  position: relative;

  @include respond-to(small) {
    flex-direction: column;
  }
`;

const TooltipContainer = styled.div`
  @import "variables";

  position: absolute;
  background: $white;
  box-shadow: 8px 8px 24px rgba(19, 51, 103, 0.08);
  border-radius: 16px;
  padding: 8px;
  width: 464px;
  top: 60px;

  @include respond-to(large) {
    width: 380px;
  }

  @include respond-to(small) {
    width: 100%;

    bottom: 130px;
    top: auto;
  }
`;

const TooltipElem = styled.div`
  @import "variables";

  padding: 8px 16px;
  font-weight: 600;
  color: $black;
  cursor: pointer;
  text-align: left;

  &:hover {
    color: $blue1;
    background: $gray;
  }
`;

const CustomButton = styled(Button)`
  @import "variables";

  padding: 16px 40px;
  margin-left: 10px;
  width: fit-content;

  @include respond-to(small) {
    width: 100%;
    margin: 16px 0 0;
  }
`;

const Example = styled.p`
  @import "variables";

  display: flex;
  margin: 0;

  color: $blackOpacity;

  @include respond-to(small) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const ExampleLink = styled.span`
  @import "variables";

  white-space: nowrap;
  font-weight: 500;
  font-size: 14px;
  color: $blue1;
  cursor: pointer;
  margin-left: 4px;

  &:hover {
    text-decoration: underline;
  }
`;
