import { PATHS } from "@/constants/paths";
import { formatDate } from "@/utils/format";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const BlogPopularPosts = ({ blogPopularPosts }) => {
    return (
        <div className="widget">
            <h3 className="widget-title">Popular Posts</h3>
            <ul className="posts-list">
                {blogPopularPosts?.length > 0 &&
                    blogPopularPosts?.map((item, index) => {
                        const { id, image, name, slug, createdAt } = item || {};
                        const detailPath = PATHS.BLOG + `/${slug}`;
                        return (
                            <li key={id || index}>
                                <figure>
                                    <Link to={detailPath}>
                                        <img src={image || ""} alt={name || ""} />
                                    </Link>
                                </figure>
                                <div style={{ paddingTop: 0 }}>
                                    <span>{formatDate(createdAt)}</span>
                                    <BlogTitle>
                                        <Link to={detailPath}>{name || ""}</Link>
                                    </BlogTitle>
                                </div>
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
};

export default BlogPopularPosts;

const BlogTitle = styled.h4`
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    min-height: 38px;
`;
