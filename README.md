# Flask Web Application

## Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Setting Up the Development Environment](#setting-up-the-development-environment)
  - [Maintaining the Development Environment](#maintaining-the-development-environment)
- [Pre-commit Hook](#pre-commit-hook)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)

## Introduction
This project is a web application for managing student loans. It will show you an overview of all loans you have, details about the interest and total balances. And will be able to simulate potential loan payments to help plan out paying off student loans with an incosistent income and summer jobs

## Getting Started

### Prerequisites

Ensure the following tools are installed on your system:

- Python 3.13 or newer
- pip
- pip-tools (`pip install pip-tools`)
- git

### Setting Up the Development Environment

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Set up a virtual environment:

   ```bash
   python3 -m venv venv
   source .venv/bin/activate # On Windows: .venv\Scripts\activate
   ```

3. Install development dependencies using `pip-tools`:

   ```bash
   pip-sync requirements-dev.txt
   ```

### Maintaining the Development Environment

- If you modify `requirements.in` or `requirements-dev.in`, regenerate the respective `requirements.txt` files:

  ```bash
  pip-compile requirements.in
  pip-compile requirements-dev.in
  ```

- Sync the environment to match the updated `requirements.txt` files:

  ```bash
  pip-sync requirements.txt requirements-dev.txt
  ```

## Pre-commit Hook

This project includes a pre-commit hook to ensure code quality. Install the pre-commit hooks after setting up your environment:

```bash
pre-commit install
```

Run the hooks manually using:

```bash
pre-commit run --all-files
```

## Running the Application

1. Activate the virtual environment:

   ```bash
   source .venv/bin/activate # On Windows: venv\Scripts\activate
   ```

2. Run the Flask application:

   ```bash
   flask run
   ```
