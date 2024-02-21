import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PATHS } from "./constants/paths";
import { Suspense, lazy } from "react";
import PageLoading from "./components/PageLoading";

const MainLayout = lazy(() => import("@/layouts/MainLayout"));
const HomePage = lazy(() => import("@/pages/HomePage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const BlogPage = lazy(() => import("@/pages/BlogPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const FaqPage = lazy(() => import("@/pages/FaqPage"));
const PaymentMethodsPage = lazy(() => import("@/pages/PaymentMethodsPage"));
const PrivacyPolicyPage = lazy(() => import("@/pages/PrivacyPolicyPage"));
const ProductPage = lazy(() => import("@/pages/ProductPage"));
const ProductDetailPage = lazy(() => import("@/pages/ProductDetailPage"));
const ReturnPage = lazy(() => import("@/pages/ReturnPage"));
const ShippingPage = lazy(() => import("@/pages/ShippingPage"));
const CartPage = lazy(() => import("@/pages/CartPage"));
const CheckoutPage = lazy(() => import("@/pages/CheckoutPage"));
const CheckoutSuccessPage = lazy(() => import("@/pages/CheckoutSuccessPage"));
const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const Page404 = lazy(() => import("@/pages/Page404"));
const PrivateRoute = lazy(() => import("@/components/PrivateRoute"));
const AccountPage = lazy(() => import("@/pages/DashboardPage/AccountPage"));
const ListOrder = lazy(() => import("@/pages/DashboardPage/ListOrder"));
const WishList = lazy(() => import("@/pages/DashboardPage/WishList"));
const AddressAccount = lazy(() => import("@/pages/DashboardPage/AddressAccount"));
const ChangePass = lazy(() => import("@/pages/DashboardPage/ChangePass"));
const BlogSinglePage = lazy(() => import("@/pages/BlogSinglePage"));

function App() {
    return (
        <Suspense fallback={<PageLoading />}>
            <BrowserRouter>
                <Routes>
                    <Route path={PATHS.HOME} element={<MainLayout />}>
                        <Route index element={<HomePage />} />
                        <Route path={PATHS.ABOUT} element={<AboutPage />} />
                        <Route path={PATHS.BLOG} element={<BlogPage />} />
                        <Route path={PATHS.BLOG_DETAIL} element={<BlogSinglePage />} />
                        <Route path={PATHS.CONTACT} element={<ContactPage />} />
                        <Route path={PATHS.FAQ} element={<FaqPage />} />
                        <Route
                            path={PATHS.PAYMENT_METHOD}
                            element={<PaymentMethodsPage />}
                        />
                        <Route
                            path={PATHS.PRIVATE_POLICY}
                            element={<PrivacyPolicyPage />}
                        />
                        <Route path={PATHS.PRODUCTS} element={<ProductPage />} />
                        <Route
                            path={PATHS.PRODUCT_DETAIL}
                            element={<ProductDetailPage />}
                        />
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
        </Suspense>
    );
}

export default App;
