import { MODAL_TYPES } from "@/constants/general";
import { useAuthContext } from "@/context/AuthContext";
import cn from "@/utils/cn";
import React from "react";
import styled from "styled-components";
import LoginForm from "./loginForm";
import RegisterForm from "./registerForm";

const AuthenModalContainer = styled.div`
    display: ${(props) => (props?.$isShow ? "block" : "none")};
`;

const AuthenModal = () => {
    const { showedModal, handleShowModal, handleCloseModal } = useAuthContext();

    const _onTabChange = (e, tab) => {
        e?.stopPropagation();
        e?.preventDefault();
        handleShowModal?.(tab);
    };

    return (
        <>
            {/* Sign in / Register Modal */}
            <AuthenModalContainer
                // className={`modal ${showedModal ? "fade show" : ""}`}
                // style={{ display: `${showedModal ? "block" : "none"}` }}
                className={cn("modal", { "fade show": !!showedModal })}
                $isShow={!!showedModal}
            >
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <button
                                type="button"
                                className="close"
                                onClick={handleCloseModal}
                            >
                                <span aria-hidden="true">
                                    <i className="icon-close" />
                                </span>
                            </button>

                            <div className="form-box">
                                <div className="form-tab">
                                    {/* Tab Link: login & register */}
                                    <ul
                                        className="nav nav-pills nav-fill nav-border-anim"
                                        role="tablist"
                                    >
                                        <li className="nav-item">
                                            <a
                                                className={cn("nav-link", {
                                                    active:
                                                        showedModal === MODAL_TYPES.login,
                                                })}
                                                href="#signin"
                                                onClick={(e) =>
                                                    _onTabChange(e, MODAL_TYPES.login)
                                                }
                                            >
                                                Sign In
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                className={cn("nav-link", {
                                                    active:
                                                        showedModal ===
                                                        MODAL_TYPES.register,
                                                })}
                                                href="#register"
                                                onClick={(e) =>
                                                    _onTabChange(e, MODAL_TYPES.register)
                                                }
                                            >
                                                Register
                                            </a>
                                        </li>
                                    </ul>

                                    {/* Tab content: login & register */}
                                    <div className="tab-content" id="tab-content-5">
                                        <div className="tab-pane fade show active">
                                            {showedModal === MODAL_TYPES.login && (
                                                <LoginForm />
                                            )}

                                            {showedModal === MODAL_TYPES.register && (
                                                <RegisterForm />
                                            )}
                                        </div>
                                    </div>
                                    {/* End .tab-content */}
                                </div>
                                {/* End .form-tab */}
                            </div>
                            {/* End .form-box */}
                        </div>
                        {/* End .modal-body */}
                    </div>
                    {/* End .modal-content */}
                </div>
                {/* End .modal-dialog */}

                {/* Overlay Modal */}
                {!!showedModal && (
                    <div
                        style={{ zIndex: "-1" }}
                        className={cn("modal-backdrop", { "fade show": !!showedModal })}
                        onClick={handleCloseModal}
                    ></div>
                )}
            </AuthenModalContainer>
            {/* End .modal */}
        </>
    );
};

export default AuthenModal;
