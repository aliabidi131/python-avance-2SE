import requests

print("=== HTTP Request Headers ===")

auth_token = "XXXXXXXX"

headers = {
    "Authorization": f"Bearer {auth_token}"
}

url = "https://httpbin.org/headers"
response = requests.get(url, headers=headers)
print(response.json())
