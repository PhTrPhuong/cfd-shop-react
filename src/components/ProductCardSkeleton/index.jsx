import React from "react";
import { Skeleton } from "antd";
import styled from "styled-components";

export const ProductSkeletonStyle = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-bottom: 5%;
`;

const ProductCardSkeleton = (props) => {
    return (
        <ProductSkeletonStyle {...props}>
            <Skeleton.Image active style={{ width: "100%", height: 275 }} />
            <Skeleton.Input />
            <Skeleton.Input block />
        </ProductSkeletonStyle>
    );
};

export default ProductCardSkeleton;
