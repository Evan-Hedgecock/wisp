"""Module defining the Loan class.

This class is used to create and manage loan objects.
"""


class Loan:
    """A class to represent a loan."""

    def __init__(self, name, balance, interest, percent):
        """Initialize a loan instance.

        Args:
            name (str): Name of the loan.
            balance (float): Loan balance amount.
            interest (float): Loan interest rate.
            percent (float): Loan percent rate.
        """
        self.name = name
        self.balance = balance
        self.interest = interest
        self.percent = percent

    def save(self, database):
        """Save the loan to the database.

        Args:
            database (Database): The database instance where the loan will be saved.
        """
        database.add(self)
