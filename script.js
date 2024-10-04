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
    let table = document.querySelector(tableID);
    
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
    let errors = []
    let elements = []
    fname = this.fname.value;
    fbalance = Number(this.fbalance.value);
    finterest = this.finterest.value;
    fpayment = this.fpayment.value;
    

    // These should gather error messages and elements to display an error to, in the errors and elements array
    if (isNaN(fbalance)) {
        errors.push("Balance should be a number")
        element = document.getElementById("fbalance")
        elements.push(element)
    }

    if (isNaN(finterest)) {
        errors.push("Interest should be a number")
        element = document.getElementById("finterest")
        elements.push(element)
    }

    if (isNaN(fpayment)) {
        errors.push("Payment should be a number")
        element = document.getElementById("fpayment")
        elements.push(element)
    }
    
    // And then if there were errors, call inputErrors to display them and don't let user input create a new loan
    if (errors.length > 0) {
        inputErrors(errors, elements)
        return 0
    }    

    const newLoan = {"name": fname, "balance": fbalance, "interest": finterest, "payment": fpayment};
    
    saveToLocal(newLoan, "loans");
}

// This function should display error messages above the element provided
function inputErrors(errors, elements){
    for (let i = 0; i < errors.length; i++) {
        const errorMessage = document.createTextNode(errors[i])
        let errorContainer = document.createElement("span")
        errorContainer.appendChild(errorMessage)
        elements[i].appendChild(errorContainer)
    }
}


// On screen refresh load list from memory
onload = loans = loadFromLocal("loans");
// onload = localStorage.clear()
loans ? createTable(loans, "#loanTable") : console.log("No loans to load");
