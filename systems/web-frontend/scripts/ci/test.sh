#!/usr/bin/env bash

set -ex
npx tsc --noEmit
npm run lint:css:ci
npm run lint:script:ci
npm run test:ci
# Tmp disable as the script size metric not worked
#npx lhci autorun
