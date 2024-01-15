import { GENERAL_MESSAGE, HOME_MESSAGE } from "@/constants/message";
import useMutation from "@/hooks/useMutation";
import useQuery from "@/hooks/useQuery";
import { pageService } from "@/services/pageServices";
import { productService } from "@/services/productService";
import { subscribeService } from "@/services/subscribeService";
import { message } from "antd";
import { useState } from "react";

const useHomePage = () => {
    /* ---------------------------------------------------------------- */
    /* -- API Handling - productService -- */
    const { data: productsData } = useQuery(productService.getProducts);
    const products = productsData?.products || [];
    // --
    const { data: categoriesData } = useQuery(productService.getCategories);
    const categories = categoriesData?.products || [];
    // --
    const featuredProducts = products?.filter((product) => product.featured) || [];
    // --
    const onSaleProducts = products?.filter((product) => product.onSale) || [];
    // --
    const topRatedProducts = products?.filter((product) => product.topRated) || [];

    /* -- API Handling - pageService -- */
    const { data: homeData } = useQuery(() => pageService.getPageDataByName("home"));
    // --
    const brands = homeData?.data?.brands || [];
    // --
    const services = homeData?.data?.information || {};

    /* -- API Handling - subscribeService -- */
    const { execute: dealExecute } = useMutation(subscribeService.subscribeDeal);

    /* ---------------------------------------------------------------- */

    /* -- Intro Section: chỉ lấy 3 products từ featuredProducts -- */
    const introProducts = featuredProducts.slice(0, 3);
    const introProps = {
        introProducts,
    };

    /* -- HotProduct Section -- */
    const hotProductProps = {
        featuredProducts,
        onSaleProducts,
        topRatedProducts,
    };

    /* -- Deal Section -- */
    const dealProducts = onSaleProducts.filter((product) => product.discount > 0);
    const dealProps = {
        dealProducts,
    };

    /* -- Brands Section -- */
    const brandProps = {
        brands,
    };

    /* -- Featured Section -- */
    const [selectedCateSlug, setSelectedCateSlug] = useState("all");
    const featureProducts =
        selectedCateSlug === "all"
            ? [...(products || [])]
            : products?.filter((product) => product?.category?.slug === selectedCateSlug);

    const featuredProps = {
        categories: [{ name: "All", slug: "all" }, ...categories],
        featureProducts,
        selectedCateSlug,
        handleSelectCate: (slug) => setSelectedCateSlug(slug),
    };

    /* -- Services Section -- */
    const serviceProps = {
        services,
    };

    /* -- Get Deal Section -- */
    const handleSubscribeDeal = (email, callback) => {
        if (email) {
            dealExecute(email, {
                onSuccess: (data) => {
                    message.success(HOME_MESSAGE.dealSuccess);
                    callback?.();
                },
                onFail: (error) => {
                    message.error(GENERAL_MESSAGE.error);
                },
            });
        }
    };
    const getDealProps = {
        handleSubscribeDeal,
    };

    /* ---------------------------------------------------------------- */

    return {
        introProps,
        hotProductProps,
        dealProps,
        brandProps,
        featuredProps,
        serviceProps,
        getDealProps,
    };
};

export default useHomePage;
