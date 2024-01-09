# Документация

|            Описание            | Путь                                                          |
|:------------------------------:|:--------------------------------------------------------------|
|      Права доступа к url       | [/doc/permission_guard.md](doc/permission_guard.md)           |
| Управление состоянием запросов | [/doc/request_state_manager.md](doc/request_state_manager.md) |
|    Структура проекта `/src`    | [/doc/FSD.md](doc/FSD.md) (Feature-Sliced Design)             |

# Запуск на сервере без CI/CD

1) Указать переменные в ./environments/.env.production
2) docker-compose -f docker-compose-server.yml up -d --build 