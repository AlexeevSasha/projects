import styled from "astroturf/react";
import { Button } from "../../../common/components/Button";
import { useState } from "react";
import { TextArea } from "../../../common/components/inputs/TextArea";
import { Checkbox } from "../../../common/components/inputs/Checkbox";
import { useForm } from "react-hook-form";

type AddCommentT = {
  comment: string;
  isAnonim: boolean;
};

export const AddComment = () => {
  const [visible, setVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddCommentT>();

  const onSubmit = (data: AddCommentT) => {
    console.log(data);
  };

  return (
    <div>
      {visible ? (
        <FormStyle onSubmit={handleSubmit(onSubmit)}>
          <ContainerGrid>
            <TextArea
              {...register("comment", { required: true })}
              placeholder={"Текст комментария"}
              error={!!errors.comment}
            />
            <Paragraph>Отправляя комментарий вы соглашаетесь с правилами публикации </Paragraph>
          </ContainerGrid>

          <Checkbox
            {...register("isAnonim")}
            id={"is-anonim-comment"}
            label={"Оставить отзыв анонимно"}
          />
          <ContainerGrid>
            <CustomButton onClick={() => setVisible(false)} type={"button"} typeBtn={"lightBlue"}>
              Отменить
            </CustomButton>
            <CustomButton typeBtn={"blue"}>Отправить</CustomButton>
          </ContainerGrid>
        </FormStyle>
      ) : (
        <CustomButton onClick={() => setVisible(true)} typeBtn={"blue"}>
          Добавить комментарий
        </CustomButton>
      )}
    </div>
  );
};

const FormStyle = styled.form`
  @import "variables";

  display: grid;
  grid-row-gap: 20px;
  color: $black;
`;

const ContainerGrid = styled.div`
  display: grid;
  grid-row-gap: 12px;
`;

const Paragraph = styled.p`
  margin: 0;
  font-weight: 400;
  font-size: 13px;
  line-height: 140%;
  letter-spacing: 0.02em;
  color: #6d6d6d;
`;

const CustomButton = styled(Button)`
  @import "variables";

  padding: 20px 0;
  width: 100%;
`;
