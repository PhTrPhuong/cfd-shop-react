import useQuery from "@/hooks/useQuery";
import { productService } from "@/services/productService";
import { message } from "antd";
import React, { useRef } from "react";
import { useParams } from "react-router-dom";

const useProductDetailPage = () => {
    // Initial Hooks
    const { slug } = useParams();
    const colorRef = useRef();
    const quantityRef = useRef();

    /* ---- Fetching API - productService - Product Detail ---- */
    const { data: productDetailData } = useQuery(
        () => productService.getProductDetail(slug),
        [slug]
    );
    // --
    const { id, name, description, shippingReturn } = productDetailData || {};

    /* ---- Fetching API - productService - Product Review ---- */
    const { data: productDetailReviewData } = useQuery(
        () => id && productService.getProductReview(id),
        [id]
    );

    /* ---------------------------------------------------------------- */

    /* ---- Product Detail Top  ---- */
    // handle add to cart
    const handleAddToCart = () => {
        const { value: color, reset: colorReset } = colorRef.current || {};
        const { value: quantity, reset: quantityReset } = quantityRef.current || {};
        // console.log(color);

        if (!color) {
            message.error("Please select color");
            return;
        } else if (isNaN(quantity) && quantity < 1) {
            message.error("Quantity must be greater than 1");
            return;
        }

        // reset
        colorReset?.();
        quantityReset?.();
    };

    // handle add to wish list
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
