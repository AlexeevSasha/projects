import React from "react";
import { BecomePart } from "./becomePart";
import { Container } from "./ui";
import { ISpartakKids } from "../../api/dto/ISpartakKids";
import { Privileges } from "./privileges";
import { Banner } from "./banner";
import { PlayerToField } from "./playerToField";
import { Questions } from "./questions";

export const SpartakKids = ({
  becomePartOfTeam,
  memberPrivileges,
  redBlock,
  takePlayerToField,
  answersQuestions,
}: ISpartakKids) => {
  return (
    <Container>
      <BecomePart {...becomePartOfTeam} />
      <Privileges {...memberPrivileges} />
      <Banner {...redBlock} />
      <PlayerToField {...takePlayerToField} />
      <Questions {...answersQuestions} />
    </Container>
  );
};
