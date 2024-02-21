import React from "react";

const BlogCategories = ({ categories, onCateFilterChange }) => {
    /* ---- */
    const _onCategory = (e, categoryId) => {
        e?.preventDefault();
        onCateFilterChange?.(categoryId);
    };

    return (
        <div className="widget widget-cats">
            <h3 className="widget-title">Categories</h3>
            <ul>
                {categories?.length > 0 &&
                    categories?.map((item, index) => {
                        return (
                            <li key={item.id.id || index}>
                                <a href="#" onClick={(e) => _onCategory(e, item.id)}>
                                    {item.name}
                                </a>
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
};

export default BlogCategories;
