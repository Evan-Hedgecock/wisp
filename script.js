// Save to memory
function saveToLocal(data, key){    
    currentData = loadFromLocal(key);
    
    // If current data exists, add data to that list, otherwise create empty array
    currentData ? currentData.push(data) : currentData = [data];
    console.log("current data:", currentData);
    stringData = JSON.stringify(currentData);
    console.log("string data:", stringData);
    
    localStorage.setItem(key, stringData);
}

// Load from memory
function loadFromLocal(key){
    data = localStorage.getItem(key);    
    return JSON.parse(data);
}

// Creates a table from data structed as an array of objects
function createTable(data, tableID){
    table = document.querySelector(tableID);
    
    data.forEach(loan => {
        // Create a row for every object
        row = document.createElement("tr");
        valueList = Object.values(loan);
        valueList.forEach(value => {
            // Create a data cell for every object value
            cell = document.createElement("td");
            node = document.createTextNode(value);
            cell.appendChild(node);
            row.appendChild(cell);
        });
        table.appendChild(row);
    });    
}

function addLoan(event){
    fname = this.fname.value;
    fbalance = this.fbalance.value;
    finterest = this.finterest.value;
    fpayment = this.fpayment.value;
    const newLoan = {"name": fname, "balance": fbalance, "interest": finterest, "payment": fpayment};
    
    saveToLocal(newLoan, "loans");
}


// Function to verify correct input to forms
// For every form entry, get the assigned class and make sure the input value is of that type


// On screen refresh load list from memory
onload = loans = loadFromLocal("loans");
loans ? createTable(loans, "#loanTable") : console.log("No loans to load");
