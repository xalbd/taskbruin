#!/bin/sh

git pull --ff-only
node --version | grep 'v20.9.0' || (echo 'Node.js is not v20.9.0, exiting.' ; exit)
killall node
npm install
npm run dev