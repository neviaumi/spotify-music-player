#!/usr/bin/env bash

set -ex
npx tsc --noEmit
npm run lint:css:ci
npm run lint:script:ci
npm run test:ci
npx lhci autorun
