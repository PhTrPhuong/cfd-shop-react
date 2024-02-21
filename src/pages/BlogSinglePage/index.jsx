import React from "react";
import SingleEntry from "./SingleEntry";
import Page from "./Page";
import RelatedPosts from "./RelatedPosts";
import Comments from "./Comments";
import Reply from "./Reply";
import BlogSidebar from "@/components/BlogSidebar";
import useBlogSidebar from "@/components/BlogSidebar/useBlogSidebar";
import Breadcrumb from "@/components/Breadcrumb";
import { PATHS } from "@/constants/paths";
import useBlogSinglePage from "./useBlogSinglePage";
import { Link } from "react-router-dom";

const BlogSinglePage = () => {
    const { blogSearchProps, blogCategoriesProps, blogPopularPostsProps, blogTagsProps } =
        useBlogSidebar();
    const { name, blogContentProps, relatedPostsProps } = useBlogSinglePage();

    return (
        <main className="main">
            <Breadcrumb>
                <Breadcrumb.Item>
                    <Link to={PATHS.HOME}>Home</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link to={PATHS.BLOG}>Blog</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item isActive>{name}</Breadcrumb.Item>
            </Breadcrumb>
            {/* --- */}
            <div className="page-content">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9">
                            <SingleEntry {...blogContentProps} />
                            {/* <Page /> */}
                            <RelatedPosts {...relatedPostsProps} />
                            {/* <Comments />
                            <Reply /> */}
                        </div>
                        {/* ---- */}
                        <BlogSidebar
                            blogSearchProps={blogSearchProps}
                            blogCategoriesProps={blogCategoriesProps}
                            blogPopularPostsProps={blogPopularPostsProps}
                            blogTagsProps={blogTagsProps}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default BlogSinglePage;
