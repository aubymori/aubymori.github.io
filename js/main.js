function changeSection(id)
{
    if (!document.querySelector(`#section-${id}`)) return;

    document.querySelector(".section:not(.hid)").classList.add("hid");
    document.querySelector(`#section-${id}`).classList.remove("hid");
}

// Initial section load
if (window.location.hash)
{
    changeSection(window.location.hash.slice(1));
}

window.addEventListener("hashchange", function(e) {
    changeSection(/(?<=#).*?$/.exec(e.newURL)[0]);
});

document.addEventListener("click", function(e) {
    if (
        e.target.classList.contains("spoiler-show") ||
        e.target.classList.contains("spoiler-hide")
    )
    {
        [...e.target.parentElement.children].forEach(function(el) {
            el.classList.toggle("hid");
        });
    }
});