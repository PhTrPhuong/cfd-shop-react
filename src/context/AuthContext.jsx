import tokenMethod from "@/utils/token";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "@/services/authService";
import { message } from "antd";

/* -- Tạo context api -- */
export const AuthContext = createContext({});

/* -- Tạo context provider - để bao toàn bộ ứng dụng -- */
const AuthContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const [showedModal, setShowedModal] = useState("");
    const [profile, setProfile] = useState({});

    /* ---- */
    useEffect(() => {
        const accessToken = !!tokenMethod.get()?.accessToken;
        if (accessToken) {
            handleGetProfile();
        }
    }, []);

    /* --HANDLE Show Auth Modal */
    const handleShowModal = (modalType) => {
        if (!!!tokenMethod.get()) {
            setShowedModal(modalType || "");
            $("body").addClass("modal-open");
            // $("body").css("padding-right", "17px");
            // $("#signin-modal").css("display", "block");
            // $("#signin-modal").css("padding-right", "17px");
        }
    };
    const handleCloseModal = (e) => {
        e?.stopPropagation();
        setShowedModal("");
        $("body").removeClass("modal-open");
        // $("body").css("padding-right", "0px");
        // $("#signin-modal").css("display", "none");
        // $("#signin-modal").css("padding-right", "0px");
    };

    /* --Authentication API flow - Login api */
    const handleLogin = async (loginData, callback) => {
        // xử lí payload
        const payload = { ...loginData };
        // xử lí api login
        try {
            const res = await authService.login(payload);
            console.log("res", res);
            if (res?.data) {
                const { token: accessToken, refreshToken } = res?.data || {};
                /* Lưu token vào: localStorage || Cookie */
                tokenMethod.set({ accessToken, refreshToken });
                if (!!tokenMethod) {
                    // lấy thông tin profile
                    handleGetProfile();
                    // đóng modal & success
                    handleCloseModal();
                    message.success("Đăng nhập thành công!");
                }
            } else {
                message.error("Đăng nhập thất bại!");
            }
        } catch (error) {
            console.log("error", error);
        } finally {
            callback?.();
        }
    };

    /* --Authentication API flow - Register api */
    const handleRegister = async (registerData, callback) => {
        console.log(registerData);
        const { email, password } = registerData || {};
        // Xử lí payload
        const payload = {
            firstName: "",
            lastName: "",
            email,
            password,
        };
        console.log("payload", payload);
        // Xử lí api register
        try {
            const res = await authService.register(payload);
            console.log(res);
            if (res?.data?.id) {
                // success
                console.log(1);
                handleLogin({ email, password });
                message.success("Đăng ký thành công!");
            } else {
                message.error("Đăng ký thất bại!");
            }
        } catch (error) {
            console.log("error", error);
        } finally {
            callback?.();
        }
    };

    /* --HANDLE Logout */
    const handleLogout = () => {
        tokenMethod.remove();
        setProfile(undefined);
        navigate(PATHS.HOME);
        message.success("Tài khoản đã đăng xuất");
    };

    /* --HANDLE Get profile */
    const handleGetProfile = async () => {
        try {
            const res = await authService.getProfile();
            // console.log("res", res);
            if (res?.data) {
                setProfile(res?.data);
            }
        } catch (error) {
            console.log("error", error);
            handleLogout();
        }
    };

    return (
        <AuthContext.Provider
            value={{
                showedModal,
                handleShowModal,
                handleCloseModal,
                profile,
                handleLogin,
                handleRegister,
                handleLogout,
                handleGetProfile,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;

/* -- Tạo useContext -- */
export const useAuthContext = () => useContext(AuthContext);
