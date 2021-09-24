#!/usr/bin/env bash

set -ex

npm install
npx lerna bootstrap
npx lerna exec --concurrency 1 --stream -- bash scripts/build.sh
