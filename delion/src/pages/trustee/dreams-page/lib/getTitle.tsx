export const getTitle = (step?: number) => {
  switch (step) {
    case 1:
      return 'Проверьте информацию';
    case 2:
      return 'Подтвердите телефон';
    default:
      return 'Главная';
  }
};
