import React, { useEffect } from "react";
import { orderServices } from "@/services/orderServices";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/constants/paths";
import { handleGetCart, updateCacheCart } from "@/store/reducer/cartReducer";
import { COUPON } from "@/constants/message";

const useCheckoutPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartInfo } = useSelector((state) => state.cart);

    useEffect(() => {
        if (Array.isArray(cartInfo) || (cartInfo?.id && cartInfo?.product?.length < 1)) {
            message.config({ top: 80, duration: 3, maxCount: 1 });
            message.error("There are no product in cart. Please add products to cart!");
            navigate(PATHS.PRODUCTS);
        }
    }, [cartInfo]);

    /* ---------------------------------------------------------------- */

    /* ---- Handle Coupon ---- */
    // --
    const handleAddCoupon = async (coupon) => {
        try {
            const couponRes = await orderServices.getVoucher(coupon);
            const couponInfo = couponRes?.data;

            if (couponInfo) {
                const { subTotal, shipping } = cartInfo || {};
                dispatch(
                    updateCacheCart({
                        ...cartInfo,
                        discount: couponInfo.value || 0,
                        discountCode: couponInfo.code || "",
                        total:
                            subTotal - (couponInfo.value || 0) + (shipping?.price || 0),
                    })
                );
                message.success(COUPON.couponSuccess);
            }
        } catch (error) {
            console.log("error", error);
            message.error(COUPON.couponFail);
        }
    };
    // --
    const handleRemoveCoupon = () => {
        try {
            if (cartInfo.discountCode) {
                const { subTotal, shipping } = cartInfo || {};
                dispatch(
                    updateCacheCart({
                        ...cartInfo,
                        discount: 0,
                        discountCode: "",
                        total: subTotal + (shipping?.price || 0),
                    })
                );
                message.success(COUPON.removeSuccess);
            }
        } catch (error) {
            console.log("error", error);
            message.error(COUPON.removeFail);
        }
    };
    // --
    const couponProps = {
        addedCoupon: cartInfo.discountCode,
        handleAddCoupon,
        handleRemoveCoupon,
    };

    /* ---- Handle Checkout ---- */
    // --
    const handleCheckout = async (data) => {
        if (data) {
            const { formInfo, cartInfo } = data || {};
            const {
                phone,
                email,
                firstName,
                province,
                district,
                ward,
                street,
                note,
                paymentMethod,
            } = formInfo || {};
            const {
                shipping,
                variant,
                subTotal,
                total,
                product,
                quantity,
                totalProduct,
                discount,
                discountCode,
            } = cartInfo || {};

            const checkoutPayload = {
                address: {
                    phone,
                    email,
                    fullName: firstName,
                    street: `${street || ""}, ${ward?.label || ""}, 
                        ${district?.label || ""}, ${province?.label || ""}`,
                },
                shipping: {
                    typeShip: shipping?.typeShip,
                    price: shipping?.price,
                },
                product: product?.map((item) => item.id) || [],
                note,
                paymentMethod,
                shipping,
                variant,
                subTotal,
                total,
                quantity,
                totalProduct,
                discount,
                discountCode,
            };

            try {
                const res = await orderServices.checkout(checkoutPayload);
                if (res?.data) {
                    dispatch(handleGetCart());
                    message.success("Checkout successfully");
                    navigate(PATHS.CHECKOUT_SUCCESS);
                } else {
                    message.error("Checkout failed");
                }
            } catch (error) {
                message.error("Checkout failed");
            }
        }
    };
    // --
    const checkoutFormProps = {
        handleCheckout,
    };

    /* ---------------------------------------------------------------- */

    return { couponProps, checkoutFormProps };
};

export default useCheckoutPage;
