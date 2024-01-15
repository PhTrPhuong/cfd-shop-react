import React from "react";
import Header from "@/components/Header";
import { Outlet } from "react-router-dom";
import Footer from "@/components/Footer";
import ScrollTop from "@/components/ScrollTop";
import MobileMenu from "@/components/MobileMenu";
import AuthenModal from "@/components/AuthenModal";
import AuthContextProvider from "@/context/AuthContext";
import MainContextProvider from "@/context/MainContext";

const MainLayout = () => {
    return (
        <MainContextProvider>
            <AuthContextProvider>
                <div class="page-wrapper">
                    <Header />
                    <Outlet />
                    <Footer />
                </div>
                <ScrollTop />
                <MobileMenu />
                <AuthenModal />
            </AuthContextProvider>
        </MainContextProvider>
    );
};

export default MainLayout;
