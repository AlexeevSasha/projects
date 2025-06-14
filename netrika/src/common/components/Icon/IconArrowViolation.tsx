import { theme } from "common/styles/theme";
import React from "react";
import { styled } from "../../styles/styled";

interface IProps {
  rotate: string;
}

export const IconArrowViolation: React.FC<IProps> = React.memo(({ rotate }) => {
  return (
    <>
      <Svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg" rotate={rotate}>
        <path
          d="M11.8127 0L10.6408 0C10.5611 0 10.4861 0.0390626 10.4393 0.103125L6.0002 6.22188L1.56114 0.103125C1.51426 0.0390626 1.43926 0 1.35957 0L0.187698 0C0.0861354 0 0.0267604 0.115625 0.0861354 0.198438L5.59551 7.79375C5.79551 8.06875 6.20489 8.06875 6.40332 7.79375L11.9127 0.198438C11.9736 0.115625 11.9143 0 11.8127 0Z"
          fill={theme.colors.black}
        />
      </Svg>
    </>
  );
});

const Svg = styled.svg<{ rotate: string }>`
  transform: rotate(${(props) => props.rotate});
  margin-right: 15px;
`;
