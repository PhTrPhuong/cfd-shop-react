import React from "react";
import BlogSearch from "./BlogSearch";
import BlogCategories from "./BlogCategories";
import BlogPopularPosts from "./BlogPopularPosts";
import BlogBannerSidebar from "./BlogBannerSidebar";
import BlogTags from "./BlogTags";

const BlogSidebar = ({
    blogSearchProps,
    blogCategoriesProps,
    blogPopularPostsProps,
    blogTagsProps,
}) => {
    return (
        <aside className="col-lg-3">
            <div className="sidebar">
                <BlogSearch {...blogSearchProps} />
                <BlogCategories {...blogCategoriesProps} />
                <BlogPopularPosts {...blogPopularPostsProps} />
                <BlogBannerSidebar />
                <BlogTags {...blogTagsProps} />
            </div>
        </aside>
    );
};

export default BlogSidebar;
