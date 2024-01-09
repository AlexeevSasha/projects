import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useContext, useEffect, useMemo, useRef, useState } from "react";
import { SubmitHandler, useController, useForm } from "react-hook-form";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { CatalogDto, catalogRepository } from "../../../api/catalogRepository";
import { UserInfoDto } from "../../../api/dto/UserInfoDto";
import { userRepository } from "../../../api/userRepository";
import { formatDate, getDateFromString } from "../../../assets/constants/date";
import { IconWarning } from "../../../assets/icon/iconWarning";
import { theme } from "../../../assets/theme/theme";
import { CustomButton } from "../../../components/buttons/customButton";
import { DropdownList } from "../../../components/dropdownList/dropdownList";
import { Input } from "../../../components/input/input";
import { InputDate } from "../../../components/input/inputDate";
import { InputPhone } from "../../../components/input/inputPhone";
import { ListOfRadioButtons } from "../../../components/radioButton/listOfRadioButtons";
import { CustomSelect } from "../../../components/select/select";
import { DataContext } from "../../../core/dataProvider";
import { ThemeContext } from "../../../core/themeProvider";
import { ChangeModal } from "./changeModal";
import { Rules } from "./validationsRules";

type Props = {
  isRfUser: boolean;
  setIsRfUser: Dispatch<SetStateAction<boolean>>;
};

type FormValues = UserInfoDto["PersonalData"];

export const PrivateForm = ({ isRfUser, setIsRfUser }: Props) => {
  const { locale = "ru" } = useRouter();
  const { auth: { user = undefined } = {}, setUser, setShowNotification } = useContext(DataContext);
  const { isDarkTheme } = useContext(ThemeContext);

  const { handleSubmit, control, setValue } = useForm<FormValues>({
    mode: "onBlur",
    defaultValues: user?.personalData,
  });

  const { dateRule } = useMemo(() => new Rules(locale), [locale]);

  const { field: name, fieldState: nameState } = useController({
    control,
    name: "FirstName",
  });
  const { field: middleName, fieldState: middleNameState } = useController({
    control,
    name: "MiddleName",
  });
  const { field: lastName, fieldState: lastNameState } = useController({
    control,
    name: "LastName",
  });
  const { field: phone, fieldState: phoneState } = useController({
    control,
    name: "MobilePhone",
  });
  const { field: email, fieldState: emailState } = useController({
    control,
    name: "Email",
  });
  const { field: birthDay, fieldState: birthDayState } = useController({
    control,
    name: "BirthDate",
    rules: dateRule,
  });
  const { field: gender, fieldState: genderState } = useController({
    control,
    name: "Gender",
  });
  const { field: citizenship, fieldState: citizenshipState } = useController({
    control,
    name: "CitizenshipId",
  });
  const { field: steward } = useController({
    control,
    name: "IsBecomeSteward",
  });

  const [phoneModalIsVisible, setVisibleModalPhone] = useState(false);
  const [emailModalIsVisible, setVisibleModalEmail] = useState(false);

  const citizenshipRef = useRef<CatalogDto[]>([]);
  const rfIdRef = useRef<string | undefined>();

  const citizenshipOptions = useMemo(
    () =>
      citizenshipRef.current.map(({ ItemId, ItemName }) => ({
        value: ItemId,
        label: ItemName,
      })),
    [citizenshipRef.current]
  );

  const closePhoneModal = (newPhone?: string) => {
    if (newPhone) setValue("MobilePhone", newPhone);
    setVisibleModalPhone(!phoneModalIsVisible);
  };

  const closeEmailModal = (newEmail?: string) => {
    if (newEmail) setValue("Email", newEmail);
    setVisibleModalEmail(!emailModalIsVisible);
  };

  const onSubmit: SubmitHandler<FormValues> = async ({ BirthDate, Gender, IsBecomeSteward, CitizenshipId }) => {
    await userRepository
      .saveUserData({
        BirthDay: BirthDate || null,
        Gender,
        IsBecomeSteward: IsBecomeSteward === "True",
        CitizenshipId,
      })
      .then(({ PersonalData }) => {
        user && setUser({ ...user, personalData: PersonalData || user.personalData });
        setShowNotification(true);
      });
  };

  useEffect(() => {
    catalogRepository.fetchCitizenship(locale).then((res) => {
      rfIdRef.current = res.find(({ ItemName }) => ItemName === "Россия")?.ItemId;
      citizenshipRef.current = res.filter(({ ItemName }) => ItemName !== "Россия" && ItemName !== "Russia");
      setIsRfUser(user?.personalData.CitizenshipId === rfIdRef.current);
    });
  }, []);

  return (
    <DropdownList title={lang[locale].pagePersonalData.personalData.title} defaultState={!0}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputsContainer>
          <InputsBlock>
            <Input
              disabled={true}
              lightStyle={!isDarkTheme}
              error={lastNameState.error?.message}
              value={lastName.value}
              onChange={lastName.onChange}
              onBlur={lastName.onBlur}
              label={<StyledLabel>{lang[locale].form.inputs.family}</StyledLabel>}
            />

            <Input
              disabled={true}
              lightStyle={!isDarkTheme}
              error={nameState.error?.message}
              value={name.value}
              onChange={name.onChange}
              onBlur={name.onBlur}
              label={<StyledLabel>{lang[locale].form.inputs.name}</StyledLabel>}
            />

            <Input
              disabled={true}
              lightStyle={!isDarkTheme}
              error={middleNameState.error?.message}
              value={middleName.value}
              onChange={middleName.onChange}
              onBlur={middleName.onBlur}
              label={
                <StyledLabel>
                  <span>{lang[locale].form.inputs.patronymic}</span>
                  <span>{lang[locale].form.validation.notRequired}</span>
                </StyledLabel>
              }
            />
          </InputsBlock>

          <InputsBlock>
            <ButtonChangeBlock>
              <InputPhone
                disabled={true}
                lightStyle={!isDarkTheme}
                error={phoneState.error?.message}
                value={phone.value}
                onChange={phone.onChange}
                onBlur={phone.onBlur}
                label={<StyledLabel>{lang[locale].form.inputs.phone}</StyledLabel>}
              />

              <ButtonChange onClick={() => setVisibleModalPhone(true)}>
                {lang[locale].form.validation.change}
              </ButtonChange>
            </ButtonChangeBlock>

            <ButtonChangeBlock>
              <Input
                disabled={true}
                lightStyle={!isDarkTheme}
                error={emailState.error?.message}
                value={email.value}
                onChange={email.onChange}
                onBlur={email.onBlur}
                label={<StyledLabel>{lang[locale].form.inputs.email}</StyledLabel>}
              />

              <ButtonChange onClick={() => setVisibleModalEmail(true)}>
                {lang[locale].form.validation.change}
              </ButtonChange>
            </ButtonChangeBlock>

            <InputDate
              value={getDateFromString(birthDay.value)}
              onChange={(date: Date) =>
                birthDay.onChange(date ? formatDate(date.toISOString(), "yyyy-MM-dd", locale) : undefined)
              }
              lightStyle={!isDarkTheme}
              error={birthDayState.error?.message}
              label={<StyledLabel>{lang[locale].form.inputs.birthday}</StyledLabel>}
              onBlur={birthDay.onBlur}
              maxDate={new Date()}
              locale={locale}
              showError
            />
          </InputsBlock>
        </InputsContainer>

        <RadioGroupContainer>
          <ListOfRadioButtons
            lightStyle={!isDarkTheme}
            value={gender.value}
            error={genderState.error?.message}
            options={[
              { value: "Male", label: "male" },
              { value: "Female", label: "female" },
            ]}
            changeValue={gender.onChange}
            onBlur={gender.onBlur}
            label={<StyledLabel>{lang[locale].form.radioInput.gender}</StyledLabel>}
          />

          <ListOfRadioButtons
            value={isRfUser ? "true" : "false"}
            options={[
              { value: "true", label: "yes" },
              { value: "false", label: "no" },
            ]}
            lightStyle={!isDarkTheme}
            changeValue={(value) => {
              setIsRfUser(value === "true");
              value === "true" && citizenship.onChange(rfIdRef.current);
            }}
            label={<StyledLabel>{lang[locale].form.radioInput.citizenship}</StyledLabel>}
          />

          <CitizenshipBlock visible={!isRfUser} inSmallScreen>
            <CustomSelect
              lightStyle={!isDarkTheme}
              value={citizenshipOptions.find(({ value }) => value === citizenship.value)}
              error={citizenshipState.error?.message}
              onChange={citizenship.onChange}
              onBlur={citizenship.onBlur}
              options={citizenshipOptions}
              label={<StyledLabel>{lang[locale].form.inputs.citizenChip}</StyledLabel>}
              isSearchable
            />
          </CitizenshipBlock>
        </RadioGroupContainer>

        <RadioWithAttention>
          <ListOfRadioButtons
            lightStyle={!isDarkTheme}
            value={steward.value}
            label={<StyledLabel>{lang[locale].form.radioInput.becomeSteward}</StyledLabel>}
            options={[
              { value: "True", label: "yes" },
              { value: "False", label: "no" },
            ]}
            changeValue={steward.onChange}
          />

          <CitizenshipBlock visible={!isRfUser}>
            <CustomSelect
              lightStyle={!isDarkTheme}
              value={citizenshipOptions.find(({ value }) => value === citizenship.value)}
              error={citizenshipState.error?.message}
              onChange={citizenship.onChange}
              onBlur={citizenship.onBlur}
              options={citizenshipOptions}
              label={<StyledLabel>{lang[locale].form.inputs.citizenChip}</StyledLabel>}
              isSearchable
            />
          </CitizenshipBlock>

          <AttentionBlock insSmallScreen>
            <IconWarning />
            <Attention>{lang[locale].pagePersonalData.personalData.warning}</Attention>
          </AttentionBlock>
        </RadioWithAttention>

        <InputsContainer>
          <AttentionBlock>
            <IconWarning />
            <Attention>{lang[locale].pagePersonalData.personalData.warning}</Attention>
          </AttentionBlock>
        </InputsContainer>

        <InputsContainer>
          <StyledButton type={"red"} onClick={handleSubmit(onSubmit)}>
            {lang[locale].form.validation.saveChanges}
          </StyledButton>
        </InputsContainer>
      </form>

      {phoneModalIsVisible && <ChangeModal form="phone" onClose={closePhoneModal} />}
      {emailModalIsVisible && <ChangeModal form="email" onClose={closeEmailModal} />}
    </DropdownList>
  );
};

const InputsContainer = styled.div`
  display: grid;
  width: 100%;
  justify-content: flex-start;
  grid-template-columns: 26.67vw 26.67vw;
  column-gap: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: 100%;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-template-columns: 100%;
  }
`;

const InputsBlock = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding-right: 27.12vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding-right: 0;
  }

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

const StyledLabel = styled.label`
  display: flex;
  justify-content: space-between;
  position: relative;
  color: ${({ theme }) => theme.colors.gray_grayDark1};
  font-size: 0.83vw;
  padding-bottom: 0.21vw;

  & > *:last-child {
    font-size: 0.73vw;

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      font-size: 1.82vw;
    }
    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      font-size: 3.73vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.09vw;
    padding-bottom: 0.52vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
    padding-bottom: 1.07vw;
  }
`;

const ButtonChangeBlock = styled.div`
  display: flex;
  position: relative;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    flex-direction: column;
  }

  & input:disabled,
  div.react-tel-input > input.form-control:disabled {
    -webkit-text-fill-color: ${({ theme }) => theme.colors.white_black};
    color: ${({ theme }) => theme.colors.white_black};
  }
`;

const ButtonChange = styled.span`
  text-transform: uppercase;
  font-size: 0.83vw;
  height: fit-content;
  font-family: "FCSM Text", sans-serif;
  color: ${theme.colors.red};
  cursor: pointer;
  padding-bottom: 0.63vw;
  position: absolute;
  right: -6.04vw;
  align-self: flex-end;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.09vw;
    padding-bottom: 0.56vw;
    right: -15.12vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
    right: unset;
    position: unset;
    padding-top: 2vw;
    align-self: flex-start;
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
    grid-template-columns: calc(100% - 27.12vw);
    padding-bottom: 3.13vw;
    padding-top: 3.13vw;
    gap: 3.13vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-template-columns: 100%;
    gap: 6.4vw;
    padding-bottom: 6.4vw;
    padding-top: 6.4vw;
    padding-right: 0;
  }
`;

const RadioWithAttention = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 26.67vw);
  gap: 1.25vw;
  padding-bottom: 1.25vw;
  align-items: flex-end;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: 1.5fr 3fr;
    padding-bottom: 3.13vw;
    align-items: flex-start;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-template-columns: 1fr;
    padding-bottom: 6.4vw;
    align-items: flex-end;
  }
`;

const AttentionBlock = styled.p<{ insSmallScreen?: boolean }>`
  display: ${({ insSmallScreen }) => (insSmallScreen ? "none" : "flex")};
  height: fit-content;
  gap: 0.78vw;
  margin: 0;
  font-size: 0.73vw;
  font-family: Roboto, sans-serif;
  font-weight: 500;
  color: ${theme.colors.gray};
  background: rgba(204, 18, 45, 0.1);
  padding: 8px;
  margin-bottom: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    display: ${({ insSmallScreen }) => (insSmallScreen ? "flex" : "none")};
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-top: 6.4vw;
  }
`;

const Attention = styled.span`
  color: ${({ theme }) => theme.colors.gray_black};
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.84vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.73vw;
    gap: 2.13vw;
  }
`;

const StyledButton = styled(CustomButton)`
  justify-content: center;
  display: flex;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-right: 27.12vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-right: 0;
  }
`;

const CitizenshipBlock = styled.div<{ inSmallScreen?: boolean; visible?: boolean }>`
  display: ${({ inSmallScreen, visible }) => (!inSmallScreen && visible ? "flex" : "none")};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    display: ${({ inSmallScreen, visible }) => (inSmallScreen && visible ? "flex" : "none")};
  }
`;
