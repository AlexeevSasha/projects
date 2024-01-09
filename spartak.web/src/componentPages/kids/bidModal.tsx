import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";
import { SubmitHandler, useController, useForm } from "react-hook-form";
import styled from "styled-components";
import { lang } from "../../../public/locales/lang";
import { bidToExitRepository } from "../../api/bidToExitRepository";
import { BidToExitEntity } from "../../api/dto/kids";
import { WarningTriangle } from "../../assets/icon/warningTriangle";
import { theme } from "../../assets/theme/theme";
import { CustomButton } from "../../components/buttons/customButton";
import { Checkbox } from "../../components/checkbox";
import { Input } from "../../components/input/input";
import { InputPhone } from "../../components/input/inputPhone";
import { Modal } from "../../components/modal/modal";
import { ModalLayout } from "../../components/modal/modalLayout";
import { Alert, FormContent, H1 } from "../../components/modal/modalUi";
import { Spacer } from "../../components/spacer";
import { Textarea } from "../../components/textarea";
import { RuleAgree } from "../autn/ruleAgree";
import { BidSendedModal } from "./bidSendedModal";
import { Rules } from "./validationsRules";

type Props = {
  onClose: () => void;
};

type FormValues = BidToExitEntity & {
  termsAgree?: boolean;
};

export const BidModal = ({ onClose }: Props) => {
  const { locale = "ru" } = useRouter();
  const [agreeModalIsOpen, setAgreeModalIsOpen] = useState(false);
  const [bidSended, setBidSended] = useState(false);
  const [bidError, setBidError] = useState(false);
  const { control, handleSubmit, formState } = useForm<FormValues>({ mode: "onBlur" });
  const { phoneRule, emailRule, nameRule, storyRule, cardRule, heightRule, commonRule } = useMemo(
    () => new Rules(locale),
    [locale]
  );

  const { field: card, fieldState: cardState } = useController({
    control,
    name: "SpartakKidsCardNumber",
    rules: cardRule,
  });
  const { field: parent, fieldState: parentState } = useController({ control, name: "ParentName", rules: nameRule });
  const { field: child, fieldState: childState } = useController({ control, name: "ChildName", rules: nameRule });
  const { field: height, fieldState: heightState } = useController({ control, name: "ChildHeight", rules: heightRule });
  const { field: tellwhy, fieldState: tellwhyState } = useController({ control, name: "Story", rules: storyRule });
  const { field: mail, fieldState: mailState } = useController({ control, name: "Email", rules: emailRule });
  const { field: phone, fieldState: phoneState } = useController({ control, name: "Phone", rules: phoneRule });

  const { field: agree, fieldState: agreeState } = useController({
    control,
    name: "termsAgree",
    rules: commonRule,
    defaultValue: true,
  });

  const onSubmit: SubmitHandler<FormValues> = async ({ termsAgree, ...data }) => {
    bidError && setBidError(false);
    if (!Object.keys(formState.errors).length && termsAgree) {
      bidToExitRepository
        .save(data)
        .then(() => setBidSended(true))
        .catch(() => setBidError(true));
    }
  };

  return (
    <Modal clickClose={onClose}>
      <ModalLayout onClose={agreeModalIsOpen ? () => setAgreeModalIsOpen(false) : onClose} hideSocial={true}>
        {bidSended ? (
          <BidSendedModal />
        ) : agreeModalIsOpen ? (
          <RuleAgree onClose={() => setAgreeModalIsOpen(false)} />
        ) : (
          <Container>
            <H1>{lang[locale].kids.bidTitle}</H1>

            <Spacer height={["1.3vw", "5.73vw", "7.47vw"]} />

            {bidError && (
              <Alert>
                <WarningTriangle />
                <span>{lang[locale].kids.bidError}</span>
              </Alert>
            )}

            <form>
              <FormContent>
                <Input
                  type="number"
                  label={lang[locale].kids.cardNumber}
                  onChange={card.onChange}
                  onBlur={card.onBlur}
                  value={card.value}
                  error={cardState.error?.message}
                  lightStyle
                />

                <Input
                  label={lang[locale].kids.parent}
                  onChange={parent.onChange}
                  onBlur={parent.onBlur}
                  value={parent.value}
                  error={parentState.error?.message}
                  lightStyle
                />

                <Input
                  label={lang[locale].kids.child}
                  onChange={child.onChange}
                  onBlur={child.onBlur}
                  value={child.value}
                  error={childState.error?.message}
                  lightStyle
                />

                <Input
                  type="number"
                  label={lang[locale].kids.height}
                  onChange={height.onChange}
                  onBlur={height.onBlur}
                  value={height.value}
                  error={heightState.error?.message}
                  lightStyle
                />

                <Textarea
                  label={lang[locale].kids.tellwhy}
                  onChange={tellwhy.onChange}
                  onBlur={tellwhy.onBlur}
                  value={tellwhy.value}
                  error={tellwhyState.error?.message}
                  lightStyle
                />

                <Input
                  label={lang[locale].kids.mail}
                  onChange={mail.onChange}
                  onBlur={mail.onBlur}
                  value={mail.value}
                  error={mailState.error?.message}
                  lightStyle
                />

                <InputPhone
                  label={lang[locale].kids.phone}
                  onChange={(value) => phone.onChange(`+${value}`)}
                  onBlur={phone.onBlur}
                  value={phone.value}
                  error={phoneState.error?.message}
                  lightStyle
                />

                <Spacer height={["1.3vw", "5.73vw", "7.47vw"]} />

                <Checkbox
                  label={
                    <CheckboxLabel>
                      <span>{lang[locale].kids.agree1} </span>
                      <a onClick={() => setAgreeModalIsOpen(true)}>{lang[locale].kids.agree2}</a>
                    </CheckboxLabel>
                  }
                  checked={!!agree.value}
                  onChange={agree.onChange}
                  error={agreeState.error?.message}
                  lightStyle
                />
              </FormContent>
            </form>

            <CustomButton type="red" className="submitBtn" onClick={handleSubmit(onSubmit)}>
              {lang[locale].kids.send}
            </CustomButton>
          </Container>
        )}
      </ModalLayout>
    </Modal>
  );
};

const Container = styled.div`
  font-family: "FCSM Text";
  font-weight: 500;
  width: 18.54vw;
  margin: 0 auto;
  display: flex;
  flex-flow: column;

  & textarea {
    height: 4.58vw;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 100%;

    & textarea {
      height: 11.47vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    & textarea {
      height: 26vw;
    }
  }
`;

const CheckboxLabel = styled.div`
  font-family: "Roboto";
  color: ${theme.colors.grayDark};

  & > a {
    color: ${theme.colors.black};
    text-decoration: underline;
  }
`;
