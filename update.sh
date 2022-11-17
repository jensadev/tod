#! /bin/bash
echo "TOD - Update Script"
echo "-------------------"

# check if current directory == tod and if so exit
if [[ "$PWD" == *"tod" ]]; then
    echo "Error: Please dont run this script from the tod directory"
    exit 1
fi

# fetch a copy of the tod repo
git clone https://github.com/jensnti/tod tod-latest

# remove files/folders that are to be replaced
rm -rf src/_includes
rm -rf src/_theme
rm -rf src/assets
rm -rf src/filters
rm -rf src/js
rm -rf src/paired-shortcodes
rm -rf src/sass
rm -rf src/shortcodes
rm -rf src/transforms
rm -rf src/utils
rm -f src/json/*.json

# copy files from tod-latest
cp tod-latest/update.sh .
cp tod-latest/.gitignore .
cp tod-latest/.eleventy.js .
cp tod-latest/rollup.config.js .

cp tod-latest/src/404.njk src/
cp tod-latest/src/hjälp.md src/
cp tod-latest/src/manifest.json.njk src/
cp tod-latest/src/offline.njk src/
cp tod-latest/src/search-index.json.njk src/
cp tod-latest/src/service-worker.js src/
cp tod-latest/src/sitemap.xml.njk src/
cp tod-latest/src/tack.md src/

cp -r tod-latest/src/_includes src/
cp -r tod-latest/src/_theme src/
cp -r tod-latest/src/assets src/
cp -r tod-latest/src/filters src/
cp -r tod-latest/src/js src/
cp -r tod-latest/src/paired-shortcodes src/
cp -r tod-latest/src/sass src/
cp -r tod-latest/src/shortcodes src/
cp -r tod-latest/src/transforms src/
cp -r tod-latest/src/utils src/

# clean up
rm -rf tod-latest

echo "To finish the update you must manually update package.json (check scripts!) and run npm install"
