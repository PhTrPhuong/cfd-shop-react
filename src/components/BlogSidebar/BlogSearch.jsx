import React from "react";

const BlogSearch = ({ setSearchValue, onSearchChange, searchValueDebounced }) => {
    /* ---- */
    const _onSubmit = (e) => {
        e?.preventDefault();
        if (typeof searchValueDebounced === "string") {
            onSearchChange?.(searchValueDebounced);
        }
    };

    return (
        <div className="widget widget-search">
            <h3 className="widget-title">Search</h3>
            <form onSubmit={_onSubmit}>
                <label htmlFor="ws" className="sr-only">
                    Search in blog
                </label>
                <input
                    type="search"
                    className="form-control"
                    name="ws"
                    id="ws"
                    placeholder="Search in blog"
                    required
                    onChange={(e) => {
                        setSearchValue(e?.target?.value);
                    }}
                />
                <button type="submit" className="btn">
                    <i className="icon-search" />
                    <span className="sr-only">Search</span>
                </button>
            </form>
        </div>
    );
};

export default BlogSearch;
