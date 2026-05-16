import requests

print("=== Setting a Timeout ===")

url = "https://httpbin.org/delay/10"

try:
    response = requests.get(url, timeout=5)
except requests.exceptions.Timeout as err:
    print(err)
