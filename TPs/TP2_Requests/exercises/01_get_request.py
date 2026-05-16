import requests

url = "https://www.example.com"
response = requests.get(url)

print("=== GET Request ===")
print(response)
print(f"Status code: {response.status_code}")
