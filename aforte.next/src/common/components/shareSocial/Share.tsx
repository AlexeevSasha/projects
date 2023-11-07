import { IconShare } from "../icons/IconShare";
import React, { useRef, useState } from "react";
import styled from "astroturf/react";
import { ShareSocial } from "./ShareSocial";
import { getShareMedia } from "../../utils/getShareMedia";
import useOutsideClick from "../../hooks/useOutsideClose";

export const Share = () => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((prev) => !prev);

  const ref = useRef(null);

  useOutsideClick(ref, () => setOpen(false));

  const copyToClip = async () => {
    await navigator.clipboard.writeText(location.href);
  };
  return (
    <Container ref={ref}>
      <IconWrapper onClick={toggle}>
        <IconShare />
      </IconWrapper>
      {open && (
        <Content>
          <ShareSocial
            handleClick={copyToClip}
            copy
            link={""}
            idIcon={"copy"}
            title={"Скопировать ссылку"}
          />
          <ShareSocial link={getShareMedia.tg()} idIcon={"telegram"} title={"Telegram "} />
          <ShareSocial link={getShareMedia.ok()} idIcon={"ok"} title={"Однокласники "} />
          <ShareSocial link={getShareMedia.vk()} idIcon={"vk"} title={"Вконтакте"} />
        </Content>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: inline-block;
  height: 24px;
`;

const IconWrapper = styled.div`
  cursor: pointer;
  height: inherit;
`;

const Content = styled.div`
  @import "variables";

  position: absolute;
  right: 0;
  background: $white;
  color: $black;
  padding: 8px;
  box-shadow: 0 4px 16px rgba(19, 51, 103, 0.08);
  border-radius: 20px;
  z-index: 4;
  width: 250px;

  svg {
    text-align: center;
  }
`;
