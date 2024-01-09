import React, { useContext, useMemo, useState } from "react";
import { LoadingScreen } from "../../ui/LoadingScreen ";
import { FormContent, H1 } from "../../components/modal/modalUi";
import { Input } from "../../components/input/input";
import { CustomButton } from "../../components/buttons/customButton";
import styled from "styled-components";
import { theme } from "../../assets/theme/theme";
import { useRouter } from "next/router";
import { SubmitHandler, useController, useForm } from "react-hook-form";
import { InputDate } from "../../components/input/inputDate";
import { formatDate, getDateFromString } from "../../assets/constants/date";
import { lang } from "../../../public/locales/lang";
import { userRepository } from "../../api/userRepository";
import { Rules } from "./personalDataForm/validationsRules";
import { DataContext } from "../../core/dataProvider";

export interface Ipassport {
  Series: string;
  Number: string;
  WhenIssued: string;
  IssuedBy: string;
  IssuedByCode: string;
  BirthPlace: string;
}

interface IProps {
  onClose?: () => void;
}

export const PassportInfoForm = ({ onClose }: IProps) => {
  const { locale = "ru" } = useRouter();
  const [loading, setLoading] = useState(false);
  const { auth: { user = undefined } = {}, setUser } = useContext(DataContext);

  const { control, handleSubmit } = useForm<Ipassport>({ mode: "onChange" });

  const { commonRule: rules, seriesRule, numberRule, dateRule, codeRule } = useMemo(() => new Rules(locale), [locale]);

  const { field: Number, fieldState: NumberState } = useController({ control, name: "Number", rules: numberRule });
  const { field: WhenIssued, fieldState: WhenIssuedState } = useController({
    control,
    name: "WhenIssued",
    rules: dateRule,
  });
  const { field: IssuedBy, fieldState: IssuedByState } = useController({ control, name: "IssuedBy", rules });
  const { field: IssuedByCode, fieldState: IssuedByCodeState } = useController({
    control,
    name: "IssuedByCode",
    rules: codeRule,
  });
  const { field: Series, fieldState: SeriesState } = useController({
    control,
    name: "Series",
    rules: seriesRule,
  });
  const { field: BirthPlace, fieldState: BirthPlaceState } = useController({ control, name: "BirthPlace", rules });

  const onSubmit: SubmitHandler<Ipassport> = async (data) => {
    setLoading(true);
    const { fanData } = await userRepository.savePassportData(data);
    user &&
      fanData?.Passport &&
      setUser({ ...user, fanData: { ...(user.fanData || fanData), Passport: fanData.Passport } });
    setLoading(false);
    onClose?.();
  };

  return loading ? (
    <LoadingScreen />
  ) : (
    <Container>
      <Header>{lang[locale].tickets.shouldInputDataPassport}</Header>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormContent>
          <Input
            onChange={Series.onChange}
            value={Series.value}
            label={lang[locale].form.inputs.series}
            paddingPosition="right"
            lightStyle
            type="text"
            error={SeriesState.error?.message}
            onBlur={Series.onBlur}
          />
          <Input
            onChange={Number.onChange}
            value={Number.value}
            label={lang[locale].form.inputs.number}
            paddingPosition="right"
            lightStyle
            type="text"
            error={NumberState.error?.message}
            onBlur={Number.onBlur}
          />

          <Input
            paddingPosition="right"
            lightStyle
            type="text"
            error={IssuedByCodeState.error?.message}
            value={IssuedByCode.value?.split("-").join("")}
            onChange={(e) => {
              IssuedByCode.onChange(
                (e.currentTarget.value || "").slice(0, 3) + "-" + (e.currentTarget.value || "").slice(3)
              );
            }}
            onBlur={IssuedByCode.onBlur}
            label={lang[locale].form.inputs.code}
          />
          <Input
            onChange={IssuedBy.onChange}
            value={IssuedBy.value}
            label={`${lang[locale].form.inputs.whoIssued}`}
            paddingPosition="right"
            lightStyle
            type="text"
            error={IssuedByState.error?.message}
            onBlur={IssuedBy.onBlur}
          />

          <InputDate
            error={WhenIssuedState.error?.message}
            value={getDateFromString(WhenIssued.value || "")}
            onChange={(date: Date) =>
              WhenIssued.onChange(date ? formatDate(date.toISOString(), "yyyy-MM-dd", locale) : undefined)
            }
            onBlur={WhenIssued.onBlur}
            label={`${lang[locale].form.inputs.dateOfIssue}`}
            maxDate={new Date()}
            locale={locale}
            showError
            lightStyle
          />

          <Input
            onChange={BirthPlace.onChange}
            value={BirthPlace.value}
            label={`${lang[locale].form.inputs.placeOfBirth}`}
            paddingPosition="right"
            lightStyle
            type="text"
            error={BirthPlaceState.error?.message}
            onBlur={BirthPlace.onBlur}
          />
        </FormContent>
      </form>

      <StyledButton type="red" onClick={handleSubmit(onSubmit)} className="submitBtn">
        {lang[locale].auth.proceed}
      </StyledButton>
    </Container>
  );
};

const Container = styled.div`
  width: 18.54vw;
  margin: 0 auto;
  max-height: 100%;
  overflow-y: auto;
  overflow-x: hidden;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 100%;
  }
`;

const Header = styled(H1)`
  margin: 0 1.1vw 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin: 0 0 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin: 0 4vw 6vw;
  }
`;

const StyledButton = styled(CustomButton)`
  margin-top: 1.88vw;
`;
