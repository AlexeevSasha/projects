import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { mainReducer } from "./mainReducer";

const composeEnhancers = composeWithDevTools({ shouldHotReload: false });

export function configureStore() {
  const history = createBrowserHistory();
  const middleware = [thunk, routerMiddleware(history)];
  const enhancer = composeEnhancers(applyMiddleware(...middleware));
  const store = createStore(connectRouter(history)(mainReducer), enhancer);

  return { store, history };
}
