export const getEventStatusColor = (status: number) => {
  switch (status) {
    case 1:
      return 'default';
    case 2:
      return 'success';
    case 3:
      return 'error';
    case 4:
      return 'error';
    case 5:
      return 'warning';
  }
};
