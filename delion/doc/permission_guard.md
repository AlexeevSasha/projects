### Защита страниц по ролям 


Чтобы защитить наш роут, мы должны передать roles и redirectTo(по умолчанию '/')
```
{
    roles?: UserRoles | UserRoles[]; 
    redirectTo?: string;  //если доступ запрещён, произойдёт редирект
}
```

Несколько примеров

```tsx
// Сможет смотреть только роль - Модератор
Page.auth = {
    roles: UserRoles.MODERATOR
};

// Сможет смотреть только роль - Модератор и Опекун
Page.auth = {
    roles: [UserRoles.MODERATOR, UserRoles.DREAMER]
};
```
