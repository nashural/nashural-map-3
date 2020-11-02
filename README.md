# Интерактивная карта Нашего Урала

## Предварительные шаги

1. [Получить Ключ API для Яндекс.Карт](https://developer.tech.yandex.ru/services/)

```shell
echo "YMAPS_API_KEY=<YMAPS_API_KEY>" > .env
```

## Установка

```shell
npm install
```

## Запуск и использование

```shell
npm start
```

# Принципы и правила компонентов

## Структура проекта

```
/public
  /api              PHP-API проекта
  /data             Данные проекта
    /groups.json    Структура категорий карты
    /*.json         Точки в категории
  /icons            Иконки категорий
  /img              Статичные картинки
/src
  /api              Обертка для PHP-API
  /components       Визуальные компоненты
  /hooks            Собственные хуки проекта
  /modals           Модальные окна
  /store
    /index.ts       Сам стор
      /slices/*.ts  Слайсы для стора
  /styles           Глобальные стили проекта
    /desktop.css    Стили, специфичные для десктопных устройств
    /mobile.css     Стили, специфичные для мобильных устройств
    /universal.css  Стили, общие для мобильных и десктопных устройств
  /index.tsx        Входная точка проекта
  /typings.d.ts     Общие типы проекта
```

## Файловая структура компонентов

Все переиспользуемые компоненты лежат плоско в `src/components/*`.

Название компонента совпадает с именем каталога компонента, а также с названием файла, где компонент определен, такой компонент называется титульным.

Компоненты, специфичные лишь для одного компонента хранятся в каталоге компонента и называются без префикса, такой компонент называется под-компонентом.

Из индексного файла (`index.ts`) экспортируется титульный компонент, и, при необходимости, под-компоненты.

На данный момент реализуюется десктопная версия карт, так что в компонентах присутствует только файл `desktop.css`, но впоследствии, с реализацией мобильной версии будет также и `mobile.css`, а также структура самого файла поменяется.

Для примера рассмотрим структуру компонента `Groups`:

```
/src/components/Grups
  /Badge.tsx    Под-компонент значка элемента меню
  /desktop.css  Десктопные стили титульного и под-компонентов
  /Group.tsx    Под-компонент элемента меню
  /Groups.tsx   Титульный компонент
  /index.ts     Индексный файл
  /typings.d.ts Типы титульного и под-компонентов
```

## Код компонента

Компоненты реализуются в функциональной парадигме.

Разделения на умные и тупые компоненты нет.

**Важно**: Если компонент требует `dispatch`, то его следует импортировать из `src/hooks/useDispatch` в секции относительных импортов (это нужно для правильной типизации в свете `@reduxjs/toolkit`):

```typescript
import { useDispath } from '../../hooks/useDispatch`
```

Компонент определен как стрелочная функция с `return`-ом:

```typescript
const MyComponent: FC<MyComponentProps> = () => {
  return null
}
```

Типы свойств компонента снабжаются суффиксом `*Props`: `MyComponentProps`.

Стили компонентов называются с большой буквы и соответствуют названию компонента: `.MyComponent`.

Под-компоненты могут иметь префикс титульного компонента: `.MyComponent-badge`.

Импорты компонента разделены на блоки: абсолютные импорты, относительные импорты, импорты типов, импорты стилей.

Порядок блоков импортов важен, порядок внутри блока нет.

Блоки разделены одной пустой строкой.

Для примера рассмотрим импорты компонента `src/components/Groups/Groups.tsx`:

### 1. Абсолютные импорты

Абсолютные импорты не содержат `./` в начале.

Если требуется импортировать тип из библиотеки, то он будет в этом блоке.

```javascript
import React, { FC, useEffect } from 'react'
import { useSelector } from 'react-redux'
```

### 2. Относительные импорты

Относительные импорты содержат `./` в начале.

```javascript
import { useDispatch } from '../../hooks/useDispatch'
import { Group as GroupItem } from './Group'
import { fetchGroups, allGroupsSelector } from '../../store/slices/groups'
```

### 3. Импорты типов

В этом блоке содержатя относительные импорты типов.

```javascript
import { GroupsProps } from './typings.d'
```

### 4. Импорты стилей

В под-компонентах также необходимо импортировать `./desctop.css`.

```javascript
import './desktop.css'
```

### Минимальный шаблон компонента

Для примера создадим компонент `MyComponent`, с минимальным кодом и набором файлов:

```
/src/components/MyComponent
  /index.ts
  /desktop.css
  /MyComponent.tsx
  /typings.d.ts
```

#### `index.ts`

```typescript
export { MyComponent } from './MyComponent'
```

#### `typings.d.ts`

```typescript
export interface MyComponentProps {}
```

#### `desktop.css`

```css
.MyComponent {
}
```

#### `MyComponent.tsx`

```typescript
import React, { FC } from 'react'

import { MyComponentProps } from './typings.d'

import './desktop.css'

export const MyComponent: FC<MyComponentProps> = () => {
  return <div className='MyComponent'>{null}</div>
}
```

## Файловая структура redux-стора

В приложении используется `@reduxjs/toolkit`.

Сам стор хранится в `src/store.ts`.

Редьюсеры реализуются с помощью слайсов.

```
/src/store
  /index.ts       Сам стор
  /typings.d.ts   Типы всех слайсов
  /slices
    /drawer.ts    Слайс левой боковой панели
```

Каждый слайс должен быть зарегистрирован:

```typescript
import { configureStore } from '@reduxjs/toolkit'

import drawer from './slices/drawer'

export const store = configureStore({
  reducer: {
    drawer
  }
})
```

## Код слайсов

Слайс называется так же, как и файл где он хранится с добавлением суффикса `*Slice`: в файле `slices/my.ts` найдется `mySlice`.

Экшены и селекторы экспортируются из того же файла, где определен слайс.

Селектор называется с добавлением суффикса `*Selector`: `mySelector`.

`default`-экспорт — редьюсер слайса:

```typescript
export default drawerSlice.reducer
```

`initialState` определяется отдельной переменной, сразу же перед блоком `createSlice` (это нужно для верной типизации):

```typescript
const initialState: DrawerState = {
  open: true
}
```

### Минимальный шаблон слайса

Для примера рассмотрим добавление слайса `drawer`:

#### `store/index.ts`

```typescript
import { configureStore } from '@reduxjs/toolkit'

import drawer from './slices/drawer'

export const store = configureStore({
  reducer: {
    drawer
  }
})
```

#### `store/slices/drawer.ts`

```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { DrawerState, ToggleDrawerPayload } from './typings.d'

export const drawerOpenedSelector = (state: any) => state.drawer.open

const initialState: DrawerState = {
  open: true
}

const drawerSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    toggleDrawer (state, action: PayloadAction<ToggleDrawerPayload>) {
      const { on } = action.payload
      if (on) {
        state.open = true
      } else {
        state.open = false
      }
    }
  }
})

export const { toggleDrawer } = drawerSlice.actions

export default drawerSlice.reducer
```

### `store/typings.d.ts`

```typescript
import { store } from './index'

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export interface DrawerState {
  open: boolean
}

export interface ToggleDrawerPayload {
  on: boolean
}
```

## Модальные окна

Модальные окна имеют имя.

Модальное окно имеет заголовок, тело, футер и кнопки в футере.

Модальное окно — это такой же компонент и подчиняется правилам для компонентов, но лежит в каталоге `src/modals`.

Одна из особенностей реализации, что в модальное окно могут быть прокинуты свойства, заданные в момент открытия; Благодаря этому можно разделить управление и верстку модального окна.

Реализация модальных окон размазана по всему приложению:

```
/src
  /hooks
    /useModal.ts          Хук для управления модальными окнами
  /store
    /modal.ts             Слайс, хранящий состояние модальных окон
  /modals                 Каталог, где хранятся модальные окна
    /modal                Каталог с компонентами модального окна
      /desktop.css        Десктопные стили модального окна
      /index.ts           Индексный файл, откуда экспортируются все составляющие модального окна
      /Modal.tsx          Компонент-обертка модального окна
      /ModalBody.tsx      Тело модального окна
      /ModalButtons.tsx   Компонент-обертка для кнопок в футере модального окна
      /ModalFooter.tsx    Футер модального окна
      /ModalHeader.tsx    Заголовок модального окна
      /typings.d.ts       Типы, необходимые модальному окну
```

Каждое модальное окно представлено компонентом, включающим в себя базовые элементы для всех модальных окон.

### Минимальный шаблон модального окна

Рассмотрим для примера минимальную реализацию модального окна `Example`:

```
src/modals/Example
  /index.ts
  /Example.tsx
  /typings.d.ts
```

#### `modals/Example/index.ts`

```typescript
export { Example } from 'example'
```

#### `modals/Example/Example.tsx`

```typescript
import React, { FC, useCallback } from 'react'

import { useModal } from '../../hooks/useModal'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButtons
} from '../modal'

import { ExampleProps } from './typings.d'

export const Example: FC<ExampleProps> = () => {
  const [opened, props, toggle] = useModal('example')

  const handleClose = useCallback(() => {
    toggle(props)
  }, [props, toggle])

  if (opened) {
    return (
      <Modal onClose={handleClose}>
        <ModalHeader></ModalHeader>
        <ModalBody></ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
    )
  } else {
    return null
  }
}
```

#### `modals/Example/typings.d.ts`

```typescript
export interface ExampleProps {}
```

# Документация `create-react-app`:

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
