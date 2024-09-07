window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    console.log("Scrolling");

    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    document.getElementById("tableScrollBar").style.width = scrolled + "%";
}