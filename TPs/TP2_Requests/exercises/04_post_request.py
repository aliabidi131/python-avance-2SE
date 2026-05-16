import requests

print("=== POST Request ===")

data = {"name": "Salah", "message": "Hello!"}
url = "https://httpbin.org/post"

response = requests.post(url, json=data)
response_data = response.json()

print(response_data)
