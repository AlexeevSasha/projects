export type ProgressCalculationData = {
  completed: number;
  total: number;
  donePercentage: number;
  isCompleted: boolean;
};

export const calculateProgress = (completed = 0, total = 0): ProgressCalculationData => {
  return {
    completed,
    total,
    donePercentage: completed && total ? (100 * completed) / total : 0,
    isCompleted: completed === total,
  };
};
