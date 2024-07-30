interface ITitleMd {
  [key: string]: { name: string; order: number };
}

// ADD translate and order MD-files
const titleMD: ITitleMd = {
  // the upper parent /////////////////////////
  help: {name: "О справке", order: 1},
  players: {name: "Игроки", order: 2},
  matching: {name: "Матчинг", order: 3},
  employees: {name: "Сотрудники", order: 4},
  roles: {name: "Роли", order: 5},
  users: {name: "Пользователи", order: 6},
  notifications: {name: "Уведомления", order: 7},
  banners: {name: "Реклама", order: 8},
  pointsSystem: {name: "Система баллов", order: 9},
  logs: {name: "Журнал системы", order: 10},

  // Children the upper parent //////////////////
  // pointsSystem
  loyalty: {name: "Программы лояльности", order: 1},
  poll: {name: "Голосования", order: 2},
  products: {name: "Атрибутика", order: 3},
  orders: {name: "Заказы", order: 4},


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
