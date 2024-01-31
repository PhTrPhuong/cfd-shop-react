import RadioGroup from "@/components/RadioGroup";
import { SHIPPING_OPTIONS } from "@/constants/general";
import { PATHS } from "@/constants/paths";
import { formatCurrency } from "@/utils/format";
import { Radio, message } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const CartSummary = ({ subTotal, total, typeShip, handleUpdateShipping }) => {
    const navigate = useNavigate();

    const _onProccedCheckout = (e) => {
        e?.preventDefault();
        if (!typeShip) {
            message.error("Please select shipping method");
        } else {
            navigate(PATHS.CHECKOUT);
        }
    };

    return (
        <aside className="col-lg-3">
            <div className="summary summary-cart">
                <h3 className="summary-title">Cart Total</h3>
                <table className="table table-summary">
                    <tbody>
                        <tr className="summary-subtotal">
                            <td>Subtotal:</td>
                            <td>${formatCurrency(subTotal) || 0}</td>
                        </tr>
                        {/* --- */}
                        <tr className="summary-shipping">
                            <td>Shipping:</td>
                            <td>&nbsp;</td>
                        </tr>
                        <RadioGroup
                            onChange={handleUpdateShipping}
                            defaultValue={typeShip || ""}
                        >
                            {SHIPPING_OPTIONS.map((option) => {
                                const { label, value, price } = option || {};
                                return (
                                    <tr
                                        key={option.value}
                                        className="summary-shipping-row"
                                    >
                                        <td>
                                            <RadioGroup.Item value={value}>
                                                {label}
                                            </RadioGroup.Item>
                                        </td>
                                        <td>${formatCurrency(price)}</td>
                                    </tr>
                                );
                            })}
                        </RadioGroup>
                        {/* --- */}
                        <tr className="summary-shipping-estimate">
                            <td>
                                Estimate for Your Country <br />
                                <Link to={PATHS.PROFILE.INDEX}>Change address</Link>
                            </td>
                            <td>&nbsp;</td>
                        </tr>
                        {/* --- */}
                        <tr className="summary-total">
                            <td>Total:</td>
                            <td>${formatCurrency(total)}</td>
                        </tr>
                    </tbody>
                </table>

                <Link
                    to={PATHS.CHECKOUT}
                    className="btn btn-outline-primary-2 btn-order btn-block"
                    onClick={_onProccedCheckout}
                >
                    PROCEED TO CHECKOUT
                </Link>
            </div>

            <Link to={PATHS.PRODUCTS} className="btn btn-outline-dark-2 btn-block mb-3">
                <span>CONTINUE SHOPPING</span>
                <i className="icon-refresh" />
            </Link>
        </aside>
    );
};

export default CartSummary;
