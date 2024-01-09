import styled, { CSSProperties } from "styled-components";

export const FlexContainer = styled.div<{
  spacing?: number;
  direction?: CSSProperties["flexDirection"];
  justify?: CSSProperties["justifyContent"];
  alignItems?: CSSProperties["alignItems"];
  flex?: 1 | 0;
  fullWidth?: boolean;
  basis?: number | string;
  wrap?: "nowrap" | "wrap" | "wrap-reverse";
}>`
  display: flex;
  flex: ${({ flex }) => flex && (flex === 1 ? "1 1 auto" : "0 0 auto")};
  flex-direction: ${({ direction = "column" }) => direction};
  flex-basis: ${({ basis }) => (basis && typeof basis === "string" ? basis : basis + "px")};
  justify-content: ${({ justify = "center" }) =>
    justify && (justify === "end" ? "flex-end" : justify === "start" ? "flex-start" : justify)};
  align-items: ${({ alignItems = "center" }) =>
    alignItems && (alignItems === "end" ? "flex-end" : alignItems === "start" ? "flex-start" : alignItems)};
  gap: ${({ spacing }) => spacing && spacing + "px"};
  width: ${({ fullWidth }) => fullWidth && "100%"};
  flex-wrap: ${({ wrap }) => wrap || "nowrap"};
`;
