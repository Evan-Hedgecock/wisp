// Create loan dictionary
// {Loan id: {Loan name: name, Loan balance: balance, Loan interest: interest, Loan payment: payment}}

function Loan(name, balance, interest, payment) {
    this.name = name;
    this.balance = balance;
    this.interest = interest;
    this.payment = payment;
}

// Get input from user
let name = 







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