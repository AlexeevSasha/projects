import styled from "astroturf/react";
import { Button } from "common/components/Button";
import { AppContext } from "common/components/ContextProvider";
import { Input } from "common/components/inputs/Input";
import { Switch } from "common/components/inputs/Switch";
import { ModalNames } from "common/interfaces/modal";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { UserDistributionsT } from "../interfaces/userDistributions";
import { ProfileDistributionsModal } from "./ProfileDistributionsModal";

export interface IDistributionsForm {
  emailDistribution: string;
  discounts: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  favorites: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
}

type Props = {
  distributions: UserDistributionsT;
};

export const DistributionsForm = ({ distributions }: Props) => {
  const { openModal } = useContext(AppContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IDistributionsForm>();

  const onSubmit = async (data: unknown) => {
    console.log(data);
    openModal(ModalNames.POPUP_MODAL, {
      children: <ProfileDistributionsModal />,
    });
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex>
          <Row>
            <Text>Получать на адрес</Text>
            <Input
              defaultValue={distributions.emailDistribution ? distributions.emailDistribution : ""}
              {...register("emailDistribution", {
                required: true,
              })}
              errorText={
                !distributions.confirmEmail
                  ? "Пожалуйста, подтвердите почту, перейдя по ссылке в письме"
                  : ""
              }
              error={!!errors.emailDistribution || !distributions.confirmEmail}
              placeholder={"Email *"}
            />
          </Row>
          <Row>
            <TextBlock>
              <Text>Скидки и акции</Text>
              <Description>Экономьте на акциях и распродажах</Description>
            </TextBlock>
            <SwitchBlock>
              <SwitchRow>
                <SwitchLabel>E-mail</SwitchLabel>
                <Switch
                  id="discountsEmail"
                  {...register("discounts.email", {
                    required: false,
                  })}
                  defaultChecked={distributions.discounts.email}
                />
              </SwitchRow>
              <SwitchRow>
                <SwitchLabel>SMS</SwitchLabel>
                <Switch
                  id="discountsSms"
                  {...register("discounts.sms", {
                    required: false,
                  })}
                  defaultChecked={distributions.discounts.sms}
                />
              </SwitchRow>
              <SwitchRow>
                <SwitchLabel>Push-уведомления</SwitchLabel>
                <Switch
                  id="discountsPush"
                  {...register("discounts.push", {
                    required: false,
                  })}
                  defaultChecked={distributions.discounts.push}
                />
              </SwitchRow>
            </SwitchBlock>
          </Row>
          <Row>
            <TextBlock>
              <Text>Избранные товары</Text>
              <Description>
                Узнавайте о снижении цены и появлении в продаже любимых товаров
              </Description>
            </TextBlock>
            <SwitchBlock>
              <SwitchRow>
                <SwitchLabel>E-mail</SwitchLabel>
                <Switch
                  id="favoritesEmail"
                  {...register("favorites.email", {
                    required: false,
                  })}
                  defaultChecked={distributions.favorites.email}
                />
              </SwitchRow>
              <SwitchRow>
                <SwitchLabel>SMS</SwitchLabel>
                <Switch
                  id="favoritesSms"
                  {...register("favorites.sms", {
                    required: false,
                  })}
                  defaultChecked={distributions.favorites.sms}
                />
              </SwitchRow>
              <SwitchRow>
                <SwitchLabel>Push-уведомления</SwitchLabel>
                <Switch
                  id="favoritesPush"
                  {...register("favorites.push", {
                    required: false,
                  })}
                  defaultChecked={distributions.favorites.push}
                />
              </SwitchRow>
            </SwitchBlock>
          </Row>
          <Row>
            <TextBlock>
              <Text>Уведомления по заказам</Text>
              <Description>Получайте информацию о статусе ваших заказов </Description>
            </TextBlock>
            <SwitchBlock>
              <SwitchRow>
                <SwitchLabel>E-mail</SwitchLabel>
                <Switch
                  id="notificationsEmail"
                  {...register("notifications.email", {
                    required: false,
                  })}
                  defaultChecked={distributions.notifications.email}
                />
              </SwitchRow>
              <SwitchRow>
                <SwitchLabel>SMS</SwitchLabel>
                <Switch
                  id="notificationsSms"
                  {...register("notifications.sms", {
                    required: false,
                  })}
                  defaultChecked={distributions.notifications.sms}
                />
              </SwitchRow>
              <SwitchRow>
                <SwitchLabel>Push-уведомления</SwitchLabel>
                <Switch
                  id="notificationsPush"
                  {...register("notifications.push", {
                    required: false,
                  })}
                  defaultChecked={distributions.notifications.push}
                />
              </SwitchRow>
            </SwitchBlock>
          </Row>
          <ActionBlock>
            <ActionInfo>Заполняя форму, я принимаю условия передачи информации</ActionInfo>
            <CustomButton typeBtn={"blue"}>Сохранить</CustomButton>
          </ActionBlock>
        </Flex>
      </form>
    </Container>
  );
};

const Container = styled.div`
  @import "variables";
  margin: 20px 0px 40px 0px;
  background: $white;
  border-radius: 32px;
  width: 100%;
  padding: 40px 244px 40px 40px;
  @include respond-to(medium) {
    margin: 12px 0px 40px 0px;
    border-radius: 28px;
    padding: 20px;
  }
`;
const Flex = styled.div`
  @import "variables";
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  svg {
    width: 24px;
    height: 24px;
    ellipse {
      fill: $blue1;
      opacity: 0.4;
    }
    path {
      fill: $blue1;
      opacity: 0.4;
    }
  }
`;
const Row = styled.div`
  @import "variables";
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-bottom: 48px;
  @include respond-to(medium) {
    flex-direction: column;
    margin-bottom: 32px;
  }
`;
const Text = styled.p`
  @import "variables";
  margin: 0;
  align-self: center;
  font-weight: 600;
  width: 60%;
  font-size: 16px;
  color: $black;
  @include respond-to(medium) {
    margin-bottom: 16px;
    width: 100%;
  }
`;
const TextBlock = styled.div`
  @import "variables";
  display: flex;
  flex-direction: column;
  width: 60%;
  margin-right: 36px;
  p {
    margin-bottom: 8px;
    align-self: flex-start;
    width: 100%;
  }
  @include respond-to(medium) {
    width: 100%;
    margin-right: 0px;
  }
`;
const Description = styled.span`
  @import "variables";
  font-weight: 400;
  font-size: 14px;
  line-height: 160%;
  opacity: 0.4;
  @include respond-to(medium) {
    margin-bottom: 16px;
  }
`;
const SwitchBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const SwitchRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 12px;
  justify-content: space-between;
  align-items: center;
`;
const SwitchLabel = styled.p`
  @import "variables";
  margin: 0;
  font-weight: 500;
  font-size: 16px;
  line-height: 137%;
  @include respond-to(medium) {
    font-size: 14px;
  }
`;
const ActionBlock = styled.div`
  @import "variables";
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  @include respond-to(medium) {
    flex-direction: column-reverse;
  }
`;
const ActionInfo = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 137%;
  opacity: 0.4;
  width: 100%;
`;
const CustomButton = styled(Button)`
  @import "variables";
  padding: 16px 40px;
  @include respond-to(medium) {
    padding: 14px 0;
    width: 100%;
    margin-bottom: 16px;
  }
`;
