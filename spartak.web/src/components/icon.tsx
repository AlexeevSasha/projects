import styled from "styled-components";

type Props = {
  name: string;
  color?: string;
  className?: string;
};

export const Icon = ({ name, ...props }: Props) => {
  return (
    <Svg width="24" height="24" fill="none" {...props} viewBox="0 0 24 24">
      <use xlinkHref={`/images/matchEvents.svg#${name}`} />
    </Svg>
  );
};

const Svg = styled.svg<{ color?: string }>`
  color: ${({ color }) => color};
`;
