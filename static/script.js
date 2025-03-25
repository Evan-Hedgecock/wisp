// Dynamically adjust the class of navbar when user scrolls vs when it's at top of page
const navbar = document.getElementById

// TODO: Change add loan form inputs:
// Loan name: Required
// Balance: Required, when blurred a popup should ask if you want to split it between principal and interest owed
// APR: Required
// Minimum Payment: Not required, if left blank then will be set to 0.
// If minimum payment is 0, in the simulate payment the minimum payment will be assumed to be the monthly interest accrued

const addLoanForm = document.getElementById("addLoanForm");
addLoanForm.addEventListener("submit", function(event) {
	event.preventDefault();
	addLoan();
}
);

const loanTable = document.getElementById("loanTable");

function addLoan() {
	const fname = document.getElementById("fname").value;
	if (fname === "") {
		alert("Name missing");
		return;
	}
	const fbalance = document.getElementById("fbalance").value;
	if (fbalance === "" || isNaN(fbalance)) {
		alert("Balance should be a number");
		return;
	}
	const finterest = document.getElementById("finterest").value;
	if (finterest === "" || isNaN(finterest)) {
		alert("Interest should be a number");
		return;
	}
	const fpercent = document.getElementById("fpercent").value;
	if (fpercent === "" || isNaN(fpercent)) {
		alert("Payment should be a number");
		return;
	}
	const newLoan = {"name": fname, "balance": fbalance,
					 "interest": finterest, "percent": fpercent
	};
	// Add loan to database
	fetch('/api/loan/addLoan', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(newLoan)
	})

	// Add loan to table
	row = document.createElement("tr");
	valueList = Object.values(newLoan);
	valueList.forEach(value => {
		cell = document.createElement("td");
		node = document.createTextNode(value);
		cell.appendChild(node);
		row.appendChild(cell);
	});
	loanTable.appendChild(row);

	clearLoanForm();
}

function clearLoanForm() {
	document.getElementById("fname").value = "";
	document.getElementById("fbalance").value = "";
	document.getElementById("finterest").value = "";
	document.getElementById("fpercent").value = "";
}

// Creates a table from data structed as an array of objects
function createTable(data){
	data.forEach(loan => {
		console.log(loan);
		//Create a row for every object
		row = document.createElement("tr");
		valueList = Object.values(loan);
		console.log(valueList);
		valueList.forEach(value => {
			//Create a data cell for every object value
			cell = document.createElement("td");
			node = document.createTextNode(value);
			cell.appendChild(node);
			row.appendChild(cell);
		});
		var cell = document.createElement("td");
		var editContainer = document.createElement("div");
		editContainer.className = "editContainer";
		var editButton = document.createElement("button");
		editButton.className = "edit";
		editButton.innerHTML = "Edit";
		editContainer.appendChild(editButton);
		cell.appendChild(editContainer);
		row.appendChild(cell);
	loanTable.appendChild(row);
	});
}

function fetchLoans(){
	fetch('api/loan/getLoans')
		.then(response => response.json())
		.then(data => createTable(data))
		.catch(error => console.error("Error fetching data: ", error));
	console.log("Done fetching data");
}

fetchLoans();

//function addLoan(event){
//    const errors = []
//    const elements = []
//    fname = this.fname.value;
//    fbalance = Number(this.fbalance.value);
//    finterest = this.finterest.value;
//    fpayment = this.fpayment.value;
//    // These should gather error messages and elements to display an error to, in the errors and elements array
//
//    if (fname === "") {
//        errors.push("Name missing");
//        elements.push(document.getElementById("fname-container"));
//    }
//
//    if (fbalance === 0) {
//        console.log("Balance error");
//        errors.push("Balance should be a number");
//        element = document.getElementById("fbalance-container");
//        elements.push(element);
//    }
//
//    if (finterest === "") {
//        console.log("Interest error");
//        errors.push("Interest should be a number");
//        element = document.getElementById("finterest-container");
//        elements.push(element);
//    }
//
//    if (fpayment === "") {
//        console.log("Payment error");
//        errors.push("Payment should be a number");
//        element = document.getElementById("fpayment-container");
//        elements.push(element);
//    }
//
//    // And then if there were errors, call inputErrors to display them and don't let user input create a new loan
//    if (errors.length > 0) {
//        inputErrors(errors, elements);
//        return 1;
//    } else {
//        console.log("adding loan");
//        const newLoan = {"name": fname, "balance": fbalance, "interest": finterest, "payment": fpayment};
//        saveToLocal(newLoan, "loans");
//    }
//}
//
//// This function should display error messages above the element provided
//function inputErrors(errors, elements){
//    for (let i = 0; i < errors.length; i++) {
//        const errorMessage = document.createTextNode(errors[i]);
//        const errorContainer = document.createElement("span");
//        errorContainer.style.color = "red";
//
//        errorContainer.appendChild(errorMessage);
//        elements[i].appendChild(errorContainer);
//    }
//}
//
//// On screen refresh load list from memory
//onload = loans = loadFromLocal("loans");
//// Uncomment this line to clear loans from local memory
//// onload = localStorage.clear();
//loans ? createTable(loans, "#loanTable") : console.log("No loans to load");
