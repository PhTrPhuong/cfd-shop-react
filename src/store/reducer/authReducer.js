// import { authService } from "@/services/authServices";
import { authService } from "@/services/authService";
import tokenMethod from "@/utils/token";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { handleGetCart } from "./cartReducer";

const initialState = {
    showedModal: "",
    profile: null,
    loading: {
        login: false,
        register: false,
        getProfile: false,
    },
};

/* -- Định nghĩa slice và actions với Redux Toolkit -- */
export const authSlice = createSlice({
    initialState,
    name: "auth",
    reducers: {
        handleShowModal: (state, action) => {
            state.showedModal = action.payload;
        },
        handleCloseModal: (state) => {
            state.showedModal = "";
        },
        handleLogout: (state) => {
            tokenMethod.remove();
            state.profile = undefined;
            state.showedModal = "";
            message.success("Đăng xuất thành công");
        },
    },
    extraReducers: (builder) => {
        builder
            /* ---- */
            .addCase(handleRegister.fulfilled, (state) => {
                state.loading.register = false;
            })
            .addCase(handleRegister.pending, (state) => {
                state.loading.register = true;
            })
            .addCase(handleRegister.rejected, (state) => {
                state.loading.register = false;
            })
            /* ---- */
            .addCase(handleLogin.fulfilled, (state) => {
                state.loading.login = false;
                state.showedModal = "";
            })
            .addCase(handleLogin.pending, (state) => {
                state.loading.login = true;
            })
            .addCase(handleLogin.rejected, (state) => {
                state.loading.login = false;
            })
            /* ---- */
            .addCase(handleGetProfile.fulfilled, (state, action) => {
                state.profile = action.payload;
                state.loading.getProfile = false;
            })
            .addCase(handleGetProfile.pending, (state) => {
                state.loading.getProfile = true;
            })
            .addCase(handleGetProfile.rejected, (state) => {
                state.loading.getProfile = false;
            });
    },
});

// Extract the action creators object and the reducer
const { actions, reducer: authReducer } = authSlice;
// Extract and export each action creator by name
export const { handleLogout, handleShowModal, handleCloseModal } = actions;
// Export the reducer, either as a default or named export
export default authReducer;

// ----------------------------------------------------------------

/* -- Xử lý tác vụ không đồng bộ với createAsyncThunk -- */
export const handleRegister = createAsyncThunk(
    "auth/handleRegister",
    async (payload, thunkApi) => {
        try {
            const registerRes = await authService.register(payload);
            if (registerRes?.data?.id) {
                message.success("Đăng ký thành công");
                thunkApi.dispatch(
                    handleLogin({
                        email: payload.email,
                        password: payload.password,
                    })
                );
                return true;
            } else {
                throw false;
            }
        } catch (error) {
            const errorInfo = error?.response?.data;
            if (errorInfo.error === "Forbidden") {
                message.error("Email đã được đăng ký");
            }
            return thunkApi.rejectWithValue(errorInfo);
        }
    }
);

export const handleLogin = createAsyncThunk(
    "auth/handleLogin",
    async (payload, thunkApi) => {
        try {
            const loginRes = await authService.login(payload);
            if (loginRes?.data) {
                const { token: accessToken, refreshToken } = loginRes?.data || {};

                /* Lưu token vào: localstorage || cookie */
                tokenMethod.set({ accessToken, refreshToken });

                if (!!tokenMethod) {
                    // lấy thông tin profile, cart
                    thunkApi.dispatch(handleGetProfile());
                    thunkApi.dispatch(handleGetCart());

                    // đóng modal & success
                    thunkApi.dispatch(handleCloseModal());
                    message.success("Đăng nhập thành công");
                }
            } else {
                message.error("Đăng nhập thất bại!");
            }
            // return res?.data;
            return true;
        } catch (error) {
            const errorInfo = error?.response?.data;
            if (errorInfo.error === "Not Found") {
                message.error("Username hoặc password không đúng");
            }
            return thunkApi.rejectWithValue(errorInfo);
        }
    }
);

export const handleGetProfile = createAsyncThunk(
    "auth/getProfile",
    async (_, thunkApi) => {
        if (tokenMethod.get()) {
            try {
                const profileRes = await authService.getProfile();
                return profileRes?.data;
            } catch (error) {
                return thunkApi.rejectWithValue(error?.response?.data);
            }
        }
    }
);
