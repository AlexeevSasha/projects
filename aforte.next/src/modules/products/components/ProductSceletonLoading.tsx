import styled from "astroturf/react";

export const ProductSkeletonLoading = () => {
  return (
    <Container>
      <SkeletonBlock type={"img"} />
      <SkeletonBlock type={"label"} />
      <SkeletonBlock type={"price"} />
      <SkeletonBlock type={"text"} />
      <SkeletonBlock type={"button"} />
    </Container>
  );
};

const Container = styled.div`
  @import "variables";

  overflow: hidden;
  border-radius: 28px;
  height: 100%;
  max-width: 270px;
  width: 100%;
  padding: 20px;
  border: 1px solid #e7e7e7;

  @include respond-to(small) {
    padding: 12px;
  }
`;

const SkeletonBlock = styled.div<{ type?: "label" | "price" | "text" | "button" | "img" }>`
  @import "variables";

  position: relative;
  background-color: #e7e7e7;
  overflow: hidden;
  z-index: 1;

  &.type-img {
    height: 135px;
  }

  &.type-label {
    margin-top: 12px;
    max-width: 120px;
    width: 100%;
    border-radius: 10px;
    height: 24px;
  }

  &.type-price {
    margin-top: 12px;
    height: 25px;
  }

  &.type-text {
    margin-top: 12px;
    height: 60px;
  }

  &.type-button {
    margin-top: 16px;
    height: 40px;
    border-radius: 16px;
  }

  @include respond-to(small) {
    &.type-img {
      height: 110px;
      width: 150px;
    }
    &.type-text {
      height: 72px;
    }
  }

  @keyframes loading-skeleton {
    100% {
      transform: translateX(100%);
    }
  }

  &:after {
    content: " ";
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    height: 100%;
    background-repeat: no-repeat;
    background-image: linear-gradient(90deg, #e7e7e7, #f5f5f5, #e7e7e7);
    transform: translateX(-100%);
    animation-name: loading-skeleton;
    animation-direction: normal;
    animation-duration: 1.5s;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
  }
`;
