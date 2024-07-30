interface ITitleMd {
  [key: string]: { name: string; order: number };
}

// ADD translate and order MD-files
const titleMD: ITitleMd = {
  // the upper parent /////////////////////////
  help: {name: "О справке", order: 1},
  employees: {name: "Сотрудники", order: 2},
  roles: {name: "Роли", order: 3},
  users: {name: "Пользователи", order: 4},
  notifications: {name: "Уведомления", order: 5},
  banners: {name: "Реклама", order: 6},
  winline_loyalty: {name: "Лояльность Winline", order: 7},
  logs: {name: "Журнал системы", order: 8},

  // Children the upper parent //////////////////

  //Second nesting /////////////////////////
};

export const searchFile = (name: string) => {
  for (const item in titleMD) {
    if (name === item) {
      return titleMD[item];
    }
  }

  return { name: "", order: 0 };
};
