"""Define the main module for the Flask web application.

Initialize the Flask app and define the primary routes.
"""

from flask import Flask, render_template

# Configure app
app = Flask(__name__)


@app.route("/")
def home():
    """Render home template."""
    return render_template("home.html")
