import json

with open('numbers.txt', 'r') as f:
    numbers = [int(line.strip()) for line in f if line.strip()]

with open('numbers.json', 'w') as f:
    json.dump(numbers, f)