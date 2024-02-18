import React, { useEffect } from "react";
import Header from "@/components/Header";
import { Outlet } from "react-router-dom";
import Footer from "@/components/Footer";
import ScrollTop from "@/components/ScrollTop";
import MobileMenu from "@/components/MobileMenu";
import AuthenModal from "@/components/AuthenModal";
import AuthContextProvider from "@/context/AuthContext";
import MainContextProvider from "@/context/MainContext";
import { useDispatch } from "react-redux";
import { message } from "antd";
import tokenMethod from "@/utils/token";
import { handleGetProfile } from "@/store/reducer/authReducer";
import { handleGetCart } from "@/store/reducer/cartReducer";

const MainLayout = () => {
    /* ---- */
    const dispatch = useDispatch();
    useEffect(() => {
        /*  antd message config */
        message.config({
            top: 80,
            duration: 3,
            maxCount: 3,
        });

        // Handle get profile, cart
        // const accessToken = !!tokenMethod.get()?.accessToken;
        if (!!tokenMethod.get()) {
            dispatch(handleGetProfile());
            dispatch(handleGetCart());
        }
    }, []);

    return (
        <MainContextProvider>
            {/* <AuthContextProvider> */}
            <div className="page-wrapper">
                <Header />
                <Outlet />
                <Footer />
            </div>
            <ScrollTop />
            <MobileMenu />
            <AuthenModal />
            {/* </AuthContextProvider> */}
        </MainContextProvider>
    );
};

export default MainLayout;
