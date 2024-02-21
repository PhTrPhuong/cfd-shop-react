import useQuery from "@/hooks/useQuery";
import { blogService } from "@/services/blogService";
import React from "react";
import { useParams } from "react-router-dom";

const useBlogSinglePage = () => {
    const { slug } = useParams();

    /* ---- API Handling - blogService - Blog ---- */
    const { data: blogDetailData } = useQuery(
        () => blogService.getBlogBySlug(slug),
        [slug]
    );
    // --
    const name = blogDetailData?.name;

    /* ---- API Handling - blogService - Tags ---- */
    const { data: blogTagsData } = useQuery(blogService.getBlogTags);
    // --
    const tags = blogTagsData?.blogs?.filter((tag) =>
        blogDetailData?.tags?.includes(tag.id)
    );

    /* ---- API Handling - blogService - Related Posts ---- */
    const { data: relatedPostsData } = useQuery(
        () =>
            blogDetailData?.id &&
            blogService.getBlogs(`?category=${blogDetailData?.category?.id}`),
        [blogDetailData?.id]
    );

    /* ---------------------------------------------------------------- */
    /* ---- PROPS - Blog Detail ---- */
    const blogContentProps = { blogDetailData, tags };

    /* ---- PROPS - Related Posts ---- */
    const relatedPostsProps = { relatedPostsData };

    /* ---------------------------------------------------------------- */
    return {
        blogContentProps,
        name,
        relatedPostsProps,
    };
};

export default useBlogSinglePage;
