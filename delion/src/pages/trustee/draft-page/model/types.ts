import type { ReactNode } from 'react';
import type { Application } from '@entities/application';
import { type Dreamer, type DreamerSection } from '@entities/dreamer';
import type { RequestResult } from '@shared/api';
import type { Steps } from '@shared/const/nextStepInfo';

export type ApplicationSection = DreamerSection | 'contacts';

export type ApplicationBlocks = Record<ApplicationSection, ApplicationBlock>;

type ApplicationBlock = {
  block: ReactNode;
  action: () => Promise<undefined | RequestResult<Application | Dreamer | undefined>>;
  onNext: () => void;
  label?: string;
  isNextHidden?: boolean;
  step?: Steps;
};
