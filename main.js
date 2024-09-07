document.getElementById("loansLargeTable").onscroll = function() {scrollFunction()};

document.getElementById("closeButton").onfocus = function() {hoverFunction()};

function scrollFunction() {

    var tableScroll = document.getElementById("loansLargeTable").scrollTop || document.getElementById("loansLargeTable").scrollTop;
    var height = document.getElementById("loansLargeTable").scrollHeight - document.getElementById("loansLargeTable").clientHeight;
    var scrolled = ((tableScroll / height) * 100) * .8;
    document.getElementById("tableScrollBar").style.top = scrolled + "%";
}

function hoverFunction() {
    
}