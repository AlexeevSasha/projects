import { useRouter } from "next/router";
import React, { useContext, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { lang } from "../../../public/locales/lang";
import { userRepository } from "../../api/userRepository";
import { getDateFromString, getYearsOld, toISOString } from "../../assets/constants/date";
import { theme } from "../../assets/theme/theme";
import { CustomButton } from "../../components/buttons/customButton";
import { Checkbox } from "../../components/checkbox";
import { InputDate } from "../../components/input/inputDate";
import { Modal } from "../../components/modal/modal";
import { ModalLayout } from "../../components/modal/modalLayout";
import { H1, Prompt } from "../../components/modal/modalUi";
import { DataContext } from "../../core/dataProvider";
import { InfoAgree } from "../autn/infoAgree";
import { langVoting } from "./components/lang/langVoting";

type Props = {
  onClose: () => void;
  onConfirm: () => void;
  birthDate: string;
};

export const UseWinlineModal = ({ onClose, onConfirm, ...props }: Props) => {
  const { locale = "ru" } = useRouter();
  const [infoRuleIsOpen, setInfoRuleIsOpen] = useState(false);
  const [value, setValue] = useState(true);
  const [birthDate, setBirdDate] = useState<string>(props.birthDate);
  const [error, setError] = useState<string | undefined>();
  const { auth: { user = undefined } = {}, setUser } = useContext(DataContext);

  const enabledSetBirthDate = useMemo(() => getYearsOld(props.birthDate) < 18, [props.birthDate]);

  const handleProceed = () => {
    (enabledSetBirthDate
      ? userRepository.consentToUseWinline({ AllowToUseWinline: value, BirthDate: birthDate })
      : userRepository.allowToUseWinline(value)
    )
      .then(() => {
        if (!user) return;
        setUser({ ...user, AllowToUseWinline: true, personalData: { ...user.personalData, BirthDate: birthDate } });
        // onClose();
        onConfirm();
      })
      .catch(console.log);
  };

  const validate = () => {
    const yearsOld = birthDate ? getYearsOld(birthDate) : 0;
    setError(yearsOld < 18 ? langVoting[locale].useWinlineError : undefined);
  };

  useEffect(validate, []);

  return (
    <Modal clickClose={onClose}>
      <ModalLayout onClose={onClose} hideSocial={true} winline>
        {infoRuleIsOpen ? (
          <InfoAgree onClose={() => setInfoRuleIsOpen(false)} />
        ) : (
          <Container>
            <H1>{langVoting[locale].accessRestricted}</H1>

            <Prompt>{langVoting[locale].useWinlineDesc}</Prompt>

            {enabledSetBirthDate && (
              <InputDate
                label={lang[locale].auth.dateOfBirth}
                onChange={(date: Date) => setBirdDate(toISOString(date))}
                onBlur={validate}
                value={getDateFromString(birthDate)}
                error={error}
                maxDate={new Date()}
                locale={locale}
                showError
                lightStyle
              />
            )}

            <Checkbox
              label={
                <CheckboxLabel>
                  <span>{lang[locale].auth.termsAgree} </span>
                  <a onClick={() => setInfoRuleIsOpen(true)}>{lang[locale].auth.newsAgree}</a>
                </CheckboxLabel>
              }
              checked={value}
              onChange={(e) => setValue(e.currentTarget.checked)}
            />

            <Button type="red" onClick={!!error || !value ? undefined : handleProceed} disabled={!!error || !value}>
              {lang[locale].auth.proceed}
            </Button>
          </Container>
        )}
      </ModalLayout>
    </Modal>
  );
};

const Container = styled.div`
  width: 20.15vw;
  margin: 0 auto;
  display: flex;
  flex-flow: column;

  & > * {
    margin-bottom: 2.08vw;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 100%;

    & > * {
      margin-bottom: 5.215vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    & > * {
      margin-bottom: 10.66vw;
    }
  }
`;

const CheckboxLabel = styled.div`
  color: ${theme.colors.grayDark};

  & > a {
    color: ${theme.colors.black};
    text-decoration: underline;
  }
`;

const Button = styled(CustomButton)<{ disabled?: boolean }>`
  position: relative;
  margin-bottom: 0;
  background: ${({ disabled }) => disabled && theme.colors.grayDark};
  color: ${({ disabled }) => disabled && theme.colors.gray};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    top: 2.6vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    top: 6.4vw;
    margin-bottom: 22vw;
  }
`;
