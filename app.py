"""Main module for the Flask web application.

This module initializes the Flask app and
defines the primary routes for the application.
"""

from database import Database
from flask import Flask, redirect, render_template, request, jsonify
import json
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


@app.route("/api/loan/addLoan", methods=["POST"])
def addLoan():
    """Add a new loan to the SQLite3 database if valid.

    Get's a loan object in json format. Loads the loan object and adds to database if valid.

    Returns:
        Response: Redirect to the home page.
    """
    print("Add loan form submitted")
    # Verify all form inputs
    data = request.get_json()
    print(data)
    if not data:
        response = {'error': 'Invalid data'}
        return response, 400
    if not data["name"]:
        response = {'error': 'Invalid name'}
        return response, 400
    if not data["balance"]:
        response = {'error': 'Invalid balance'}
        return response, 400
    if not data["interest"]:
        response = {'error': 'Invalid interest'}
        return response, 400
    if not data["percent"]:
        response = {'error': 'Invalid percent'}
        return response, 400
    # Create loan and add to sql database
    loan = Loan(data["name"], data["balance"], data["interest"], data["percent"])
    loan.save(db)
    response = {'success': 'Loan added successfully'}
    return jsonify(response), 201
    


@app.route("/api/loan/getLoans")
def getLoans():
    """Fetch all loan data from SQlite3 database.

    Returns:
        Data: In json format.
    """
    # Get loans from database
    data = []
    loans = db.get()
    for loan in loans:
        data.append(
            dict(name=loan[1], balance=loan[2], interest=loan[3], percent=loan[4])
        )
    # Jsonify data and return
    response = json.dumps(data)
    return response
