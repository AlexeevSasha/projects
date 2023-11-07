import styled from "astroturf/react";
import { Button } from "../../../common/components/Button";
import { TextArea } from "../../../common/components/inputs/TextArea";
import { useForm } from "react-hook-form";
import { ProductReviewsT } from "../../reviews/interfaces/reviews";
import { Reviews } from "../../reviews/components/Reviews";
import { Checkbox } from "../../../common/components/inputs/Checkbox";
import Link from "next/link";

export const AddReview = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductReviewsT>();

  const onSubmit = (data: ProductReviewsT) => {
    console.log(data);
  };

  return (
    <FormStyle onSubmit={handleSubmit(onSubmit)}>
      <Title>Отзыв о товаре</Title>
      <ContainerGrid isRating>
        <Text>Общая оценка</Text>
        <Reviews.StarRating active={3.5} total={5} halfStar />
      </ContainerGrid>
      <ContainerGrid>
        <Text>Расскажите подробнее</Text>
        <ContainerMoreGrid>
          <TextArea
            {...register("advantages", { required: true })}
            placeholder={"Напишите, что понравилось"}
            error={!!errors.advantages}
          />
          <TextArea
            {...register("disadvantages", { required: true })}
            placeholder={"Напишите, что не понравилось"}
            error={!!errors.disadvantages}
          />
          <TextArea
            {...register("commentary", { required: true })}
            placeholder={"Общие впечатления"}
            error={!!errors.commentary}
          />
          <ContainerCheckbox>
            <Checkbox
              {...register("isAnonim")}
              id={"is-anonim-comment"}
              label={"Оставить комментарий анонимно"}
            />
          </ContainerCheckbox>
          <CustomButton typeBtn={"blue"}>Оставить отзыв</CustomButton>
          <Paragraph>
            Нажимая на кнопку, вы соглашаетесь{" "}
            <Link href={"/include/user_agreement.php"}>с условиями использования сервиса</Link>
          </Paragraph>
        </ContainerMoreGrid>
      </ContainerGrid>
    </FormStyle>
  );
};

const FormStyle = styled.form`
  @import "variables";

  width: 1000px;
  color: $black;
  padding: 40px;

  @include respond-to(large) {
    width: 650px;
    padding: 24px;
  }

  @include respond-to(small) {
    width: 100%;
  }
`;

const Title = styled.div`
  @import "variables";

  font-weight: 700;
  font-size: 28px;
  line-height: 130%;
  letter-spacing: 0.02em;
  margin-bottom: 45px;

  @include respond-to(small) {
    margin-bottom: 24px;
  }
`;

const Text = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 137%;
`;

const ContainerGrid = styled.div<{ isRating?: boolean }>`
  @import "variables";

  display: grid;
  grid-template-columns: 210px 1fr;
  grid-column-gap: 24px;

  @include respond-to(large) {
    grid-template-columns: 150px 1fr;
  }

  &.isRating {
    margin-bottom: 28px;
  }

  @include respond-to(small) {
    grid-template-columns: 1fr;
    grid-row-gap: 16px;
    &.isRating {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }
  }
`;

const ContainerMoreGrid = styled.div`
  display: grid;
  grid-row-gap: 12px;
`;

const Paragraph = styled.p`
  @import "variables";

  margin: 12px 0 0;
  font-weight: 400;
  font-size: 13px;
  line-height: 140%;
  letter-spacing: 0.02em;
  color: #6d6d6d;

  a {
    color: $blue1;
  }

  @include respond-to(small) {
    text-align: center;
    margin: 8px 0 0;
  }
`;

const ContainerCheckbox = styled.div`
  @import "variables";

  margin: 8px 0 12px;

  @include respond-to(small) {
    margin: 4px 0 12px;
  }
`;

const CustomButton = styled(Button)`
  padding: 20px 0;
  width: 100%;
`;
