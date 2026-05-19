# Hacker News Job Post Scraper

This project scrapes job postings from Hacker News "Ask HN: Who is hiring?" posts and analyzes the popularity of different programming technologies.

## Description

The scraper fetches job postings from the Hacker News "Ask HN: Who is hiring?" thread, extracts the job offers, and analyzes which programming languages are most frequently mentioned. The results are displayed as a bar chart using matplotlib.

## Installation

1. Create a virtual environment:
   ```bash
   python -m venv .venv
   ```

2. Activate the virtual environment:
   - Windows: `.\.venv\Scripts\activate`
   - Linux/Mac: `source .venv/bin/activate`

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## How to Run

Execute the scraper:
```bash
python scraper.py
```

The script will:
1. Fetch the job postings from Hacker News
2. Parse and extract job offers
3. Analyze technology mentions
4. Display the results in the console
5. Show a bar chart visualization

## Example Output

```
Scraping: https://news.ycombinator.com/item?id=42919502
Found 250 job posts

Technology count:
  python: 45
  javascript: 38
  typescript: 25
  go: 20
  java: 18
  rust: 12
  c#: 10
  c++: 8
  ruby: 5
  php: 3
  swift: 2
  kotlin: 1
```

## Project Structure

```
.
├── scraper.py         # Main scraper script
├── requirements.txt   # Python dependencies
└── README.md          # This documentation
```

## Technologies Analyzed

The scraper counts mentions of:
- Python, JavaScript, TypeScript, Go, C#, Java, Rust, C++, Ruby, PHP, Swift, Kotlin

## License

MIT