import React from "react";
import { formatDate } from "@/utils/format";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { PATHS } from "@/constants/paths";

const BlogItem = ({ name, slug, image, createdAt, author, description }) => {
    const detailPath = PATHS.BLOG + `/${slug}`;

    return (
        <div className="entry-item col-sm-6">
            <article className="entry entry-grid">
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
                                by <a href="#">{author || ""}</a>
                            </span>
                        )}
                    </div>
                    <h2 className="entry-title">
                        <Link to={detailPath}>{name || ""}</Link>
                    </h2>
                    <div className="entry-content">
                        <BlogDescStyle
                            dangerouslySetInnerHTML={{
                                __html: description,
                            }}
                        />
                        <Link to={detailPath} className="read-more">
                            Read More
                        </Link>
                    </div>
                </div>
            </article>
        </div>
    );
};

export default BlogItem;

const BlogDescStyle = styled.div`
    min-height: 80;
    display: -webkit-box;
    display: "-webkit-inline-box";
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
`;
