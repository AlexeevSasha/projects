import { Icon } from "../Icon";
import styled from "astroturf/react";

type Props = {
  idIcon: "vk" | "ok" | "telegram" | "copy";
  title: string;
  link: string;
  copy?: boolean;
  handleClick?: () => void;
};
export const ShareSocial = ({ idIcon, title, link, copy, handleClick }: Props) => {
  return (
    <Container>
      {copy ? (
        <div onClick={handleClick} style={{ display: "flex", alignItems: "center" }}>
          <Icon width="16" height="16" viewBox="0 0 16 16" fill={"#BACDE9"} name={idIcon} />
          {title}
        </div>
      ) : (
        <CustomLink target={"_blank"} href={link}>
          <Icon width="16" height="16" viewBox="0 0 16 16" fill={"#BACDE9"} name={idIcon} />
          {title}
        </CustomLink>
      )}
    </Container>
  );
};

const Container = styled.div`
  @import "variables";

  @include transition();

  display: flex;
  align-items: center;
  padding: 12px;
  color: $black;
  font-weight: 500;
  line-height: 137%;
  cursor: pointer;

  svg {
    margin-right: 12px;
  }

  &:hover {
    font-weight: 600;
    svg {
      fill: $blue1;
    }
  }
`;

const CustomLink = styled.a`
  display: flex !important;
  align-items: center;
  color: inherit;
`;
