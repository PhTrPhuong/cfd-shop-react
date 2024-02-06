import React from "react";

const ChangePass = () => {
    return (
        <>
            <label>Current password (leave blank to leave unchanged)</label>
            <input type="password" className="form-control" />
            <label>New password (leave blank to leave unchanged)</label>
            <input type="password" className="form-control" />
            <label>Confirm new password</label>
            <input type="password" className="form-control mb-2" />
        </>
    );
};

export default ChangePass;
