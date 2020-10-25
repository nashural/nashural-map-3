import React from 'react'
import ReactDOM from 'react-dom'
import { YMaps } from 'react-yandex-maps'
import { Provider } from 'react-redux'

import { App } from './components/App'
import { Placemark as PlacemarkModal } from './modals/Placemark/Placemark'
import { store } from './store'

import './styles/universal.css'
import './styles/desktop.css'
import './styles/mobile.css'

import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <YMaps preload query={{ apikey: "137e6a7f-ee29-403c-be2d-8021680117ab", lang: "ru_RU", load: 'route' }}>
    <Provider store={store}>
      <App />
    </Provider>
  </YMaps>,
  document.getElementById('root')
)

ReactDOM.render(
  <Provider store={store}>
    <PlacemarkModal />
  </Provider>,
  document.getElementById('modals')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
