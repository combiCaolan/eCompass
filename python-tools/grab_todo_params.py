import json

with open('numbers.json', 'r') as f:
    numbers = set(json.load(f))

with open('unique_line_numbers.json', 'r') as f:
    unique_numbers = set(json.load(f))

# Find numbers in numbers.json that are NOT in unique_line_numbers.json
todo_parameters = sorted(list(numbers - unique_numbers))

with open('TODO_parameters.json', 'w') as f:
    json.dump(todo_parameters, f, separators=(',', ':'))