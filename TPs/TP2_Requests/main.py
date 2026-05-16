#!/usr/bin/env python3
"""
TP2 - Requests Tutorial
Python HTTP Requests with the Requests library
"""

import subprocess
import sys
import os

exercises = [
    "01_get_request.py",
    "02_status_codes.py",
    "03_request_content.py",
    "04_post_request.py",
    "05_handling_errors.py",
    "06_setting_timeout.py",
    "07_headers.py",
    "08_web_scraping.py",
    "09_urllib_comparison.py",
]


def main():
    exercises_dir = os.path.join(os.path.dirname(__file__), "exercises")

    print("=" * 60)
    print("TP2 - Requests Tutorial")
    print("=" * 60)

    for ex in exercises:
        ex_path = os.path.join(exercises_dir, ex)
        if not os.path.exists(ex_path):
            print(f"\n[SKIP] {ex} not found")
            continue
        print(f"\n{'=' * 60}")
        print(f"Running: {ex}")
        print(f"{'=' * 60}")
        result = subprocess.run([sys.executable, ex_path], capture_output=True, text=True)
        print(result.stdout)
        if result.stderr:
            print(f"STDERR: {result.stderr}")

    print("=" * 60)
    print("All exercises completed.")
    print("=" * 60)


if __name__ == "__main__":
    main()
