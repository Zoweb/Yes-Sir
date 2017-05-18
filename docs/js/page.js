(function() {
    // nav-bar animation for scrolling
    let body = document.body,
        title = document.querySelector("#title"),
        titleImage = document.querySelector("#title-image"),
        titleImg = titleImage.querySelector("img"),
        titleText = document.querySelector("#title-text"),
        titleH1 = titleText.querySelector("h1"),
        titleH2 = titleText.querySelector("h2"),

        downloadSection = document.querySelector("#page-right");

    function scrollEvent() {
        let scrollTop = window.scrollY;
        let MAX_SCROLL = window.innerWidth / 100 * 30 - 100;

        if (scrollTop > MAX_SCROLL) {
            scrollTop = MAX_SCROLL;
        }

        let heightStyle = `calc(30vw - ${scrollTop}px)`;

        title.style.height = heightStyle;

        titleImage.style.height = heightStyle;
        titleImage.querySelector("img").style.height = heightStyle;
        titleImage.querySelector("img").style.width = heightStyle;

        downloadSection.style.top = heightStyle;

        titleText.style.opacity = 1 - scrollTop / MAX_SCROLL;
        if (scrollTop >= MAX_SCROLL) titleText.style.pointerEvents = "none";
        else titleText.style.pointerEvents = "";
    }

    window.addEventListener("scroll", scrollEvent);
    window.addEventListener("resize", scrollEvent);
    window.addEventListener("load", scrollEvent);
}());




// highlighting for <pre><code>
hljs.initHighlighting();