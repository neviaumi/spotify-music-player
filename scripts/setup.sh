#!/usr/bin/env bash

set -ex

npm install
npx lerna bootstrap
npx lerna run --concurrency 1 --stream build --since HEAD --exclude-dependents
