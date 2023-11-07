import { Icon } from "../Icon";
import styled from "astroturf/react";
import Link from "next/link";

export const SocialMediaFooter = () => {
  return (
    <IconWrapper>
      <Item>
        <CustomLink aria-label={"vk"} target="_blank" href={"https://vk.com/polzaru_apteka"}>
          <Icon fill={"#5383C7"} width="16" height="16" viewBox="0 0 16 16" name={"vk"} />
        </CustomLink>
      </Item>
      <Item>
        <CustomLink aria-label={"telegram"} target="_blank" href={"https://t.me/polzaru_apteka"}>
          <Icon fill={"#5383C7"} width="16" height="16" viewBox="0 0 16 16" name={"telegram"} />
        </CustomLink>
      </Item>
      <Item>
        <CustomLink aria-label={"ok"} target="_blank" href={"https://ok.ru/group/70000000115784"}>
          <Icon fill={"#5383C7"} width="16" height="16" viewBox="0 0 16 16" name={"ok"} />
        </CustomLink>
      </Item>
      <Item>
        <CustomLink
          aria-label={"dzen"}
          target="_blank"
          href={"https://zen.yandex.ru/polzaru_apteka"}
        >
          <Icon fill={"#5383C7"} width="16" height="16" viewBox="0 0 16 16" name={"dzen"} />
        </CustomLink>
      </Item>
    </IconWrapper>
  );
};

const IconWrapper = styled.ul`
  @import "variables";

  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
`;

const Item = styled.li`
  @import "variables";

  @include transition();

  background: $blue-3;
  border-radius: 16px;
  margin-right: 8px;

  &:hover {
    background: $blue-2;
  }

  @include respond-to(small) {
    margin-right: 4px;
    background: $white;
  }
`;

const CustomLink = styled(Link)`
  @import "variables";

  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 13px;
  line-height: 100%;
  color: $blue1;
  padding: 16px;

  @include respond-to(small) {
    padding: 12px;
  }
`;
