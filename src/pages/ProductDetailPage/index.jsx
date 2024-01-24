import Breadcrumb from "@/components/Breadcrumb";
import { PATHS } from "@/constants/paths";
import React from "react";
import { Link } from "react-router-dom";
import ProductDetailsTop from "./ProductDetailsTop";
import ProductDetailsTab from "./ProductDetailsTab";
import useProductDetailPage from "./useProductDetailPage";

const ProductDetailPage = () => {
    const { productName, productDetailTopProps, productDetailTabProps } =
        useProductDetailPage();

    return (
        <main className="main">
            <nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">
                <div className="container d-flex align-items-center">
                    {/* <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="index.html">Home</a>
                        </li>
                        <li className="breadcrumb-item">
                            <a href="product.html">Product</a>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Dark yellow lace
                        </li>
                    </ol> */}
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to={PATHS.HOME}>Home</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to={PATHS.PRODUCTS}>Product</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item isActive>{productName || ""}</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
            </nav>
            <div className="page-content">
                <div className="container">
                    <ProductDetailsTop {...productDetailTopProps} />
                    <ProductDetailsTab {...productDetailTabProps} />
                </div>
            </div>
        </main>
    );
};

export default ProductDetailPage;
