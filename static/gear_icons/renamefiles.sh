#!/bin/bash
# Script to rename files to lowercase, replace underscores with spaces, and decode/remove unwanted encodings
for file in *; do
    if [[ -f "$file" ]]; then # Ensure it's a file, not a directory
        decoded_file=$(echo "$file" | sed 's/%28/(/g; s/%29/)/g; s/%27/'\''/g')
        new_name=$(echo "$decoded_file" | tr '[:upper:]' '[:lower:]' | tr '_' ' ')
        mv "$file" "$new_name"
    fi
done