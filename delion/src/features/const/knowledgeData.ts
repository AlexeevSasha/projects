import { UserRoles } from '@entities/user';
import { moderatorKnowledge } from '@shared/const';
import { dreamerKnowledge } from '@shared/const';

export const knowledgeData = {
  [UserRoles.MODERATOR]: moderatorKnowledge,
  // TODO: 30.10.2023 - Добавить словари для этих ролей.
  [UserRoles.EXECUTOR]: moderatorKnowledge,
  [UserRoles.DREAMER]: dreamerKnowledge,
  [UserRoles.PARTNER]: moderatorKnowledge,
};
