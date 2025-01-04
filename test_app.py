"""Test suite for the Flask web application."""

import pytest
from app import app


@pytest.fixture
def client():
    """Set up the Flask test client."""
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client


def test_home_route(client):
    """Test the home route."""
    response = client.get("/")
    assert response.status_code == 200, "Expected status code 200"
    assert b"<html" in response.data, "Expected response to contain HTML content"
