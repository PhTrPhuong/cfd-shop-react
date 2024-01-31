import React from "react";

const AddressAccount = () => {
    return (
        <div className="tab-pane fade show active">
            <p>The following addresses will be used on the checkout page by default.</p>
            <div className="row">
                <div className="col-lg-6">
                    <div className="card card-dashboard">
                        <div className="card-body">
                            <h3 className="card-title">Billing Address</h3>
                            <p>
                                <strong>Fullname:</strong> Tran Nghia <br />
                                <strong>Email:</strong> trannghia@gmail.com <br />
                                <strong>Phone number:</strong> 098 9596 912 <br />
                                <br />
                                <a href="#">
                                    Edit <i className="icon-edit" />
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="card card-dashboard">
                        <div className="card-body">
                            <h3 className="card-title">Shipping Address</h3>
                            <p>
                                Cecilia Chapman 711-2880 Nulla St. Mankato Mississippi{" "}
                                <br />
                                <br />
                                <a href="#">
                                    Edit <i className="icon-edit" />
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddressAccount;
