import thunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware } from "redux";
import userReducer, { UserState } from "./reducers/user";

import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

export interface ReduxState {
  user: UserState;
}

export const rootReducer = combineReducers<ReduxState>({
  user: userReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
