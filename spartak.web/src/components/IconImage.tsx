import styled from "styled-components";

export const IconImage = styled.div<{ url: string; width?: string; height?: string }>`
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "100%"};
  background-image: ${({ url }) => `url("${url}")`};
  background-size: cover;
  background-position: center;
`;
