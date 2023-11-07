import styled from "astroturf/react";

export const CartProductSceleton = () => {
  return (
    <Container>
      <div>
        <SkeletonBlock type={"img"} />
      </div>
      <div>
        <SkeletonBlock type={"label"} />
        <FlexContainer>
          <SkeletonBlock type={"text"} />
          <SkeletonBlock type={"price"} />
        </FlexContainer>
        <FlexContainer>
          <FlexContainer>
            <SkeletonBlock type={"icon"} />
            <SkeletonBlock type={"icon"} />
          </FlexContainer>
          <SkeletonBlock type={"button"} />
        </FlexContainer>
      </div>
    </Container>
  );
};

const Container = styled.div`
  @import "variables";

  display: grid;
  grid-template-columns: 100px 1fr;
  grid-column-gap: 24px;
  overflow: hidden;
  border-radius: 28px;
  height: 100%;
  width: 100%;
  padding: 24px;
  border: 1px solid #e7e7e7;

  @include respond-to(small) {
    padding: 12px;
  }
`;

const SkeletonBlock = styled.div<{ type?: "label" | "price" | "text" | "icon" | "img" | "button" }>`
  @import "variables";

  position: relative;
  background-color: #e7e7e7;
  overflow: hidden;
  z-index: 1;

  &.type-img {
    width: 100px;
    height: 100px;
  }

  &.type-label {
    height: 20px;
    max-width: 150px;
    width: 100%;
    border-radius: 10px;
    margin-bottom: 4px;
  }

  &.type-price {
    max-width: 140px;
    width: 100%;
    height: 30px;
    margin-left: auto !important;
  }

  &.type-button {
    max-width: 140px;
    width: 100%;
    height: 24px;
    border-radius: 16px;
    margin-left: auto !important;
  }

  &.type-text {
    height: 50px;
    width: 70%;
  }

  &.type-icon {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-top: 16px;
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

const FlexContainer = styled.div`
  display: flex;
  align-items: center;

  & > div:last-child {
    margin-left: 20px;
  }
`;
