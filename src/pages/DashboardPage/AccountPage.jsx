import React from "react";
import { useSelector } from "react-redux";
import FormAccount from "./FormAccount";

const AccountPage = () => {
    const { profile, loading } = useSelector((store) => store.auth);

    if (!profile || loading.getProfile) return null;

    return profile && <FormAccount profile={profile} />;
};

export default AccountPage;
