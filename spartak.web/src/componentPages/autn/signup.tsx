import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useMemo, useState } from "react";
import { SubmitHandler, useController, useForm } from "react-hook-form";
import styled from "styled-components";
import { lang } from "../../../public/locales/lang";
import { authRepository } from "../../api/authRepository";
import { formatDate, getDateFromString, toISOString } from "../../assets/constants/date";
import { CheckCircleIcon } from "../../assets/icon/checkCircle";
import { IconInfo } from "../../assets/icon/iconInfo";
import tail from "../../assets/icon/tail.svg";
import { WarningTriangle } from "../../assets/icon/warningTriangle";
import { theme } from "../../assets/theme/theme";
import { Alert as AlertModal } from "../../components/alert";
import { CustomButton } from "../../components/buttons/customButton";
import { Checkbox } from "../../components/checkbox";
import { Input } from "../../components/input/input";
import { InputDate } from "../../components/input/inputDate";
import { InputPhone } from "../../components/input/inputPhone";
import { Alert } from "../../components/modal/modalUi";
import { ListOfRadioButtons } from "../../components/radioButton/listOfRadioButtons";
import { Spacer } from "../../components/spacer";
import { ThemeContext } from "../../core/themeProvider";
import { AuthState, ModalContent } from "./authModal";
import { Rules } from "./validationsRules";

type Props = AuthState & {
  setState?: (callBack: (state: AuthState) => AuthState) => void;
};

export type SignUpFormValues = {
  userId?: string;
  email?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  birthDay?: string;
  phoneNumber?: string;
  password?: string;
  gender?: string;
  isBecomeSteward?: boolean;
  allowedToUseWinLine?: boolean;
  termsAgree?: boolean;
  confirm?: string;
};

export const Signup = ({ setState }: Props) => {
  const { locale = "ru" } = useRouter();
  const { isDarkTheme } = useContext(ThemeContext);
  const { control, handleSubmit, formState, getValues, setError } = useForm<SignUpFormValues>({
    mode: "onBlur",
    shouldFocusError: true,
  });

  const { phoneRule, passwordRule, emailRule, nameRule, middleNameRule, confirmRule, birthDayRule } = useMemo(
    () => new Rules(locale, getValues),
    [locale]
  );

  const { field: email, fieldState: emailState } = useController({ control, name: "email", rules: emailRule });
  const { field: name, fieldState: nameState } = useController({ control, name: "firstName", rules: nameRule });
  const { field: middleName, fieldState: middleNameState } = useController({
    control,
    name: "middleName",
    rules: middleNameRule,
  });
  const { field: lastName, fieldState: lastNameState } = useController({ control, name: "lastName", rules: nameRule });
  const { field: birthDay, fieldState: birthDayState } = useController({
    control,
    name: "birthDay",
    rules: birthDayRule,
  });
  const { field: phoneNumber, fieldState: phoneState } = useController({
    control,
    name: "phoneNumber",
    rules: phoneRule,
  });
  const { field: password, fieldState: passState } = useController({ control, name: "password", rules: passwordRule });
  const { field: gender, fieldState: genderState } = useController({ control, name: "gender" });
  const { field: steward } = useController({ control, name: "isBecomeSteward", defaultValue: false });
  const { field: newsAgree } = useController({ control, name: "allowedToUseWinLine", defaultValue: false });
  const { field: termsAgree } = useController({ control, name: "termsAgree", defaultValue: true });
  const { field: confirm, fieldState: confirmState } = useController({ control, name: "confirm", rules: confirmRule });

  const [promptIsVisible, setPromptIsVisible] = useState(false);
  const [existUser, setUserIsExist] = useState(false);
  const [alertText, setAlertText] = useState<string | undefined>();

  const setUserData = (userData: SignUpFormValues, form: ModalContent) =>
    setState?.((state) => ({ ...state, userData, form }));

  const onSubmit: SubmitHandler<SignUpFormValues> = ({ termsAgree, ...data }) => {
    if (!Object.keys(formState.errors).length && termsAgree) {
      authRepository
        .tryRegisterUser(data)
        .then((userId) => setUserData({ ...data, termsAgree, userId }, "code"))
        .catch((e: { type?: string; data?: { Phone?: string; Email?: string } } | any) => {
          console.log(e);
          if (e.type === "errors.UserAlreadyExistException.RegisterRequest") {
            console.log("if");
            e.data?.Phone &&
              setError("phoneNumber", { message: lang[locale].auth.changePhoneError }, { shouldFocus: true });
            e.data?.Email && setError("email", { message: lang[locale].auth.changeEmailError }, { shouldFocus: true });
            setUserIsExist(true);
          } else {
            console.log("else");
            setAlertText(e.errors?.Password?.map((elem: string) => lang[locale].loadError[`${elem}`]).join(", "));
          }
        });
    }
  };

  return (
    <Container>
      <HeaderWrapper>
        <div>
          <Header>{lang[locale].auth.registerAccount}</Header>

          <RegistrPrompt>
            <span>{lang[locale].auth.haveAccount} </span>
            <Link prefetch={false} href="/auth/signin">
              {lang[locale].auth.enter}
            </Link>
          </RegistrPrompt>
        </div>
      </HeaderWrapper>

      <Content>
        {existUser && (
          <Alert color={theme.colors[isDarkTheme ? "white" : "black"]}>
            <WarningTriangle />
            <span>
              {(emailState.error && lang[locale].auth.existEmail) || (phoneState.error && lang[locale].auth.existPhone)}
            </span>
          </Alert>
        )}

        <form>
          <FormContent>
            <InputPhone
              label={lang[locale].auth.phone}
              onChange={(value) => {
                phoneNumber.onChange(`+${value}`);
                existUser && setUserIsExist(false);
              }}
              onBlur={phoneNumber.onBlur}
              value={phoneNumber.value}
              ref={phoneNumber.ref}
              error={phoneState.error?.message}
              lightStyle={!isDarkTheme}
            />

            <Input
              label={lang[locale].auth.email}
              onChange={(value) => {
                email.onChange(value);
                existUser && setUserIsExist(false);
              }}
              onBlur={email.onBlur}
              value={email.value}
              ref={email.ref}
              error={emailState.error?.message}
              lightStyle={!isDarkTheme}
            />

            <Input
              label={lang[locale].auth.password}
              onChange={password.onChange}
              onBlur={password.onBlur}
              value={password.value}
              ref={password.ref}
              error={passState.error?.message}
              paddingPosition="right"
              type="password"
              lightStyle={!isDarkTheme}
            />

            <Input
              label={lang[locale].auth.confirm}
              onChange={confirm.onChange}
              onBlur={confirm.onBlur}
              value={confirm.value}
              ref={confirm.ref}
              error={confirmState.error?.message}
              paddingPosition="right"
              type="password"
              lightStyle={!isDarkTheme}
            />

            <Input
              label={lang[locale].auth.surname}
              onChange={lastName.onChange}
              onBlur={lastName.onBlur}
              value={lastName.value}
              ref={lastName.ref}
              error={lastNameState.error?.message}
              lightStyle={!isDarkTheme}
            />

            <Input
              label={lang[locale].auth.name}
              onChange={name.onChange}
              onBlur={name.onBlur}
              value={name.value}
              ref={name.ref}
              error={nameState.error?.message}
              lightStyle={!isDarkTheme}
            />

            <Input
              label={
                <OptionalLabel>
                  <span>{lang[locale].auth.middleName}</span>
                  <span>{lang[locale].auth.optionalField}</span>
                </OptionalLabel>
              }
              onChange={middleName.onChange}
              onBlur={middleName.onBlur}
              value={middleName.value}
              ref={middleName.ref}
              error={middleNameState.error?.message}
              lightStyle={!isDarkTheme}
            />

            <InputDate
              label={lang[locale].auth.dateOfBirth}
              onChange={(date: Date) =>
                birthDay.onChange(date ? formatDate(toISOString(date), "yyyy-MM-dd", locale) : undefined)
              }
              onBlur={birthDay.onBlur}
              inputRef={birthDay.ref}
              value={getDateFromString(birthDay.value)}
              error={birthDayState.error?.message}
              maxDate={new Date()}
              locale={locale}
              showError
              lightStyle={!isDarkTheme}
            />

            <ListOfRadioButtons
              label={<GenderLabel>{lang[locale].auth.gender}</GenderLabel>}
              value={gender.value}
              options={[
                { value: "male", label: "male" },
                { value: "female", label: "female" },
              ]}
              changeValue={gender.onChange}
              onBlur={gender.onBlur}
              error={genderState.error?.message}
              lightStyle={!isDarkTheme}
            />
            <Spacer height={["0.83vw", "2.08vw"]} />

            <Checkbox
              label={
                <StewardLabel>
                  {lang[locale].auth.steward}
                  <IconInfo
                    onMouseOver={() => setPromptIsVisible(true)}
                    onMouseLeave={() => setPromptIsVisible(false)}
                  />

                  {promptIsVisible && <Prompt>{lang[locale].auth.stewardAgree}</Prompt>}
                </StewardLabel>
              }
              checked={steward.value}
              onChange={steward.onChange}
              lightStyle={!isDarkTheme}
            />

            <Checkbox
              label={
                <CheckboxLabel>
                  <span>{lang[locale].auth.termsAgree} </span>
                  <a onClick={() => setUserData(getValues(), "ruleAgree")}>{lang[locale].auth.ruleTerms}</a>
                </CheckboxLabel>
              }
              checked={!!termsAgree.value}
              onChange={termsAgree.onChange}
              lightStyle={!isDarkTheme}
            />

            {!termsAgree.value && (
              <TermsAlert>
                <WarningTriangle />
                <span>{lang[locale].auth.forEnd}</span>
              </TermsAlert>
            )}

            <Checkbox
              label={
                <CheckboxLabel>
                  <span>{lang[locale].auth.termsAgree} </span>
                  <a onClick={() => setUserData(getValues(), "infoAgree")}>{lang[locale].auth.newsAgree}</a>
                </CheckboxLabel>
              }
              checked={newsAgree.value}
              onChange={newsAgree.onChange}
              lightStyle={!isDarkTheme}
            />

            <Button type="red" onClick={handleSubmit(onSubmit)} className="submitBtn">
              {lang[locale].auth.proceed}
            </Button>
          </FormContent>
        </form>
      </Content>

      <ErrorAlert type="error" message={alertText || ""} open={!!alertText} icon={<CheckCircleIcon />} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    display: block;
  }
`;

const HeaderWrapper = styled.div`
  width: 26.66vw;
  margin-bottom: 1.04vw;

  & > div {
    position: fixed;
    width: 26.66vw;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 100%;
    margin-bottom: 2.6vw;

    & > div {
      position: relative;
      width: auto;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-bottom: 5.33vw;
  }
`;

const Content = styled.div`
  width: 19.7vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 100%;
  }
`;

const Header = styled.h1`
  font-family: "FCSM Text", sans-serif;
  margin: 0;
  text-align: left;
  color: ${({ theme }) => theme.colors.white_black};
  font-weight: 700;
  font-size: 1.66vw;
  line-height: 1.3em;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 4.17vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-weight: 500;
    font-size: 6.4vw;
  }
`;

const FormContent = styled.div`
  & > label {
    margin-bottom: 1.25vw;

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      margin-bottom: 3.13vw;
    }

    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      margin-bottom: 6.4vw;
    }
  }
`;

const RegistrPrompt = styled.div`
  font-size: 0.83vw;
  color: ${({ theme }) => theme.colors.gray_grayDark1};
  width: 100%;
  margin-top: 1.25vw;

  & > *:last-child {
    margin-left: 0.4vw;
    color: ${({ theme }) => theme.colors.white_red};
    text-transform: capitalize;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.08vw;
    margin-top: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.26vw;
    margin-top: 4.26vw;
  }
`;

const StewardLabel = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  color: ${({ theme }) => theme.colors.gray_grayDark1};

  & > svg {
    margin-left: 1vw;
    font-size: 1vw;
    color: ${({ theme }) => theme.colors.white_black};

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      font-size: 2.08vw;
    }

    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      margin: 0 3vw;
      font-size: 7vw;
    }
  }
`;

const CheckboxLabel = styled.div`
  color: ${({ theme }) => theme.colors.gray_grayDark1};

  & > a {
    color: ${({ theme }) => theme.colors.gray_red};
    text-decoration: underline;
  }
`;

const Prompt = styled.div`
  font-family: "Roboto", sans-serif;
  position: absolute;
  transform: translate(50%, -100%);
  right: 0.5vw;
  top: -0.5vw;
  width: 16.66vw;
  padding: 0.3vw 0.6vw;
  background: ${theme.colors.gray};
  border-radius: 2px;
  color: ${theme.colors.blackLight};
  letter-spacing: 0.1px;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 41.72vw;
    right: 1vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 60vw;
    right: 6.6vw;
    padding: 0.8vw 1.6vw;
    box-sizing: border-box;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 95%);
    background-image: ${`url(${tail.src})`};
    width: 14px;
    height: 6px;
  }
`;

const TermsAlert = styled(Alert)`
  margin-bottom: 1.25vw;
  color: ${({ theme }) => theme.colors.white_black};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-bottom: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-bottom: 6.4vw;
  }
`;

const Button = styled(CustomButton)`
  position: relative;
  top: 0.83vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    top: 2.6vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    top: 6.4vw;
    margin-bottom: 22vw;
  }
`;

const OptionalLabel = styled.div`
  display: flex;
  justify-content: space-between;

  & > span:last-child {
    color: ${theme.colors.gray};
    letter-spacing: 0.1px;
  }
`;

const GenderLabel = styled.div`
  margin-bottom: 0.625vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-bottom: 2.08vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-bottom: 3.2vw;
  }
`;

const ErrorAlert = styled(AlertModal)<{ open?: boolean }>`
  position: fixed;
  right: 0.83vw;
  z-index: 999;
  min-width: 18.54vw;
  top: ${({ open }) => (open ? "8vw" : "-5vw")};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    right: 3.13vw;
    min-width: 46.41vw;
    top: ${({ open }) => (open ? "16vw" : "-10vw")};
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    right: 3vw;
    min-width: 91.46vw;
    top: ${({ open }) => (open ? "22vw" : "-15vw")};
  }
`;
