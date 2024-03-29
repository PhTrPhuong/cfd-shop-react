import React, { useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useForm } from "react-hook-form";
import { Input } from "../Input";
import Button from "../Button";
import ComponentLoading from "../ComponentLoading";
import { PATHS } from "@/constants/paths";
import { MESSAGE, REGEX } from "@/constants/validate";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleCloseModal, handleRegister } from "@/store/reducer/authReducer";
import useDebounce from "@/hooks/useDebounce";

const RegisterForm = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.auth);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    /* ---- */
    const _onSubmit = async (data) => {
        if (data && !loading.register) {
            try {
                const { name, email, password } = data;
                const payload = {
                    firstName: name || "",
                    lastName: "",
                    email,
                    password,
                };
                console.log("payload", payload);
                dispatch(handleRegister(payload));
            } catch (error) {
                console.log("error", error);
            }
        }
    };

    const renderLoading = useDebounce(loading.register, 300);

    /* ---- */
    const _onCloseModal = (e) => {
        e?.stopPropagation();
        e?.preventDefault();
        dispatch(handleCloseModal());
    };

    return (
        <form onSubmit={handleSubmit(_onSubmit)} style={{ position: "relative" }}>
            {renderLoading && <ComponentLoading />}

            <Input
                label="Your email address"
                required
                {...register("email", {
                    required: MESSAGE.required,
                    minLength: {
                        value: 12,
                        message: "Tên email độ dài phải từ 2 trở lên",
                    },
                    pattern: {
                        value: REGEX.email,
                        message: MESSAGE.email,
                    },
                })}
                error={errors?.email?.message || ""}
            />
            <Input
                label="Password"
                required
                type="password"
                {...register("password", {
                    required: MESSAGE.required,
                    pattern: {
                        value: REGEX.password,
                        message: MESSAGE.password,
                    },
                })}
                error={errors?.password?.message || ""}
            />

            {/* <div className="form-group">
                <label htmlFor="register-email">Your email address *</label>
                <input
                    type="email"
                    className="form-control input-error"
                    id="register-email"
                    name="register-email"
                    required
                />
                <p className="form-error">Please fill in this field</p>
            </div>
            <div className="form-group">
                <label htmlFor="register-password">Password *</label>
                <input
                    type="password"
                    className="form-control"
                    id="register-password"
                    name="register-password"
                    required
                />
            </div> */}

            <div className="form-footer">
                <Button type="submit" variant="outline">
                    <span>SIGN UP</span>
                    <i className="icon-long-arrow-right" />
                </Button>
                <div>
                    <div className="custom-control custom-checkbox">
                        <input
                            type="checkbox"
                            className="custom-control-input"
                            id="register-policy"
                            {...register("isAgree", {
                                required: "Vui lòng đồng ý với chính sách của chúng tôi",
                            })}
                        />
                        <label className="custom-control-label" htmlFor="register-policy">
                            I agree to the{" "}
                            <Link to={PATHS.PRIVATE_POLICY} onClick={_onCloseModal}>
                                privacy policy
                            </Link>{" "}
                            *
                        </label>
                    </div>
                    {errors?.isAgree?.message && (
                        <p className="form-error">{errors.isAgree.message}</p>
                    )}
                </div>
                {/* End .custom-checkbox */}
            </div>
            {/* End .form-footer */}
        </form>
    );
};

export default RegisterForm;
