#!/usr/bin/env bash

set -ex

npm run lint:css:ci
npm run lint:script:ci
npm run test:ci
npx lhci autorun
