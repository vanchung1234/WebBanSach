import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from "./reducers/index";
import { PersistGate } from 'redux-persist/integration/react'

import { composeWithDevTools } from "redux-devtools-extension";
const persistConfig = {
    key: 'root',
    storage,
}

let initialState = {
    cart: {
        cartItems: localStorage.getItem("cartItems")
            ? JSON.parse(localStorage.getItem("cartItems"))
            : [],
        shippingInfo: localStorage.getItem("shippingInfo")
            ? JSON.parse(localStorage.getItem("shippingInfo"))
            : {},
    },
};

const persistedReducer = persistReducer(persistConfig, rootReducer, initialState)

const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(thunk))
);
const persistor = persistStore(store)

const DataProvider = ({ children }) => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    )

};

export default DataProvider;