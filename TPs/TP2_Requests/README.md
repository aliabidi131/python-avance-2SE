# TP2 - Requests Tutorial

## Description
This TP covers the Python **Requests** library for making HTTP requests. It includes GET/POST requests, status codes, error handling, timeouts, headers, web scraping with BeautifulSoup, and a comparison with urllib.

## Prérequis techniques

- Python 3.7+
- pip (Python package installer)

## Installation des dépendances

```bash
pip install requests beautifulsoup4
```

## Structure du projet

```
TP2_Requests/
├── README.md
├── main.py                  # Script principal qui exécute tous les exercices
├── exercises/
│   ├── 01_get_request.py         # GET Request
│   ├── 02_status_codes.py        # HTTP Status Codes
│   ├── 03_request_content.py     # Request Content
│   ├── 04_post_request.py        # POST Request
│   ├── 05_handling_errors.py     # Handling Errors
│   ├── 06_setting_timeout.py     # Setting a Timeout
│   ├── 07_headers.py             # HTTP Request Headers
│   ├── 08_web_scraping.py        # Web Scraping with BeautifulSoup
│   └── 09_urllib_comparison.py   # Requests vs urllib
```

## Exécution

### Exécuter tous les exercices

```bash
python main.py
```

### Exécuter un exercice individuellement

```bash
python exercises/01_get_request.py
python exercises/04_post_request.py
```

## Auteur

Wahid Hamdi
