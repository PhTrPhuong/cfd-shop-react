import React from "react";

const FormAccount = () => {
    return (
        <div className="tab-pane fade show active">
            <form action="#" className="account-form">
                <div className="row">
                    <div className="col-sm-6">
                        <label>Full Name *</label>
                        <input
                            type="text"
                            className="form-control"
                            defaultValue="Tran"
                            required
                        />
                    </div>
                    <div className="col-sm-6">
                        <label>Email address *</label>
                        <input
                            type="email"
                            className="form-control"
                            defaultValue="trannghia@gmail.com"
                            disabled
                            required
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <label>Phone number *</label>
                        <input
                            type="text"
                            className="form-control input-error"
                            required
                        />
                        <p className="form-error">Please fill in this field</p>
                    </div>
                    <div className="col-sm-6">
                        <label>Ngày sinh *</label>
                        <input type="date" className="form-control" required />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4">
                        <label>Province/City *</label>
                        <div className="select-custom">
                            <select
                                className="form-control form-select"
                                id="city"
                                aria-label="Default select example"
                            >
                                <option selected />
                            </select>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <label>District/Town *</label>
                        <div className="select-custom">
                            <select className="form-control form-select" id="district">
                                <option selected />
                            </select>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <label>Ward *</label>
                        <div className="select-custom">
                            <select className="form-control form-select" id="ward">
                                <option selected />
                            </select>
                        </div>
                    </div>
                </div>
                <label>Street address *</label>
                <input
                    type="email"
                    className="form-control"
                    defaultValue="30 Ba Thang Hai St."
                    required
                />
                <label>Current password (leave blank to leave unchanged)</label>
                <input type="password" className="form-control" />
                <label>New password (leave blank to leave unchanged)</label>
                <input type="password" className="form-control" />
                <label>Confirm new password</label>
                <input type="password" className="form-control mb-2" />
                <button type="submit" className="btn btn-outline-primary-2">
                    <span>SAVE CHANGES</span>
                    <i className="icon-long-arrow-right" />
                </button>
            </form>
        </div>
    );
};

export default FormAccount;
