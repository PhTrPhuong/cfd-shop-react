import Button from "@/components/Button";
import ProductColor from "@/components/ProductColor";
import { PATHS } from "@/constants/paths";
import { handleRemoveWishList } from "@/store/reducer/authReducer";
import { handleAddCart } from "@/store/reducer/cartReducer";
import { formatCurrency } from "@/utils/format";
import { Modal } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const WishList = () => {
    const dispatch = useDispatch();
    const { profile } = useSelector((state) => state.auth);
    const { whiteList } = profile || {};
    const { confirm } = Modal;

    /* -- Handle Add To Cart -- */
    const _onAddToCart = (e, item) => {
        e?.preventDefault();
        const { id, color, price, discount } = item || {};
        const addPayload = {
            addedId: id,
            addedColor: color?.[0] || "",
            addedQuantity: 1,
            addedPrice: price - discount,
        };
        dispatch(handleAddCart(addPayload));
    };

    /* -- Handle Remove Product Wishlist -- */
    const _onRemoveWishList = (e, id) => {
        e?.preventDefault();
        confirm({
            title: "Do you want remove this product?",
            onOk() {
                dispatch(handleRemoveWishList?.(id));
            },
            onCancel() {
                console.log("Cancel");
            },
        });
    };

    return (
        <div className="tab-pane fade show active">
            <table className="table table-wishlist table-mobile">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th className="text-center">Price</th>
                        <th className="text-center">Stock Status</th>
                        <th />
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {whiteList?.length > 0 &&
                        whiteList.map((item, index) => {
                            const { id, images, name, slug, price, stock } = item || {};
                            const detailPath = PATHS.PRODUCTS + `/${slug}`;

                            let imagePath = images?.[0];
                            if (imagePath?.split("https")?.length > 2) {
                                imagePath = imagePath?.split("https");
                                imagePath = "https" + imagePath[2];
                            }

                            return (
                                <tr key={id || index}>
                                    <td className="product-col">
                                        <div className="product">
                                            <figure className="product-media">
                                                <Link to={detailPath}>
                                                    <img src={imagePath} alt={name} />
                                                </Link>
                                            </figure>
                                            <h3 className="product-title">
                                                <Link to={detailPath}>{name || ""}</Link>
                                            </h3>
                                        </div>
                                    </td>
                                    <td className="price-col text-center">
                                        ${formatCurrency(price) || 0}
                                    </td>
                                    <td className="stock-col text-center">
                                        {stock > 0 ? (
                                            <span className="in-stock">In stock</span>
                                        ) : (
                                            <span className="out-of-stock">
                                                Out of stock
                                            </span>
                                        )}
                                    </td>
                                    <td className="action-col">
                                        <Button
                                            className="btn-block"
                                            variant="outline"
                                            onClick={(e) => _onAddToCart(e, item)}
                                        >
                                            <i className="icon-cart-plus" />
                                            Add to Cart{" "}
                                        </Button>
                                    </td>
                                    <td className="remove-col">
                                        <button
                                            className="btn-remove"
                                            onClick={(e) => _onRemoveWishList(e, id)}
                                        >
                                            <i className="icon-close" />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
};

export default WishList;
