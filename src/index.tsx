import "./styles/universal.css";
import "./styles/desktop.css";
import "./styles/mobile.css";

import * as serviceWorker from "./serviceWorker";

import { App } from "./components/App";
import { Placemark as PlacemarkModal } from "./modals/Placemark/Placemark";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import { YMaps } from "react-yandex-maps";
import { store } from "./store";

ReactDOM.render(
  <YMaps
    preload
    query={{
      apikey: process.env.REACT_APP_YMAPS_API_KEY,
      lang: "ru_RU",
      load: "route,geolocation",
    }}
  >
    <Provider store={store}>
      <App />
    </Provider>
  </YMaps>,
  document.getElementById("root")
);

ReactDOM.render(
  <Provider store={store}>
    <PlacemarkModal />
  </Provider>,
  document.getElementById("modals")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
