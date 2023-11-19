#!/bin/sh

git pull --ff-only
killall node
npm install
npm run push
npm run dev