import BlogItem from "@/components/BlogItem";
import React from "react";
import styled from "styled-components";

const BlogList = ({ blogs, isLoading }) => {
    return (
        <div className="entry-container max-col-2" data-layout="fitRows">
            {/* -- Case: calling API-- */}
            {isLoading &&
                new Array(6).fill("").map((_, index) => {
                    return (
                        <BlogSkeletonStyle
                            key={new Date().getTime() + index}
                            className="entry-item col-sm-6"
                        >
                            <Skeleton.Image
                                active
                                style={{ width: "100%", height: 275 }}
                            />
                            <Skeleton.Input active />
                            <Skeleton.Input block active />
                        </BlogSkeletonStyle>
                    );
                })}

            {/* -- Case: data -- */}
            {!isLoading &&
                blogs?.length > 0 &&
                blogs.map((blog, index) => {
                    return <BlogItem key={blog?.id || index} {...blog} />;
                })}
        </div>
    );
};

export default BlogList;

const BlogSkeletonStyle = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-bottom: 5%;
`;
