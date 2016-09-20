#!/bin/bash


pushd ./user
npm install
npm run build
rm -rf ../static
mv ./build ../static
mv ../static/static/* ../static
rm -d ../static/static
popd