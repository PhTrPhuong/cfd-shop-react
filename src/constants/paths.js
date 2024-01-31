const PRODUCTS_PATH = "/products";
const PROFILE_PATH = "/profile";
const PROFILE_ORDER = PROFILE_PATH + "/order";
const PROFILE_ADDRESS = PROFILE_PATH + "/address";
const PROFILE_WISHLIST = PROFILE_PATH + "/wishlist";
const PROFILE_CHANGE_PASS = PROFILE_PATH + "/change-password";

export const PATHS = {
    HOME: "/",
    PRODUCTS: PRODUCTS_PATH,
    PRODUCT_DETAIL: PRODUCTS_PATH + "/:slug",
    CART: "/cart",
    CHECKOUT: "/checkout",
    CHECKOUT_SUCCESS: "/checkout_success",
    DASHBOARD: "/dashboard",
    FAQ: "/FAQ",
    PAYMENT_METHOD: "/payment_method",
    PRIVATE_POLICY: "/private_policy",
    RETURN: "/return",
    SHIPPING: "/shipping",
    PROFILE: {
        INDEX: PROFILE_PATH,
        PROFILE_ORDER: PROFILE_ORDER,
        PROFILE_ADDRESS: PROFILE_ADDRESS,
        PROFILE_WISHLIST: PROFILE_WISHLIST,
        PROFILE_CHANGE_PASS: PROFILE_CHANGE_PASS,
    },
    BLOG: "/blog",
    CONTACT: "/contact",
    ABOUT: "/about",
};
