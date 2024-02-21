import { PATHS } from "@/constants/paths";
import { formatDate } from "@/utils/format";
import owlCarousels from "@/utils/owlCarousels";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const RelatedPosts = ({ relatedPostsData }) => {
    useEffect(() => {
        owlCarousels();
    }, [relatedPostsData]);

    return (
        <div className="related-posts">
            <h3 className="title">Related Posts</h3>
            {relatedPostsData?.blogs?.length > 0 && (
                <div
                    className="owl-carousel owl-simple"
                    data-toggle="owl"
                    data-owl-options='{
                    "nav": false, 
                    "dots": true,
                    "margin": 20,
                    "loop": false,
                    "responsive": {
                        "0": {
                            "items":1
                        },
                        "480": {
                            "items":2
                        },
                        "768": {
                            "items":3
                        }
                    }
                }'
                >
                    {relatedPostsData?.blogs.map((item, index) => {
                        const { id, image, name, slug, author, createdAt } = item || {};
                        const detailPath = PATHS.BLOG + `/${slug}`;
                        return (
                            <article key={id || index} className="entry entry-grid">
                                <figure className="entry-media">
                                    <Link to={detailPath}>
                                        <img src={image || ""} alt={name || ""} />
                                    </Link>
                                </figure>
                                <div className="entry-body">
                                    <div className="entry-meta">
                                        <span>{formatDate(createdAt)}</span>
                                        <span className="meta-separator">|</span>
                                        {author && (
                                            <span className="entry-author">
                                                by <a href="#">{author}</a>
                                            </span>
                                        )}
                                    </div>
                                    <BlogTitle className="entry-title">
                                        <Link to={detailPath}>{name || ""}</Link>
                                    </BlogTitle>
                                </div>
                            </article>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default RelatedPosts;

const BlogTitle = styled.h2`
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    min-height: 38px;
`;
