import ShareLink from "@/components/ShareLink";
import { formatDate } from "@/utils/format";
import React from "react";

const SingleEntry = ({ blogDetailData, tags }) => {
    const { image, name, createdAt, author, description } = blogDetailData || {};
    const pathUrl = window.location.href;

    return (
        <article className="entry single-entry">
            <div className="entry-body">
                <figure className="entry-media">
                    <img src={image || ""} alt={name || ""} />
                </figure>
                <h1 className="entry-title entry-title-big">{name}</h1>
                <div className="entry-meta">
                    <span>{formatDate(createdAt)}</span>
                    <span className="meta-separator">|</span>
                    {!!author && (
                        <span className="entry-author">
                            by <a href="#">{author}</a>
                        </span>
                    )}
                </div>
                <div
                    className="entry-content editor-content"
                    dangerouslySetInnerHTML={{
                        __html: description,
                    }}
                />
                <div className="entry-footer row no-gutters flex-column flex-md-row">
                    <div className="col-md">
                        <div className="entry-tags">
                            <span>Tags:</span>
                            {tags?.map((tag, index) => {
                                return (
                                    <a key={tag.id || index} href="#">
                                        {tag.name}
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                    <div className="col-md-auto mt-2 mt-md-0">
                        <div
                            style={{ gap: "0 5px" }}
                            className="social-icons social-icons-sm"
                        >
                            <span className="social-label">Share this post:</span>
                            <ShareLink title="Facebook" path={pathUrl}>
                                <i className="icon-facebook-f" />
                            </ShareLink>
                            <ShareLink type="twitter" title="Twitter" path={pathUrl}>
                                <i className="icon-twitter" />
                            </ShareLink>
                            <ShareLink type="instagram" title="Instagram" path={pathUrl}>
                                <i className="icon-instagram" />
                            </ShareLink>
                            <ShareLink type="pinterest" title="Pinterest" path={pathUrl}>
                                <i className="icon-pinterest" />
                            </ShareLink>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default SingleEntry;
