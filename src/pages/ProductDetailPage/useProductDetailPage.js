import { MODAL_TYPES } from "@/constants/general";
import useQuery from "@/hooks/useQuery";
import { productService } from "@/services/productService";
import { handleShowModal } from "@/store/reducer/authReducer";
import { handleAddCart } from "@/store/reducer/cartReducer";
import tokenMethod from "@/utils/token";
import { message } from "antd";
import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const useProductDetailPage = () => {
    // Initial Hooks
    const dispatch = useDispatch();
    const { slug } = useParams();
    const colorRef = useRef();
    const quantityRef = useRef();

    /* ---- Fetching API - productService - Product Detail ---- */
    const { data: productDetailData } = useQuery(
        () => productService.getProductDetail(slug),
        [slug]
    );
    // --
    const { id, name, description, shippingReturn, price, discount } =
        productDetailData || {};

    /* ---- Fetching API - productService - Product Review ---- */
    const { data: productDetailReviewData } = useQuery(
        () => id && productService.getProductReview(id),
        [id]
    );

    /* ---------------------------------------------------------------- */

    /* ---- Product Detail Top  ---- */
    // Handle Add To Cart
    const handleAddToCart = () => {
        const { value: color, reset: colorReset } = colorRef.current || {};
        const { value: quantity, reset: quantityReset } = quantityRef.current || {};
        // console.log(color);

        // VALIDATE
        if (!color) {
            message.error("Please select color");
            return;
        } else if (isNaN(quantity) && quantity < 1) {
            message.error("Quantity must be greater than 1");
            return;
        }

        // ADD CART
        const addPayload = {
            addedId: id,
            addedColor: color,
            addedQuantity: quantity,
            addedPrice: price - discount,
        };
        try {
            const res = dispatch(handleAddCart(addPayload)).unwrap();
            if (res) {
                // RESET
                colorReset?.();
                quantityReset?.();
            }
        } catch (error) {
            console.log("error", error);
        }
    };

    // Handle Add To Wish List
    const handleAddToWishlist = () => {
        console.log(1);
    };

    // --
    const productDetailTopProps = {
        ...productDetailData,
        reviews: productDetailReviewData,
        colorRef,
        quantityRef,
        handleAddToCart,
        handleAddToWishlist,
    };

    /* ---- Product Detail Tab  ---- */
    // --
    const productDetailTabProps = {
        reviews: productDetailReviewData,
        description,
        shippingReturn,
    };

    /* ---------------------------------------------------------------- */

    return {
        productName: name,
        productDetailTopProps,
        productDetailTabProps,
    };
};

export default useProductDetailPage;
