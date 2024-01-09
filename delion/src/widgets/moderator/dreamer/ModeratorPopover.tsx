import { useCallback } from 'react';
import { UserRoles } from '@entities/user';
import { knowledgeData } from '@features/const';
import { KnowledgePopover } from '@features/knowledge';
import { moderatorKnowledgePopover } from '@shared/const';
import { drawer } from '@shared/ui/popup';

export const ModeratorPopover = ({ name }: { name: keyof typeof moderatorKnowledgePopover }) => {
  const onClick = useCallback(() => {
    drawer.openKnowledge({
      dataSource: knowledgeData[UserRoles.MODERATOR],
      activeId: moderatorKnowledgePopover[name].knowledgeId,
    });
  }, []);

  return (
    <KnowledgePopover onClick={onClick} content={moderatorKnowledgePopover[name]?.description} />
  );
};
