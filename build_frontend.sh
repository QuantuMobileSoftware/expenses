#!/bin/bash

cd ./user
npm run build

rm -dfr ../static/*
mv ./build/* ../static
mv ../static/static/* ../static
rm -d ../static/static
cd ..