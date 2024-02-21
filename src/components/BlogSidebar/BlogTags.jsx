import React from "react";

const BlogTags = ({ tags }) => {
    return (
        <div className="widget">
            <h3 className="widget-title">Browse Tags</h3>
            <div className="tagcloud">
                {tags?.length > 0 &&
                    tags?.map((item, index) => {
                        const { id, name } = item || {};
                        return (
                            <a href="#" key={id || index}>
                                {name || ""}
                            </a>
                        );
                    })}
            </div>
        </div>
    );
};

export default BlogTags;
