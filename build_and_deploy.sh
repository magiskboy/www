#!/bin/bash

FIREBASE_TOKEN=1//0gut1KvpitrqSCgYIARAAGBASNwF-L9IrA45Vq2-f25qUS-40MlUGMGNA5w959hTlsTZj_bfH55bKniSzdvGl08pTQ3K2Yg-7E98

echo Build in production

HUGO_ENV=production hugo --minify

echo Deploy to firebase

firebase deploy --token $FIREBASE_TOKEN

echo Checkout it https://nkthanh.dev
