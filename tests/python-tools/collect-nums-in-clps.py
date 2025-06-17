import os
import json

clps_folder = 'clps'
output_numbers = 'unique_line_numbers.json'

unique_ids = set()

# Process each file in the 'clps' folder
for filename in os.listdir(clps_folder):
    filepath = os.path.join(clps_folder, filename)
    if not os.path.isfile(filepath):
        continue
    with open(filepath, 'r') as f:
        for line in f:
            line = line.strip()
            if not line or ',' not in line:
                continue
            line_id = line.split(',')[0]
            unique_ids.add(int(line_id) if line_id.isdigit() else line_id)

# Write just the list of unique line numbers as a compact JSON array (one line)
line_numbers = sorted(unique_ids) if all(isinstance(x, int) for x in unique_ids) else list(unique_ids)
with open(output_numbers, 'w') as f:
    json.dump(line_numbers, f, separators=(',', ':'))