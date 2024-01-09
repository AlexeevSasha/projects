# Управление состоянием запросов

### Родительский стор `RequestStore`<br>

Инициализация `RequestStore`

``` typescript 
request = new RequestStore({
    client: AxiosInstance,
    url: string,
    method: "get" | 'post' | 'patch' | 'put' | 'delete'
})
```

### Содержит в себе:

- `value` - Объект стора
- `value.requst` - Функция, для отправки запросов на бек
- `value.loader` - Лоадер
- `value.result` - Результат выполнения запроса
    - `result.status` - Статус выполнения запроса, (boolean)
    - `result.statusCode` - Статус код ответа, (number)
    - `result.data` - Тело ответа от сервера, (any)

### Пример стора, в котором используются запросы

```typescript
type Props = {
    initialData: ProfileStore;
    axiosInstance: AxiosInstance;
    tokenS: TokenStore;
}

class ProfileStore {
    client: Props['axiosInstance'];
    tokenS: Props['tokenS'];
    request: any;

    constructor(props: Props) {
        this.client = props.axiosInstance;
        this.tokenS = props.tokenS;

        this.request = {
            fetchUser: new RequestStore({client: this.client, url: '/auth/user/', method: 'get'}),
            loginUser: new RequestStore({client: this.client, url: '/auth/login/', method: 'post'}),
        };

        makeAutoObservable(this, {
            client: false,
            tokenS: false,
            request: false,
        });
    }

    private _user: User;

    public get user(): User {
        return toJS(this._user);
    }

    public setUser(user: User): void {
        this._user = user;
    }

    fetchUser(): any {
        return this.request.fetchUser.request().then(() => {
            const {status, data} = this.request.fetchUser.result
            if (status) {
                this.setUser(data);
            } else {
                this.setUser(undefined)
            }
        })
    };

    registerUser(formValue: any): any {
        return this.request.registerUser.request({data: formValue});
    };
}
```

### Пример использования в функциях

```typescript
const sendForm = (formData: any) => {
    const profileS = new ProfileStore()

    profileS.registerUser(formData)
        .then(() => {
            const {status, statusCode, data} = profileS.request.registerUser.result
            /** Параметры выполнения запроса
             * @param {boolean} status - Содержит в себе статус выполнения запроса
             *      true - успешно
             *      false - ошибка
             * @param {boolean} statusCode - Содержит статус код выполнения запроса
             * @param {boolean} data - Содержит результат, который был получен при выполнении запроса(пришел с бека)
             * **/
        });
};
```

### Пример использования в компонентах

```typescript jsx
const AuthGuard = ({children}: { children: JSX.Element }) => {
    const {profileS} = useStores()

    const [loader, setLoader] = useState(false)

    useEffect(() => {
        setLoader(profileS.request.registerUser.loader)
    }, [profileS.request.registerUser.loader])

    if (loader) {
        return <MolSpin/>
    }

    return <>Username: {profileS.request.registerUser.result?.data?.username}</>
}

export default observer(AuthGuard);
```

