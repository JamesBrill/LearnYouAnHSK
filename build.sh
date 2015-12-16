#!/bin/bash
echo "Transpiling ECMAScript 6 to JavaScript 5..."
babel src --out-dir out --ignore src/static/scripts/lib
echo "Removing old styles..."
rm -rv ./out/static/styles
echo "Copying new styles..."
cp -vr ./src/static/styles ./out/static/styles
echo "Copying new index.html..."
cp -v ./src/static/index.html ./out/static/
