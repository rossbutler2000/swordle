import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";
import { CookiesProvider } from "react-cookie";
import thunk from "redux-thunk";

import reducers from "./reducers";
import App from "./components/App";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

ReactDOM.render(
  <CookiesProvider>
    <Provider 
      store={createStore(reducers, composeEnhancers(applyMiddleware(thunk)))}
    >
      <App />
    </Provider>
  </CookiesProvider>,
  document.querySelector("#root")
);