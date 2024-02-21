import React from "react";
import BlogList from "./BlogList";
import Pagination from "@/components/Pagination";
import { Link } from "react-router-dom";
import Breadcrumb from "@/components/Breadcrumb";
import { PATHS } from "@/constants/paths";
import useBlogPage from "./useBlogPage";
import BlogSidebar from "@/components/BlogSidebar";
import useBlogSidebar from "@/components/BlogSidebar/useBlogSidebar";

const BlogPage = () => {
    const { blogListProps, pagiProps } = useBlogPage();
    const { blogSearchProps, blogCategoriesProps, blogPopularPostsProps, blogTagsProps } =
        useBlogSidebar();

    return (
        <main className="main">
            <div
                className="page-header text-center"
                style={{ backgroundImage: 'url("/assets/images/page-header-bg.jpg")' }}
            >
                <div className="container">
                    <h1 className="page-title">Blog</h1>
                </div>
            </div>
            {/* ---- */}
            <Breadcrumb>
                <Breadcrumb.Item>
                    <Link to={PATHS.HOME}>Home</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item isActive>Blog</Breadcrumb.Item>
            </Breadcrumb>
            {/* ---- */}
            <div className="page-content">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9">
                            <BlogList {...blogListProps} />
                            <Pagination {...pagiProps} />
                        </div>
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

export default BlogPage;
