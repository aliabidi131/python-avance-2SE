import requests

print("=== HTTP Status Codes ===")

response = requests.get("https://www.example.com")
print(f"Success (200): {response.status_code}")

response = requests.get("https://httpbin.org/status/404")
print(f"Not Found (404): {response.status_code}")
