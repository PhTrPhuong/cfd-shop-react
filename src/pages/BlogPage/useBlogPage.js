import React, { useEffect } from "react";
import useDebounce from "@/hooks/useDebounce";
import useMutation from "@/hooks/useMutation";
import { blogService } from "@/services/blogService";
import { useLocation, useSearchParams } from "react-router-dom";
import queryString from "query-string";
import scrollTop from "@/utils/scrollTop";

const BLOG_LIMITS = 6;

const useBlogPage = () => {
    const { search } = useLocation();
    const queryObject = queryString.parse(search);
    const [_, setSearchParams] = useSearchParams();

    /* ---- API Handling - blogService - Blog ---- */
    const {
        data: blogsData,
        loading: blogsLoading,
        error: blogsError,
        execute: fetchBlogs,
    } = useMutation((query) => blogService.getBlogs(query || `?limit=${BLOG_LIMITS}`));
    // --
    const blogs = blogsData?.blogs || [];
    const blogsPagi = blogsData?.pagination || {};
    const apiLoading = useDebounce(blogsLoading, 500);

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

    /* ---- PROPS - Blog List ---- */
    const blogListProps = {
        blogs,
        isLoading: apiLoading,
    };

    /* ---- Pagination ---- */
    const onPagiChange = (page) => {
        updateQueryString({ ...queryObject, page: page });
    };

    const pagiProps = {
        page: Number(blogsPagi.page || queryObject.page || 1),
        limit: Number(blogsPagi.limit || queryObject.limit || 1),
        total: Number(blogsPagi.total || 0),
        onPagiChange,
    };

    /* ---------------------------------------------------------------- */
    return {
        blogListProps,
        pagiProps,
    };
};

export default useBlogPage;
