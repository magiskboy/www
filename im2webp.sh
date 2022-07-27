input=static/images
for file in $(ls $input); do
    cwebp -q 75 $input/$file -o webp/$(basename $file) 2>/dev/null
done
