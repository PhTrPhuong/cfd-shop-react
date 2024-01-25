import { PATHS } from "@/constants/paths";
import { Modal } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ProductColor from "../ProductColor";
import { formatCurrency } from "@/utils/format";

const DropdownContainer = styled.div`
    max-height: 30vh;
    overflow-y: scroll;
    padding-right: 25px;
    /* Width */
    &::-webkit-scrollbar {
        width: 10px;
    }
    /* Track */
    &::-webkit-scrollbar-track {
        background: #f1f1f1;
    }
    /* Handle */
    &::-webkit-scrollbar-thumb {
        background: #888;
    }
    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
`;

const ProductCartDetailWrapper = styled.h3`
    display: flex !important;
    flex-direction: column;
    gap: 10px;
    .product-variant {
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 14px;
    }
    .product-nav-dots {
        margin: 0;
    }
`;

const CartDropdown = ({ products, total, shipping, handleRemoveProduct }) => {
    const { confirm } = Modal;

    /* -- */
    const _onRemoveClick = (e, removeIndex) => {
        e?.preventDefault();
        e?.stopPropagation();
        const removeProduct = products?.[removeIndex] || {};

        confirm({
            title: "Do you want remove this item from cart?",
            content: (
                <>
                    <p>{`${removeProduct.name || ""}`}</p>
                    <p>{`${removeProduct.quantity || 0} x $${removeProduct.price}`}</p>
                </>
            ),
            onOk() {
                if (removeIndex > -1) {
                    handleRemoveProduct?.(removeIndex);
                }
            },
            onCancel() {
                console.log("Cancel");
            },
        });
    };

    return (
        <div className="dropdown cart-dropdown">
            <a
                href="#"
                className="dropdown-toggle"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                data-display="static"
            >
                <i className="icon-shopping-cart" />
                <span className="cart-count">{products?.length || 0}</span>
            </a>

            <div className="dropdown-menu dropdown-menu-right" style={{ width: 400 }}>
                {products?.length > 0 ? (
                    <>
                        <DropdownContainer className="dropdown-cart-products">
                            {products?.map((item, index) => {
                                const {
                                    id,
                                    images,
                                    name,
                                    price,
                                    slug,
                                    quantity,
                                    variant,
                                } = item || {};

                                const detailPath = PATHS.PRODUCTS + `/${slug}`;

                                let imagePath = images?.[0];
                                if (imagePath?.split("https")?.length > 2) {
                                    imagePath = imagePath?.split("https");
                                    imagePath = "https" + imagePath[2];
                                }

                                return (
                                    <div className="product" key={id + index}>
                                        <ProductCartDetailWrapper className="product-cart-details">
                                            <p className="product-title">
                                                <Link to={detailPath}>{name}</Link>
                                            </p>
                                            <div className="product-variant">
                                                Color: <ProductColor colors={[variant]} />
                                            </div>
                                            <span className="cart-product-info">
                                                <span className="cart-product-qty">
                                                    {quantity || 0}
                                                </span>{" "}
                                                x ${formatCurrency(price)}{" "}
                                            </span>
                                        </ProductCartDetailWrapper>
                                        <figure className="product-image-container">
                                            <Link
                                                to={detailPath}
                                                className="product-image"
                                            >
                                                <img src={imagePath} alt={name} />
                                            </Link>
                                        </figure>
                                        <a
                                            href="#"
                                            className="btn-remove"
                                            title="Remove Product"
                                            onClick={(e) => _onRemoveClick(e, index)}
                                        >
                                            <i className="icon-close" />
                                        </a>
                                    </div>
                                );
                            })}
                        </DropdownContainer>

                        <div className="dropdown-cart-total">
                            <span>Total</span>
                            <span className="cart-total-price">
                                ${formatCurrency(total || 0)}
                            </span>
                        </div>

                        <div className="dropdown-cart-action">
                            <Link to={PATHS.CART} className="btn btn-primary">
                                View Cart
                            </Link>
                            {shipping?.typeShip && (
                                <Link
                                    to={PATHS.CHECKOUT}
                                    className="btn btn-outline-primary-2"
                                >
                                    <span>Checkout</span>
                                    <i className="icon-long-arrow-right" />
                                </Link>
                            )}
                        </div>
                    </>
                ) : (
                    <p>
                        There is no any product in cart -{" "}
                        <Link to={PATHS.PRODUCTS}>Go to shop</Link>
                    </p>
                )}
            </div>
        </div>
    );
};

export default CartDropdown;
