import { cartServices } from "@/services/cartServices";
import { sumArrayNumber } from "@/utils/calculate";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

const initialState = {
    cartInfo: {},
    cartLoading: false,
};

// ----------------------------------------------------------------
/* -- Định nghĩa slice và actions với Redux Toolkit -- */
export const cartSlice = createSlice({
    initialState,
    name: "cart",
    reducers: {
        updateCacheCart: (state, action) => {
            state.cartInfo = action.payload || state.cartInfo;
        },
        clearCart: (state) => {
            state.cartInfo = {};
        },
    },
    extraReducers: (builder) => {
        builder
            /* -- GET CART -- */
            .addCase(handleGetCart.pending, (state) => {
                state.cartLoading = true;
            })
            .addCase(handleGetCart.fulfilled, (state, action) => {
                state.cartLoading = false;
                state.cartInfo = action.payload;
            })
            .addCase(handleGetCart.rejected, (state) => {
                state.cartLoading = false;
                state.cartInfo = {};
            })
            /* -- ADD CART -- */
            .addCase(handleAddCart.pending, (state) => {
                state.cartLoading = true;
            })
            .addCase(handleAddCart.fulfilled, (state) => {
                state.cartLoading = false;
            })
            .addCase(handleAddCart.rejected, (state) => {
                state.cartLoading = false;
            })
            /* -- REMOVE CART -- */
            .addCase(handleRemoveFromCart.pending, (state) => {
                state.cartLoading = true;
            })
            .addCase(handleRemoveFromCart.fulfilled, (state) => {
                state.cartLoading = false;
            })
            .addCase(handleRemoveFromCart.rejected, (state) => {
                state.cartLoading = false;
            });
    },
});

// Extract the action creators object and the reducer
const { actions, reducer: cartReducer } = cartSlice;
// Extract and export each action creator by name
export const { updateCacheCart, clearCart } = actions;
// Export the reducer, either as a default or named export
export default cartReducer;

// ----------------------------------------------------------------
/* -- Xử lý tác vụ không đồng bộ với createAsyncThunk -- */

// Handle get cart
export const handleGetCart = createAsyncThunk("cart/get", async (_, thunkApi) => {
    try {
        const cartRes = await cartServices.getCart();
        return cartRes?.data;
    } catch (error) {
        thunkApi.rejectWithValue(error);
    }
});

// Handle add cart
export const handleAddCart = createAsyncThunk(
    "cart/add",
    async (actionPayload, thunkApi) => {
        try {
            const { addedId, addedColor, addedQuantity, addedPrice } = actionPayload;
            const { cartInfo } = thunkApi.getState()?.cart || {};

            let addPayload = {};

            /* - Cart has products >= 1sp (cartInfo) - */
            if (cartInfo.id) {
                const matchIndex = cartInfo.product?.findIndex(
                    (product) => product.id === addedId
                );

                // -- data old
                const newProduct = cartInfo.product?.map((product) => {
                    return product.id;
                });
                const newQuantity = [...(cartInfo.quantity ?? [])];
                const newVariant = [...(cartInfo.variant ?? [])];
                const newTotalProduct = [...(cartInfo.totalProduct ?? [])];

                // -- Case: It already exists that product in the array && variant(color)
                if (matchIndex > -1 && newVariant[matchIndex] === addedColor) {
                    // quantity +
                    newQuantity[matchIndex] =
                        Number(newQuantity[matchIndex]) + Number(addedQuantity);
                    // variant +
                    newVariant[matchIndex] = addedColor;
                    // total +
                    newTotalProduct[matchIndex] =
                        Number(newTotalProduct[matchIndex]) + addedPrice * addedQuantity;
                } else {
                    // -- Case: It's not in that array yet & #new Variant(color)
                    newProduct.push(addedId);
                    newQuantity.push(addedQuantity);
                    newVariant.push(addedColor);
                    newTotalProduct.push(addedPrice * addedQuantity);
                }

                // --
                const newSubtotal =
                    newTotalProduct.reduce(
                        (current, next) => Number(current) + Number(next),
                        0
                    ) || 0;

                const newTotal = newSubtotal - cartInfo.discount;

                addPayload = {
                    ...cartInfo,
                    product: newProduct,
                    quantity: newQuantity,
                    variant: newVariant,
                    subTotal: newSubtotal,
                    total: newTotal,
                    totalProduct: newTotalProduct,
                };
            } else {
                /* Cart Empty - No product */
                addPayload = {
                    product: [addedId],
                    quantity: [addedQuantity],
                    variant: [addedColor],
                    totalProduct: [addedPrice * addedQuantity],
                    subTotal: addedPrice * addedQuantity,
                    total: addedPrice * addedQuantity,
                    discount: 0,
                    paymentMethod: "",
                };
            }

            console.log("addPayload", addPayload);

            /* - Call API - */
            const cartRes = await cartServices.updateCart(addPayload);
            if (cartRes) {
                thunkApi.dispatch(handleGetCart());
                message.success("Add to cart successfully");
            }
            return cartRes?.data;
        } catch (error) {
            thunkApi.rejectWithValue(error);
            message.error("Add to cart failed");
        }
    }
);

// Handle remove cart
export const handleRemoveFromCart = createAsyncThunk(
    "cart/removeProduct",
    async (actionPayload, thunkApi) => {
        /* --- */
        const { removedIndex } = actionPayload || {};
        const { getState, dispatch, rejectWithValue } = thunkApi;
        const { cartInfo } = getState()?.cart || {};

        if (removedIndex < 0) return false;

        try {
            /* --- */
            const newProduct = cartInfo.product
                ?.filter((_, index) => index !== removedIndex)
                .map((item) => item.id);
            const newQuantity = cartInfo.quantity?.filter(
                (_, index) => index !== removedIndex
            );
            const newVariant = cartInfo.variant?.filter(
                (_, index) => index !== removedIndex
            );
            const newTotalProduct = cartInfo.totalProduct?.filter(
                (_, index) => index !== removedIndex
            );
            const newSubtotal = sumArrayNumber(newTotalProduct);
            const newTotal =
                newSubtotal - (cartInfo.discount ?? 0) + (cartInfo.shipping?.price ?? 0);

            /* --- */
            const updatePayload = {
                ...cartInfo,
                product: newProduct,
                quantity: newQuantity,
                variant: newVariant,
                totalProduct: newTotalProduct,
                subTotal: newSubtotal,
                total: newTotal,
                shipping: newProduct?.length > 0 ? cartInfo.shipping : {},
                discount: newProduct?.length > 0 ? cartInfo.discount : 0,
            };

            /* - call API - */
            const cartRes = await cartServices.updateCart(updatePayload);
            if (cartRes) {
                dispatch(handleGetCart());
                message.success("Remove from cart successfully");
            }
            return cartRes?.data;
        } catch (error) {
            rejectWithValue(error);
            message.error("Remove from cart failed");
            console.log("error", error);
        }
    }
);
