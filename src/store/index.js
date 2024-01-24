import { ENV } from "@/constants/environments";
import { configureStore } from "@reduxjs/toolkit";
// import thunkMiddleware from "redux-thunk";
import authReducer from "./reducer/authReducer";
import cartReducer from "./reducer/cartReducer";

const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
    },
    // configureStore sử dụng redux-thunk như default middleware
    // middleware: (getDefaultMiddleware) =>
    // 	getDefaultMiddleware().concat(thunkMiddleware),
    devTools: ENV === "development",
});

export default store;
