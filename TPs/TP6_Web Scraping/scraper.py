import requests
from bs4 import BeautifulSoup
import matplotlib.pyplot as plt


def fetch_page(url):
    """Fetch the HTML content from a URL."""
    response = requests.get(url)
    if response.status_code == 200:
        return response.content
    else:
        raise Exception(f"Failed to fetch page: {response.status_code}")


def parse_job_posts(soup):
    """Parse job posts from the HTML content."""
    elements = soup.find_all(class_="ind", indent=0)
    comments = [e.find_next(class_="comment") for e in elements]
    return comments


def clean_text(text):
    """Clean and process the text."""
    text = text.lower()
    words = text.split(" ")
    words = {w.strip(".,/:;!@") for w in words}
    return words


def analyze_technologies(comments, keywords):
    """Analyze technologies mentioned in job posts."""
    for comment in comments:
        words = clean_text(comment.get_text())
        for k in keywords:
            if k in words:
                keywords[k] += 1
    return keywords


def visualize_data(keywords):
    """Visualize the data using matplotlib."""
    plt.bar(keywords.keys(), keywords.values())
    plt.xlabel("Language")
    plt.ylabel("# of Mentions")
    plt.title("Technology Popularity in Job Posts")
    plt.show()


def main():
    url = "https://news.ycombinator.com/item?id=42919502"
    print(f"Scraping: {url}")

    content = fetch_page(url)
    soup = BeautifulSoup(content, "html.parser")

    comments = parse_job_posts(soup)
    print(f"Found {len(comments)} job posts")

    keywords = {
        "python": 0,
        "javascript": 0,
        "typescript": 0,
        "go": 0,
        "c#": 0,
        "java": 0,
        "rust": 0,
        "c++": 0,
        "ruby": 0,
        "php": 0,
        "swift": 0,
        "kotlin": 0,
    }

    keywords = analyze_technologies(comments, keywords)
    print("\nTechnology count:")
    for tech, count in sorted(keywords.items(), key=lambda x: x[1], reverse=True):
        print(f"  {tech}: {count}")

    visualize_data(keywords)


if __name__ == "__main__":
    main()