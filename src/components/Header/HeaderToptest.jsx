import { MODAL_TYPES } from "@/constants/general";
import { useAuthContext } from "@/context/AuthContext";
import tokenMethod from "@/utils/token";
import React from "react";

const HeaderTop = () => {
    const { handleShowModal, handleLogout, profile } = useAuthContext();
    const { firstName, email } = profile || {};

    /* --- */
    const _onShowAuthModal = (e) => {
        e?.stopPropagation();
        e?.preventDefault();
        handleShowModal?.(MODAL_TYPES.login);
    };

    /* --- */
    const _onSignOut = (e) => {
        e.preventDefault();
        handleLogout();
    };

    return (
        <div className="header-top">
            <div className="container">
                <div className="header-left">
                    <a href="tel:0989596912">
                        <i className="icon-phone" /> Hotline: 098 9596 912{" "}
                    </a>
                </div>
                <div className="header-right">
                    {!!!tokenMethod.get() ? (
                        <>
                            {/* Not LogIn */}
                            <ul class="top-menu top-link-menu">
                                <li>
                                    <a
                                        href="#signin-modal"
                                        // data-toggle="modal"
                                        class="top-menu-login"
                                        onClick={_onShowAuthModal}
                                    >
                                        <i class="icon-user"></i>Login | Resgister{" "}
                                    </a>
                                </li>
                            </ul>
                        </>
                    ) : (
                        <>
                            {/* Logged In */}
                            <ul className="top-menu">
                                <li>
                                    <a href="#" className="top-link-menu">
                                        <i className="icon-user" />
                                        {firstName || email || "No Name"}{" "}
                                    </a>
                                    <ul>
                                        <li>
                                            <ul>
                                                <li>
                                                    <a href="dashboard.html">
                                                        Account Details
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="dashboard.html">
                                                        Your Orders
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="dashboard.html">
                                                        Wishlist <span>(3)</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" onClick={_onSignOut}>
                                                        Sign Out
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HeaderTop;
