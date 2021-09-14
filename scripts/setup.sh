#!/usr/bin/env bash

set -ex

npm install
npx tsc
npm run build
