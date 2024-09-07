// Create loan dictionary from form entry
function getLoan() {
    // Get input from user
    let fname = document.forms["addLoan"]["fname"].value, 
    fbalance = document.forms["addLoan"]["fbalance"].value, 
    finterest = document.forms["addLoan"]["finterest"].value, 
    fpayment = document.forms["addLoan"]["fpayment"].value;

    const loan = {name:fname, balance:fbalance, interest:finterest, payment:fpayment};
}

// Insert loan into table
// function importLoan(){

// }










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