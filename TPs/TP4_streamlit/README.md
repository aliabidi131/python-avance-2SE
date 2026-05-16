# Mortgage Repayments Calculator

A Streamlit web application for calculating mortgage loan repayments with interactive visualizations.

## Project Description

This is a Mortgage Repayments Calculator built with Streamlit. It allows users to input home value, deposit, interest rate, and loan term to calculate monthly repayments, total payments, and total interest. The app also displays an amortization schedule and a chart showing the remaining balance over time.

## Features

- Input fields for home value, deposit, interest rate, and loan term
- Automatic calculation of monthly repayments
- Display of total repayments and total interest
- Interactive line chart showing remaining balance over time
- Full amortization table with monthly breakdown

## Installation

1. Clone the repository or download the source code.

2. Create a virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install the dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## How to Run

1. Ensure you have all dependencies installed:
   ```bash
   pip install -r requirements.txt
   ```

2. Run the Streamlit application:
   ```bash
   streamlit run main.py
   ```

3. Open your web browser and navigate to `http://localhost:8501`

## Example Usage

1. Enter the home value (e.g., 500000)
2. Enter your deposit amount (e.g., 100000)
3. Set the interest rate percentage (e.g., 5.5)
4. Choose the loan term in years (e.g., 30)

The app will automatically calculate:
- Monthly repayment amount
- Total repayments over the loan term
- Total interest paid
- Display a chart of remaining balance over time
- Show a detailed amortization table

## Deploying to Streamlit Cloud

1. Push your code to a GitHub repository.

2. Go to [Streamlit Cloud](https://share.streamlit.io/).

3. Click "New app" and select your GitHub repository.

4. Select the branch and the main file (main.py).

5. Click "Deploy".

Your app will be publicly accessible at a Streamlit Cloud URL.