import { useRouter } from "next/router";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { FormProvider, SubmitHandler, useController, useForm } from "react-hook-form";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { catalogRepository } from "../../../api/catalogRepository";
import { SaveFanDataDto, userRepository } from "../../../api/userRepository";
import { formatDate, getDateFromString } from "../../../assets/constants/date";
import { theme } from "../../../assets/theme/theme";
import { CustomButton } from "../../../components/buttons/customButton";
import { DropdownList } from "../../../components/dropdownList/dropdownList";
import { Input } from "../../../components/input/input";
import { InputDate } from "../../../components/input/inputDate";
import { DataContext } from "../../../core/dataProvider";
import { ListOfRadioButtons } from "../../../components/radioButton/listOfRadioButtons";
import { SelectOption } from "../../../components/select/select";
import { LoadingScreen } from "../../../ui/LoadingScreen ";
import { AddresForm } from "./addresForm";
import { Rules } from "./validationsRules";
import { ThemeContext } from "../../../core/themeProvider";

export const FanCardForm = () => {
  const { locale = "ru" } = useRouter();
  const [loading, setLoading] = useState(false);
  const { auth: { user = undefined } = {}, setShowNotification } = useContext(DataContext);
  const { isDarkTheme } = useContext(ThemeContext);

  const { control, handleSubmit, ...methods } = useForm<SaveFanDataDto>({
    mode: "onBlur",
    defaultValues: user?.fanData,
  });

  const { commonRule: rules, seriesRule, numberRule, codeRule, dateRule } = useMemo(() => new Rules(locale), [locale]);

  const { field: series, fieldState: seriesState } = useController({
    control,
    name: "Passport.Series",
    rules: seriesRule,
  });
  const { field: number, fieldState: numberState } = useController({
    control,
    name: "Passport.Number",
    rules: numberRule,
  });
  const { field: code, fieldState: codeState } = useController({
    control,
    name: "Passport.IssuedByCode",
    rules: codeRule,
  });
  const { field: whenIssued, fieldState: whenIssuedState } = useController({
    control,
    name: "Passport.WhenIssued",
    rules: dateRule,
  });
  const { field: issuedBy, fieldState: issuedByState } = useController({ control, name: "Passport.IssuedBy", rules });
  const { field: birthPlace, fieldState: birthPlaceState } = useController({
    control,
    name: "Passport.BirthPlace",
    rules,
  });
  const { field: addressEqual, fieldState: addressEqualState } = useController({
    control,
    name: "AddressesAreEqual",
    defaultValue: true,
  });

  const onSubmit: SubmitHandler<SaveFanDataDto> = async (data) => {
    await userRepository
      .saveFanData(data)
      .then(() => setShowNotification(true))
      .catch();
  };

  const regionsRef = useRef<SelectOption[]>([]);
  const citiesRef = useRef<SelectOption[]>([]);

  useEffect(() => {
    setLoading(true);
    Promise.all([catalogRepository.fetchRegions(locale), catalogRepository.fetchCities(locale)])
      .then(([regionsRes, citiesRes]) => {
        regionsRef.current = regionsRes.map(({ ItemId, ItemName }) => ({ value: ItemId, label: ItemName }));
        citiesRef.current = citiesRes.map(({ ItemId, ItemName }) => ({ value: ItemId, label: ItemName }));
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <DropdownList title={lang[locale].pagePersonalData.questionnaire.questionnaire}>
      {loading && <LoadingScreen />}

      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormTitle>{lang[locale].pagePersonalData.questionnaire.passport}</FormTitle>

        <InputsContainer>
          <InputBlock>
            <Input
              lightStyle={!isDarkTheme}
              error={seriesState.error?.message}
              value={series.value}
              onChange={series.onChange}
              onBlur={series.onBlur}
              label={`${lang[locale].form.inputs.series} *`}
            />

            <Input
              lightStyle={!isDarkTheme}
              error={numberState.error?.message}
              value={number.value}
              onChange={number.onChange}
              onBlur={number.onBlur}
              label={`${lang[locale].form.inputs.number} *`}
            />

            <Input
              lightStyle={!isDarkTheme}
              error={codeState.error?.message}
              value={code.value?.split("-").join("")}
              onChange={(e) => {
                code.onChange((e.currentTarget.value || "").slice(0, 3) + "-" + (e.currentTarget.value || "").slice(3));
              }}
              onBlur={code.onBlur}
              label={`${lang[locale].form.inputs.code} *`}
            />
          </InputBlock>

          <InputBlock>
            <InputDate
              lightStyle={!isDarkTheme}
              error={whenIssuedState.error?.message}
              value={getDateFromString(whenIssued.value || "")}
              onChange={(date: Date) =>
                whenIssued.onChange(date ? formatDate(date.toISOString(), "yyyy-MM-dd", locale) : undefined)
              }
              onBlur={whenIssued.onBlur}
              label={`${lang[locale].form.inputs.dateOfIssue} *`}
              maxDate={new Date()}
              locale={locale}
              showError
            />

            <Input
              lightStyle={!isDarkTheme}
              error={issuedByState.error?.message}
              value={issuedBy.value}
              onChange={issuedBy.onChange}
              onBlur={issuedBy.onBlur}
              label={`${lang[locale].form.inputs.whoIssued} *`}
            />

            <Input
              lightStyle={!isDarkTheme}
              error={birthPlaceState.error?.message}
              value={birthPlace.value}
              onChange={birthPlace.onChange}
              onBlur={birthPlace.onBlur}
              label={`${lang[locale].form.inputs.placeOfBirth} *`}
            />
          </InputBlock>
        </InputsContainer>

        <FormProvider control={control} handleSubmit={handleSubmit} {...methods}>
          <FormTitle>{lang[locale].pagePersonalData.questionnaire.registrationAddress}</FormTitle>

          <InputsContainer>
            <AddresForm
              field="RegistrationAddress"
              regionOptions={regionsRef.current}
              cityOptions={citiesRef.current}
            />
          </InputsContainer>
        </FormProvider>

        <FormTitle>{lang[locale].pagePersonalData.questionnaire.actualAddress}</FormTitle>

        <RadioGroupContainer>
          <ListOfRadioButtons
            lightStyle={!isDarkTheme}
            value={addressEqual.value ? "true" : "false"}
            changeValue={(value) => addressEqual.onChange(value === "true")}
            error={addressEqualState.error?.message}
            label={lang[locale].pagePersonalData.questionnaire.addressMatches}
            options={[
              { value: "true", label: "yes" },
              { value: "false", label: "no" },
            ]}
          />
        </RadioGroupContainer>

        {!addressEqual.value && (
          <FormProvider control={control} handleSubmit={handleSubmit} {...methods}>
            <InputsContainer>
              <AddresForm field="ActualAddress" regionOptions={regionsRef.current} cityOptions={citiesRef.current} />
            </InputsContainer>
          </FormProvider>
        )}

        <InputsContainer>
          <StyledButton type={"red"} onClick={handleSubmit(onSubmit)}>
            {lang[locale].form.validation.saveChanges}
          </StyledButton>
        </InputsContainer>
      </Form>
    </DropdownList>
  );
};

const Form = styled.form`
  & label > *:first-child {
    color: ${({ theme }) => theme.colors.gray_grayDark1};
    font-size: 0.83vw;
    padding-bottom: 0.21vw;

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      font-size: 2.09vw;
      padding-bottom: 0.52vw;
    }
    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      font-size: 4.27vw;
      padding-bottom: 1.07vw;
    }
  }
`;

const InputsContainer = styled.div`
  display: grid;
  width: 100%;
  justify-content: flex-start;
  grid-template-columns: repeat(2, 26.67vw);
  gap: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: 66.75vw;
    gap: 0;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-template-columns: 100%;
  }
`;

const InputBlock = styled.div`
  display: grid;

  & > * {
    margin-bottom: 1.25vw;

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      margin-bottom: 3.13vw;
    }
    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      margin-bottom: 6.4vw;
    }
  }
`;

const FormTitle = styled.p`
  font-family: FCSM text, sans-serif;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.grayLight_black};
  font-size: 1.67vw;
  padding: 0.84vw 0 1.25vw 0;
  margin: 0;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 3.13vw;
    padding: 2.09vw 0 1.56vw 0;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 6.4vw;
    padding: 4.27vw 0 1.07vw 0;
  }
`;

const RadioGroupContainer = styled.div`
  display: grid;
  width: 100%;
  justify-content: flex-start;
  grid-template-columns: repeat(2, 26.67vw);
  gap: 1.25vw;
  padding-bottom: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: 1fr 1fr;
    padding-bottom: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-template-columns: 100%;
    gap: 6.4vw;
    padding-bottom: 6.4vw;
  }
`;

const StyledButton = styled(CustomButton)`
  justify-content: center;
`;
