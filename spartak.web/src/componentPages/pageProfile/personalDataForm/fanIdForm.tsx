import { useContext, useState } from "react";
import { SubmitHandler, useController, useForm } from "react-hook-form";
import styled from "styled-components";
import { ThemeContext } from "../../../core/themeProvider";
import { lang } from "../../../../public/locales/lang";
import { userRepository, UserSibIdDto } from "../../../api/userRepository";
import { theme } from "../../../assets/theme/theme";
import { DropdownList } from "../../../components/dropdownList/dropdownList";
import { DataContext } from "../../../core/dataProvider";
import { LoadingScreen } from "../../../ui/LoadingScreen ";
import { useRouter } from "next/router";
import { CustomButton } from "../../../components/buttons/customButton";
import { CrossIcon } from "../../../assets/icon/CrossIcon";
import { ChecksIcon } from "../../../assets/icon/checksIcon";
import { Input } from "../../../components/input/input";

const infoSvg = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M11.25 11.25H12V16.5H12.75" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M12 9C12.6213 9 13.125 8.49632 13.125 7.875C13.125 7.25368 12.6213 6.75 12 6.75C11.3787 6.75 10.875 7.25368 10.875 7.875C10.875 8.49632 11.3787 9 12 9Z"
      fill="white"
    />
  </svg>
);

export const FanIdForm = () => {
  const { locale = "ru" } = useRouter();
  const [loading, setLoading] = useState(false);
  const { auth: { user = undefined } = {}, setShowNotification } = useContext(DataContext);
  const { isDarkTheme } = useContext(ThemeContext);
  const [submitFailed, setSubmitFailed] = useState(false);

  const { control, handleSubmit, setError, setValue, clearErrors } = useForm<UserSibIdDto>({
    mode: "onBlur",
    defaultValues: { SibId: user?.fanData.SibId },
  });

  const { field: sibId, fieldState: sibIdState } = useController({
    control,
    name: "SibId",
    rules: {
      validate: (value = "") => {
        return !value || !/\d{9}/.test(value.replaceAll(" ", "")) || value.replaceAll(" ", "").length > 9
          ? lang[locale].pagePersonalData.fanIdForm.validation
          : true;
      },
    },
  });
  const onSubmit: SubmitHandler<UserSibIdDto> = async (data: UserSibIdDto) => {
    setLoading(true);
    data.SibId = data.SibId.replaceAll(" ", "");
    await userRepository
      .updateSibIdData(data.SibId)
      .then((res) => {
        setShowNotification(true);
      })
      .catch(() => {
        setSubmitFailed(true);
        setError("SibId", { type: "custom", message: lang[locale].pagePersonalData.fanIdForm.error });
      })
      .finally(() => setLoading(false));
  };

  return (
    <DropdownList
      customTitle={
        <DropDownTitle>
          Fan ID
          <Tooltip isDarkTheme={isDarkTheme}>
            {infoSvg}
            <Tooltiptext>{lang[locale].pagePersonalData.fanIdForm.info}</Tooltiptext>
          </Tooltip>
        </DropDownTitle>
      }
    >
      {loading && <LoadingScreen />}

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputsContainer>
          <InputBlock>
            <Input
              lightStyle={!isDarkTheme}
              error={sibIdState.error?.message}
              value={sibId.value}
              onChange={(e) => {
                sibId.onChange(e);
                setSubmitFailed(false);
              }}
              onBlur={sibId.onBlur}
              label={lang[locale].pagePersonalData.fanIdForm.title}
              placeholder={lang[locale].pagePersonalData.fanIdForm.placeholder}
              paddingPosition={"right"}
              icon={
                submitFailed ? (
                  <IconWrapper>
                    <CrossIcon
                      color={theme.colors.gray}
                      onClick={() => {
                        setValue("SibId", "");
                        setSubmitFailed(false);
                        clearErrors("SibId");
                      }}
                    />
                  </IconWrapper>
                ) : user?.fanData.SibId && user?.fanData.SibId === sibId.value ? (
                  <IconWrapper>
                    <ChecksIcon color={theme.colors.green2} />
                  </IconWrapper>
                ) : (
                  <IconWrapper />
                )
              }
            />
          </InputBlock>
          <StyledButton type={"red"} onClick={handleSubmit(onSubmit)}>
            {lang[locale].form.validation.saveChanges}
          </StyledButton>
        </InputsContainer>
      </form>
    </DropdownList>
  );
};

const InputsContainer = styled.div`
  display: grid;
  width: 100%;
  justify-content: flex-start;
  grid-template-columns: repeat(2, 26.67vw);
  gap: 1.25vw;
  align-items: end;

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

const StyledButton = styled(CustomButton)`
  justify-content: center;
  margin-bottom: 1.2vw;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-bottom: 3.13vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-bottom: 6.4vw;
  }
`;
const Tooltip = styled.div<{ isDarkTheme: boolean }>`
  margin-left: 1.25vw;
  position: relative;
  display: inline-block;
  &:hover {
    visibility: visible;
    span {
      visibility: visible;
    }
  }
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-left: 2vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-left: 3.13vw;
  }
  @media screen and (max-width: ${theme.rubberSize.phone}) {
    margin-left: 6.4vw;
  }

  svg {
    fill: ${({ isDarkTheme }) => (isDarkTheme ? "none" : theme.colors.black)};
  }
`;
const Tooltiptext = styled.span`
  visibility: hidden;
  text-align: center;
  padding: 0.42vw 0.63vw;

  z-index: 10;
  position: absolute;
  top: -2.2vw;
  left: 125%;
  background: ${theme.colors.gray};
  border-radius: 2px;
  color: ${theme.colors.black};
  font-size: 0.73vw;
  transition: opacity 0.6s;

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 100%;
    margin-top: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent #555 transparent transparent;
  }
  width: 16.35vw;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 26.17vw;
    padding: 0.67vw 1vw;
    font-size: 1.17vw;
    top: -4vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 40.94vw;
    padding: 1.04vw 1.56vw;
    font-size: 1.83vw;
    top: -7vw;
  }
  @media screen and (max-width: ${theme.rubberSize.phone}) {
    width: 56.35vw;
    padding: 2.13vw 3.2vw;
    font-size: 3.73vw;
    top: -20vw;
  }
`;
const DropDownTitle = styled.span`
  font-size: 1.67vw;
  font-weight: 700;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 4.17vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 8.52vw;
  }
`;
const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  transform: translate(calc(-50% - 0.1vw), 0);
  height: 2.26vw;
  width: 2.26vw;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 5.75vw;
    height: 5.75vw;
    transform: translate(calc(-50% - 0.4vw), 0);
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 12vw;
    height: 12vw;
    transform: translate(calc(-50% - 0.4vw), 0);
  }
  & > svg {
    margin: auto;
    width: 40%;
    height: 40%;
  }
`;
