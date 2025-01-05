"""Test suite for the Flask web application."""

import pytest
from app import app
from database import Database
import sqlite3


@pytest.fixture
def client():
    """Set up the Flask test client.

    Yields:
        FlaskClient: The test client for the application.
    """
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client


@pytest.fixture
def setup_database():
    """Set up a fresh test database before each test."""
    db = Database()
    con = sqlite3.connect("loans.db")
    cur = con.cursor()
    cur.execute("DELETE FROM loans")
    con.commit()
    con.close()
    return db


def test_home_route(client):
    """Test the home route."""
    response = client.get("/")
    assert response.status_code == 200, "Expected status code 200"
    assert b"<html" in response.data, "Expected response to contain HTML content"


def test_add_loan_route(client, setup_database):
    """Test adding a loan through the /add-loan route."""
    data = {
        "fname": "Test Loan",
        "fbalance": "1000",
        "finterest": "5",
        "fpercent": "10",
    }
    response = client.post("/add-loan", data=data, follow_redirects=True)
    assert response.status_code == 200, "Expected status code 200"

    con = sqlite3.connect("loans.db")
    cur = con.cursor()
    cur.execute("SELECT * FROM loans WHERE name = ?", ("Test Loan",))
    result = cur.fetchone()
    con.close()

    assert result is not None, "Expected loan to be added to the database"
    assert result[1] == "Test Loan", "Loan name mismatch"
    assert result[2] == 1000.0, "Loan balance mismatch"
    assert result[3] == 5.0, "Loan interest mismatch"
    assert result[4] == 10.0, "Loan percent mismatch"
