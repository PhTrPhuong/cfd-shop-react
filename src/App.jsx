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
import PrivateRoute from "./components/PrivateRoute";
import AccountPage from "./pages/DashboardPage/AccountPage";
import ListOrder from "./pages/DashboardPage/ListOrder";
import WishList from "./pages/DashboardPage/WishList";
import AddressAccount from "./pages/DashboardPage/AddressAccount";
import ChangePass from "./pages/DashboardPage/ChangePass";
import { PATHS } from "./constants/paths";
import BlogSinglePage from "./pages/BlogSinglePage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={PATHS.HOME} element={<MainLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path={PATHS.ABOUT} element={<AboutPage />} />
                    <Route path={PATHS.BLOG} element={<BlogPage />} />
                    <Route path={PATHS.BLOG_DETAIL} element={<BlogSinglePage />} />
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
                        <Route path={PATHS.PROFILE.INDEX} element={<DashboardPage />}>
                            <Route index element={<AccountPage />} />
                            <Route
                                path={PATHS.PROFILE.PROFILE_ORDER}
                                element={<ListOrder />}
                            />
                            <Route
                                path={PATHS.PROFILE.PROFILE_WISHLIST}
                                element={<WishList />}
                            />
                            <Route
                                path={PATHS.PROFILE.PROFILE_ADDRESS}
                                element={<AddressAccount />}
                            />
                            <Route
                                path={PATHS.PROFILE.PROFILE_CHANGE_PASS}
                                element={<ChangePass />}
                            />
                        </Route>
                    </Route>

                    <Route path="*" element={<Page404 />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
