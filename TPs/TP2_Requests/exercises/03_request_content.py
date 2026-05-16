import requests

print("=== Request Content ===")

response = requests.get("https://www.example.com")
content = response.content
print(content[:500])
