#! /bin/bash
echo "TOD - Update Script"
echo "-------------------"

# check if current directory == tod and if so exit
if [[ "$PWD" =~ tod ]]; then
    echo "Error: Please dont run this script from the tod directory"
    exit 1
fi

# fetch a copy of the tod repo
git clone https://github.com/jensnti/tod tod-latest

# remove files that are to be replaced
rm .eleventy.js
rm .rollup.config.js
rm -rf src/_includes
rm -rf src/_theme
rm -rf src/assets
rm -rf src/filters
rm -rf src/js
rm -rf src/paired-shortcodes
rm -rf src/scss
rm -rf src/shortcodes
rm -rf src/tranforms
rm -rf src/utils
rm -f src/json/*.json

# copy files from tod-latest
cp tod-latest/.eleventy.js .
cp tod-latest/.rollup.config.js .
cp -r tod-latest/src/_includes src/
cp -r tod-latest/src/_theme src/
cp -r tod-latest/src/assets src/
cp -r tod-latest/src/filters src/
cp -r tod-latest/src/js src/
cp -r tod-latest/src/paired-shortcodes src/
cp -r tod-latest/src/scss src/
cp -r tod-latest/src/shortcodes src/
cp -r tod-latest/src/tranforms src/
cp -r tod-latest/src/utils src/

# clean up
rm -rf tod-latest

echo "To finish the update you must manually update package.json and run npm install"
