// Create loan dictionary from form entry
function getLoan() {
    // Get input from user
    let fname = document.forms["addLoan"]["fname"].value, 
    fbalance = document.forms["addLoan"]["fbalance"].value, 
    finterest = document.forms["addLoan"]["finterest"].value, 
    fpayment = document.forms["addLoan"]["fpayment"].value;

    const loan = {name:fname, balance:fbalance, interest:finterest, payment:fpayment};
    return loan;
}

// Create array of loans to store in server
function saveLoanToLocal() {
    let loans = localStorage.getItem("loans");
    let loanArray = loans ? JSON.parse(loans) : [];

    const newLoan = getLoan();

    loanArray.push(newLoan);

    localStorage.setItem("loans", JSON.stringify(loanArray));
}

// Create array of loans objects on load
function loadLoansFromLocal() {
    let loans = JSON.parse(localStorage.getItem("loans")) || [];
    return loans;
}


// For each loan in array, add a new row to loan table
function createTable(data, tableID) {
    let rows = 0;
    if (data.length == 0) {
        const table = document.getElementById(tableID);
        const node = document.createTextNode("Add data to table to view");
        const h2 = document.createElement("h1");
        h2.appendChild(node);

        const div = document.createElement("div");
        div.className = "empty-table";
        div.appendChild(h2);

        table.appendChild(div);
    }
    data.forEach(row => {
        // Create new row in html
        const tr = document.createElement("tr");
        tr.className = "row";        
        const table = document.getElementById(tableID);
        table.appendChild(tr);
        let columns = Object.keys(row);
        let cellCount = 0;
        columns.forEach(column => {
            cellCount++;
            // Create new cell in html
            const h3 = document.createElement("h3");
            const node = document.createTextNode(row[column]);
            h3.appendChild(node);
            const td = document.createElement("td");
            td.className = "data";
            td.appendChild(h3);
            tr.appendChild(td);
            // If in last cell create button
            if (cellCount == columns.length) {
                const div = document.createElement("div");
                div.className = "button-container";
                const button = document.createElement("button");
                div.appendChild(button);

                const p = document.createElement("p");
                const node = document.createTextNode("Edit");
                p.appendChild(node);
                button.appendChild(p);
                td.appendChild(div);
            }
        })
    });
}

let data = loadLoansFromLocal();

createTable(data, "loansLargeTable"); 







document.getElementById("loansLargeTable").onscroll = function() {scrollFunction()};
document.getElementById("closeButton").onfocus = function() {hoverFunction()};

function scrollFunction() {

    var tableScroll = document.getElementById("loansLargeTable").scrollTop || document.getElementById("loansLargeTable").scrollTop;
    var height = document.getElementById("loansLargeTable").scrollHeight - document.getElementById("loansLargeTable").clientHeight;
    var scrolled = ((tableScroll / height) * 100) * .8;
    document.getElementById("tableScrollBar").style.top = scrolled + "%";
}

onload = localStorage.clear();