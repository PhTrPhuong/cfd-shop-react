const scrollTop = (e) => {
    e?.preventDefault();

    $("html,body").animate({ scrollTop: 0 }, 800);

    // return window.scrollTo({
    //     top: 0,
    //     left: 0,
    //     behavior: "smooth",
    // });
};

export default scrollTop;
