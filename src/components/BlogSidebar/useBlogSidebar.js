import useDebounce from "@/hooks/useDebounce";
import useMutation from "@/hooks/useMutation";
import useQuery from "@/hooks/useQuery";
import { blogService } from "@/services/blogService";
import scrollTop from "@/utils/scrollTop";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

const BLOG_LIMITS = 6;

const useBlogSidebar = () => {
    const { search } = useLocation();
    const queryObject = queryString.parse(search);
    const [_, setSearchParams] = useSearchParams();
    const [searchValue, setSearchValue] = useState("");
    const searchValueDebounced = useDebounce(searchValue, 500);

    /* ---- API Handling - blogService - Blog ---- */
    const {
        data: blogsData,
        loading: blogsLoading,
        error: blogsError,
        execute: fetchBlogs,
    } = useMutation((query) => blogService.getBlogs(query || `?limit=${BLOG_LIMITS}`));
    // --
    const blogs = blogsData?.blogs || [];
    const blogPopularPosts = blogs.filter((blog) => blog.isPopular === true);

    /* ---- API Handling - blogService - Category ---- */
    const { data: categoriesData } = useQuery(blogService.getBlogCategories);
    const categories = categoriesData?.blogs || [];

    /* ---- API Handling - blogService - Tags ---- */
    const { data: tagsData } = useQuery(blogService.getBlogTags);
    const tags = tagsData?.blogs || [];

    /* --- */
    useEffect(() => {
        fetchBlogs(search);
        scrollTop();
    }, [search]);

    /* ---- General Functions - Update url ---- */
    const updateQueryString = (queryObject) => {
        const newQueryString = queryString.stringify({
            ...queryObject,
            limit: BLOG_LIMITS,
        });
        setSearchParams(new URLSearchParams(newQueryString));
    };

    /* ---------------------------------------------------------------- */

    /* ---- PROPS - Blog Search ---- */
    const onSearchChange = (value) => {
        updateQueryString({
            ...queryObject,
            page: 1,
            search: value,
        });
    };

    useEffect(() => {
        if (typeof searchValueDebounced === "string") {
            onSearchChange?.(searchValueDebounced);
        }
    }, [searchValueDebounced]);

    const blogSearchProps = {
        setSearchValue,
        onSearchChange,
        searchValueDebounced,
    };

    /* ---- PROPS - Blog Categorys ---- */
    const onCateFilterChange = (categoryId) => {
        const newCategoryQuery = [categoryId];
        if (!categoryId) {
            newCategoryQuery = [];
        }
        updateQueryString({
            ...queryObject,
            category: newCategoryQuery,
            page: 1,
        });
    };

    const blogCategoriesProps = {
        categories,
        onCateFilterChange,
    };

    /* ---- PROPS - Blog Popular Posts ---- */
    const blogPopularPostsProps = {
        blogPopularPosts,
    };

    /* ---- PROPS - Blog Tags ---- */
    const blogTagsProps = {
        tags,
    };

    /* ---------------------------------------------------------------- */
    return {
        blogSearchProps,
        blogCategoriesProps,
        blogPopularPostsProps,
        blogTagsProps,
    };
};

export default useBlogSidebar;
