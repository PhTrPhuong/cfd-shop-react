import Button from "@/components/Button";
import { Input } from "@/components/Input";
import { MESSAGE } from "@/constants/validate";
import { authService } from "@/services/authService";
import { message } from "antd";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const ChangePass = () => {
    const { profile } = useSelector((state) => state.auth);
    const newPassword = useRef({});
    const password = useRef({});

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    password.current = watch("password", "");
    newPassword.current = watch("newPassword", "");

    /* -- Submit form -- */
    const _onSubmit = async (data) => {
        try {
            const res = await authService.updateProfile({ ...profile, ...data });
            if (res.statusCode === 200) {
                message.success("Update success");
            }
        } catch (error) {
            message.error(error?.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="tab-pane fade  active show">
            <form className="account-form" onSubmit={handleSubmit(_onSubmit)}>
                <Input
                    type="password"
                    label="Current password (leave blank to leave unchanged)"
                    defaultValue={null}
                    {...register("password", {
                        required: "Vui lòng nhập mật khẩu cũ",
                    })}
                    error={errors?.password?.message || ""}
                />

                {/* New Password */}
                <Input
                    type="password"
                    label="New password (leave blank to leave unchanged)"
                    {...register("newPassword", {
                        required: MESSAGE.required,
                        validate: (value) =>
                            value !== password.current ||
                            "Không được trùng với mật khẩu cũ",
                    })}
                    error={errors?.newPassword?.message || ""}
                />

                {/* Confirm Password */}
                <Input
                    type="password"
                    label="Confirm new Password"
                    {...register("confirmPassword", {
                        required: MESSAGE.required,
                        validate: (value) =>
                            value === newPassword.current ||
                            "Xác nhận mật khẩu không khớp",
                    })}
                    error={errors?.confirmPassword?.message || ""}
                />

                {/* --- */}
                <Button type="submit" variant="outline">
                    <span>SAVE CHANGES</span>
                    <i className="icon-long-arrow-right" />
                </Button>
            </form>
        </div>
    );
};

export default ChangePass;
