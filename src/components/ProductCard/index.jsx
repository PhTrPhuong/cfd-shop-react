import { MODAL_TYPES } from "@/constants/general";
import { PATHS } from "@/constants/paths";
import { handleShowModal } from "@/store/reducer/authReducer";
import { handleAddCart } from "@/store/reducer/cartReducer";
import { formatCurrency } from "@/utils/format";
import tokenMethod from "@/utils/token";
import { Empty } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

/* --- */
const ImageWrapper = styled.div`
    width: 100%;
    height: 315px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #c1c1c1;
`;

const ProductTitle = styled.h3`
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    min-height: 38px;
`;

const ProductCard = ({ product }) => {
    const { id, slug, title, price, rating, images, discount, color } = product || {};
    const productPath = PATHS.PRODUCTS + `/${slug}`;
    const dispatch = useDispatch();

    /* --- */
    const _onAddToCart = (e) => {
        e?.preventDefault();

        // ADD CART
        const addPayload = {
            addedId: id,
            addedColor: color?.[0] || "",
            addedQuantity: 1,
            addedPrice: price - discount,
        };
        if (!tokenMethod.get()) return dispatch(handleShowModal(MODAL_TYPES.login));
        dispatch(handleAddCart(addPayload));
    };

    return (
        <div className="product product-2">
            <figure className="product-media">
                {/* Icon Sale tag */}
                {discount > 0 && (
                    <span className="product-label label-circle label-sale">Sale</span>
                )}

                <Link to={productPath} style={{ height: 275 }}>
                    {images?.length > 0 ? (
                        <img
                            src={images[0]}
                            alt="Product image"
                            className="product-image"
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                            }}
                        />
                    ) : (
                        <ImageWrapper>
                            <Empty
                                description=""
                                // props này mặc định của Antd Empty, dùng để thay đổi ảnh của Empty
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                            />
                        </ImageWrapper>
                    )}
                </Link>

                <div className="product-action-vertical">
                    <a href="#" className="btn-product-icon btn-wishlist btn-expandable">
                        <span>add to wishlist</span>
                    </a>
                </div>

                <div className="product-action product-action-dark">
                    <a
                        role="button"
                        className="btn-product btn-cart"
                        title="Add to cart"
                        onClick={_onAddToCart}
                    >
                        <span>add to cart</span>
                    </a>
                </div>
            </figure>

            <div className="product-body">
                <ProductTitle className="product-title">
                    <Link to={productPath}>{title || ""}</Link>
                </ProductTitle>

                {/* <div className="product-price">${formatCurrency(price || 0)}</div> */}
                <div className="product-price">
                    {discount ? (
                        <>
                            {" "}
                            <span className="new-price">
                                ${formatCurrency(price - discount)}
                            </span>
                            <span className="old-price">
                                Was ${formatCurrency(price)}
                            </span>{" "}
                        </>
                    ) : (
                        <>${formatCurrency(price || 0)}</>
                    )}
                </div>

                <div className="ratings-container">
                    <div className="ratings">
                        {/* <div class="ratings-val" style="width: 0%;"></div> */}
                        <div
                            className="ratings-val"
                            style={{
                                width: `${(rating || 0) * 20}%`,
                            }}
                        />
                    </div>
                    <span className="ratings-text">( {rating} Reviews )</span>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
