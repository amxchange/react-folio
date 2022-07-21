rm -rf dist/*
mkdir dist
npm run build --env.VERSION_NO=$1

if [[ $? -eq 0 ]]; then
    echo "********************BUILD PASSED*******************";
else
    echo "********************BUILD FAILED*******************";
    exit;
fi
