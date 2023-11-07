import Link from "next/link";
import { Icon } from "../../../common/components/Icon";
import styled from "astroturf/react";
import { SocialMediaAuthorT } from "../interfaces/author";

type Props = {
  socialMedia: SocialMediaAuthorT[];
  pharmacie?: boolean;
};

const render = ({
  socialMedia,
  pharmacie,
}: {
  socialMedia: SocialMediaAuthorT;
  pharmacie?: boolean;
}) => {
  switch (socialMedia.nameSocialMedia) {
    case "vk":
    case "telegram":
    case "ok":
    case "dzen":
      return (
        <CustomLink target="_blank" href={socialMedia.link} pharmacie={pharmacie}>
          <Icon
            fill={"#5383C7"}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            name={socialMedia.nameSocialMedia}
          />
        </CustomLink>
      );
    case "link":
      return <CustomLink href={socialMedia.link}>{socialMedia.text}</CustomLink>;
  }
};

export const SocialMediaAuthor = ({ socialMedia, pharmacie }: Props) => {
  return (
    <IconWrapper>
      {socialMedia.map((el, i) => (
        <Item pharmacie={pharmacie} key={i}>
          {render({ socialMedia: el, pharmacie })}
        </Item>
      ))}
    </IconWrapper>
  );
};

const IconWrapper = styled.ul`
  @import "variables";

  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  height: fit-content;
`;

const Item = styled.li<{ pharmacie?: boolean }>`
  @import "variables";

  @include transition();

  background: $white;
  border-radius: 16px;
  width: fit-content;
  margin-right: 4px;

  &:hover {
    background: $blue-2;
  }

  &.pharmacie {
    background: $grey;
    margin-right: 8px;
    &:hover {
      background: $blue-2;
    }
  }
`;

const CustomLink = styled(Link) <{ pharmacie?: boolean }>`
  @import "variables";

  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-weight: 600;
  font-size: 13px;
  line-height: 100%;
  color: $blue1;
  width: 100%;
  height: 100%;
  padding: 16px;

  &.pharmacie {
    padding: 14px;
    svg {
      opacity: 1 !important;
      min-width: 16px;
      min-height: 16px;
    }
  }

  @include respond-to(small) {
    padding: 12px;
    &.pharmacie {
      padding: 14px;
      svg {
        min-width: 16px;
        min-height: 16px;
      }
    }
  }
`;
