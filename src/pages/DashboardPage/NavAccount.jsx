import { PATHS } from "@/constants/paths";
import { handleLogout } from "@/store/reducer/authReducer";
import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

const NavAccount = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const _onSignOut = (e) => {
        e.preventDefault();
        dispatch(handleLogout());
        navigate(PATHS.HOME);
    };

    return (
        <aside className="col-md-4 col-lg-3">
            <ul className="nav nav-dashboard flex-column mb-3 mb-md-0" role="tablist">
                <li className="nav-item">
                    <NavLink className="nav-link" to={PATHS.PROFILE.INDEX} end>
                        Account Details
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to={PATHS.PROFILE.PROFILE_ORDER}>
                        Orders
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to={PATHS.PROFILE.PROFILE_ADDRESS}>
                        Adresses
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to={PATHS.PROFILE.PROFILE_WISHLIST}>
                        Wishlist
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to={PATHS.PROFILE.PROFILE_CHANGE_PASS}>
                        Change password
                    </NavLink>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#" onClick={_onSignOut}>
                        Sign Out
                    </a>
                </li>
            </ul>
        </aside>
    );
};

export default NavAccount;
