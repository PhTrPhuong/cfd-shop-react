import scrollTop from "@/utils/scrollTop";
import { createContext, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

/* -- Tạo context api -- */
export const MainContext = createContext({});

/* -- Tạo context provider - để bao toàn bộ ứng dụng -- */
const MainContextProvider = ({ children }) => {
    const { pathname } = useLocation();

    /* ---- */
    useEffect(() => {
        handleCloseMobileMenu();
        const myTimeout = setTimeout(() => {
            scrollTop();
        }, 100);
        return () => {
            clearTimeout(myTimeout);
        };
    }, [pathname]);

    /* - Handle Show/Close Menu mobile - */
    const handleShowMobileMenu = (e) => {
        e?.stopPropagation();
        e?.preventDefault();
        $("body").addClass("mmenu-active");
    };
    const handleCloseMobileMenu = (e) => {
        e?.stopPropagation();
        e?.preventDefault();
        $("body").removeClass("mmenu-active");
    };

    return (
        <MainContext.Provider value={{ handleShowMobileMenu, handleCloseMobileMenu }}>
            {children}
        </MainContext.Provider>
    );
};

export default MainContextProvider;

/* -- Tạo useContext -- */
export const useMainContext = () => useContext(MainContext);
