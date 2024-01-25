import React, { useEffect } from "react";
import { useMainContext } from "@/context/MainContext";
import { Link, NavLink } from "react-router-dom";
import { PATHS } from "@/constants/paths";
import { MenuStyled } from "../StyledComponents";
import useHeaderMiddle from "./useHeaderMiddle";
import Search from "../Search";
import CartDropdown from "../CartDropdown";

const HeaderMiddle = () => {
    const { handleShowMobileMenu, cartDropdownProps } = useHeaderMiddle();

    return (
        <div className="header-middle sticky-header">
            <div className="container">
                <div className="header-left">
                    <button
                        className="mobile-menu-toggler"
                        // onClick={() => handleShowMobileMenu()}
                        onClick={handleShowMobileMenu}
                    >
                        <span className="sr-only">Toggle mobile menu</span>
                        <i className="icon-bars" />
                    </button>
                    <Link to={PATHS.HOME} className="logo">
                        <img src="/assets/images/logo.svg" alt="Molla Logo" width={160} />
                    </Link>
                </div>

                <nav className="main-nav">
                    <MenuStyled className="menu">
                        <li>
                            <NavLink to={PATHS.HOME}>Home</NavLink>
                        </li>
                        <li>
                            <NavLink to={PATHS.ABOUT}>About Us</NavLink>
                        </li>
                        <li>
                            <NavLink to={PATHS.PRODUCTS}>Product</NavLink>
                        </li>
                        <li>
                            <NavLink to={PATHS.BLOG}>Blog</NavLink>
                        </li>
                        <li>
                            <NavLink to={PATHS.CONTACT}>Contact Us</NavLink>
                        </li>
                    </MenuStyled>
                </nav>

                <div className="header-right">
                    <Search />
                    <CartDropdown {...cartDropdownProps} />
                </div>
            </div>
        </div>
    );
};

export default HeaderMiddle;
