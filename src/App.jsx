import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import BlogPage from "./pages/BlogPage";
import ContactPage from "./pages/ContactPage";
import FaqPage from "./pages/FaqPage";
import PaymentMethodsPage from "./pages/PaymentMethodsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import ProductPage from "./pages/ProductPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ReturnPage from "./pages/ReturnPage";
import ShippingPage from "./pages/ShippingPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import CheckoutSuccessPage from "./pages/CheckoutSuccessPage";
import DashboardPage from "./pages/DashboardPage";
import Page404 from "./pages/Page404";
import { PATHS } from "./constants/paths";
import PrivateRoute from "./components/PrivateRoute";
import { useDispatch } from "react-redux";
import { handleGetProfile } from "./store/reducer/authReducer";
import { useEffect } from "react";
import tokenMethod from "./utils/token";
import { handleGetCart } from "./store/reducer/cartReducer";
import { message } from "antd";

function App() {
    /* ---- */
    const dispatch = useDispatch();
    useEffect(() => {
        // antd message config
        message.config({
            top: 80,
            duration: 3,
            maxCount: 3,
        });

        // Handle get profile, cart
        // const accessToken = !!tokenMethod.get()?.accessToken;
        if (!!tokenMethod.get()) {
            dispatch(handleGetProfile());
            dispatch(handleGetCart());
        }
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path={PATHS.HOME} element={<MainLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path={PATHS.ABOUT} element={<AboutPage />} />
                    <Route path={PATHS.BLOG} element={<BlogPage />} />
                    <Route path={PATHS.CONTACT} element={<ContactPage />} />
                    <Route path={PATHS.FAQ} element={<FaqPage />} />
                    <Route path={PATHS.PAYMENT_METHOD} element={<PaymentMethodsPage />} />
                    <Route path={PATHS.PRIVATE_POLICY} element={<PrivacyPolicyPage />} />
                    <Route path={PATHS.PRODUCTS} element={<ProductPage />} />
                    <Route path={PATHS.PRODUCT_DETAIL} element={<ProductDetailPage />} />
                    <Route path={PATHS.RETURN} element={<ReturnPage />} />
                    <Route path={PATHS.SHIPPING} element={<ShippingPage />} />

                    <Route element={<PrivateRoute />} redirectPath={PATHS.HOME}>
                        <Route path={PATHS.CART} element={<CartPage />} />
                        <Route path={PATHS.CHECKOUT} element={<CheckoutPage />} />
                        <Route
                            path={PATHS.CHECKOUT_SUCCESS}
                            element={<CheckoutSuccessPage />}
                        />
                        {/* -- profile -- */}
                        <Route path={PATHS.PROFILE.INDEX} element={<DashboardPage />} />
                    </Route>

                    <Route path="*" element={<Page404 />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
