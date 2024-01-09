import type { DreamerSection } from '@entities/dreamer';

export type DreamerSections = {
  dreamer: {
    id: number;
    name: string;
  };
  sections: Record<DreamerSection, Status>;
};
