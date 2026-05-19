import requests
import json

base_url = "http://127.0.0.1:8000"

test_question = {
    "question_text": "What is the best Python Framework",
    "choices": [
        {"choice_text": "FastAPI", "is_correct": True},
        {"choice_text": "Flask", "is_correct": False},
        {"choice_text": "Django", "is_correct": False}
    ]
}

print("1. Creating a question...")
response = requests.post(f"{base_url}/questions/", json=test_question)
print(f"Status: {response.status_code}")
print(f"Response: {response.json()}")

if response.status_code == 200:
    question_id = 1

    print("\n2. Getting the question...")
    response = requests.get(f"{base_url}/questions/{question_id}")
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")

    print("\n3. Getting the choices...")
    response = requests.get(f"{base_url}/choices/{question_id}")
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")

print("\nAll tests passed!")