import { formatDate, transformNumberToPercent } from "@/utils/format";
import React, { useState } from "react";

/* --- */
const TABS = {
    desc: "description",
    shipping: "shipping&return",
    review: "review",
};

const ProductDetailsTab = ({ reviews, description, shippingReturn }) => {
    const [activeTab, setActiveTab] = useState(TABS.desc);

    /* --- */
    const _onTabChange = (e, tab) => {
        e?.preventDefault();
        e?.stopPropagation();
        setActiveTab(tab);
    };

    return (
        <div className="product-details-tab" style={{ minHeight: "30vh" }}>
            {/* --Tab link-- */}
            <ul className="nav nav-pills justify-content-center" role="tablist">
                <li className="nav-item">
                    <a
                        className={`nav-link ${activeTab === TABS.desc ? "active" : ""}`}
                        href="#product-desc-tab"
                        onClick={(e) => _onTabChange(e, TABS.desc)}
                    >
                        Description
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        className={`nav-link ${
                            activeTab === TABS.shipping ? "active" : ""
                        }`}
                        href="#product-shipping-tab"
                        onClick={(e) => _onTabChange(e, TABS.shipping)}
                    >
                        Shipping &amp; Returns
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        className={`nav-link ${
                            activeTab === TABS.review ? "active" : ""
                        }`}
                        href="#product-review-tab"
                        onClick={(e) => _onTabChange(e, TABS.review)}
                    >
                        Reviews {`(${reviews?.length ?? 0})`}
                    </a>
                </li>
            </ul>

            {/* --Tab content-- */}
            <div className="tab-content">
                {activeTab === TABS.desc && (
                    <div
                        className="tab-pane fade show active"
                        id="product-desc-tab"
                        role="tabpanel"
                        aria-labelledby="product-desc-link"
                    >
                        <div className="product-desc-content">
                            <h3>Product Information</h3>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: description,
                                }}
                            />
                        </div>
                    </div>
                )}

                {activeTab === TABS.shipping && (
                    <div
                        className="tab-pane fade show active"
                        id="product-shipping-tab"
                        role="tabpanel"
                        aria-labelledby="product-shipping-link"
                    >
                        <div className="product-desc-content">
                            {/* <h3>Delivery &amp; returns</h3> */}
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: shippingReturn,
                                }}
                            />
                        </div>
                    </div>
                )}

                {activeTab === TABS.review && (
                    <div
                        className="tab-pane fade show active"
                        id="product-review-tab"
                        role="tabpanel"
                        aria-labelledby="product-review-link"
                    >
                        <div className="reviews">
                            <h3 style={{ fontWeight: 400 }}>
                                {reviews?.length
                                    ? `(Reviews ${reviews.length})`
                                    : "There is no any reviews"}
                            </h3>
                            {reviews?.map((review) => {
                                const {
                                    id,
                                    rate,
                                    order,
                                    title,
                                    updatedAt,
                                    description: reviewDesc,
                                } = review || {};

                                return (
                                    <div className="review" key={id}>
                                        <div className="row no-gutters">
                                            <div className="col-auto">
                                                <h4>
                                                    <a href="#">#{order.slice(-4)}</a>
                                                </h4>
                                                <div className="ratings-container">
                                                    <div className="ratings">
                                                        <div
                                                            className="ratings-val"
                                                            // style={{ width: "80%" }}
                                                            style={{
                                                                width: `${transformNumberToPercent(
                                                                    rate
                                                                )}`,
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <span className="review-date">
                                                    {formatDate(updatedAt)}
                                                </span>
                                            </div>
                                            <div className="col">
                                                <h4>Good, perfect size</h4>
                                                <div className="review-content">
                                                    <h3>{title}</h3>
                                                    <p>{reviewDesc}</p>
                                                </div>
                                                <div className="review-action">
                                                    <a href="#">
                                                        <i className="icon-thumbs-up" />
                                                        Helpful (2){" "}
                                                    </a>
                                                    <a href="#">
                                                        <i className="icon-thumbs-down" />
                                                        Unhelpful (0){" "}
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetailsTab;
