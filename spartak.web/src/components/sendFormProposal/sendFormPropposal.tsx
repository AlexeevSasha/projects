import { useRouter } from "next/router";
import { ChangeEvent, useContext, useState } from "react";
import { SubmitHandler, useController, useForm } from "react-hook-form";
import styled from "styled-components";
import { lang } from "../../../public/locales/lang";
import type { FeedBackDto } from "../../api/feedBackRepository";
import { feedbackRepository } from "../../api/feedBackRepository";
import { emailRegexp } from "../../assets/constants/regexp";
import { IconArrowRight } from "../../assets/icon/iconArrowRight";
import { theme } from "../../assets/theme/theme";
import { ModalSubmit } from "../../componentPages/pageStadium/modalSubmit/modalSubmit";
import { DataContext } from "../../core/dataProvider";
import { ThemeContext } from "../../core/themeProvider";
import { LoadingScreen } from "../../ui/LoadingScreen ";
import { NextImage } from "../../ui/nextImage/nextImage";
import { CustomButton } from "../buttons/customButton";
import { Checkbox } from "../checkbox";
import { ContainerContent } from "../containers/containerContent";
import { Input } from "../input/input";
import { InputDate } from "../input/inputDate";
import { InputPhone } from "../input/inputPhone";
import { PersonalDataModal } from "../modal/personalDataModal";
import { formatDate, getDateFromString, toISOString } from "../../assets/constants/date";

interface IProps {
  title: string;
  image: string;
  description?: string;
  paddingTop?: boolean;
  showPolicy?: boolean;
  moreInformation?: boolean;
  feedbackType?: FeedBackDto["feedbackType"];
  inputOfBirthDay?: boolean;
}

export const SendFormProposal = ({ feedbackType, ...props }: IProps) => {
  const { locale = "ru", pathname } = useRouter();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<"success" | "error" | undefined>();
  const [showModal, setShowModal] = useState(false);
  const { auth: { user = undefined } = {} } = useContext(DataContext);
  const { isDarkTheme } = useContext(ThemeContext);

  const { handleSubmit, control, reset } = useForm<FeedBackDto>({
    mode: "onBlur",
  });
  const descriptionText = props.description ? props.description : lang[locale].form.contactManager;
  const isMoreInfo = props.description ? !!props.description : props.moreInformation;

  const { field: name, fieldState: nameState } = useController({
    control,
    name: "name",
    rules: { required: lang[locale].form.validation.inputName },
  });

  const { field: email, fieldState: emailState } = useController({
    control,
    name: "userEmail",
    rules: {
      validate: (value) => (!value || !emailRegexp.test(value) ? lang[locale].auth.wrongEmail : true),
    },
  });

  const { field: phone, fieldState: phoneState } = useController({
    control,
    name: "phoneNumber",
    rules: {
      validate: (value = "") => (!value || value.length < 12 ? lang[locale].form.validation.inputPhone : true),
    },
  });

  const { field: birthDay, fieldState: birthDayState } = useController({
    control,
    name: "birthDay",
    rules: props.inputOfBirthDay
      ? {
          validate: (value) => {
            if (!value || value === "null") {
              return lang[locale].form.validation.invalidDate;
            }
            if (new Date(value) > new Date()) {
              return lang[locale].form.validation.bigDate;
            }
            return true;
          },
        }
      : undefined,
  });

  const { field: checkBox, fieldState: checkBoxState } = useController({
    control,
    name: "checkBox",
    rules: {
      validate: (value?: boolean) => (!value && !user ? lang[locale].form.validation.inputCheckBox : true),
    },
  });

  const onSubmit: SubmitHandler<Omit<FeedBackDto, "pageUrl" | "feedbackType">> = async ({ checkBox, ...data }) => {
    if ((!user && !checkBox) || !feedbackType) return;
    setLoading(true);
    await feedbackRepository
      .addFeedback({
        ...data,
        feedbackType,
        userEmail: data.userEmail || null,
        pageUrl: `${window.location.hostname}${pathname}`,
        birthDay: props.inputOfBirthDay ? formatDate(data.birthDay, "yyyy-MM-dd", locale) : undefined,
      })
      .then((res) => {
        if (res) {
          setAlert("success");
          reset({ phoneNumber: "+7", checkBox: false });
        }
      })
      .catch(() => setAlert("error"))
      .finally(() => setLoading(false));
  };

  const handleChange = (
    value: string | ChangeEvent<HTMLInputElement>,
    onChange: (value: string | ChangeEvent<HTMLInputElement>) => void
  ) => {
    onChange(value);
    setAlert(undefined);
  };

  return (
    <StyledContainer>
      {alert && <ModalSubmit alert={alert} setAlert={setAlert} />}

      {loading && <LoadingScreen />}

      <RentalBlock id="sendForm">
        <RentalForm onSubmit={handleSubmit(onSubmit)}>
          <Title>
            {props.title}
            <TitleDescription moreInformation={isMoreInfo}>{descriptionText}</TitleDescription>
          </Title>

          <InputsBlock>
            <Input
              isStadiumForm
              error={nameState.error?.message}
              value={name.value}
              onChange={(value) => handleChange(value, name.onChange)}
              placeholder={lang[locale].form.inputs.name}
              onBlur={name.onBlur}
              lightStyle={!isDarkTheme}
            />
            {props.inputOfBirthDay ? (
              <InputDate
                onChange={(date: Date) =>
                  birthDay.onChange(date ? formatDate(toISOString(date), "yyyy-MM-dd", locale) : undefined)
                }
                onBlur={birthDay.onBlur}
                inputRef={birthDay.ref}
                value={getDateFromString(birthDay.value)}
                error={birthDayState.error?.message}
                maxDate={new Date()}
                minDate={new Date(1900, 0, 1)}
                locale={locale}
                showError
                lightStyle={!isDarkTheme}
                colorText="gray"
                isStadiumForm
              />
            ) : null}
            <InputPhone
              isStadiumForm
              country="ru"
              value={phone.value}
              error={phoneState.error?.message}
              onChange={(value) => handleChange(`+${value}`, phone.onChange)}
              onBlur={phone.onBlur}
              lightStyle={!isDarkTheme}
            />
            <Input
              isStadiumForm
              error={emailState.error?.message}
              value={email.value || undefined}
              onChange={(value) => handleChange(value, email.onChange)}
              onBlur={email.onBlur}
              placeholder="E-mail"
              lightStyle={!isDarkTheme}
            />
            {!user && (
              <Checkbox
                isStadiumForm
                checked={checkBox.value}
                onChange={(value) => handleChange(value, checkBox.onChange)}
                error={checkBoxState.error?.message}
                label={
                  <LabelBlock
                    onClick={(e) => {
                      if ((e.target as any).tagName === "U") {
                        e.preventDefault();
                        setShowModal(true);
                      }
                    }}
                    dangerouslySetInnerHTML={{
                      __html: lang[locale].form.labelRulesConfirm,
                    }}
                  />
                }
                lightStyle={!isDarkTheme}
              />
            )}
          </InputsBlock>

          <StyledButtonBlock>
            <RestyledButton type={"red"} withGap onClick={handleSubmit(onSubmit)}>
              <IconArrowRight />
              <p>{lang[locale].button.sendBid}</p>
            </RestyledButton>
          </StyledButtonBlock>

          <DataPolicy showPolicy={props.showPolicy}>
            <span>
              {lang[locale].form.prePolicy}
              <NativeLink href="#"> {lang[locale].form.policy}</NativeLink>
            </span>
          </DataPolicy>
        </RentalForm>

        <BlockWithPhoto showImage={pathname.includes("excursionTours")}>
          <NextImage src={props.image} objectFit="cover" />
        </BlockWithPhoto>
      </RentalBlock>
      {showModal && <PersonalDataModal onClose={() => setShowModal(false)} />}
    </StyledContainer>
  );
};

const StyledContainer = styled(ContainerContent)`
  padding: 5.21vw 0;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 10.43vw 0;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 10.67vw 0;
  }
`;

const RentalBlock = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: 2fr 1fr;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-template-columns: 1fr;

    form {
      grid-row: 2;
    }
    div {
      grid-row: 1;
    }
  }
`;

const RentalForm = styled.form`
  background: ${({ theme }) => theme.colors.blackLight_whiteGray};
  padding: 2.08vw 8.23vw 2.4vw 6.98vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 4.17vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 4.27vw;
  }
`;

const Title = styled.h1`
  display: flex;
  flex-direction: column;
  margin: 0;
  width: 100%;
  justify-content: left;
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  font-size: 2.08vw;
  color: ${({ theme }) => theme.colors.white_black};
  padding-bottom: 2.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 4.17vw;
    padding-bottom: 3.13vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 6.4vw;
    padding-bottom: 4.27vw;
  }
`;

const TitleDescription = styled.span<{ moreInformation?: boolean }>`
  display: ${(props) => (props.moreInformation ? "block" : "none")};
  font-weight: normal;
  font-size: 0.83vw;
  font-family: "Roboto", sans-serif;
  color: ${({ theme }) => theme.colors.gray_grayDark1};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.09vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
  }
`;

const StyledButtonBlock = styled.div`
  padding-top: 2.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding-top: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding-top: 4.27vw;
  }
`;

const RestyledButton = styled(CustomButton)`
  padding: 0.57vw;
  justify-content: center;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 1.43vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 2.93vw;
  }

  p {
    margin: 0;
  }

  & > svg > path {
    stroke: ${theme.colors.white};
  }
`;

const BlockWithPhoto = styled.div<{ showImage?: boolean }>`
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    display: ${({ showImage }) => (showImage ? "unset" : "none")};
    height: 240px;
    width: 343px;
  }
`;

const InputsBlock = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 1.67vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    gap: 3.13vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    gap: 4.27vw;
  }
`;

const DataPolicy = styled.p<{ showPolicy?: boolean }>`
  display: ${(props) => (props.showPolicy ? "block" : "none")};
  margin: 0;
  color: ${theme.colors.gray};
  font-family: Roboto, sans-serif;
  font-size: 0.73vw;
  padding-top: 0.63vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    display: none;
  }
`;

const NativeLink = styled.a`
  text-decoration: none;
  cursor: pointer;
  color: ${theme.colors.redDark};
`;

const LabelBlock = styled.span`
  color: ${({ theme }) => theme.colors.gray_grayDark};
  font-size: 0.81vw;
  font-family: Roboto, sans-serif;
  font-weight: 400;
  letter-spacing: 0;

  u {
    color: ${({ theme }) => theme.colors.white_black};

    :hover {
      color: ${theme.colors.red};
    }
  }

  a {
    text-decoration: underline;
    color: ${({ theme }) => theme.colors.white_black};

    :hover {
      color: ${theme.colors.red};
    }
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.09vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
  }
`;
