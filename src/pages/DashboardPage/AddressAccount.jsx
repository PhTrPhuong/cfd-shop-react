import { PATHS } from "@/constants/paths";
import useQuery from "@/hooks/useQuery";
import { authService } from "@/services/authService";
import store from "@/store";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AddressAccount = () => {
    const { profile } = useSelector((store) => store.auth);

    const { data: provinceData } = useQuery(
        () => profile?.province && authService.getDataProvinceById(profile?.province),
        [profile?.province]
    );
    const { data: districtData } = useQuery(
        () => profile?.district && authService.getDataDistrictById(profile?.district),
        [profile?.district]
    );
    const { data: wardData } = useQuery(
        () => profile?.ward && authService.getDataWardById(profile?.ward),
        [profile?.ward]
    );

    const address = `${profile?.street},${wardData?.name},${districtData?.name},${provinceData?.name}`;

    return (
        <div className="tab-pane fade show active">
            <p>The following addresses will be used on the checkout page by default.</p>
            <div className="row">
                <div className="col-lg-6">
                    <div className="card card-dashboard">
                        <div className="card-body">
                            <h3 className="card-title">Billing Address</h3>
                            <p>
                                <strong>Fullname:</strong> {profile?.firstName || ""}{" "}
                                <br />
                                <strong>Email:</strong> {profile?.email || ""} <br />
                                <strong>Phone number:</strong> {profile?.phone || ""}{" "}
                                <br />
                                <br />
                                <Link to={PATHS.PROFILE.INDEX}>
                                    Edit <i className="icon-edit" />
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="card card-dashboard">
                        <div className="card-body">
                            <h3 className="card-title">Shipping Address</h3>
                            <p>
                                {address || ""}
                                <br />
                                <br />
                                <Link to={PATHS.PROFILE.INDEX}>
                                    Edit <i className="icon-edit" />
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddressAccount;
