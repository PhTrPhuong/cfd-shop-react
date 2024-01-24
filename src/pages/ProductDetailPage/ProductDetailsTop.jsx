import ProductColor from "@/components/ProductColor";
import ProductImageZoom from "@/components/ProductImageZoom";
import QuantityInput from "@/components/QuantityInput";
import ShareLink from "@/components/ShareLink";
import { MODAL_TYPES } from "@/constants/general";
import { PATHS } from "@/constants/paths";
import { handleCloseModal, handleShowModal } from "@/store/reducer/authReducer";
import { formatCurrency, transformNumberToPercent } from "@/utils/format";
import tokenMethod from "@/utils/token";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const ProductDetailsTop = ({
    images,
    name,
    rating,
    reviews,
    price,
    description,
    color,
    category,
    stock,
    colorRef,
    quantityRef,
    handleAddToCart,
    hanldeAddToWishlist,
}) => {
    /* --- */
    const pathUrl = window.location.href;
    const categoryPath = category?.id && PATHS.PRODUCTS + `?category=${category?.id}`;
    const dispatch = useDispatch();

    /* --- */
    const _onAddToCart = (e) => {
        e?.preventDefault();
        e?.stopPropagation();
        dispatch(handleShowModal(MODAL_TYPES.login));
        if (!!tokenMethod.get()) {
            dispatch(handleCloseModal());
            handleAddToCart?.();
        }
    };

    /* --- */
    const _onAddToWishlist = (e) => {
        e?.preventDefault();
        e?.stopPropagation();
        hanldeAddToWishlist?.();
    };

    return (
        <div className="product-details-top">
            <div className="row">
                {/*  ---  */}
                <div className="col-md-6">
                    <ProductImageZoom images={images} />
                </div>

                {/*  ---  */}
                <div className="col-md-6">
                    <div className="product-details">
                        <h1 className="product-title">{name}</h1>

                        <div className="ratings-container">
                            <div className="ratings">
                                {/* <div className="ratings-val" style={{ width: "80%" }} /> */}
                                <div
                                    className="ratings-val"
                                    style={{
                                        width: `${transformNumberToPercent(rating)}%`,
                                    }}
                                />
                            </div>
                            <a
                                className="ratings-text"
                                href="#product-review-link"
                                id="review-link"
                            >
                                ( {reviews?.length} Reviews )
                            </a>
                        </div>

                        <div className="product-price"> ${formatCurrency(price)} </div>

                        <div
                            className="product-content"
                            dangerouslySetInnerHTML={{
                                __html: description,
                            }}
                        />

                        <div className="details-filter-row details-row-size">
                            <label>Color:</label>
                            <ProductColor colors={color} ref={colorRef} />
                        </div>

                        <div className="details-filter-row details-row-size">
                            <label htmlFor="qty">Qty:</label>
                            <div className="product-details-quantity">
                                <QuantityInput max={stock} ref={quantityRef} />
                            </div>
                        </div>

                        <div className="product-details-action">
                            <a
                                href="#"
                                className="btn-product btn-cart"
                                onClick={_onAddToCart}
                            >
                                <span>add to cart</span>
                            </a>
                            <div className="details-action-wrapper">
                                <a
                                    href="#"
                                    className="btn-product btn-wishlist"
                                    title="Wishlist"
                                    onClick={_onAddToWishlist}
                                >
                                    <span>Add to Wishlist</span>
                                </a>
                            </div>
                        </div>

                        <div className="product-details-footer">
                            <div className="product-cat">
                                <span>Category:</span>
                                {/* <a href="#">Women</a>, <a href="#">Dresses</a>,{" "}
                                <a href="#">Yellow</a> */}
                                <Link to={categoryPath}>{category?.name}</Link>
                            </div>
                            <div
                                style={{ gap: "0 5px" }}
                                className="social-icons social-icons-sm"
                            >
                                <span className="social-label">Share:</span>
                                <ShareLink title="Facebook" path={pathUrl}>
                                    <i className="icon-facebook-f" />
                                </ShareLink>
                                <ShareLink type="twitter" title="Twitter" path={pathUrl}>
                                    <i className="icon-twitter" />
                                </ShareLink>
                                <ShareLink
                                    type="instagram"
                                    title="Instagram"
                                    path={pathUrl}
                                >
                                    <i className="icon-instagram" />
                                </ShareLink>
                                <ShareLink
                                    type="pinterest"
                                    title="Pinterest"
                                    path={pathUrl}
                                >
                                    <i className="icon-pinterest" />
                                </ShareLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsTop;
