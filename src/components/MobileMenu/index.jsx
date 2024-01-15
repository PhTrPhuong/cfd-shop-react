import React, { useState } from "react";
import { useMainContext } from "@/context/MainContext";
import { PATHS } from "@/constants/paths";
import { NavLink } from "react-router-dom";
import { MenuStyled } from "../StyledComponents";
import classNames from "classnames";
import cn from "@/utils/cn";

const MENU_TABS = {
    menu: "menu",
    categories: "categories",
};

const MobileMenu = () => {
    const { handleCloseMobileMenuShow } = useMainContext();

    // MenuTab : menu & cate
    const [selectedTab, setSelectedTab] = useState(MENU_TABS.menu);
    const _onTabChange = (e, tab) => {
        e.preventDefault();
        setSelectedTab(tab);
        console.log(tab);
    };

    return (
        <>
            <div>
                {/* mobile menu Overlay */}
                <div
                    className="mobile-menu-overlay"
                    onClick={() => handleCloseMobileMenuShow()}
                />

                <div className="mobile-menu-container">
                    <div className="mobile-menu-wrapper">
                        <span
                            className="mobile-menu-close"
                            onClick={() => handleCloseMobileMenuShow()}
                        >
                            <i className="icon-close" />
                        </span>

                        {/* - Khung search - */}
                        <form action="#" method="get" className="mobile-search">
                            <label htmlFor="mobile-search" className="sr-only">
                                Search
                            </label>
                            <input
                                type="search"
                                className="form-control"
                                name="mobile-search"
                                id="mobile-search"
                                placeholder="Search in..."
                                required
                            />
                            <button className="btn btn-primary" type="submit">
                                <i className="icon-search" />
                            </button>
                        </form>

                        {/* -Tab Link- */}
                        <ul
                            className="nav nav-pills-mobile nav-border-anim"
                            role="tablist"
                        >
                            <li className="nav-item">
                                <a
                                    className={cn("nav-link", {
                                        active: selectedTab === MENU_TABS.menu,
                                    })}
                                    // className={`
                                    //     nav-link ${selectedTab === MENU_TABS.menu ? "active" : ""}
                                    // `}
                                    href="#mobile-menu-tab"
                                    onClick={(e) => _onTabChange(e, MENU_TABS.menu)}
                                >
                                    Menu
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className={cn("nav-link", {
                                        active: selectedTab === MENU_TABS.categories,
                                    })}
                                    // className={`nav-link ${
                                    //     selectedTab === MENU_TABS.categories ? "active" : ""
                                    // }`}
                                    href="#mobile-cats-tab"
                                    onClick={(e) => _onTabChange(e, MENU_TABS.categories)}
                                >
                                    Categories
                                </a>
                            </li>
                        </ul>

                        {/* -Tab content- */}
                        <div className="tab-content">
                            <div
                                className={cn("tab-pane fade", {
                                    "show active": selectedTab === MENU_TABS.menu,
                                })}
                                // className={`tab-pane fade ${
                                //     selectedTab === MENU_TABS.menu ? "show active" : ""
                                // }`}
                                id="mobile-menu-tab"
                                role="tabpanel"
                                aria-labelledby="mobile-menu-link"
                            >
                                <nav className="mobile-nav">
                                    <MenuStyled className="mobile-menu">
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
                                            <NavLink to={PATHS.CONTACT}>
                                                Contact Us
                                            </NavLink>
                                        </li>
                                    </MenuStyled>
                                </nav>
                                {/* End .mobile-nav */}
                            </div>
                            {/* .End .tab-pane */}
                            <div
                                className={cn("tab-pane fade", {
                                    "show active": selectedTab === MENU_TABS.categories,
                                })}
                                // className={`tab-pane fade ${
                                //     selectedTab === MENU_TABS.categories ? "show active" : ""
                                // }`}
                                id="mobile-cats-tab"
                                role="tabpanel"
                                aria-labelledby="mobile-cats-link"
                            >
                                <nav className="mobile-cats-nav">
                                    <ul className="mobile-cats-menu">
                                        <li>
                                            <a className="mobile-cats-lead" href="#">
                                                TV
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">Computers</a>
                                        </li>
                                        <li>
                                            <a href="#">Tablets &amp; Cell Phones</a>
                                        </li>
                                        <li>
                                            <a href="#">Smartwatches</a>
                                        </li>
                                        <li>
                                            <a href="#">Accessories</a>
                                        </li>
                                    </ul>
                                    {/* End .mobile-cats-menu */}
                                </nav>
                                {/* End .mobile-cats-nav */}
                            </div>
                            {/* .End .tab-pane */}
                        </div>
                        {/* End .tab-content */}

                        {/* -Icon social- */}
                        <div className="social-icons">
                            <a
                                href="#"
                                className="social-icon"
                                target="_blank"
                                title="Facebook"
                            >
                                <i className="icon-facebook-f" />
                            </a>
                            <a
                                href="#"
                                className="social-icon"
                                target="_blank"
                                title="Twitter"
                            >
                                <i className="icon-twitter" />
                            </a>
                            <a
                                href="#"
                                className="social-icon"
                                target="_blank"
                                title="Instagram"
                            >
                                <i className="icon-instagram" />
                            </a>
                            <a
                                href="#"
                                className="social-icon"
                                target="_blank"
                                title="Youtube"
                            >
                                <i className="icon-youtube" />
                            </a>
                        </div>
                        {/* End .social-icons */}
                    </div>
                    {/* End .mobile-menu-wrapper */}
                </div>
                {/* End .mobile-menu-container */}
            </div>
        </>
    );
};

export default MobileMenu;
