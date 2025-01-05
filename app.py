"""Main module for the Flask web application.

This module initializes the Flask app and
defines the primary routes for the application.
"""

from database import Database
from flask import Flask, redirect, render_template, request
from loan import Loan

# Configure app
app = Flask(__name__)

db = Database()


@app.route("/")
def home():
    """Render the home page.

    Returns:
        Response: Rendered home.html template.
    """
    return render_template("home.html")


@app.route("/add-loan", methods=["POST", "GET"])
def addLoan():
    """Add a new loan to the SQLite3 database if valid.

    Handles both GET and POST requests.
    For POST requests, validates the input and saves the loan to the database.

    Returns:
        Response: Redirect to the home page.
    """
    if request.method == "POST":
        # Verify all form inputs
        try:
            fname = request.form["fname"]
            if fname == "":
                raise ValueError("Name cannot be empty")
            fbalance = float(request.form["fbalance"])
            finterest = float(request.form["finterest"])
            fpercent = float(request.form["fpercent"])
        except ValueError as e:
            print(e)
            return redirect("/")
        # Create loan and add to sql database
        loan = Loan(fname, fbalance, finterest, fpercent)
        loan.save(db)

    else:
        print("Add loan form tried to get")
    return redirect("/")
