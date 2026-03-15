#!/bin/bash
# Script to rename files to lowercase, replace underscores with spaces, and decode/remove unwanted encodings
# Operates on all subdirectories: melee, ranged, magic, necro, shared
for dir in melee ranged magic necro shared; do
    if [[ -d "$dir" ]]; then
        cd "$dir"
        for file in *; do
            if [[ -f "$file" ]]; then
                decoded_file=$(echo "$file" | sed 's/%28/(/g; s/%29/)/g; s/%27/'\''/g')
                new_name=$(echo "$decoded_file" | tr '[:upper:]' '[:lower:]' | tr '_' ' ')
                if [[ "$file" != "$new_name" ]]; then
                    mv "$file" "$new_name"
                fi
            fi
        done
        cd ..
    fi
done