import type { ReactNode } from 'react';
import type { ModerationError } from '@entities/application';
import {
  DreamerMaterialWish,
  DreamerNonMaterialWish,
  DreamerSurpriseWish,
} from '@entities/dreamer';
import { UserRoles } from '@entities/user';
import { knowledgeData } from '@features/const';
import { MaterialWishIcon, NonMaterialWishIcon, SurpriseWishIcon } from '@shared/assets';
import { dreamerKnowledgeMap, type DreamerKnowledgeKey } from '@shared/const';
import { drawer } from '@shared/ui/popup';
import type { WishCardProps } from './WishCard/WishCard';

export interface WishItem {
  id: number;
  card: WishCardProps;
  content: ReactNode;
}

const onKnowledgeClick = (name: DreamerKnowledgeKey) => {
  drawer.openKnowledge({
    title: 'База знаний',
    dataSource: knowledgeData[UserRoles.DREAMER],
    activeId: dreamerKnowledgeMap[name],
  });
};

export const WishList = (errors?: ModerationError): WishItem[] => [
  {
    id: 1,
    card: { icon: <MaterialWishIcon />, text: 'Материальное' },
    content: <DreamerMaterialWish onKnowledgeClick={onKnowledgeClick} errors={errors} />,
  },
  {
    id: 2,
    card: { icon: <NonMaterialWishIcon />, text: 'Нематериальное' },
    content: <DreamerNonMaterialWish errors={errors} />,
  },
  {
    id: 3,
    card: { icon: <SurpriseWishIcon />, text: 'Подарок-сюрприз' },
    content: <DreamerSurpriseWish />,
  },
];
