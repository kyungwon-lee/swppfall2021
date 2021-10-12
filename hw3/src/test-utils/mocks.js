import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

const getMockUserReducer = jest.fn((initialState) => (state = initialState, action) => {
    switch (action.type) {
        default:
            break;
    }
    return state;
});

export const getMockStore = (initialState) => {
    const mockUserReducer = getMockUserReducer(initialState);
    const rootReducer = combineReducers({
        user: mockUserReducer,
    });

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const mockStore = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

    return mockStore;
};
