# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

---
#### добавил в зависимости `react-markdown`, `remark-gfm`, `rehype-raw`, `remark-slug`, `remark-toc`

## Как добавлять MD-файлы

### В папку `src/assets/docs` добавить md-файл, если есть вложенность, то создаёте папку и в неё ложите дочерние md-файлы

### Фотографии ложим в папку `src/assets/docs/images` в формате *png* или *jpg*

### Если фотография вертикальная, то добавлять её НУЖНО в md-файл через тег `img` с классом `md-img`
    <img class='md-img' src="path" alt="images">   

### После этого идём в папку `src/common/constants/mdFiles.ts` обьект titleMD, который описывает структуру

    // Обьект titleMD принимает в себя: 
    ключ, который ДОЛЖЕН быть назван, как название файла, без .md в конце
    значение в виде обьекта {type: 'Name', order: 0}, где type - перевод на русский, order - сортировка по возрастанию ( 1, 2, 3 и тд.)
    // Пример
    matches: {type: 'Матчи', order: 1}
    employees: {type: 'Сотрудники', order: 2}
    users: {type: 'Пользователи', order: 3}

### Если у нас есть вложенность

    // Чтобы не запутаться в сортировке, комментируем где лежат дочерние элементы

    // The upper parent /////////////////////////
    matches: { type: "Матчи", order: 1 },
    roles: {type: 'Роли', order: 2}

    // Children the upper parent//////////////////
    // roles - пишем к какому родителю относяться элементы
    superAdmin: {type: 'Супер админ', order: 1},
    write: {type: 'Запись', order: 2},
    read: {type: 'Чтение', order: 3},
