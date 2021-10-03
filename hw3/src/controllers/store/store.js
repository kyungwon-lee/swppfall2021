import thunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware } from "redux";
import userReducer from "./reducers/user";

export const rootReducer = combineReducers({
    user: userReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
