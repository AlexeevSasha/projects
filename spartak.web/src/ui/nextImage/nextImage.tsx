import Image, { ImageProps } from "next/image";
import styled from "styled-components";

type Props = ImageProps & {
  className?: string;
  src?: string;
};

export const NextImage = ({ className, ...props }: Props) => {
  const isValidSrc =
    props.src && (props.src?.startsWith("http://") || props.src?.startsWith("https://") || props.src?.startsWith("/"));

  return (
    <ImgContainer className={`image-wrapper ${className}`}>
      {isValidSrc && <Image layout="fill" alt="" objectFit="contain" {...props} />}
    </ImgContainer>
  );
};

const ImgContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
