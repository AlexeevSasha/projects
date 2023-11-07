import styled from "astroturf/react";
import Image, { ImageProps } from "next/image";

type Props = ImageProps & {
  className?: string;
  src?: string;
};

export const NextImage = ({ className, alt = "", ...props }: Props) => {
  const isValidSrc =
    props.src &&
    (props.src.startsWith("http://") ||
      props.src.startsWith("https://") ||
      props.src.startsWith("/"));

  return (
    <ImgContainer className={`image-wrapper ${className}`}>
      {isValidSrc && (
        <Image
          style={{
            objectFit: "contain",
          }}
          alt={alt}
          layout="fill"
          {...props}
        />
      )}
    </ImgContainer>
  );
};

const ImgContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
