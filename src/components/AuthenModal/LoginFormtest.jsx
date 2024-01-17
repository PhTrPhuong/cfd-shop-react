import { useAuthContext } from "@/context/AuthContext";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ComponentLoading from "../ComponentLoading";
import { MESSAGE, REGEX } from "@/constants/validate";
import { Input } from "../Input";
import Button from "../Button";

const LoginForm = () => {
    const { handleLogin } = useAuthContext();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [loading, setLoading] = useState(false);

    const _onSubmit = (data) => {
        if (data) {
            setLoading(true);
            handleLogin?.(data, () => {
                setTimeout(() => {
                    setLoading(false);
                }, 300);
            });
        }
    };

    // console.log("errors", errors);

    return (
        <form onSubmit={handleSubmit(_onSubmit)} style={{ position: "relative" }}>
            {loading && <ComponentLoading />}

            <Input
                label="Username or email address"
                // placeholder="Username or email address"
                required
                {...register("email", {
                    required: MESSAGE.required,
                    pattern: {
                        value: REGEX.email,
                        message: MESSAGE.email,
                    },
                })}
                error={errors?.email?.message || ""}
            />
            <Input
                label="Password"
                // placeholder="Password"
                required
                type="password"
                {...register("password", {
                    required: MESSAGE.required,
                })}
                error={errors?.password?.message || ""}
            />

            {/* <div className="form-group">
                <label htmlFor="singin-email">Username or email address *</label>
                <input
                    type="text"
                    className="form-control input-error"
                    id="singin-email"
                    name="singin-email"
                    required
                />
                <p className="form-error">Please fill in this field</p>
            </div>
            <div className="form-group">
                <label htmlFor="singin-password">Password *</label>
                <input
                    type="password"
                    className="form-control"
                    id="singin-password"
                    name="singin-password"
                    required
                />
            </div> */}

            <div className="form-footer">
                <Button type="submit" variant="outline">
                    <span>LOG IN</span>
                    <i className="icon-long-arrow-right" />
                </Button>
            </div>
            {/* End .form-footer */}
        </form>
    );
};

export default LoginForm;
