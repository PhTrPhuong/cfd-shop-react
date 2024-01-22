import Breadcrumb from "@/components/Breadcrumb";
import { PATHS } from "@/constants/paths";
import React from "react";
import { Link } from "react-router-dom";
import ProductToolbox from "./ProductToolbox";
import ProductList from "./ProductList";
import Pagination from "@/components/Pagination";
import ProductFilter from "./ProductFilter";
import useProductPage from "./useProductPage";

const ProductPage = () => {
    const { toolboxProps, productListProps, pagiProps, filterProps } = useProductPage();

    return (
        <main className="main">
            <div
                className="page-header text-center"
                style={{ backgroundImage: 'url("/assets/images/page-header-bg.jpg")' }}
            >
                <div className="container">
                    <h1 className="page-title">Product</h1>
                </div>
            </div>

            {/* <nav aria-label="breadcrumb" className="breadcrumb-nav mb-2">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="index.html">Home</a>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Product
                        </li>
                    </ol>
                </div>
            </nav> */}
            <Breadcrumb>
                <Breadcrumb.Item>
                    <Link to={PATHS.HOME}>Home</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item isActive>Product</Breadcrumb.Item>
            </Breadcrumb>

            <div className="page-content">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9">
                            <ProductToolbox {...toolboxProps} />
                            <ProductList {...productListProps} />
                            <Pagination {...pagiProps} />
                        </div>
                        <ProductFilter {...filterProps} />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ProductPage;
