rm -rf dist
mkdir dist
npm run deploy

if [[ $? -eq 0 ]]; then
    echo "********************BUILD PASSED*******************";
else
    echo "********************BUILD FAILED*******************";
    exit;
fi