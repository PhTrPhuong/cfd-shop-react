import { Spin } from "antd";
import React, { useEffect } from "react";
import styled from "styled-components";

const PageLoading = () => {
    useEffect(() => {
        $(window).on("load", () => {
            $(".loading").addClass("--hide");
        });
    }, []);

    return (
        <LoadingStyle className="loading">
            <Spin />
        </LoadingStyle>
    );
};

export default PageLoading;

const LoadingStyle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: rgba(256, 256, 256, 0.5);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
`;
