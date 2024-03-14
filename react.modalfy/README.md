# React-modalfy

## Installation

```
npm i react-modalfy
yarn add react-modalfy
```

## Use modal

```jsx
import {PopupContainer, modal, drawer} from 'react-modalfy';

function App() {

    const exampleModal = () => modal.open(<div>content modal</div>, {
        //...options
    });
    const exampleDrawer = () => drawer.open(<div>content modal</div>, {
        //...options
    });

    return (
        <div>
            <button exampleModal={exampleModal}>open modal</button>
            <button onClick={exampleDrawer}>open drawer</button>
            <PopupContainer/>
        </div>
    );
}
```

## API

| Parameter               | Type       | Description                                                       | Default     |                                              
|-------------------------|------------|-------------------------------------------------------------------|-------------|
| `closePrevious`         | `boolean`  | Closes all previous modals/drawers                                | `false`     |  
| `closeBackdropClick`    | `boolean`  | Closes modals/drawers by clicking on the background               | `false`     |
| `callbackAfterClose`    | `function` | Function to be called after closing the modal                     | `undefined` |
| `callbackBackdropClick` | `function` | The function that will be called when you click on the background | `undefined` |
| `callbackAnimationEnd`  | `function` | The function that will be called after the animation is completed | `undefined` |  

### Another props is added to the drawer

| Parameter  | Type     | Description                                                                                 | Default  |                                              
|------------|----------|---------------------------------------------------------------------------------------------|----------|
| `position` | `string` | The drawer position is set. Available options are `'top'`, `'bottom'`, `'left'`, `'right'`, | `'left'` |

## Close modal/drawer
To close the modal you just need to call .close()  
#### If called without parameters, it will close the last modal/drawer

```jsx
modal.close();
drawer.close();
```

The close method accepts two parameters:  
* `'all'` - closing all modals/drawers
* `string` - In each component that you pass to the modal/drawer, you can get props - `popupid`. The `popupid` is the unique ID of the called modal/drawer. If you pass it to close, it will close it.

```jsx
import {modal} from 'react-modalfy';

function ModalContent(props) {

    const close = () => modal.close(props.popupid);

    return (
        <div>
            <button onClick={close}>close me</button>
             //content modals
        </div>
    );
}
```

Thank you so much for using the library ❤️. If you have any suggestions or comments ✉️, I'm always willing to work on
them

*This project has an MIT License.*