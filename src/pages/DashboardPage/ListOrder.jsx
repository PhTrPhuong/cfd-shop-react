import Button from "@/components/Button";
import ProductColor from "@/components/ProductColor";
import { PATHS } from "@/constants/paths";
import useQuery from "@/hooks/useQuery";
import { orderServices } from "@/services/orderServices";
import { formatCurrency } from "@/utils/format";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ListOrder = () => {
    const { data: ordersData, loading: ordersLoading } = useQuery(
        orderServices.getOrders
    );
    const ordersInfo = ordersData?.orders || [];

    return (
        <div className="tab-pane fade show active">
            {!ordersLoading && ordersInfo?.length === 0 && (
                <>
                    <p>No order has been made yet.</p>
                    <Button link={PATHS.PRODUCTS} variant="outline">
                        <span>GO SHOP</span>
                        <i className="icon-long-arrow-right" />
                    </Button>
                </>
            )}

            {!ordersLoading &&
                ordersInfo?.length > 0 &&
                ordersInfo?.map((order, index) => {
                    const { id, product, quantity, totalProduct, variant } = order || {};

                    return (
                        <table
                            className="table table-cart table-mobile"
                            key={id || index}
                        >
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th className="text-center">Price</th>
                                    <th className="text-center">Quantity</th>
                                    <th className="text-center">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {product?.length > 0 ? (
                                    product?.map((item, index) => {
                                        const { id, images, name, price, slug } =
                                            item || {};
                                        const detailPath = PATHS.PRODUCTS + `/${slug}`;

                                        let imagePath = images?.[0];
                                        if (imagePath?.split("https")?.length > 2) {
                                            imagePath = imagePath?.split("https");
                                            imagePath = "https" + imagePath[2];
                                        }

                                        return (
                                            <tr key={id + index}>
                                                <td className="product-col">
                                                    <div className="product">
                                                        <figure className="product-media">
                                                            <Link to={detailPath}>
                                                                <img
                                                                    src={imagePath}
                                                                    alt={name}
                                                                />
                                                            </Link>
                                                        </figure>
                                                        <ProductTitle className="product-title">
                                                            <Link to={detailPath}>
                                                                {name || ""}
                                                            </Link>
                                                            <div className="product-variant">
                                                                Color:{" "}
                                                                <ProductColor
                                                                    colors={[
                                                                        variant[index],
                                                                    ]}
                                                                />
                                                            </div>
                                                        </ProductTitle>
                                                    </div>
                                                </td>
                                                <td className="price-col text-center">
                                                    ${formatCurrency(price) || 0}
                                                </td>
                                                <td className="quantity-col text-center">
                                                    {quantity[index]}{" "}
                                                </td>
                                                <td className="total-col text-center">
                                                    $
                                                    {formatCurrency(
                                                        totalProduct[index]
                                                    ) || 0}
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td>
                                            There is no any product in cart -{" "}
                                            <Link to={PATHS.PRODUCTS}>Go to shop</Link>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    );
                })}
        </div>
    );
};

export default ListOrder;

const ProductTitle = styled.h3`
    display: flex !important;
    flex-direction: column;
    gap: 10px;
    .product-variant {
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 13px;
    }
    .product-nav-dots {
        margin: 0;
    }
`;
