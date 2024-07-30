interface ITitleMd {
  [key: string]: { name: string; order: number };
}

// ADD translate and order MD-files
const titleMD: ITitleMd = {
  // the upper parent /////////////////////////
  help: {name: "О справке", order: 1},
  matching: {name: "Матчинг", order: 2},
  employees: {name: "Сотрудники", order: 3},
  roles: {name: "Роли", order: 4},
  users: {name: "Пользователи", order: 5},
  notifications: {name: "Уведомления", order: 6},
  banners: {name: "Реклама", order: 7},
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
