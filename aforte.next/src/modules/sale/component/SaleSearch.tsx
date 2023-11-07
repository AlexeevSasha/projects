import { ChangeEvent, FC, InputHTMLAttributes } from "react";
import styled from "astroturf/react";
import { InputStyle } from "../../../common/components/inputs/Input";
import { IconSearch } from "../../../common/components/icons/IconSearch";

type Props = {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

export const SaleSearch: FC<InputHTMLAttributes<HTMLInputElement>> = ({
  onChange,
  placeholder = "Найти товар участвующий в акции",
}: Props) => {
  return (
    <InputContainer>
      <ContainerIcon>
        <IconSearch />
      </ContainerIcon>
      <CustomInput onChange={onChange} typeBtn="search" placeholder={placeholder} />
    </InputContainer>
  );
};

const InputContainer = styled.div`
  position: relative;
`;

const ContainerIcon = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 14px;
  display: flex;
  cursor: pointer;
`;

const CustomInput = styled(InputStyle)`
  @import "variables";
  padding: 0 50px;
  border: none;
  height: 52px;

  /* Chrome, Firefox, Opera, Safari 10.1+ */
  &::placeholder {
    color: $blue-1;
    opacity: 1; /* Firefox */
  }

  /* Internet Explorer 10-11 */
  &:-ms-input-placeholder {
    color: $blue-1;
  }

  /* Microsoft Edge */
  &::-ms-input-placeholder {
    color: $blue-1;
  }
`;
