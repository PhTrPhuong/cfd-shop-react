import ProductCard from "@/components/ProductCard";
import { Skeleton } from "antd";
import React from "react";
import styled from "styled-components";

const ProductSkeletonStyle = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-bottom: 5%;
`;

const ProductList = ({ isLoading, isError, products }) => {
    /* -- Case: No data -- */
    if ((!isLoading && products?.length < 1) || isError)
        return (
            <div className="products mb-3">
                <div className="row justify-content-center">There is no products</div>
            </div>
        );

    /* -- Case: calling API-- */
    if (isLoading) {
        return (
            <div className="products mb-3">
                <div className="row justify-content-center">
                    {new Array(9).fill("").map((_, index) => {
                        return (
                            <ProductSkeletonStyle
                                key={new Date().getTime() + index}
                                className="col-6 col-md-4 col-lg-4"
                            >
                                <Skeleton.Image
                                    active
                                    style={{ width: "100%", height: 275 }}
                                />
                                <Skeleton.Input />
                                <Skeleton.Input block />
                            </ProductSkeletonStyle>
                        );
                    })}
                </div>
            </div>
        );
    }

    /* -- Case: data -- */
    return (
        <div className="products mb-3">
            <div className="row justify-content-center">
                {products.map((product, index) => {
                    return (
                        <div
                            key={product?.id || index}
                            className="col-6 col-md-4 col-lg-4"
                        >
                            <ProductCard product={product} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ProductList;
