import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";
import { SubmitHandler, useController, useForm } from "react-hook-form";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { DonationEntity, donationRepository } from "../../../api/donationRepository";
import { theme } from "../../../assets/theme/theme";
import { CustomButton } from "../../../components/buttons/customButton";
import { Checkbox } from "../../../components/checkbox";
import { Input } from "../../../components/input/input";
import { InputPhone } from "../../../components/input/inputPhone";
import { Modal } from "../../../components/modal/modal";
import { ModalLayout } from "../../../components/modal/modalLayout";
import { FormContent, H1 } from "../../../components/modal/modalUi";
import { Textarea } from "../../../components/textarea";
import { PublicOffer } from "./publicOffer";
import { Rules } from "./validationsRules";

type Props = {
  onClose: () => void;
};

export const SupportModal = ({ onClose }: Props) => {
  const { locale = "ru" } = useRouter();
  const { control, handleSubmit, formState } = useForm<DonationEntity>({ mode: "onBlur" });
  const [offerIsOpen, setOfferIsOpen] = useState(false);

  const { phoneRule, emailRule, nameRule, commentRule, sumRule } = useMemo(() => new Rules(locale), [locale]);

  const { field: email, fieldState: emailState } = useController({ control, name: "Email", rules: emailRule });
  const { field: name, fieldState: nameState } = useController({ control, name: "Name", rules: nameRule });
  const { field: phoneNumber, fieldState: phoneState } = useController({
    control,
    name: "Phone",
    rules: phoneRule,
  });
  const { field: comment, fieldState: commentState } = useController({ control, name: "Comment", rules: commentRule });
  const { field: sum, fieldState: sumState } = useController({ control, name: "PayAmount", rules: sumRule });

  const { field: termsAgree } = useController({ control, name: "termsAgree", defaultValue: true });
  const { field: noName } = useController({ control, name: "IsAnonymously", defaultValue: true });

  const onSubmit: SubmitHandler<DonationEntity> = async ({ termsAgree, ...data }) => {
    if (!Object.keys(formState.errors).length && termsAgree) {
      data.PayAmount = +data.PayAmount;
      const url = await donationRepository.getInvoiceUrl(data);
      window.location.assign(url);
    }
  };

  return (
    <Modal clickClose={onClose}>
      <ModalLayout onClose={offerIsOpen ? () => setOfferIsOpen(false) : onClose} hideSocial={true}>
        {offerIsOpen ? (
          <PublicOffer />
        ) : (
          <Container>
            <H1>{lang[locale].academy.supportHeader}</H1>

            <form>
              <FormContent>
                <Input
                  label={lang[locale].auth.name}
                  onChange={name.onChange}
                  onBlur={name.onBlur}
                  value={name.value}
                  error={nameState.error?.message}
                  lightStyle
                  disabled={noName.value}
                />

                <Checkbox
                  label={<CheckboxLabel>{lang[locale].academy.anonymous}</CheckboxLabel>}
                  checked={!!noName.value}
                  onChange={noName.onChange}
                  lightStyle
                />

                <Input
                  label={lang[locale].auth.email}
                  onChange={email.onChange}
                  onBlur={email.onBlur}
                  value={email.value}
                  error={emailState.error?.message}
                  lightStyle
                />

                <InputPhone
                  label={lang[locale].auth.phone}
                  onChange={(value) => phoneNumber.onChange(`+${value}`)}
                  onBlur={phoneNumber.onBlur}
                  value={phoneNumber.value}
                  error={phoneState.error?.message}
                  lightStyle
                />

                <Textarea
                  label={lang[locale].academy.commetnLabel}
                  onChange={comment.onChange}
                  onBlur={comment.onBlur}
                  value={comment.value}
                  error={commentState.error?.message}
                />

                <SumHeader>{lang[locale].academy.sum}</SumHeader>

                <SumDesc>{lang[locale].academy.sumDesc}</SumDesc>

                <div>
                  <BtnGroup>
                    <SumButton type="opacity" onClick={() => sum.onChange("300")}>
                      300 ₽
                    </SumButton>
                    <SumButton type="opacity" onClick={() => sum.onChange("500")}>
                      500 ₽
                    </SumButton>
                  </BtnGroup>

                  <BtnGroup>
                    <SumButton type="opacity" onClick={() => sum.onChange("1000")}>
                      1000 ₽
                    </SumButton>
                    <SumButton type="opacity" onClick={() => sum.onChange("10000")}>
                      10000 ₽
                    </SumButton>
                  </BtnGroup>

                  <OtherSumButton type="red" onClick={() => sum.onChange("")}>
                    {lang[locale].academy.otherSum}
                  </OtherSumButton>
                </div>

                <Input
                  type="number"
                  name="otherSum"
                  onChange={sum.onChange}
                  onBlur={sum.onBlur}
                  value={sum.value}
                  error={sumState.error?.message}
                  lightStyle
                />

                <Checkbox
                  label={
                    <CheckboxLabel onClick={(e) => e.stopPropagation()}>
                      <span>{lang[locale].academy.supportAgree1} </span>
                      <a onClick={() => setOfferIsOpen(true)}>{lang[locale].academy.supportAgree2}</a>
                    </CheckboxLabel>
                  }
                  checked={!!termsAgree.value}
                  onChange={termsAgree.onChange}
                  lightStyle
                />
              </FormContent>
            </form>

            <Button type="red" className="submitBtn" onClick={handleSubmit(onSubmit)}>
              {lang[locale].bannerInfo.supportAcademyButton}
            </Button>
          </Container>
        )}
      </ModalLayout>
    </Modal>
  );
};

const Container = styled.div`
  font-family: "FCSM Text", sans-serif;
  font-weight: 500;
  display: flex;
  flex-flow: column;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 100%;
  }
`;

const CheckboxLabel = styled.div`
  font-family: "Roboto", sans-serif;
  color: ${theme.colors.grayDark};

  & > a {
    color: ${theme.colors.black};
    text-decoration: underline;
  }
`;

const Button = styled(CustomButton)``;

const BtnGroup = styled.div`
  display: flex;
  margin-top: 0.5vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-top: 1vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-top: 1.5vw;
  }
`;

const SumButton = styled(CustomButton)`
  border: 1px solid ${theme.colors.gray};
  padding-top: 0;
  padding-bottom: 0;
  color: ${theme.colors.black};
  height: 1.98vw;
  box-sizing: border-box;
  flex: 1;

  &:not(:first-child) {
    margin-left: 0.5vw;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    height: 5vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: 10vw;
  }
`;

const OtherSumButton = styled(CustomButton)`
  border: 1px solid ${theme.colors.gray};
  padding-top: 0;
  padding-bottom: 0;
  color: ${theme.colors.white};
  background: ${theme.colors.black};
  height: 1.98vw;
  box-sizing: border-box;
  margin-top: 0.5vw;
  margin-bottom: 0.5vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    height: 5vw;
    margin-bottom: 1vw;
    margin-top: 1vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: 10vw;
    margin-bottom: 1.5vw;
    margin-top: 1.5vw;
  }
`;

const SumHeader = styled.div`
  margin-top: 1.25vw;
  font-size: 0.9375vw;
  color: ${theme.colors.black};
  text-align: center;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.34vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.26vw;
  }
`;

const SumDesc = styled.div`
  font-size: 0.83vw;
  color: ${theme.colors.grayDark};
  text-align: center;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.08vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.26vw;
  }
`;
