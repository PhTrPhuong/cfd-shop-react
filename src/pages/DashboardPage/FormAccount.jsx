import { Input } from "@/components/Input";
import { MESSAGE, REGEX } from "@/constants/validate";
import useAddress from "@/hooks/useAddress";
import { authService } from "@/services/authService";
import { handleGetProfile } from "@/store/reducer/authReducer";
import { Select, message } from "antd";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const FormAccount = () => {
    const { profile } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const { firstName, phone, email, province, district, ward, street, birthday } =
        profile || {};

    /* ------ */
    const {
        provinces,
        districts,
        wards,
        provinceId,
        districtId,
        wardId,
        handleProvinceChange,
        handleDistrictChange,
        handleWardChange,
    } = useAddress();

    /* ------ */
    const {
        register,
        handleSubmit,
        getValues,
        reset,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            firstName,
            phone,
            email,
            province,
            district,
            ward,
            street,
        },
    });

    /* --- Get data address default --- */
    useEffect(() => {
        if (!profile) return;
        reset?.({
            firstName: firstName,
            phone,
            email,
            province,
            district,
            ward,
            street,
            birthday: profile?.birthday
                ? dayjs(profile?.birthday || "01-01-2000")
                      .format("YYYY/MM/DD")
                      .replaceAll("/", "-")
                : "",
        });
        handleProvinceChange?.(province);
        handleDistrictChange?.(district);
        handleWardChange?.(ward);
    }, [profile]);

    /* ------ */
    const _onProvinceChange = (changedId) => {
        handleProvinceChange?.(changedId);
        reset({
            ...getValues(),
            province: changedId,
            district: undefined,
            ward: undefined,
        });
    };
    const _onDistrictChange = (changedId) => {
        handleDistrictChange?.(changedId);
        reset({
            ...getValues(),
            district: changedId,
            ward: undefined,
        });
    };
    const _onWardChange = (changedId) => {
        handleWardChange?.(changedId);
        reset({
            ...getValues(),
            ward: changedId,
        });
    };

    /* ------ */
    const _onSubmit = async (data) => {
        const _payload = {
            ...data,
            lastName: profile?.lastName || profile?.firstName,
        };
        try {
            const res = await authService.updateProfile(_payload);
            if (res?.statusCode == 200) {
                message.success("Update success");
                dispatch(handleGetProfile());
            }
        } catch (error) {
            message.error(error?.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="tab-pane fade show active">
            <FormContainer className="account-form" onSubmit={handleSubmit(_onSubmit)}>
                <div className="row">
                    <div className="col-sm-6">
                        <Input
                            label="Name"
                            type="text"
                            required
                            {...register("firstName", {
                                required: "Please enter your name",
                            })}
                            error={errors?.firstName?.message || ""}
                        />
                    </div>
                    <div className="col-sm-6">
                        <Input
                            label="Email address"
                            disabled
                            required
                            {...register("email", {
                                required: "Please enter your email",
                            })}
                            error={errors?.email?.message || ""}
                        />
                    </div>
                </div>
                {/* -- */}
                <div className="row">
                    <div className="col-sm-6">
                        <Input
                            label="Phone number"
                            type="text"
                            required
                            {...register("phone", {
                                required: "Please enter your phone",
                                pattern: {
                                    value: REGEX.phone,
                                    message: "Please enter email with format phone",
                                },
                            })}
                            error={errors?.phone?.message || ""}
                        />
                    </div>
                    <div className="col-sm-6">
                        <Input
                            label="Ngày sinh"
                            type="date"
                            required
                            {...register("birthday", {
                                required: "Please enter your birthday",
                            })}
                            error={errors?.birthday?.message || ""}
                        />
                    </div>
                </div>
                {/* -- */}
                <div className="row">
                    <div className="col-sm-4">
                        <label>Province/City *</label>
                        <Controller
                            name="province"
                            control={control}
                            rules={{ required: MESSAGE.required }}
                            render={({ formState: { errors } }) => {
                                return (
                                    <>
                                        <Select
                                            className="form-control customSelect"
                                            suffixIcon={<></>}
                                            showSearch
                                            placeholder="Please select Province/City"
                                            options={provinces}
                                            value={provinceId}
                                            optionFilterProp="children"
                                            onChange={_onProvinceChange}
                                            filterOption={(input, option) =>
                                                removeAccents(option?.label ?? "")
                                                    .toLowerCase()
                                                    .includes(
                                                        removeAccents(input.toLowerCase())
                                                    )
                                            }
                                        />
                                        <p
                                            className="form-error"
                                            style={{ minHeight: 23 }}
                                        >
                                            {errors?.province?.message || ""}
                                        </p>
                                    </>
                                );
                            }}
                        />
                    </div>
                    {/* -- */}
                    <div className="col-sm-4">
                        <label>District/Town *</label>
                        <Controller
                            name="district"
                            control={control}
                            rules={{ required: MESSAGE.required }}
                            render={({ formState: { errors } }) => {
                                return (
                                    <>
                                        <Select
                                            className="form-control customSelect"
                                            suffixIcon={<></>}
                                            showSearch
                                            placeholder="Please select District/Town"
                                            options={districts}
                                            value={districtId}
                                            optionFilterProp="children"
                                            onChange={_onDistrictChange}
                                            filterOption={(input, option) =>
                                                removeAccents(option?.label ?? "")
                                                    .toLowerCase()
                                                    .includes(
                                                        removeAccents(input.toLowerCase())
                                                    )
                                            }
                                        />
                                        <p
                                            className="form-error"
                                            style={{ minHeight: 23 }}
                                        >
                                            {errors?.district?.message || ""}
                                        </p>
                                    </>
                                );
                            }}
                        />
                    </div>
                    {/* -- */}
                    <div className="col-sm-4">
                        <label>Ward *</label>
                        <Controller
                            name="ward"
                            control={control}
                            rules={{ required: MESSAGE.required }}
                            render={({ formState: { errors } }) => {
                                return (
                                    <>
                                        <Select
                                            className="form-control customSelect"
                                            suffixIcon={<></>}
                                            showSearch
                                            placeholder="Please select Ward"
                                            options={wards}
                                            value={wardId}
                                            optionFilterProp="children"
                                            onChange={_onWardChange}
                                            filterOption={(input, option) =>
                                                removeAccents(option?.label ?? "")
                                                    .toLowerCase()
                                                    .includes(
                                                        removeAccents(input.toLowerCase())
                                                    )
                                            }
                                        />
                                        <p
                                            className="form-error"
                                            style={{ minHeight: 23 }}
                                        >
                                            {errors?.ward?.message || ""}
                                        </p>
                                    </>
                                );
                            }}
                        />
                    </div>
                </div>
                {/* -- */}
                <Input
                    label="Street address"
                    type="text"
                    required
                    {...register("street", {
                        required: "Please enter your address",
                    })}
                    error={errors?.street?.message || ""}
                />
                {/* -- */}
                <button type="submit" className="btn btn-outline-primary-2">
                    <span>SAVE CHANGES</span>
                    <i className="icon-long-arrow-right" />
                </button>
            </FormContainer>
        </div>
    );
};

export default FormAccount;

/* ------ */
const FormContainer = styled.form`
    .form-error {
        line-height: normal;
    }
    .customSelect {
        padding: 0;
        &:hover,
        &:focus {
            .ant-select-selector {
                border-color: #fcb941 !important;
                box-shadow: unset !important;
                outline: unset !important;
            }
        }
    }
`;
