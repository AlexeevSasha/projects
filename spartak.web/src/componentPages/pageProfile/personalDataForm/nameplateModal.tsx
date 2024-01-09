import { useRouter } from "next/router";
import { useMemo, useContext } from "react";
import { SubmitHandler, useController, useForm } from "react-hook-form";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { userRepository } from "../../../api/userRepository";
import { IconWarning } from "../../../assets/icon/iconWarning";
import { theme } from "../../../assets/theme/theme";
import { CustomButton } from "../../../components/buttons/customButton";
import { Input } from "../../../components/input/input";
import { Modal } from "../../../components/modal/modal";
import { ModalLayout } from "../../../components/modal/modalLayout";
import { FormContent, H1 } from "../../../components/modal/modalUi";
import { DataContext } from "../../../core/dataProvider";
import { Rules } from "./validationsRules";

type Props = {
  onClose: () => void;
  openNextModal: () => void;
};

export const NameplateModal = ({ onClose, openNextModal }: Props) => {
  const { locale = "ru" } = useRouter();
  const { control, handleSubmit, setError } = useForm<{ nameplate: string }>({ mode: "onBlur" });
  const { setLoading } = useContext(DataContext);

  const { nameplateRule } = useMemo(() => new Rules(locale), [locale]);

  const { field: nameplate, fieldState: nameplateState } = useController({
    control,
    name: "nameplate",
    rules: nameplateRule,
  });

  const onSubmit: SubmitHandler<{ nameplate: string }> = async (data) => {
    try {
      setLoading(true);
      await userRepository.postAddChairPlotting({ Plotting: data.nameplate });
      onClose();
      openNextModal();
      setLoading(false);
    } catch (e: any) {
      console.log("e", e);
      if (e?.Type === "errors.ValidationException") {
        setError("nameplate", { message: lang[locale].bannerInfo.nameplate.modal.censored });
      } else {
        setError("nameplate", {
          message: lang[locale].bannerInfo.nameplate.modal["errors.ContactChairPlottingStatusException"],
        });
      }
      setLoading(false);
    }
  };

  return (
    <Modal clickClose={onClose}>
      <ModalLayout onClose={onClose} hideSocial={true}>
        <Container>
          <H1>{lang[locale].bannerInfo.nameplate.modal.title}</H1>

          <form>
            <CustomFormContent>
              <Input
                label={lang[locale].bannerInfo.nameplate.modal.label}
                onChange={nameplate.onChange}
                onBlur={nameplate.onBlur}
                value={nameplate.value}
                error={nameplateState.error?.message}
                lightStyle
                maxLength={20}
                minLength={1}
              />

              <PhonePrompt>
                {!nameplateState.error?.message && lang[locale].bannerInfo.nameplate.modal.prompt}
              </PhonePrompt>
            </CustomFormContent>
          </form>

          <AttentionBlock insSmallScreen>
            <IconWarning />
            <Attention>{lang[locale].bannerInfo.nameplate.modal.warning}</Attention>
          </AttentionBlock>

          <CustomButton type="red" className="submitBtn" onClick={handleSubmit(onSubmit)}>
            {lang[locale].bannerInfo.nameplate.modal.button}
          </CustomButton>
        </Container>
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

const CustomFormContent = styled(FormContent)`
  margin: 2.08vw 0 2.92vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin: 3.13vw 0 7.3vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin: 6.4vw 0 14.93vw;
  }
`;

const PhonePrompt = styled.div`
  font-family: "Roboto", sans-serif;
  position: absolute;
  color: ${theme.colors.gray};
  font-size: 0.73vw;
  transform: translateY(-1.04vw);

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.82vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.73vw;
  }
`;

const AttentionBlock = styled.p<{ insSmallScreen?: boolean }>`
  display: flex;
  height: fit-content;
  /* gap: 0.78vw; */
  margin: 0;
  font-size: 0.73vw;
  font-family: Roboto, sans-serif;
  font-weight: 500;
  color: ${theme.colors.gray};
  background: rgba(204, 18, 45, 0.1);
  padding: 8px;
  margin-bottom: 0.83vw;

  span {
    margin-left: 0.78vw;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-top: 6.4vw;
  }
`;

const Attention = styled.span`
  color: ${theme.colors.black};
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.84vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.73vw;
    gap: 2.13vw;
  }
`;
