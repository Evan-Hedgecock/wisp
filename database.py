"""Database module for managing loans.

Provides functionality to interact with an SQLite3 database.
"""

import sqlite3


class Database:
    """A class to manage the SQLite3 database for loans."""

    def __init__(self):
        """Initialize the database and create the loans table if it does not exist."""
        print("Creating database")
        con = sqlite3.connect("loans.db")
        cur = con.cursor()
        cur.execute(
            """
            CREATE TABLE IF NOT EXISTS loans(
                id INTEGER PRIMARY KEY,
                name TEXT NOT NULL,
                balance REAL NOT NULL,
                interest REAL NOT NULL,
                percent REAL NOT NULL
                )
        """
        )

    def add(self, loan):
        """Add a loan record to the database.

        Args:
            loan (Loan): The loan object to be added to the database.
        """
        print("Adding to database loan:", loan.name)
        data = [loan.name, loan.balance, loan.interest, loan.percent]
        con = sqlite3.connect("loans.db")
        cur = con.cursor()
        cur.execute(
            "INSERT INTO loans(name, balance, interest, percent) "
            + "VALUES (?, ?, ?, ?)",
            data,
        )
        con.commit()
